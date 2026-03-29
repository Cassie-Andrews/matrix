import styles from './Header.module.css'
import NavMenu from './navMenu';
import Image from 'next/image';
import primaryLogo from '../../../public/primaryLogo.svg'

export default async function Header({ isLoggedIn, username }) {
    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <NavMenu isLoggedIn={isLoggedIn} username={username} />
                <Image className={styles.navLogo} src={primaryLogo} alt="Matrix logo" loading="eager"/>
            </div>
        </header>
    )
}

