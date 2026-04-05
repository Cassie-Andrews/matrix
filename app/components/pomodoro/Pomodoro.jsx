"use client";

import { useState, useEffect } from "react";
import styles from "./Pomodoro.module.css";
import Image from "next/image";

export default function Pomodoro() {
    const [activeMode, setActiveMode] = useState("pomodoro");
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [durations, setDurations] = useState({
        pomodoro: 25 * 60,
        "short break": 5 * 60,
        "long break": 15 * 60,
    });

    const modes = ["pomodoro", "short break", "long break"];


    useEffect(() => {
        let interval;

        if (isActive) {
            interval = setInterval(() => {
                setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive]);

    useEffect (() => {
        if (timeLeft === 0) {
            setTimeout(() => {
                switchMode();
            }, 1000);
        }
    }, [timeLeft]);



    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };
    

    return (
        <div className={styles.timerContainer}>
            <h1 className={styles.countdown}></h1>
            <div className={styles.animationContainer}>
                <Image className={styles.animationBase} src="timer-bg.svg" alt='timer' width={298} height={298}>
                </Image>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.actionButton} onClick={() => setIsActive(!isActive)}>
                    {isActive ? 'Pause' : 'Start'}
                </button>
            </div>
        </div>
    )

}

