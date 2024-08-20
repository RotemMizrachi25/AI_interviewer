import React, { useState, useEffect } from 'react';
import "../App.css"

const SpeakingCharacter = ({ openMouthImage, closedMouthImage, animationSpeed,isSpeaking }) => {
    const [isMouthOpen, setIsMouthOpen] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsMouthOpen(prev => !prev);
        }, animationSpeed);

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
    }, [animationSpeed]);

    return (
        <div className={"character-container"} style={{ width: "100%", position: "relative" }}>
            <img
                src={isMouthOpen && isSpeaking ? openMouthImage : closedMouthImage}
                alt="Speaking Character"
                className={"character-animation"}
            />
        </div>
    );
};

export default SpeakingCharacter;
