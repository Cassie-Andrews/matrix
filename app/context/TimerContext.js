"use client";

import { createContext, useContext, useState } from "react";

const TimerContext = createContext();

const toMinutes = (seconds) => Math.round(seconds / 60);
const toSeconds = (minutes) => minutes * 60;

export const TimerProvider = ({ children }) => {
    const [ showTimer, setShowTimer ] = useState(false)

    const [durations, setDurations] = useState({
        focus: 25 * 60,
        "short break": 5 * 60,
        "long break": 15 * 60,
    });

    const [autoCycle, setAutoCycle] = useState(false);

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
            }}>
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