"use client";
;
import { useState } from "react";
import styles from './accordionMenu.module.css';
import { PiCaretDown, PiCaretUp, PiDoorOpen } from 'react-icons/pi';
import { logout } from "../../actions/auth";
import TimerSettings from "../timer/TimerSettings";


export default function AccordionMenu() {
    const [openItem, setOpenItem] = useState(null);
/*
    const [tempDurations, setTempDurations] = useState({
        focus: 25 * 60,
        "short break": 5 * 60,
        "long break": 15 * 60,
    });

    const [autoCycle, setAutoCycle] = useState(false);
*/
    const toggleAccordion = (item) => {
        setOpenItem(openItem === item ? null : item);
    };
/*
    const modes = [
        { id: "focus", label: "Focus" },
        { id: "short break", label: "Short Break" },
        { id: "long break", label: "Long Break" },
    ];

    const handleDurationChange = (mode, value) => {
        const numValue = parseInt(value) || 1;
        const minutes = Math.min(60, Math.max(1, numValue));
        setTempDurations(prev => ({
            ...prev,
            [mode]: minutes * 60
        }));
    };

    const handleReset = () => { 
        setTempDurations({
            focus: 25 * 60,
            "short break": 5 * 60,
            "long break": 15 * 60,
        });
        setAutoCycle(false);
    };
*/
    return (
        <div className={styles.accordionMenu}>
            {/* Account settings */}
            <div className={styles.accordionItem}>
                <div 
                    className={styles.accordionHeader}                    
                    onClick={() => toggleAccordion('accountsettings')} 
                >
                    <h3>Account</h3>
                    <button>
                        {openItem === 'accountsettings' ? ( 
                            <PiCaretUp className={styles.icon} />
                        ) : (
                            <PiCaretDown className={styles.icon} />
                        )} 
                    </button>
                </div>
                {openItem === 'accountsettings' && (
                    <div className={styles.accordionContent}>
                        <p>Account settings content</p>
                    </div>
                )}
            </div>

            {/* Focus Timer settings */}
            <div className={styles.accordionItem}>
                <div
                    className={styles.accordionHeader}
                    onClick={() => toggleAccordion('timersettings')}
                >
                    <h3>Focus Timer</h3>
                    <button>
                        {openItem === 'timersettings' ? (
                            <PiCaretUp className={styles.icon} />
                        ) : (
                            <PiCaretDown className={styles.icon} />
                        )} 
                    </button>
                </div>
                {openItem === 'timersettings' && (
                    <div className={styles.accordionContent}>
                        <TimerSettings onClose={() => setOpenItem(null)} />
                    </div>
                )}
            </div>
            
            {/* Log Out */}
            <div className={styles.accordionItem}>
                <div className={styles.accordionHeader}>
                    <h3>Log Out</h3>
                    <button onClick={ logout }>
                        <PiDoorOpen className={styles.icon} />
                    </button>
                </div>
            </div>
        </div>
    );
}