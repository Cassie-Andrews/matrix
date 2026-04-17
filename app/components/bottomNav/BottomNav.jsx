import styles from './BottomNav.module.css';
import Link from 'next/link';
import Image from 'next/image';


export default function BottomNav() {

    return (
        <nav className={styles.bottomNav}>
            <ul className={styles.navLinks}>

            {/* Dashboard/Home */}
                <li className={styles.navLink}>
                    <Link href="/" className={styles.navLinkContent}>
                        <Image 
                            src="/ICON_default_home.png"
                            alt="default home icon"
                            width={40}
                            height={40}
                        />
                        <Image 
                            src="/ICON_active_home.png"
                            alt="Home icon active"
                            width={40}
                            height={40}
                            className={styles.hoverIcon}
                        />
                    </Link>
                </li>
            {/* Punch Cards */}
                <li className={styles.navLink}>
                    <Link href="#" className={styles.navLinkContent}>
                        <Image 
                            src="/ICON_default_check_box.png"
                            alt="Checkbox icon default"
                            width={40}
                            height={40}
                            className={styles.defaultIcon}
                        />
                        <Image 
                            src="/ICON_active_check_box.png"
                            alt="Check box icon active"
                            width={40}
                            height={40}
                            className={styles.hoverIcon}
                        />
                    </Link>
                </li>
            {/* Timer */}
                <li className={styles.navLink}>
                    <Link href="#" className={styles.navLinkContent}>
                        <Image 
                            src="/ICON_default_timer.png"
                            alt="default timer icon"
                            width={40}
                            height={40}
                            className={styles.defaultIcon}
                        />
                        <Image 
                            src="/ICON_active_timer.png"
                            alt="Timer icon active"
                            width={40}
                            height={40}
                            className={styles.hoverIcon}
                        />                       
                    </Link>
                </li>

            {/* Settings */}
                <li className={styles.navLink}>
                    <Link href="#" className={styles.navLinkContent}>
                        <Image 
                            src="/ICON_default_settings.png"
                            alt="default settings icon"
                            width={40}
                            height={40}
                            className={styles.defaultIcon}
                        />
                        <Image 
                            src="/ICON_active_settings.png"
                            alt="Settings icon active"
                            width={40}
                            height={40}
                            className={styles.hoverIcon}
                        />
                    </Link>
                </li>
            </ul>
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