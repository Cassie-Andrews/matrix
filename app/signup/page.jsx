"use client";
import { useActionState } from "react";
import { signup } from "../actions/auth";
import styles from "./styles.module.css";

export default function SignupPage() {
    const [error, formAction] = useActionState(async (prevState, formData) => {
        await signup(formData);
    }, null);

    return (
        <>
            <div className={styles.contentContainer}>
                <div className={styles.signupContainer}> 
                    <h3>Create An Account</h3>
                    {error && <p>{error}</p>}
                    <form 
                        action={formAction} 
                        className={styles.signupForm}
                    >
                        <p>Username</p>
                        <input 
                            label="username"
                            className="textInput"
                            name="username" 
                            type="text" 
                            placeholder="Username" 
                            required
                        />
                        <p>Password</p>
                        <input 
                            label="password"
                            className="textInput"
                            name="password"
                            type="password"
                            placeholder="Password"
                            required
                        />
                        <button 
                            type="submit" 
                            className={styles.primaryButton}
                        >
                            Sign Up
                        </button>
                    </form>
                    <p>Already have an account? <a href="/login">Login</a></p>
                </div>
            </div>
        </>
    )
}