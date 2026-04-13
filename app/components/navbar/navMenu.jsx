"use client";

import { useState, useEffect, useRef } from 'react';
import { logout } from '../../actions/auth';
import Link from 'next/link';
import styles from "./navMenu.module.css";

export default function NavMenu({ isLoggedIn }) {
    const [isOpen, setIsOpen] = useState(false);
    const navbarRef = useRef(null);
    let lastScrollTop = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (!navbarRef.current) return;

            if(scrollTop > lastScrollTop.current) {
                navbarRef.current.classList.add(styles.navHidden);
            } else {
                navbarRef.current.classList.remove(styles.navHidden);
            }

            lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
        };
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

 return (
    <>
        <button className={styles.navMenuButton} ref={navbarRef} onClick = {() => setIsOpen(!isOpen)}>
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
                        <li className={styles.navLink}><Link href="#">About</Link></li>
                        <li onClick={ logout } style={{ cursor: "pointer" }}>Logout</li>
                    </>
                ) : (
                    <>
                        <li className={styles.navLink}><Link href="/">Home</Link></li>
                        <li className={styles.navLink}><Link href="#">About</Link></li>
                        <li className={styles.navLink}><Link href="/login">Login</Link></li>
                        <li className={styles.navLink}><Link href="/signup">Sign Up</Link></li>
                    </>
                )}
            </ul>
        </nav>
    </>
 )
}