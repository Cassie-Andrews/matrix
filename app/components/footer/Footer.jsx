import styles from "./Footer.module.css";
import Link from "next/link";

export default async function Footer() {
    return (
        <footer className={styles.footer}>
            <ul className={styles.footerLinks}>
                <li className={styles.footerLink}><Link href="#">Privacy Policy</Link></li>|
                <li className={styles.footerLink}><Link href="#">Terms and Conditions</Link></li>|
                <li className={styles.footerLink}><Link href="#">About</Link></li>
            </ul>
            <p className={styles.footerText}> &copy; 2026 Matrix. All rights reserved.</p>
        </footer>
    )
}