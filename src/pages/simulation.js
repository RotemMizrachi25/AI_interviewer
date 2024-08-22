import React, {useEffect, useRef, useState} from "react";
import { useExternalScript } from "../helpers/ai-sdk/externalScriptsLoader";
import { getAiSdkControls } from "../helpers/ai-sdk/loader";
import { BsSkipEndFill } from "react-icons/bs";
import '../App.css';
import '../index.css';
import EngagementComponent from "../components/EngagementComponent";
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
import { ClipLoader } from 'react-spinners';
import {useLanguage} from "../components/LanguageContext";

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
    const [role,setRole]=useState('')
    const [selectedField,setSelectedField]=useState('')
    const [analysis, setAnalysis] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [questions, setQuestions] = useState({});
    const [questionKeys,setQuestionkeys] = useState([]);
    const { language } = useLanguage();
    const audioSources = [
        "/output1.mp3", // for index 0
        "/output2.mp3", // for index 1
        "/output3.mp3", // for index
    ];


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

    const recordApiCall = async () => {
        alert(language);
        const response = await fetch(`http://localhost:5000/record`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({language: language, question: questions[questionKeys[currentQuestionIndex]], field:selectedField})
        });
        //console.log(response);
        const response_json = await response.json();
        setAnalysis(response_json);
        //console.log(response_json.results);
    };

      const submitApiCaller = async (interviewerId,selectedfield,role) => {
        const response = await fetch(`http://localhost:5000/submit`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({interviewerId: interviewerId, field: selectedfield, role : role})
        });

        const response_json = await response.json();
        console.log(response_json);
        setQuestions(response_json);
        // setIsLoading(false);
        // setQuestion(true);
    };

      useEffect(() => {
    // This effect will run when `questions` state changes
        if (questions && Object.keys(questions).length > 0) {
            // Now, proceed with the next steps
            setIsLoading(false);
            setQuestion(true);
        }
      }, [questions])


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
        console.log(affects);
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
        // calling record function from API
        // if(showVideo){
        //     alert("in handle clickkkkkk");
        //     recordApiCall();
        // }
    }

    const handleSubmit = () => {
        setVideo(!showVideo);
        fetch('http://localhost:5000/stop-recording', {
        method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            console.log("Recording stopped:", data);
            // Handle the response from stopping the recording, if necessary
        })
        .catch(error => {
            console.error("Error stopping recording:", error);
        });

    }

    // Function to stop the video after timer is zero
    const stopVideo = () => {
        setVideo(false);
        //call to evaluate answer function
    };


    // Function to hide the cards after choosing an interviewer
    const hideCards = ({interviewerId,selectedField,role}) => {
        setCards(false);
        setInterviewerId(interviewerId);
        setRole(role);
        setSelectedField(selectedField)
        alert(interviewerId);
        alert(role);
        alert(selectedField);
        //generate the interview questions
        setIsLoading(true);
    //     setTimeout(() => {
    //     // After 15 seconds, stop loading and show the question
    //         setIsLoading(false);
    //         setQuestion(true);
    // }, 30000); // 15,000 milliseconds = 15 seconds
    };

    useEffect(() => {
        if (interviewerId != null) {
            submitApiCaller(interviewerId,selectedField,role);
        }
    }, [interviewerId])


    useEffect(() => {

        if (showVideo) {
            recordApiCall();
            //setAnalysis(content)
        }
    }, [showVideo]);

     useEffect(() => {
        if (questions) {
            const Keys = ['question 1', 'question 2','question 3','question 4','question 5','question 6','question 7','question 8','question 9','question 10','question 11','question 12','question 13','question 14','question 15']
            //const questionKeys = setQuestionkeys(Object.keys(questions)); // Extract keys from the dictionary
            setQuestionkeys(Keys)
            console.log(questionKeys);
        }
    }, [questions]);


    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        console.log(currentQuestionIndex)
    };

    // const audioRef = useRef(null);

    // Play the audio when the component is rendered or when the question changes
    // useEffect(() => {
    //     console.log("hi")
    //     alert("hi")
    //     if (audioSources[currentQuestionIndex]) {
    //         console.log("hi")
    //         audioRef.current.src = audioSources[currentQuestionIndex]; // Set the new audio source
    //         audioRef.current.load(); // Load the new audio source
    //         audioRef.current.play()
    //             .then(() => {
    //                 console.log('Audio is playing');
    //             })
    //             .catch((error) => {
    //                 console.log('Error playing audio:', error);
    //             });
    //     }
    // }, [audioRef]);


    return (
        <div style={{backgroundColor:"#b7cbf5", minHeight: "100vh"}}>
            <div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>

                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    {showCards && <InterviewerCards func={hideCards}/>}
                </div>
                <div>
                   {isLoading && (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                        flexDirection: 'column'
                    }}>
                        <ClipLoader size={50} color={"#123abc"} loading={isLoading} />
                        <p>Loading... Please wait</p>
                    </div>)}
                    </div>
                <div>


                            {showQuestion &&
                                <Question question={questions[questionKeys[currentQuestionIndex]]} showCards={showCards}
                                          showVideo={showVideo} handleClickButton={handleClickButton} handleSubmit={handleSubmit}
                                          interviewId={interviewerId} answer={analysis}
                                          handleNextQuestion={handleNextQuestion} currentQuestionIndex={currentQuestionIndex}/>


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

                    {!showCards && showVideo && <VideoComponent showVideo={showVideo} aiSdkState={aiSdkState}
                                                                                      mphToolsState={mphToolsState}
                                                                                      onTimerEnd={stopVideo}/>
                }
                {showVideo && <EngagementComponent onDataAttention={handleAttentionData} onDataArousalValence={handleArousalValencData}/>}
                <hr className="solid" style={{width:"100%"}}></hr>
                {showVideo && <MoodComponent handleMoodData={handleMoodData}/>}
                <hr className="solid" style={{width:"100%"}}></hr>
                {showVideo && <EmotionBarsComponent></EmotionBarsComponent>}
                <hr className="solid" style={{width:"100%"}}></hr>
            </div>
        </div>
);
}

export default Simulation;
