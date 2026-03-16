import { login } from "../actions/auth";

export default function LoginPage() {
    return (
        <form action={login}>
            <input name="username" type="text" placeholder="username" required />
            <input name="password" type="password" placeholder="password" required />
            <button type="submit">Login</button>
        </form>
    )
};