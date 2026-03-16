import styles from './Header.module.css'

export default function Header() {
    /* TO DO */
    return (
        <header className={styles.header}>
        <div className={styles.navbar}>
            <p className={styles.navTitle}>Matrix</p>
            <ul className={styles.navLinks}>
                <li className={styles.navLink}>Nav Link 1</li>
                <li className={styles.navLink}>Nav Link 2</li>
                <li className={styles.navLink}>Nav Link 3</li>
            </ul>
        </div>
    </header>
)
}
