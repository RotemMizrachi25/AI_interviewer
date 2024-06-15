import {useEffect, useRef, useState} from "react";
import { useExternalScript } from "./helpers/ai-sdk/externalScriptsLoader";
import { getAiSdkControls } from "./helpers/ai-sdk/loader";
//import VideoComponent from "./helpers/ai-sdk/VideoAnalyzer";
import './App.css';

import GenderComponent from "./components/GenderComponent";
import AgeComponent from "./components/AgeComponent";
import DominantEmotionComponent from "./components/DominantEmotionComponent";
import FeatureComponent from "./components/FeatureComponent";
import EngagementComponent from "./components/EngagementComponent";
import FaceTrackerComponent from "./components/FaceTrackerComponent";
import MoodComponent from "./components/MoodComponent";
import EmotionBarsComponent from "./components/EmotionBarsComponent";

function App() {

  const mphToolsState = useExternalScript("https://sdk.morphcast.com/mphtools/v1.0/mphtools.js");
  const aiSdkState = useExternalScript("https://ai-sdk.morphcast.com/v1.16/ai-sdk.js");
  const videoEl = useRef(undefined)
  // Mood Data
  const [affects, setAffects] = useState([]);
  //Engagement
  const [valence, setValence] = useState([]);
  const [attention, setAttention] = useState([]);
  const [arousal, setArousal] = useState([]);

  const moodApiCaller = async () => {
    const response = await fetch(`http://localhost:5000/affects`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({affects: affects})
    });
    //console.log(response);
    const response_json = await response.json();

    console.log(response_json.results);
  };

  const engageApiCaller = async (fieldName, field) => {
    const response = await fetch(`http://localhost:5000/${fieldName}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({[fieldName]: field})
    });

    const response_json = await response.json();
    console.log(response_json.results);

  };

  const handleMoodData = (newAffects) => {
    setAffects(affects => [...affects, newAffects]);
  };

  const handleArousalValencData = (newArousal, newValence) => {
    setArousal(arousal => [...arousal, newArousal]);
    setValence(valence => [...valence, newValence]);
  }
  const handleAttentionData = (newAttention) => {
    setAttention(attention => [...attention, newAttention]);
  }



  useEffect(() => {
    console.log("MoodData from comp: ", affects);
    if(affects.length === 120){
      console.log("Type MoodData:", typeof moodData);
      moodApiCaller();
    }
  }, [affects]);

  useEffect(() => {
    console.log("EngageData from comp: ", arousal, valence, attention);
    if(arousal.length === 120){
      engageApiCaller("arousal", arousal);
    }
    if(valence.length === 120){
      engageApiCaller("valence", valence);
    }
    if(attention.length === 400){
      engageApiCaller("attention", attention);
    }
  }, [arousal, valence, attention]);



  useEffect(() => {
    videoEl.current = document.getElementById("videoEl");
    async function getAiSdk (){
      if(aiSdkState === "ready" && mphToolsState === "ready"){
        const { source, start } = await getAiSdkControls();

      await source.useCamera({
        toVideoElement: document.getElementById("videoEl"),
      });
        await start();
        
      }
     
    }
    getAiSdk();
  }, [aiSdkState, mphToolsState]);

  return (
    <div className="App">
      <header className="App-header">
        <div style={{display:"flex", flexDirection: "column", alignItems:"center"}}>
          <div style={{width:"640px", height: "480px", position:"relative"}}>
            <video id="videoEl"></video>
            <FaceTrackerComponent videoEl={videoEl}></FaceTrackerComponent>
          </div>
          <GenderComponent></GenderComponent>
          <hr className="solid" style={{width:"100%"}}></hr>
          <DominantEmotionComponent></DominantEmotionComponent>
          <hr className="solid" style={{width:"100%"}}></hr>
          <AgeComponent></AgeComponent>
          <hr className="solid" style={{width:"100%"}}></hr>
          <FeatureComponent></FeatureComponent>
          <hr className="solid" style={{width:"100%"}}></hr>
          <EngagementComponent onDataAttention={handleAttentionData} onDataArousalValence={handleArousalValencData}/>
          <hr className="solid" style={{width:"100%"}}></hr>
          <MoodComponent onDataRecieve={handleMoodData}/>
          <hr className="solid" style={{width:"100%"}}></hr>
          <EmotionBarsComponent></EmotionBarsComponent>
          <hr className="solid" style={{width:"100%"}}></hr>
          
        </div>
      </header>
    </div>
  );
}

export default App;
