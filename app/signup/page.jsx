import { signup } from "../actions/auth";
import styles from "./styles.module.css";

export default function SignupPage({ searchParams }) {
    const error = searchParams?.error;

    return (
        <main>
            <div className={styles.signupContainer}> 
                <h3>Create An Account</h3>
                {error && <p>{error}</p>}
                <form action={signup} className={styles.signupForm}>
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
                    <button type="submit" className={styles.signupButton}>Sign Up</button>
                </form>
                <p>Already have an account? <a href="/login">Login</a></p>
            </div>
        </main>
    )
}