import { useState, useEffect, useRef } from "react";
import "./componentCSS/engagementComponent.css"


const EngagementComponent = props => {
  const [arousal, setArousal] = useState(0);
  const [valence, setValence] = useState(0);
  const [attention, setAttention] = useState(0);
  const timeout = useRef(undefined);
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);


  useEffect(() => {
    function resetTimeout() {
      let to = timeout.current;
      clearTimeout(to);
      to =setTimeout(() => {
        setAllToZero();
      }, 3000)

      timeout.current= to;
    }
  
    function bindEvent(){
        window.addEventListener(
            "CY_FACE_AROUSAL_VALENCE_RESULT",
            handleArousalValenceEvents
          );
        window.addEventListener("CY_FACE_ATTENTION_RESULT", handleAttentionEvents);
    }
    
    function handleArousalValenceEvents (evt) {
        //console.log("engage1:",evt.detail.output.arousal, evt.detail.output.valence);
        if (typeof props.onDataArousalValence === 'function') {
            if(counter1 <= 120){
                props.onDataArousalValence(evt.detail.output.arousal, evt.detail.output.valence,);
                setCounter1(counter1 + 1);
            }
        } else {
            console.error('onDataArousalValence is not a function!',);
        }
        setValence(Math.abs(evt.detail.output.valence * 100) || 0);
        setArousal(Math.abs(evt.detail.output.arousal * 100) || 0);
        resetTimeout();
    }
    function handleAttentionEvents (evt) {
        //console.log("attention:",evt.detail.output.attention);
        if (typeof props.onDataAttention === 'function') {
            if(counter2 <= 400){
                props.onDataAttention(evt.detail.output.attention);
                setCounter2(counter2 + 1);
            }
        } else {
            console.error('onDataAttention is not a function!',);
        }

        if (evt.detail.output.attention > 0.1) {
            setAttention(evt.detail.output.attention * 100 || 0);
            resetTimeout();
        }
    }
    function setAllToZero() {
        setArousal(0);
        setValence(0);
        setAttention(0);
    }
    bindEvent();
    
  }, []);


  return (
    <>
    <p style={{fontSize:"20px"}}>Engagement Component:</p>
    <div
id="rangesContainer"
>
<div className="rangeContainer">
  <div>
    <div>
      <input
      type="range"
      min="1"
      max="100"
      value={arousal || 0}
      onChange={()=>{}}
      className="slider"
      color="#E29219"
    />
    </div>
    <span id="title">Arousal</span>
  </div>
</div>
<div className="rangeContainer">
  <div>
    <div>
      <input
      type="range"
      min="1"
      max="100"
      value={valence || 0}
      onChange={()=>{}}
      className="slider"
      color="#19E282"
    />
    </div>
    <span id="title">Valence</span>
  </div>
</div>
<div className="rangeContainer">
  <div>
    <div>
      <input
      type="range"
      min="1"
      max="100"
      value={attention || 0}
      onChange={()=>{}}
      className="slider"
      color="#FFFFFF"
    />
    </div>
    <span id="title">Attention</span>
  </div>
</div>
</div>

    </>
    
  );
};

export default EngagementComponent;
