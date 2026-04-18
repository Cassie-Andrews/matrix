import styles from './BottomNav.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useTimer } from '@/app/context/TimerContext';
import { logout } from "../../actions/auth";


export default function BottomNav() {
    const { showTimer, setShowTimer } = useTimer();

    return (
        <nav className={styles.bottomNav}>
            <div className={styles.navContent}>
            <ul className={styles.navLinks}>
            {/* Punch Cards */}
                <li className={styles.navLink}>
                    <Link href="/" className={styles.navLinkContent}>
                        <Image 
                            src="/ICON_default_check_box.png"
                            alt="dashboard"
                            width={40}
                            height={40}
                            className={styles.defaultIcon}
                        />
                        <Image 
                            src="/ICON_active_check_box.png"
                            alt="dashboard"
                            width={40}
                            height={40}
                            className={styles.hoverIcon}
                        />
                    </Link>
                </li>
            {/* Timer */}
                <li className={styles.navLink}>
                    <button
                        className={styles.navLinkContent}
                        onClick={() => setShowTimer(prev => !prev)}
                    >
                        <Image 
                            src="/ICON_default_timer.png"
                            alt="timer"
                            width={40}
                            height={40}
                            className={styles.defaultIcon}
                        />
                        <Image 
                            src="/ICON_active_timer.png"
                            alt="timer"
                            width={40}
                            height={40}
                            className={styles.hoverIcon}
                        />                       
                    </button>
                </li>

            {/* Settings */}
                <li className={styles.navLink}>
                    <button
                        className={styles.navLinkContent}
                        onClick={ logout }
                    >
                        <Image 
                            src="/ICON_default_logout.png"
                            alt="Log out"
                            width={40}
                            height={40}
                            className={styles.defaultIcon}
                        />
                        <Image 
                            src="/ICON_active_logout.png"
                            alt="Log out"
                            width={40}
                            height={40}
                            className={styles.hoverIcon}
                        />
                    </button>
                </li>
            </ul>
            </div>
        </nav>
    )
}




/*

<Image 
    src="/ICON_disabled_home.png"
    alt="Home icon disabled"
    width={40}
    height={40}
    className={styles.disabledIcon}
/>

<Image 
    src="/ICON_disabled_check_box.png"
    alt="Check box icon disabled"
    width={40}
    height={40}
    className={styles.disabledIcon}
/>

<Image 
    src="/ICON_disabled_timer.png"
    alt="Timer icon disabled"
    width={40}
    height={40}
    className={styles.disabledIcon}
/>  

<Image 
    src="/ICON_disabled_settings.png"
    alt="Settings icon disabled"
    width={40}
    height={40}
    className={styles.disabledIcon}
/>
*/