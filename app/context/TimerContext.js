"use client";

import { createContext, useContext, useState, useEffect } from "react";

const TimerContext = createContext();

const toMinutes = (seconds) => Math.round(seconds / 60);
const toSeconds = (minutes) => minutes * 60;

const getInitialSettings = () => {
    try {
        if (typeof winow === "undefined") return null;
    
        const saved = localStorage.getItem("timerSettings");
        if (!saved) return;
    
        return JSON.parse(saved);
    } catch (err) {
        console.error('Failed to load timer settings:', err)
        return null;
    }
}

export const TimerProvider = ({ children }) => {
    const [ showTimer, setShowTimer ] = useState(false)
    
    const savedSettings = getInitialSettings();

    const [durations, setDurations] = useState(
        savedSettings?.durations || {
            focus: 25 * 60,
            "short break": 5 * 60,
            "long break": 15 * 60,
        }
    );

    const [autoCycle, setAutoCycle] = useState(
        typeof savedSettings?.autoCycle === "boolean"
        ? savedSettings.autoCycle
        : false
    );

    useEffect(() => {
        try {
            localStorage.setItem(
                "timerSettings",
                JSON.stringify({ durations, autoCycle })
            );
        } catch (err) {
            console.error("Error saving timer settings", err);
        } 
    }, [durations, autoCycle]);

    return (
        <TimerContext.Provider 
            value={{ 
                showTimer,
                setShowTimer,
                durations, 
                setDurations, 
                autoCycle, 
                setAutoCycle,
                toMinutes,
                toSeconds
            }}
        >
            {children}
        </TimerContext.Provider>
    );
}

export function useTimer() {
    const context = useContext(TimerContext);
    if (!context) {
        throw new Error("useTimer must be used within a TimerProvider");
    }
    return context;
}