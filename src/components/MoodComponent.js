import { useEffect, useRef, useState, useCallback } from "react";
import "./componentCSS/moodComponent.css";

const MoodComponent = ({ handleMoodData, showVideo }) => {
  const grid = useRef(undefined);
  const pin_wrap = useRef(undefined);
  const pin = useRef(undefined);
  const [gridN, setGridN] = useState(38);
  const crtDisableTimeout = useRef(undefined);
  const [counter, setCounter] = useState(0);

  // Stable function references using useCallback
  const fn = useCallback((evt) => {
    showPin();
    setEmotion(evt.detail.output);
    console.log("mood: ", evt.detail.output, " type: ", typeof evt.detail.output);
    handleMoodData(evt.detail.output.affects38);
    resetTimeout();
  }, [handleMoodData]);

  const fn2 = useCallback(() => {
    setDim();
  }, []);

  const resetTimeout = useCallback(() => {
    let to = crtDisableTimeout.current;
    clearTimeout(to);
    to = setTimeout(() => {
      hidePin();
    }, 3000);
    crtDisableTimeout.current = to;
  }, []);

  const bindEvent = useCallback(() => {
    resetTimeout();
    window.addEventListener("CY_FACE_AROUSAL_VALENCE_RESULT", fn);
    window.addEventListener("resize", fn2);
  }, [fn, fn2, resetTimeout]);

  const unbindEvent = useCallback(() => {
    window.removeEventListener("CY_FACE_AROUSAL_VALENCE_RESULT", fn);
    window.removeEventListener("resize", fn2);
  }, [fn, fn2]);

  const setDim = useCallback(() => {
    if (!grid.current || grid.current.clientWidth === 0) {
      setTimeout(() => {
        setDim();
      }, 10);
    } else {
      pin_wrap.current.style.width = grid.current.clientWidth + "px";
      pin_wrap.current.style.height = grid.current.clientHeight + "px";
    }
  }, []);

  const setEmotion = useCallback(({ arousal = 0, valence = 0 }) => {
    let { x, y } = calcCoorinate({ valence, arousal });
    x = Math.max(x, 5.15); // check img ratio to avoid ellipse
    y = Math.max(y, 6);
    setPinPosition(x, y);
  }, []);

  const calcCoorinate = useCallback(({ valence = 0, arousal = 0 }) => {
    const img_outer_width = 800;
    const img_inner_width = 598;
    const img_x_offset = 101;

    const img_outer_height = 686;
    const img_inner_height = 598;
    const img_y_offset = 45;

    const normalized = (z) => (z + 1) / 2;

    return {
      x: (100 * (img_x_offset + img_inner_width * normalized(valence))) / img_outer_width,
      y: (100 * (img_y_offset + img_inner_height * normalized(arousal))) / img_outer_height,
    };
  }, []);

  const setPinPosition = useCallback((x, y) => {
    pin.current.style.left = `${x - 5.15}%`; // check img ratio to avoid ellipse
    pin.current.style.bottom = `${y - 6}%`;
  }, []);

  const showPin = useCallback(() => {
    pin.current.style.opacity = 0;
  }, []);

  const hidePin = useCallback(() => {
    pin.current.style.opacity = 0;
  }, []);

  useEffect(() => {
    grid.current = document.querySelector("#grid");
    pin_wrap.current = document.querySelector(".pin_wrap");
    pin.current = document.querySelector(".pin");

    if (showVideo) {
      bindEvent();
    } else {
      unbindEvent();
    }

    return () => unbindEvent(); // Clean up on unmount or showVideo change
  }, [showVideo, bindEvent, unbindEvent]);

  return (
    <>
      <div className="wrapper" id="grid">
        <div className="pin_wrap">
          <div className="pin"></div>
        </div>
      </div>
    </>
  );
};

export default MoodComponent;

