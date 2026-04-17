"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./PomodoroWidget.module.css";
import { PiPlay, PiPause, PiSkipForward, PiClockClockwise, PiTimer, PiGear, PiCaretUp, PiCaretDown } from "react-icons/pi";
import PomodoroSettings from './PomodoroSettings';

export default function Pomodoro({ isOpen, onClose }) {
    const [activeMode, setActiveMode] = useState("pomodoro");
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [autoCycle, setAutoCycle] = useState(false);
    const [cycleCount, setCycleCount] = useState(0);
    const [isMinimized, setIsMinimized] = useState(false);
    const [durations, setDurations] = useState({
        pomodoro: 25 * 60,
        "short break": 5 * 60,
        "long break": 15 * 60,
    });

    const modeColors = {
        pomodoro: 'var(--accent)',
        "short break": 'var(--secondary)',
        "long break": 'var(--primary)',
    };

    const modes = ["pomodoro", "short break", "long break"];

// switch modes 
    const switchMode = useCallback((mode, autoStart = false) => {
        setActiveMode(mode);
        setTimeLeft(durations[mode]);
        setIsActive(autoStart);
    }, [durations]);

// auto-cycle modes
    const handleAutoCycle = useCallback(() => {
        if (activeMode === 'pomodoro') {
            const newCycleCount = cycleCount + 1;
            setCycleCount(newCycleCount);

            // every 4 pomodoros = long break
            if (newCycleCount % 4 === 0) {
                switchMode("long break", true);
            } else {
                // otherwise, short break
                switchMode("short break", true);
            }
        } else {
            // after any break, go to pomodoro
            switchMode("pomodoro", true);
        }
    }, [activeMode, cycleCount, switchMode]);

    // timer countdown
    useEffect(() => {
        if (!isActive) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <=1) { 
                    setIsActive(false); // stop timer

                    // notify
                    if (
                        typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted'
                    ) {
                        new Notification('Pomodoro Timer', {
                            body: `${activeMode.charAt(0).toUpperCase() + activeMode.slice(1)} completed!`,
                        });
                    }
                    return 0;
                }

                return prev -1;
            });
        }, 1000); 
        return () => clearInterval(interval);
    }, [isActive, activeMode]);
    

    useEffect(() => {
        if (!autoCycle || timeLeft !== 0) return;
        
        const timeout = setTimeout(() => {
                handleAutoCycle();
            }, 5000); // 5 sec delay between modes

            return () => clearTimeout(timeout);
        }, [autoCycle, timeLeft, handleAutoCycle]);    


    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    // reset timer
    const handleReset = () => {
        setIsActive(false);
        setTimeLeft(durations[activeMode]);
    };

    // skip to next mode
    const handleSkip = () => {
        if (autoCycle) {
            handleAutoCycle();
        } else {
            const currentIndex = modes.indexOf(activeMode);
            const nextIndex = (currentIndex + 1) % modes.length;
            switchMode(modes[nextIndex]);
        }
    };

    // progress percentage
    const progress = ((durations[activeMode] - timeLeft) / durations[activeMode]) * 100;

    // current color
    const currentColor = modeColors[activeMode];

    if (!isOpen) return null;

    return (
        <>
        <div className={`${styles.timerContainer} ${styles.isMinimized ? styles.minimized : ''}`}>
            {/* HEADER */}
            <div className={styles.timerHeader}>
                <h2 className={styles.timerTitle}>Pomodoro Timer</h2>
                <button
                    className={styles.headerButton}
                    onClick={() => setIsMinimized(!isMinimized)}
                    title={isMinimized ? "Open" : "Minimize"}
                >
                    {isMinimized ? <PiCaretUp /> : <PiCaretDown />}
                </button>
            </div>

            {/* CONTENT */}
            {!isMinimized && (
                <div className={styles.content}>
                    {/* Modes */}
                    <div className={styles.selectMode}>
                        {modes.map((mode) => (
                            <button
                                title={mode}
                                key={mode}
                                className={`${styles.modeButton} ${activeMode === mode ? styles.active : ""
                                }`}
                                onClick={() => switchMode(mode)}
                                disabled={isActive}
                                style={
                                    activeMode === mode
                                        ? {
                                            backgroundColor: modeColors[mode],
                                            borderColor: modeColors[mode],
                                            color: 'white'
                                        }
                                    : {}
                                }
                            >
                                {mode === 'pomodoro' ? 'Focus' : mode === 'short break' ? 'Short Break' : 'Long Break' }
                                {/*{mode.charAt(0).toUpperCase() + mode.slice(1)}*/} 
                            </button>
                        ))}
                    </div>
                
                    {/* Timer Display */}
                    <div className={styles.animationContainer}>
                        {/* COUNTDOWN */}
                        <h1 
                            className={styles.countdown}
                            style={{color: currentColor}}
                        >
                                {formatTime(timeLeft)}
                        </h1>
                        
                        {/* progress ring bg */}
                        <svg className={styles.animationBase} width={298} height={298}>
                            <circle
                                className={styles.animationBase}
                                stroke={currentColor}
                                strokeWidth="25"
                                strokeOpacity="50%"
                                fill="white"
                                r="131"
                                cx="50%"
                                cy="50%"
                            />
                        </svg>

                        {/* progress ring */}
                        <svg className={styles.progressRing} width={298} height={298}>
                            <circle
                                className={styles.progressRingCircle}
                                stroke={currentColor}
                                strokeWidth="25"
                                fill="transparent"
                                r="131"
                                cx="50%"
                                cy="50%"
                                style={{
                                    strokeDasharray: `${2 * Math.PI * 131}`,
                                    strokeDashoffset: `${2 * Math.PI * 131 * (1 - progress / 100)}`,
                                }}
                            />
                        </svg>
                    </div>

                    {/* timer controls */}
                    <div className={styles.buttonGroup}>
                        <div className={styles.controlButtons}>

                            {/* reset */}
                            <button 
                                className={styles.actionButton} onClick={handleReset}
                                title="Reset timer"
                            >
                                <PiClockClockwise />
                            </button>

                            {/* PAUSE/START */}
                            <button 
                                className={styles.actionButton} onClick={() => setIsActive(!isActive)}
                            > 
                                {isActive ? <PiPause title="Pause"/> : <PiPlay title="Play"/>} 
                            </button>

                            {/* SKIP */}
                            <button 
                                className={styles.actionButton}
                                onClick={handleSkip}
                                title="Next timer mode"
                            >
                                <PiSkipForward />
                            </button>
                        </div>

                        {/* SETTINGS - button */}
                        <button
                            className={styles.settingsButton}
                            title="Timer settings"
                            onClick={() => {
                                if (typeof window !== 'undefined' && 'Notification' in window) {
                                    if (Notification.permission === 'default') {
                                        Notification.requestPermission();
                                    }
                                }
                                setShowSettings(true);
                            }}
                            disabled={isActive}
                        >
                            <PiGear className={styles.settingsIcon}/> Timer Settings
                        </button>
                </div>
            </div>     
        )}

        {/* MINIMIZED view */}
        {isMinimized && (
            <div className={styles.minimizedContent}>
                <span 
                    className={styles.minimizedTime}
                    style={{color: currentColor}}
                >{formatTime(timeLeft)}
                </span>
                <button
                    className={styles.minimizedControlButton}
                    onClick={() => setIsActive(!isActive)}
                    style={{backgroundColor: currentColor}}
                >
                    {isActive ? <PiPause /> : <PiPlay />}
                </button>
            </div>
        )}
    </div>
    {/* SETTINGS - modal */}
    {showSettings && (
        <PomodoroSettings 
            durations={durations}
            setDurations={setDurations}
            activeMode={activeMode}
            setTimeLeft={setTimeLeft}
            autoCycle={autoCycle}
            setAutoCycle={setAutoCycle}
            onClose={() => setShowSettings(false)}
        />
    )}
    </>  
    );
};