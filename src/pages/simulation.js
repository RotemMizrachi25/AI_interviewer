import React, {useEffect, useState} from "react";
import '../App.css';
import '../index.css';
import EngagementComponent from "../components/EngagementComponent";
import MoodComponent from "../components/MoodComponent";
import InterviewerCards from "../components/Cards";
import Question from "../components/Question";
import {useLanguage} from "../components/LanguageContext";
import Loader from "../components/Loader";


function Simulation() {
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
    const [valenceres, setValenceres] = useState("");
    const [attentionres, setAttentionres] = useState("");
    const [arousalres, setArousalres] = useState("");
    const [showAnalysis, setShowAnalysis] = useState(false);
    const [isReadyAnalysis, setReadyAnalysis] = useState(false);
    const { language } = useLanguage();


    const moodApiCaller = async () => {
        const response = await fetch(`http://localhost:5000/affects`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({affects: affects})
        });
        const response_json = await response.json();

        console.log(response_json.results);
    };

    const recordApiCall = async () => {
        const response = await fetch(`http://localhost:5000/record`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({language: language, question: questions[questionKeys[currentQuestionIndex]], field:selectedField})
        });
        const response_json = await response.json();
        setAnalysis(response_json);
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
    };

      useEffect(() => {
    // This effect will run when `questions` state changes
        if (questions && Object.keys(questions).length > 0) {
            // Now, proceed with the next steps
            setIsLoading(false);
            setQuestion(true);
        }
      }, [questions])


    const valenceApiCaller = async (fieldName, field) => {
        const response = await fetch(`http://localhost:5000/${fieldName}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({[fieldName]: field})
        });

        const response_json = await response.json();
        console.log("valence:" , response_json['pleasantness_level']);
        setValenceres(response_json['pleasantness_level']);
    };

      const attentionApiCaller = async (fieldName, field) => {
        const response = await fetch(`http://localhost:5000/${fieldName}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({[fieldName]: field})
        });

        const response_json = await response.json();
        console.log(response_json['percentage_attention']);
        setAttentionres(response_json['percentage_attention']);
          setReadyAnalysis(true);
    };

      const arousalApiCaller = async (fieldName, field) => {
        const response = await fetch(`http://localhost:5000/${fieldName}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({[fieldName]: field})
        });

        const response_json = await response.json();
        console.log("arousal", response_json['overall_arousal']);
        setArousalres(response_json['overall_arousal']);

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
        if(affects.length > 120 && !showVideo){
            console.log("Type MoodData:", typeof moodData);
            moodApiCaller();
            setAffects([]);
        }
    }, [showVideo, affects]);

    useEffect(() => {
        console.log("EngageData from comp: ", arousal, valence, attention);
        if(arousal.length > 120 && !showVideo){
            arousalApiCaller("arousal", arousal);
            setArousal([]);
        }
        if(valence.length > 120 && !showVideo){
            valenceApiCaller("valence", valence);
            setValence([]);
        }
        if(attention.length > 120 && !showVideo){
            attentionApiCaller("attention", attention);
            setAttention([]);
        }
    }, [showVideo, arousal, valence, attention]);



    const handleClickButton = () => {
        setVideo(!showVideo);
    }

    const handleSubmit = () => {
        setVideo(!showVideo);
        console.log("simulation - show video",showVideo);
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
        //show analysis
        setShowAnalysis(true);

    }


    // Function to stop the video after timer is zero
    const stopVideo = () => {
        setVideo(false);
    };


    // Function to hide the cards after choosing an interviewer
    const hideCards = ({interviewerId,selectedField,role}) => {
        setCards(false);
        setInterviewerId(interviewerId);
        setRole(role);
        setSelectedField(selectedField)
        //generate the interview questions
        setIsLoading(true);
    };

    useEffect(() => {
        if (interviewerId != null) {
            submitApiCaller(interviewerId,selectedField,role);
        }
    }, [interviewerId])


    useEffect(() => {

        if (showVideo) {
            recordApiCall();
        }
    }, [showVideo]);

     useEffect(() => {
        if (questions) {
            const Keys = ['question1', 'question2','question3','question4','question5','question6','question7','question8','question9','question10','question11','question12','question13','question14','question15']
            setQuestionkeys(Keys)
            console.log(questionKeys);
        }
    }, [questions]);


    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        console.log(currentQuestionIndex)
        // hide the analysis
        setShowAnalysis(false);
        setReadyAnalysis(false);
    };



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
                    {isLoading && <Loader isLoading={isLoading}/>}
                </div>
                <div>


                            {showQuestion &&
                                <Question question={questions[questionKeys[currentQuestionIndex]]} showCards={showCards}
                                          showVideo={showVideo} setVideo={setVideo} handleClickButton={handleClickButton} handleSubmit={handleSubmit}
                                          interviewId={interviewerId} answer={analysis}
                                          handleNextQuestion={handleNextQuestion} currentQuestionIndex={currentQuestionIndex}
                                          showAnalysis={showAnalysis} attention={attentionres} engagement={arousalres} pleasantness={valenceres}
                                          isReadyAnalysis={isReadyAnalysis}
                                          />


                            }
                        </div>
                        <br/>
                {<EngagementComponent onDataAttention={handleAttentionData} onDataArousalValence={handleArousalValencData} showVideo={showVideo}/>}
                {<MoodComponent handleMoodData={handleMoodData} showVideo={showVideo}/>}

            </div>
        </div>
);
}

export default Simulation;
