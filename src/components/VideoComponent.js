
import React, { useEffect, useRef } from "react";
import { getAiSdkControls } from "../helpers/ai-sdk/loader";
import Timer from "./Timer";
import Box from "@mui/material/Box";

const VideoComponent = ({ showVideo, aiSdkState, mphToolsState, onTimerEnd }) => {
  const videoEl = useRef(null);
  const streamRef = useRef(null);
  const aiSdkControlsRef = useRef(null);

  useEffect(() => {
    async function startCamera() {
      if (aiSdkState === "ready" && mphToolsState === "ready") {
        const { source, start, stop } = await getAiSdkControls();
        aiSdkControlsRef.current = { stop }; // Save the stop function to cleanup later
        streamRef.current = await source.useCamera({
          toVideoElement: videoEl.current,
        });
        await start();
      }
    }

    if (showVideo) {
      if (!streamRef.current) {
        startCamera();
      }
    } else {
      if (aiSdkControlsRef.current) {
        console.log("Stopping AI SDK...");
        aiSdkControlsRef.current.stop(); // Stop the AI SDK before stopping the camera
        aiSdkControlsRef.current = null;
      }

      if (streamRef.current && typeof streamRef.current.getTracks === 'function') {
        console.log("Stopping camera...");
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        console.log("Camera stopped.");
      }

      if (videoEl.current) {
        videoEl.current.srcObject = null; // Manually remove the stream
      }
    }

    return () => {
      if (aiSdkControlsRef.current) {
        aiSdkControlsRef.current.stop();
        aiSdkControlsRef.current = null;
      }

      if (streamRef.current && typeof streamRef.current.getTracks === 'function') {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        console.log("Camera stopped on component unmount.");
      }

      if (videoEl.current) {
        videoEl.current.srcObject = null; // Ensure the video element no longer holds the stream
      }
    };
  }, [aiSdkState, mphToolsState, showVideo]);

  return (
    // <div style={{ width: "640px", height: "480px", position: "relative" }}>
    //   <Timer onTimerEnd={onTimerEnd} />
    //   <video id="videoEl" ref={videoEl}></video>
    // </div>
      <Box sx={{
        width: 640,
        height: 480,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // Centers vertically
        alignItems: 'center', // Centers horizontally
      }}>
        <Timer onTimerEnd={onTimerEnd} />
        <video id="videoEl" ref={videoEl} style={{ width: '100%', height: 'auto' }}></video>
        <br/>
        <br/>
      </Box>
  );
};

export default VideoComponent;

