import React, {useEffect, useRef, useState} from "react";
import { useExternalScript } from "../helpers/ai-sdk/externalScriptsLoader";
import { getAiSdkControls } from "../helpers/ai-sdk/loader";
import { BsSkipEndFill } from "react-icons/bs";
import '../App.css';
import '../index.css';
import GenderComponent from "../components/GenderComponent";
import AgeComponent from "../components/AgeComponent";
import DominantEmotionComponent from "../components/DominantEmotionComponent";
import FeatureComponent from "../components/FeatureComponent";
import EngagementComponent from "../components/EngagementComponent";
import FaceTrackerComponent from "../components/FaceTrackerComponent";
import MoodComponent from "../components/MoodComponent";
import EmotionBarsComponent from "../components/EmotionBarsComponent";
import VideoComponent from "../components/VideoComponent";
import Timer from "../components/Timer";
import RoundButton from "../components/RoundButton";
import SpeechBalloon from "../components/SpeechBaloon";
import ActionAreaCard from "../components/Cards";
import {margin} from "@mui/system";
import InterviewerCards from "../components/Cards";
import {Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import Question from "../components/Question";
import SpeakingCharacter from "../components/SpeakingCharacter";

function Simulation() {

    //camera and video
    const mphToolsState = useExternalScript("https://sdk.morphcast.com/mphtools/v1.0/mphtools.js");
    const aiSdkState = useExternalScript("https://ai-sdk.morphcast.com/v1.16/ai-sdk.js");
    const videoEl = useRef(undefined)
    // Mood Data
    const [affects, setAffects] = useState([]);
    //Engagement
    const [valence, setValence] = useState([]);
    const [attention, setAttention] = useState([]);
    const [arousal, setArousal] = useState([]);
    const [showVideo, setVideo] = useState(false);
    const [showCards, setCards] = useState(true);
    const [showQuestion, setQuestion] = useState(false);
    const [interviewerId, setInterviewerId] = useState(null);


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

      const submitApiCaller = async (interviewerId) => {
        const response = await fetch(`http://localhost:5000/submit`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({interviewerId: interviewerId, field: "computer science"})
        });

        const response_json = await response.json();
        console.log(response_json);
        console.log(response_json['question1']);
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
        console.log(response_json.results)
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



    const handleClickButton = () => {
        //next: call to evaluate answer if changes from true to false
        setVideo(!showVideo);
    }

    // Function to stop the video after timer is zero
    const stopVideo = () => {
        setVideo(false);
        //call to evaluate answer function
    };

    // Function to hide the cards after choosing an interviewer
    const hideCards = ({interviewerId}) => {
        setCards(false);
        setInterviewerId(interviewerId);
        alert(interviewerId);
        //generate the interview questions
        setQuestion(true);
    };

    useEffect(() => {
        if (interviewerId != null) {
            submitApiCaller(interviewerId);
        }
    }, [interviewerId]);

    return (
        <div style={{backgroundColor:"#b7cbf5", minHeight: "100vh"}}>
            <div >
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>

                    <div style={{display:"flex", flexDirection: "column", alignItems:"center"}}>
                        {showCards && <InterviewerCards func={hideCards}/>}
                    </div>
                    <div>
                        {showQuestion &&
                            <Question question={"What motivated you to pursue a career in computer science?"} showCards={showCards} showVideo={showVideo} handleClickButton={handleClickButton} interviewId={interviewerId}/>

                        }
                    </div>
                    <br/>
                    {/*<hr className="solid" style={{width:"100%", color:"darkblue", backgroundColor:"darkblue", height:2}}></hr>*/}

                    {/*{!showCards && (*/}
                    {/*    showVideo ? (*/}
                    {/*        <RoundButton onClick={handleClickButton}> Submit Answer</RoundButton>*/}
                    {/*    ) : (*/}
                    {/*        <RoundButton onClick={handleClickButton}> Ready to Answer</RoundButton>*/}
                    {/*    ))}*/}

                    {!showCards && showVideo && <VideoComponent showVideo={showVideo} aiSdkState={aiSdkState} mphToolsState={mphToolsState} onTimerEnd={stopVideo}/>}
                    {/*<GenderComponent></GenderComponent>*/}
                    {/*<hr className="solid" style={{width:"100%"}}></hr>*/}
                    {/*<DominantEmotionComponent></DominantEmotionComponent>*/}
                    {/*<hr className="solid" style={{width:"100%"}}></hr>*/}
                    {/*<AgeComponent></AgeComponent>*/}
                    {/*<hr className="solid" style={{width:"100%"}}></hr>*/}
                    {/*<FeatureComponent></FeatureComponent>*/}
                    {/*<hr className="solid" style={{width:"100%"}}></hr>*/}
                    {/*<EngagementComponent onDataAttention={handleAttentionData} onDataArousalValence={handleArousalValencData}/>*/}
                    {/*<hr className="solid" style={{width:"100%"}}></hr>*/}
                    {/*<MoodComponent onDataRecieve={handleMoodData}/>*/}
                    {/*<hr className="solid" style={{width:"100%"}}></hr>*/}
                    {/*<EmotionBarsComponent></EmotionBarsComponent>*/}
                    {/*<hr className="solid" style={{width:"100%"}}></hr>*/}
                </div>
        </div>
    );
}

export default Simulation;
