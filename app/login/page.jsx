import { login } from "../actions/auth";
import styles from "./login.module.css";

export default function LoginPage({ searchParams }) {
const error = searchParams?.error;

    return (
        <main>
            <div className={styles.loginContainer}> 
                <h3>Welcome Back</h3>
                {error && <p>{error}</p>}
                <form action={login} className={styles.loginForm}>
                    <input
                        name="username"
                        type="text"
                        placeholder="Username" 
                        required
                    />
                    <input 
                        name="password" 
                        type="password" 
                        placeholder="Password" 
                        required 
                    />
                    <button type="submit" className={styles.loginButton}>Login</button>
                </form>
                <p>Don&apos;t have an account? <a href="/signup">Sign Up</a></p>
            </div>
        </main>
    )
};