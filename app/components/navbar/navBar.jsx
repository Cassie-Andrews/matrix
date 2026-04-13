'use client';

import { useEffect, useRef } from 'react';
import styles from './navBar.module.css'
import NavMenu from './navMenu';
import Image from 'next/image';
import primaryLogo from '../../../public/submark-landscape-primary.svg'



export default function NavBar({ isLoggedIn, username }) {
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
        <header className={styles.navBar} ref={navbarRef}>
            <div className={styles.navBarContent}>
                <NavMenu isLoggedIn={isLoggedIn} username={username} />
                <Image 
                    className={styles.navLogo} 
                    src={primaryLogo} 
                    alt="Matrix logo" 
                    priority
                />
            </div>
        </header>
    );
}