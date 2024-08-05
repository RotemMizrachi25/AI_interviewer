import FaceTrackerComponent from "./FaceTrackerComponent";
import React, {useEffect, useRef, useState} from "react";
import {getAiSdkControls} from "../helpers/ai-sdk/loader";
import {useExternalScript} from "../helpers/ai-sdk/externalScriptsLoader";
import Timer from "./Timer";

const VideoComponent = ({showVideo, aiSdkState, mphToolsState, onTimerEnd}) => {
    //const mphToolsState = useExternalScript("https://sdk.morphcast.com/mphtools/v1.0/mphtools.js");
    //const aiSdkState = useExternalScript("https://ai-sdk.morphcast.com/v1.16/ai-sdk.js");
    const videoEl = useRef(null);
    const [mediaStream, setMediaStream] = useState(null);

    useEffect(() => {
        let stream;
        videoEl.current = document.getElementById("videoEl");
        async function getAiSdk (){
            if(aiSdkState === "ready" && mphToolsState === "ready"){
                const { source, start } = await getAiSdkControls();

                stream = await source.useCamera({
                    toVideoElement: videoEl.current,
                });
                await start();
                setMediaStream(stream);
            }

        }
        if (showVideo) {
            if (!mediaStream) {
                getAiSdk();
            }
        } else {
            if (mediaStream) {
                console.log("Stopping camera...");
                //alert("closing");
                mediaStream.getTracks().forEach((track) => track.stop());
                setMediaStream(null);
                console.log("Camera stopped.");
            }
        }
        // Cleanup function to stop the stream when the component is unmounted
        return () => {
            console.log("inside return")
            //alert("return");
            if (mediaStream) {
                mediaStream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [aiSdkState, mphToolsState, showVideo, showVideo]);


    return(
        <div style={{width:"640px", height: "480px", position:"relative"}}>
            <Timer onTimerEnd={onTimerEnd}/>
            <video id="videoEl"></video>
            <FaceTrackerComponent videoEl={videoEl}></FaceTrackerComponent>
        </div>
    );
}
export default VideoComponent;
