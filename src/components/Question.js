import Typography from "@mui/material/Typography";
import SpeechBalloon from "./SpeechBaloon";
import {Button} from "@mui/material";
import {BsSkipEndFill} from "react-icons/bs";
import React from "react";
import SpeakingCharacter from "./SpeakingCharacter";
import RoundButton from "./RoundButton";
import Box from '@mui/material/Box';

const Question = ({question, showCards, showVideo, handleClickButton, interviewId}) => {
    let open_mouth_image, closed_mouth_img;
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
            <Typography variant="h3" align="left" gutterBottom color="darkblue" fontWeight={900} fontFamily={'Nunito'}>
                Next Question:
            </Typography>
            <SpeechBalloon>{question}</SpeechBalloon>
            <SpeakingCharacter
                openMouthImage={open_mouth_image}
                closedMouthImage={closed_mouth_img}
                animationSpeed={300}/>
            {!showCards && (
                showVideo ? (
                    <RoundButton onClick={handleClickButton}> Submit Answer</RoundButton>
                ) : (
                    <RoundButton onClick={handleClickButton}> Ready to Answer</RoundButton>
                ))}
            <Button
                style={{
                    position: 'absolute',
                    right: '20px', // Adjust as needed
                    top: '12%',
                    //transform: 'translateY(-50%)', // Center vertically
                    color:'darkblue'
                }}
            >Skip Question<BsSkipEndFill/></Button>
        </Box>
    )}

export default Question;
