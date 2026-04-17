import { login } from "../actions/auth";
import styles from "./login.module.css";

export default async function LoginPage({ searchParams }) {
    const params = await searchParams;
    const error = params?.error;

    return (
        <>
            <div className={styles.contentContainer}>
                <div className={styles.loginContainer}> 
                    <h3>Log In</h3>
                    {error && <p>{error}</p>}
                    <form action={login} className={styles.loginForm}>
                        <p>Username</p>
                        <input
                            label="Username"
                            className="textInput"
                            name="username"
                            type="text"
                            placeholder="Username" 
                            required
                        />
                        <p>Password</p>
                        <input 
                            label="Password"
                            className="textInput"
                            name="password" 
                            type="password" 
                            placeholder="Password" 
                            required 
                        />
                        <p className={styles.forgotPassword}><a href="/forgot-password">Forgot password?</a></p>
                        <button 
                            type="submit" 
                            className={styles.primaryButton}
                        >
                            Sign In
                        </button>
                    </form>
                    <p>Don&apos;t have an account? <a href="/signup">Sign Up</a></p>
                </div>
            </div>
        </>
    )
};