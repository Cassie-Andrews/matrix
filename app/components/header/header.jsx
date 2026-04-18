'use client';

import { useEffect, useRef } from 'react';
import styles from './header.module.css'
import Link from 'next/link';
import Image from 'next/image';
import primaryLogo from '../../../public/submark-landscape-primary.svg'
import hoverLogo from '../../../public/submark-landscape-dark.svg'



export default function Header({ isLoggedIn, username }) {
    const headerRef = useRef(null);
    const lastScrollTop = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (!headerRef.current) return;

            if(scrollTop > lastScrollTop.current) {
                headerRef.current.classList.add(styles.headerHidden);
            } else {
                headerRef.current.classList.remove(styles.headerHidden);
            }

            lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
        };
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className={styles.header} ref={headerRef}>
            <div className={styles.headerContent}>
                <Link href="/" className={styles.logoLink}>
                    <Image
                        className={styles.headerLogo} 
                        src={primaryLogo} 
                        alt="Matrix logo" 
                        priority
                    />
                </Link>
            </div>
        </header>
    );
}