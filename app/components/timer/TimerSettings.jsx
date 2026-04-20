"use client";

import { useState, useEffect } from "react";
import styles from "./TimerSettings.module.css";
import { useTimer } from "../../context/TimerContext";


export default function TimerSettings({ onClose, showButtons = true}) {
    const { durations, autoCycle, toMinutes, setDurations, setAutoCycle } = useTimer()

    const [tempAutoCycle, setTempAutoCycle] = useState(autoCycle);

    const [tempDurations, setTempDurations] = useState({
        focus: toMinutes(durations.focus),
        "short break": toMinutes(durations["short break"]),
        "long break": toMinutes(durations["long break"]),
    });

    const modes = [
        { id: "focus", label: "Focus" },
        { id: "short break", label: "Short Break" },
        { id: "long break", label: "Long Break" },
    ];

    const handleChange = (mode, value) => {
        const numValue = Number(value) || 1;
        setTempDurations(prev => ({
            ...prev,
            [mode]: Math.min(60, Math.max(1, isNaN(numValue) ? 1 : numValue))
        }));
    };


    const handleSave = () => {
        setDurations({
            focus: tempDurations.focus * 60,
            "short break": tempDurations["short break"] * 60,
            "long break": tempDurations["long break"] * 60,
        });
        setAutoCycle(tempAutoCycle);

        onClose?.();
    };

    const handleReset = () => {
        setTempDurations({
            focus: 25,
            "short break": 5,
            "long break": 15,
        });
        setTempAutoCycle(true);
    };


    return (
        <>
        <div className={styles.overlay} onClick={onClose}>

            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            
                <h3 className={styles.modalTitle}>
                    Timer Settings
                </h3>

                <div className={styles.modalContent}>
                    {modes.map((mode) => (
                        <div key={mode.id} className={styles.formGroup}>
                            <label className={styles.label}>
                                {mode.label}
                            </label>

                            {/* Mode select */}
                            <div className={styles.formGroup}>
                                <input
                                    type="number"
                                    min="1"
                                    max="60"
                                    value={tempDurations[mode.id]}
                                    onChange={(e) => handleChange(mode.id, e.target.value)}
                                    className={styles.input}
                                />
                                <span className={styles.unit}>minutes</span>
                            </div>
                        </div>    
                    ))}
                </div>

                {/* Auto cycle toggle */}
                <div className={styles.autoCycleContainer}>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={tempAutoCycle}
                            onChange={(e) => setTempAutoCycle(e.target.checked)}
                            className={styles.checkbox}
                        />
                        <div className={styles.checkboxContent}>
                            <p className={styles.checkboxDescription}>
                                Auto-cycle timer sessions
                            </p>
                        </div>
                    </label>
                </div>
                
                {/* ACTION BUTTONS */}
                {showButtons && (
                    <>
                        <div className={styles.buttonGroup}> 
                        {/* cancel */}
                            <button
                                className={styles.cancelButton}
                                onClick={onClose}
                                >
                                Cancel
                            </button>

                        {/* save */}
                            <button
                                className={styles.saveButton}
                                onClick={handleSave}
                                >
                                Save
                            </button>
                        </div>

                        {/* default settings */}
                        <div className={styles.defaultsContainer}>
                            <button
                                className={styles.defaultButton}
                                onClick={handleReset}
                                >
                                Use default settings
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    </>
    );
}