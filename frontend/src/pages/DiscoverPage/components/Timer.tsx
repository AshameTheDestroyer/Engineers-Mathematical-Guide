import { Typography } from "@/components/Typography/Typography";
import React, { useState, useEffect, useRef } from "react";

interface TimerProps {
    minutes: number;
    isRunning: boolean;
    onTimeUp?: () => void;
    estimatedTIme: number;
    setEstimatedTime: () => void;
}

const Timer: React.FC<TimerProps> = ({
    minutes,
    isRunning,
    onTimeUp,
    setEstimatedTime,
    estimatedTime,
}) => {
    const totalSeconds = Math.max(0, Math.floor(minutes) * 60);
    const [timeLeft, setTimeLeft] = useState(totalSeconds);
    const timerRef = useRef<number | null>(null);

    const formatTime = (seconds: number): string => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return [
            hrs.toString().padStart(2, "0"),
            mins.toString().padStart(2, "0"),
            secs.toString().padStart(2, "0"),
        ].join(":");
    };

    useEffect(() => {
        setTimeLeft(Math.max(0, Math.floor(minutes) * 60));
        setEstimatedTime(minutes - timeLeft);
    }, [minutes]);

    useEffect(() => {
        if (!isRunning || timeLeft <= 0) {
            if (timeLeft <= 0 && onTimeUp) {
                onTimeUp();
            }
            return;
        }

        timerRef.current = window.setInterval(() => {
            setTimeLeft((prev) => {
                const next = prev - 1;
                if (next <= 0) {
                    clearInterval(timerRef.current!);
                    if (onTimeUp) onTimeUp();
                }
                return Math.max(0, next);
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isRunning, timeLeft, onTimeUp]);

    return (
        <div
            className="fixed z-50 rounded border p-4 font-mono text-2xl shadow-lg backdrop-blur-sm"
            style={{
                top: "50%",
                left: "10%",
                transform: "translate(-50%, -50%)",
            }}
        >
            <Typography variant="p">{formatTime(timeLeft)}</Typography>
        </div>
    );
};

export default Timer;
