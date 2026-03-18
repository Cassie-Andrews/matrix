"use client";

import { useState } from 'react';
import { logout } from '../../actions/auth';
import Link from 'next/link';
import styles from "./navMenu.module.css";

export default function NavMenu({ isLoggedIn, username }) {
 const [isOpen, setIsOpen] = useState(false);

 return (
    <>
        <button className={styles.navMenuButton} onClick = {() => setIsOpen(!isOpen)}>
            <span className={`${styles.bar} ${isOpen ? styles.bar1Open : ""}`} />
            <span className={`${styles.bar} ${isOpen ? styles.bar2Open : ""}`} />
            <span className={`${styles.bar} ${isOpen ? styles.bar3Open : ""}`} />
        </button>

        {isOpen && (
            <div className={styles.overlay} onClick = {() => setIsOpen(false)} />
        )}

        <nav className={`${styles.navMenu} ${isOpen ? styles.open : ""}`}>
            <ul className={styles.navLinks}>
                {isLoggedIn ? (
                    <>
                        <li><Link href="/">Dashboard</Link></li>
                        <li><Link href="/">Punch Cards</Link></li>
                        <li><Link href="#">Focus Timer</Link></li>
                        <li><Link href="#">Flash Cards</Link></li>
                        <li><Link href="#">Settings</Link></li>
                        <li onClick={ logout } style={{ cursor: "pointer" }}>Logout</li>
                    </>
                ) : (
                    <>
                        <li className={styles.navLink}><Link href="/">Home</Link></li>
                        <li className={styles.navLink}><Link href="#">About</Link></li>
                        <li className={styles.navLink}><Link href="#">Settings</Link></li>
                    </>
                )}
            </ul>
        </nav>
    </>
 )
}