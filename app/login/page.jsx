import { login } from "../actions/auth";
import styles from "./login.module.css";

export default function LoginPage() {
    return (
        <main>
            <div className={styles.loginContainer}> 
                <h3>Welcome Back</h3>
                <form action={login} className={styles.loginForm}>
                    <input name="username" type="text" placeholder="username" required />
                    <input name="password" type="password" placeholder="password" required />
                    <button type="submit" className={styles.loginButton}>Login</button>
                </form>
            </div>
        </main>
    )
};