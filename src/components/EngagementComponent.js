import { useState, useEffect, useRef, useCallback } from "react";
import "./componentCSS/engagementComponent.css";

const EngagementComponent = (props) => {
  const [arousal, setArousal] = useState(0);
  const [valence, setValence] = useState(0);
  const [attention, setAttention] = useState(0);
  const timeout = useRef(undefined);
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);

  // Stable function references using useCallback
  const resetTimeout = useCallback(() => {
    let to = timeout.current;
    clearTimeout(to);
    to = setTimeout(() => {
      setAllToZero();
    }, 3000);
    timeout.current = to;
  }, []);

  const handleArousalValenceEvents = useCallback((evt) => {
    if (typeof props.onDataArousalValence === 'function') {
        props.onDataArousalValence(evt.detail.output.arousal, evt.detail.output.valence);

    } else {
      console.error('onDataArousalValence is not a function!');
    }
    setValence(Math.abs(evt.detail.output.valence * 100) || 0);
    setArousal(Math.abs(evt.detail.output.arousal * 100) || 0);
    resetTimeout();
  }, [, props.onDataArousalValence, resetTimeout]);

  const handleAttentionEvents = useCallback((evt) => {
    if (typeof props.onDataAttention === 'function') {
        props.onDataAttention(evt.detail.output.attention);
    } else {
      console.error('onDataAttention is not a function!');
    }

    if (evt.detail.output.attention > 0.1) {
      setAttention(evt.detail.output.attention * 100 || 0);
      resetTimeout();
    }
  }, [counter2, props.onDataAttention, resetTimeout]);

  const bindEvent = useCallback(() => {
    window.addEventListener("CY_FACE_AROUSAL_VALENCE_RESULT", handleArousalValenceEvents);
    window.addEventListener("CY_FACE_ATTENTION_RESULT", handleAttentionEvents);
  }, [handleArousalValenceEvents, handleAttentionEvents]);

  const unbindEvent = useCallback(() => {
    window.removeEventListener("CY_FACE_AROUSAL_VALENCE_RESULT", handleArousalValenceEvents);
    window.removeEventListener("CY_FACE_ATTENTION_RESULT", handleAttentionEvents);
  }, [handleArousalValenceEvents, handleAttentionEvents]);

  const setAllToZero = useCallback(() => {
    setArousal(0);
    setValence(0);
    setAttention(0);
  }, []);

  useEffect(() => {
    if (props.showVideo) {
      bindEvent();
    } else {
      unbindEvent();
    }

    return () => unbindEvent(); // Clean up on unmount or props change
  }, [props.showVideo, bindEvent, unbindEvent]);


};

export default EngagementComponent;
