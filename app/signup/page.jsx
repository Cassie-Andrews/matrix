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
            <div className={styles.signupContainer}> 
                <h3>Create An Account</h3>
                {error && <p>{error}</p>}
                <form 
                    action={formAction} 
                    className={styles.signupForm}
                >
                    <input 
                        className="textInput"
                        name="username" 
                        type="text" 
                        placeholder="Username" 
                        required
                    />
                    <input 
                        className="textInput"
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                    />
                    <button 
                        type="submit" 
                        className="primaryButton"
                    >
                        Sign Up
                    </button>
                </form>
                <p>Already have an account? <a href="/login">Login</a></p>
            </div>
        </>
    )
}