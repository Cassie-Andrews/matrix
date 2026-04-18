"use client";

import { useState } from "react";
import styles from "./TimerSettings.module.css";

export default function TimerSettings({ onClose, showButtons = true}) {
    const [tempDurations, setTempDurations] = useState({
        focus: 25 * 60,
        "short break": 5 * 60,
        "long break": 15 * 60,
    });

    const [autoCycle, setAutoCycle] = useState(false);

    const modes = [
        { id: "focus", label: "Focus" },
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
        console.log("Saving settings: ", tempDurations, autoCycle);
        if (onClose) onClose();
    };

    const handleReset = () => {
        setTempDurations({
            focus: 25 * 60,
            "short break": 5 * 60,
            "long break": 15 * 60,
        });
        setAutoCycle(false);
    };

    return (
        <div className={styles.settingsContainer}>
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
                                value={tempDurations[mode.id] / 60}
                                onChange={(e) => handleChange(mode.id, e.target.value)}
                                className={styles.input}
                            />
                            <span className={styles.unit}>minutes</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.autoCycleContainer}>
                <label className={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={autoCycle}
                        onChange={(e) => setAutoCycle(e.target.checked)}
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
    );
}