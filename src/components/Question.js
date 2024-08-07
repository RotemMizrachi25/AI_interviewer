import Typography from "@mui/material/Typography";
import SpeechBalloon from "./SpeechBaloon";
import {Button} from "@mui/material";
import {BsSkipEndFill} from "react-icons/bs";
import React from "react";

const Question = ({question}) => {
    return(
        <>
            <Typography variant="h5" align="left" gutterBottom color="darkblue" fontWeight={"bold"}>
                Next Question:
            </Typography>
            <SpeechBalloon>{question}</SpeechBalloon>
            <Button
                style={{
                    position: 'absolute',
                    right: '20px', // Adjust as needed
                    top: '12%',
                    //transform: 'translateY(-50%)', // Center vertically
                    color:'darkblue'
                }}
            >Skip Question<BsSkipEndFill/></Button>
        </>
    )}

export default Question;
