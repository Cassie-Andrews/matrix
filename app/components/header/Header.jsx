import { getIronSession } from "iron-session";
import { sessionOptions } from "../../lib/session";
import { cookies } from "next/headers";
import { logout } from '../../actions/auth';
import styles from './Header.module.css'
import Link from 'next/link';


export default async function Header({ isLoggedIn, username }) {
    const cookieStore = await cookies();
    const session = await getIronSession(cookieStore, sessionOptions);
  
    if (!session.isLoggedIn) {
        return (
        <header className={styles.header}>
            <div className={styles.navbar}>
                <p className={styles.navTitle}>Matrix</p>
                <ul className={styles.navLinks}>
                    <li className={styles.navLink}><Link href="/">Home</Link></li>
                    <li className={styles.navLink}><Link href="#">About</Link></li>
                    <li className={styles.navLink}><Link href="#">Settings</Link></li>
                </ul>
            </div>
        </header>
        )
    } else {
        (
        <header className={styles.header}>
            <div className={styles.navbar}>
                <p className={styles.navTitle}>Matrix</p>
                <ul className={styles.navLinks}>
                    <li className={styles.navLink}><Link href="/">Dashboard</Link></li>
                    <li className={styles.navLink}><Link href="/">Punch Cards</Link></li>
                    <li className={styles.navLink}><Link href="#">Focus Timer</Link></li>
                    <li className={styles.navLink}><Link href="#">Flash Cards</Link></li>
                    <li className={styles.navLink}><Link href="#">Settings</Link></li>
                    <li className={styles.navLink} onClick={ logout } style={{ cursor: "pointer" }}>Logout</li>
                </ul>
            </div>
        </header>
        )
    }
}

