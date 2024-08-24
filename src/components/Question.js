import Typography from "@mui/material/Typography";
import SpeechBalloon from "./SpeechBaloon";
import {Button} from "@mui/material";
import {BsSkipEndFill} from "react-icons/bs";
import React, {useEffect, useRef, useState} from "react";
import SpeakingCharacter from "./SpeakingCharacter";
import RoundButton from "./RoundButton";
import Box from '@mui/material/Box';
import {useTranslation} from "react-i18next";
import Analysis from "./Analysis";
import MoodComponent from "./MoodComponent";
import FeelingsAnalysis from "./FeelingsAnalysis";

const Question = ({question, showCards, showVideo, handleClickButton, handleSubmit, interviewId, answer, handleNextQuestion, currentQuestionIndex, showAnalysis}) => {
    let open_mouth_image, closed_mouth_img;
    const { t } = useTranslation();
    const audioRef = useRef(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const audioUrl = `http://localhost:5000/media/output${currentQuestionIndex+1}.mp3`;

    if(interviewId === 0){
        open_mouth_image = "assets_images/tought_o.png";
        closed_mouth_img = "assets_images/tought_c.png";
    }
    else if(interviewId === 1){
        open_mouth_image = "assets_images/psy_o.png";
        closed_mouth_img = "assets_images/psy_c.png";
    }
    else if(interviewId === 2){
        open_mouth_image = "assets_images/nerd_o.png";
        closed_mouth_img = "assets_images/nerd_c.png";
    }
    else{
        open_mouth_image = "assets_images/friendly_o.png";
        closed_mouth_img = "assets_images/friendly_c.png";
    }

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.play().catch(error => {
                console.error("Error playing audio:", error);
            });
        }
    }, [audioUrl]);


    useEffect(() => {
        const audio = audioRef.current;

        const handlePlay = () => {
            setIsSpeaking(true); // Start animation when audio starts playing
        };

        const handleEnded = () => {
            setIsSpeaking(false); // Stop animation when audio ends
        };

        if (audio) {
            audio.addEventListener('play', handlePlay);
            audio.addEventListener('ended', handleEnded);
        }

        return () => {
            if (audio) {
                audio.removeEventListener('play', handlePlay);
                audio.removeEventListener('ended', handleEnded);
            }
        };
    }, []);


    return(
        <Box
             p={2}
             sx={{
                 m: 5,
                 border: '2px solid grey',
                 display: 'flex',
                 flexDirection: 'column',
                 alignItems: 'center',
                 gap: 2  // Adds consistent spacing between each child component
             }}>
            <Typography variant="h3" align="left" gutterBottom color="darkblue" fontWeight={900}>
                {t("simulation_title")}
            </Typography>
            <SpeechBalloon>{question}</SpeechBalloon>
            <SpeakingCharacter
                openMouthImage={open_mouth_image}
                closedMouthImage={closed_mouth_img}
                animationSpeed={300}
                isSpeaking={isSpeaking}/>
            {!showCards && (
                showVideo ? (
                    <>
                        <RoundButton onClick={handleSubmit}> Submit Answer</RoundButton>
                    </>

                ) : (
                    <RoundButton onClick={handleClickButton}> Ready to Answer</RoundButton>
                ))}

            {showAnalysis && <Analysis answer={answer} handleNextQuestion={handleNextQuestion} currentQuestionIndex={currentQuestionIndex}
            attention={attention} engagement={engagement} pleasantness={pleasantness}/>}


            <div>
                <audio ref={audioRef} src={audioUrl}/>
            </div>

            <Button
                style={{
                    position: 'absolute',
                    right: '20px', // Adjust as needed
                    top: '12%',
                    //transform: 'translateY(-50%)', // Center vertically
                    color:'darkblue'
                }}
                onClick={handleNextQuestion}
            >{t('skip_button')}<BsSkipEndFill/></Button>
            <br/>
            <br/>
        </Box>

    )};

export default Question;
