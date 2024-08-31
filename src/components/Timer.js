import React from 'react';
import { useState, useEffect } from 'react';
import { CgSandClock } from "react-icons/cg";



const Timer = ({onTimerEnd}) => {
    const [timeLeft, setTimeLeft] = useState(180000); // Initialize with 2 minutes in milliseconds

    useEffect(() => {
        const deadline = Date.now() + 180000; // 2 minutes from now

        const interval = setInterval(() => {
            const time = deadline - Date.now();

            if (time <= 0) {
                clearInterval(interval);
                setTimeLeft(0);
                onTimerEnd(); // Invoke the callback to stop the video
            } else {
                setTimeLeft(time);
            }
        }, 1000); // Update every second

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);


    return (
        <div className="timer">
            <CgSandClock fontSize="48px"/>
            <br/>
            <span>
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
            <br/>

        </div>
    );
};

export default Timer;