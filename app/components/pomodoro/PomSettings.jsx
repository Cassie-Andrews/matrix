"use client";

import { useState, useEffect } from "react";
import styles from "./Pomodoro.module.css";

export default function PomodoroSettings({ durations, setDurations, activeMode, setTimeLeft, onClose }) {
    const [tempDurations, setTempDurations] = useState({
        pomodoro: durations.pomodoro / 60,
        "short break": durations["short break"] / 60,
        "long break": durations["long break"] / 60,
    });

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

        setTimeLeft(newDurations[activeMode]);

        onClose();
    };

    const handleReset = () => {
        setTempDurations({
            pomodoro: 25,
            "short break": 5,
            "long break": 15,
        });
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.modalTitle}>Settings</h2>

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
                                <span className={styles.unit}>minutes</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.instructions}>
                    <p>instructions</p>
                </div>
                
                {/* ACTION BUTTONS */}
                <div className={styles.buttonGroup}>
                    {/* reset */}
                    <button
                        className={styles.resetButton}
                        onClick={handleReset}
                    >
                        Reset
                    </button>

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
            </div>
        </div>
    );
}