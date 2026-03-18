import styles from './Header.module.css'
import NavMenu from './navMenu';

export default async function Header({ isLoggedIn, username }) {
    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <NavMenu isLoggedIn={isLoggedIn} username={username} />
                <p className={styles.navTitle}>Matrix</p>
            </div>
        </header>
    )
}

