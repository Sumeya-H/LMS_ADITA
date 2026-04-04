import React, { useEffect, useState } from "react";

const QuizTimer = ({ timestart, timelimit }: { timestart: number; timelimit: number }) => {
    // Calculate the total time left for the quiz attempt
    const [timeLeft, setTimeLeft] = useState(timelimit - (Math.floor(Date.now() / 1000) - timestart));

    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
            const elapsedTime = currentTime - timestart; // Calculate elapsed time since quiz started
            const remainingTime = timelimit - elapsedTime; // Calculate time remaining

            if (remainingTime <= 0) {
                clearInterval(intervalId); // Stop the timer when it reaches zero
                setTimeLeft(0); // Make sure it doesn't show negative time
            } else {
                setTimeLeft(remainingTime); // Update remaining time
            }
        }, 1000);

        return () => clearInterval(intervalId); // Cleanup the interval on component unmount
    }, [timestart, timelimit]);

    // Format time as MM:SS
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
    };

    return (
        <div className="rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-primary mb-2">Time Remaining</h2>
            {timeLeft > 0 ? (
                <p className="text-2xl font-bold text-primary">{formatTime(timeLeft)}</p>
            ) : (
                <p className="text-lg font-medium text-destructive">Quiz is over!</p>
            )}
        </div>
    );
};

export default QuizTimer;
