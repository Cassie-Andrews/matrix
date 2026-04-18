"use client";

import { createContext, useContext, useState } from "react";

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
    const [durations, setDurations] = useState({
        focus: 25 * 60,
        "short break": 5 * 60,
        "long break": 15 * 60,
    });
    const [autoCycle, setAutoCycle] = useState(false);

    return (
        <TimerContext.Provider 
            value={{ 
                durations, 
                setDurations, 
                autoCycle, 
                setAutoCycle 
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