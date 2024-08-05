import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const SpeechBalloon = styled(Box)(({ theme }) => ({
    marginBottom: '20px',
    position: 'relative',
    backgroundColor: 'darkblue', // Set the balloon background color to blue
    borderRadius: '20px', // Increased rounded corners for the balloon
    padding: '10px 20px', // Padding around the text
    color: 'white', // Set text color to white for better contrast
    boxShadow: theme.shadows[3], // More pronounced shadow
    '&:after': {
        content: '""',
        position: 'absolute',
        bottom: '-20%', // Positioning it at the bottom of the balloon
        left: '85%', // Adjust this to move the tail left or right
        borderWidth: '10px 10px 0 10px', // Creates a downward-pointing triangle
        borderStyle: 'solid',
        borderColor: 'darkblue transparent transparent transparent',// The top border is blue, others are transparent }
    }
    }));



export default SpeechBalloon;
