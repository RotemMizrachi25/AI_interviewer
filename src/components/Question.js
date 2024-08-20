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

const Question = ({question, showCards, showVideo, handleClickButton, interviewId, answer}) => {
    let open_mouth_image, closed_mouth_img;
    const { t } = useTranslation();

    if(interviewId === 0){
        open_mouth_image = "assets_images/tought_c.png";
        closed_mouth_img = "assets_images/tought_o.png";
    }
    else if(interviewId === 1){
        open_mouth_image = "assets_images/psy_o.png";
        closed_mouth_img = "assets_images/psy_c.png";
    }
    else if(interviewId === 2){
        open_mouth_image = "assets_images/nerd_c.png";
        closed_mouth_img = "assets_images/nerd_o.png";
    }
    else{
        open_mouth_image = "assets_images/friendly_c.png";
        closed_mouth_img = "assets_images/friendly_o.png";
    }

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const audioRef = useRef(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const audioSources = [
        "/output1.mp3", // for index 0
        "/output2.mp3", // for index 1
        "/output3.mp3", // for index
    ];

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

    useEffect(() => {
        if (audioSources[currentQuestionIndex]) {
            console.log("hi")
            audioRef.current.src = audioSources[currentQuestionIndex]; // Set the new audio source
            audioRef.current.load(); // Load the new audio source
            audioRef.current.play()
                .then(() => {
                    console.log('Audio is playing');
                })
                .catch((error) => {
                    console.log('Error playing audio:', error);
                });
        }
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
                    <RoundButton onClick={handleClickButton}> Submit Answer</RoundButton>
                ) : (
                    <RoundButton onClick={handleClickButton}> Ready to Answer</RoundButton>
                ))}

            {!answer.isEmpty && <Analysis answer={answer}/>}


            <div>
                <audio ref={audioRef}/>
            </div>

            <Button
                style={{
                    position: 'absolute',
                    right: '20px', // Adjust as needed
                    top: '12%',
                    //transform: 'translateY(-50%)', // Center vertically
                    color:'darkblue'
                }}
            >{t('skip_button')}<BsSkipEndFill/></Button>
        </Box>
    )}

export default Question;
