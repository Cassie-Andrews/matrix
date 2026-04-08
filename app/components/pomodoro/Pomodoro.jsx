"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./Pomodoro.module.css";
import { PiPlay, PiPause, PiSkipForward, PiClockClockwise, PiTimer, PiGear } from "react-icons/pi";
import Image from "next/image";
import PomodoroSettings from './settingsModal';
import timerBG from '../../../public/timer-bg.svg';

export default function Pomodoro() {
    const [activeMode, setActiveMode] = useState("pomodoro");
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [autoCycle, setAutoCycle] = useState(false);
    const [cycleCount, setCycleCount] = useState(0);
    const [durations, setDurations] = useState({
        pomodoro: 25 * 60,
        "short break": 5 * 60,
        "long break": 15 * 60,
    });

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
        let interval;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev -1);
            }, 1000);
        } 

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, timeLeft]);
    
    // handle timer end   
    useEffect(() => {
        if (timeLeft === 0 && isActive) {
            setIsActive(false);

            // timer done notification
            if (typeof window !== 'undefined' && 'Notification' in window) {
                if (Notification.permission === 'granted') {    
                    new Notification('Pomodoro Timer', {
                        body: `${activeMode.charAt(0).toUpperCase() + activeMode.slice(1)} completed!`,
                        icon: `${< PiTimer />}`
                });
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                       new Notification('Pomodoro Timer', {
                            body: `${activeMode.charAt(0).toUpperCase() + activeMode.slice(1)} completed!`,
                            icon: `${< PiTimer />}` 
                        });
                    }
                });
            }
        }
            if (autoCycle) {
                setTimeout(() => {
                    handleAutoCycle();
                }, 5000); // 5 sec delay between modes
            }
        }
    }, [timeLeft, isActive, activeMode, autoCycle, handleAutoCycle]);



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
                    src={timerBG} 
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
                    <PiGear className={styles.settingsIcon} /> Timer Settings
                </button>

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
            </div>
        </div>    
    );
};