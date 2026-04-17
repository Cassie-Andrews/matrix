"use client";
;
import { useState, useEffect } from "react";
import styles from './accordionMenu.module.css';
import { PiCaretDown, PiCaretUp, PiDoorOpen } from 'react-icons/pi';
import { logout } from "../../actions/auth";

export default function AccordionMenu() {
    const [openItem, setOpenItem] = useState(null);

    const toggleAccordion = (item) => {
        setOpenItem(openItem === item ? null : item);
    };

    return (
        <div className={styles.accordionMenu}>
            {/* Account settings */}
            <div className={styles.accordionItem}>
                <div 
                    className={styles.accordionHeader}                    onClick={() => toggleAccordion('accountsettings')} 
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
                    <button >
                        {openItem === 'timer' ? (
                            <PiCaretUp className={styles.icon} />
                        ) : (
                            <PiCaretDown className={styles.icon} />
                        )} 
                    </button>
                </div>
                {openItem === 'timersettings' && (
                    <div className={styles.accordionContent}>
                        <p>Timer settings content</p>
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