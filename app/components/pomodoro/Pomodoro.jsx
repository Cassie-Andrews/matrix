"use client";

import { useState, useEffect } from "react";
import styles from "./Pomodoro.module.css";
import { PiPlay, PiPause, PiSkipForward, PiClockClockwise, PiTimer, PiGear } from "react-icons/pi";
import Image from "next/image";
import PomodoroSettings from './PomSettings'

export default function Pomodoro() {
    const [activeMode, setActiveMode] = useState("pomodoro");
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [durations, setDurations] = useState({
        pomodoro: 25 * 60,
        "short break": 5 * 60,
        "long break": 15 * 60,
    });

    const modes = ["pomodoro", "short break", "long break"];

    // countdown
    useEffect(() => {
        let interval;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setIsActive(false);
                        // notification
                        if (typeof window !== 'undefined' && 'Notification' in window && Notification.   permission === 'granted') {
                            new Notification('Pomodoro Timer', {
                                body: `${activeMode} completed!`,
                                icon: { PiTimer }
                            });
                        }
                        return 0;
                    };
                    return prev -1;
                });
            }, 1000);
        } 
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, timeLeft, activeMode]);


    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const switchMode = (mode) => {
        setActiveMode(mode);
        setTimeLeft(durations[mode]);
        setIsActive(false);
    };

    const handleReset = () => {
        setIsActive(false);
        setTimeLeft(durations[activeMode]);
    };

    const handleSkip = () => {
        const currentIndex = modes.indexOf(activeMode);
        const nextIndex = (currentIndex + 1) % modes.length;
        switchMode(modes[nextIndex]);
    };

    // progress percentage
    const progress = ((durations[activeMode] - timeLeft) / durations[activeMode]) * 100;


    return (
        <div className={styles.timerContainer}>
            {/* MODES */}
            <div className={styles.selectMode}>
                {modes.map((mode) => (
                    <button
                        key={mode}
                        className={`${styles.modeButton} ${activeMode === mode ? styles.active : ""
                        }`}
                        onClick={() => switchMode(mode)}
                        disabled={isActive}
                    >
                        {mode.charAt(0).toUpperCase() + mode.slice(1)}    
                    </button>
                ))}
            </div>
            
            {/* DISPLAY */}
            <div className={styles.animationContainer}>
                {/* COUNTDOWN */}
                <h1 className={styles.countdown}>{formatTime(timeLeft)}</h1>
                {/* RING BG */}
                <Image 
                    className={styles.animationBase} 
                    src="timer-bg.svg" 
                    alt='timer' 
                    width={298} 
                    height={298}
                />
                {/* PROGRESS RING */}
                <svg className={styles.progressRing} width={298} height={298}>
                    <circle
                        className={styles.progressRingCircle}
                        stroke="currentColor"
                        strokeWidth="25"
                        fill="transparent"
                        r="131"
                        cx="152"
                        cy="147"
                        style={{
                            strokeDasharray: `${2 * Math.PI * 131}`,
                            strokeDashoffset: `${2 * Math.PI * 131 * (1 - progress / 100)}`,
                        }}
                    />
                </svg>
            </div>
            <div className={styles.buttonGroup}>
                {/* CONTROLS */}
                <div className={styles.controlsGroup}>

                    {/* RESET */}
                    <button className={styles.actionButton} onClick={handleReset}><PiClockClockwise /></button>

                    {/* PAUSE/START */}
                    <button className={styles.actionButton} onClick={() => setIsActive(!isActive)}> 
                        {isActive ? <PiPause /> : <PiPlay />} 
                    </button>

                    {/* SKIP */}
                    <button className={styles.actionButton} onClick={handleSkip}><PiSkipForward /></button>
                </div>

                {/* SETTINGS - button */}
                <button
                    className={styles.settingsButton}
                    onClick={() => setShowSettings(true)}
                    disabled={isActive}
                >
                    <PiGear className={styles.icon} /> Timer Settings
                </button>

                {/* SETTINGS - modal */}
                {showSettings && (
                <PomodoroSettings 
                    durations={durations}
                    setDurations={setDurations}
                    activeMode={activeMode}
                    setTimeLeft={setTimeLeft}
                    onClose={() => setShowSettings(false)}
                />
                )}
            </div>
        </div>    
    );
}