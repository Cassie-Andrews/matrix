"use client";

import { useState } from "react";
import styles from "./PomodoroSettings.module.css";
import Link from "next/link";

export default function PomodoroSettings({ 
    durations, 
    setDurations, 
    activeMode, 
    setTimeLeft, 
    autoCycle,
    setAutoCycle,
    onClose 
}) {
    const [tempDurations, setTempDurations] = useState({
        pomodoro: durations.pomodoro / 60,
        "short break": durations["short break"] / 60,
        "long break": durations["long break"] / 60,
    });

    const [tempAutoCycle, setTempAutoCycle] = useState(autoCycle);

    const modes = [
        { id: "pomodoro", label: "Pomodoro" },
        { id: "short break", label: "Short Break" },
        { id: "long break", label: "Long Break" },
    ];

    const handleChange = (mode, value) => {
        const numValue = parseInt(value) || 1;
        setTempDurations(prev => ({
            ...prev,
            [mode]: Math.min(60, Math.max(1, numValue))
        }));
    };

    const handleSave = () => {
        const newDurations = {
            pomodoro: tempDurations.pomodoro * 60,
            "short break": tempDurations["short break"] * 60,
            "long break": tempDurations["long break"] * 60,
        };

        setDurations(newDurations);
        setAutoCycle(tempAutoCycle);
        // update current timer
        setTimeLeft(newDurations[activeMode]);

        onClose();
    };

    const handleReset = () => {
        setTempDurations({
            pomodoro: 25,
            "short break": 5,
            "long break": 15,
        });
        setTempAutoCycle(false);
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.modalTitle}>Settings</h2>

                <div className={styles.instructions}>
                    <p>Select your preferred time for each mode in minutes.</p>
                </div>

                <div className={styles.settingsContent}>
                    {modes.map((mode) => (
                        <div key={mode.id} className={styles.settingsItem}>
                            <label className={styles.label}>
                                {mode.label}
                            </label>

                            <div className={styles.inputGroup}>
                                <input
                                    type="number"
                                    min="1"
                                    max="60"
                                    value={tempDurations[mode.id]}
                                    onChange={(e) => handleChange(mode.id, e.target.value)}
                                    className={styles.input}
                                />
                            </div>
                        </div>
                    ))}
                </div>

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
                <div className={styles.modalButtonGroup}>
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

                {/* reset */}
                <div className={styles.defaultsContainer}>
                    <button
                        className={styles.settingsButton}
                        onClick={handleReset}
                    >
                        Use default settings
                    </button>
                </div>
            </div>
        </div>
    );
}