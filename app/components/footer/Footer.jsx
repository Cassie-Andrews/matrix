import styles from "./Footer.module.css";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            {/*
            <ul className={styles.footerLinks}>
                <li className={styles.footerLink}><Link href="#">Privacy Policy</Link></li>|
                <li className={styles.footerLink}><Link href="#">Terms and Conditions</Link></li>
            </ul> 
            */}
            <p className={styles.footerText}> &copy; 2026 Cassie Andrews. All rights reserved.</p>
        </footer>
    )
}