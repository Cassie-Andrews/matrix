"use client";

import { createContext, use, useContext, useState } from "react";

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

export function useTimerSettings() {
    return useContext(TimerContext);
}