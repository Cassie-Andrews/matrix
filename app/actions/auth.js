"use server";

import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions } from "../lib/session";
import { redirect } from "next/navigation";
import { dbConnect } from "../lib/db";
import User from "../lib/models/User";
import bcrypt from "bcryptjs";



export async function signup(formData) {
    const username = formData.get("username");
    const password = formData.get("password");

    if (!username || !password) {
        return "Missing username or password";
    }

    await dbConnect();

    const existingUser = await User.findOne({ username});
    if (existingUser) {
        return "Username already taken";
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    const cookieStore = await cookies();
    const session = await getIronSession(cookieStore, sessionOptions);
    session.isLoggedIn = true;
    session.username = user.username;
    session.userId = user._id.toString();
    await session.save();

    redirect("/");
}

export async function login(formData) {
    const username = formData.get("username");
    const password = formData.get("password");
    
    await dbConnect();

    const user = await User.findOne({ username });
    if (!user) {
        redirect("/login?error=invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        redirect("/login?error=invalid credentials");
    }

    const cookieStore = await cookies();
    const session = await getIronSession(cookieStore, sessionOptions);
    session.isLoggedIn = true;
    session.username = user.username;
    session.userId = user._id.toString();
    await session.save();

    redirect("/");
};

export async function logout() {
    const cookieStore = await cookies();
    const session = await getIronSession(cookieStore, sessionOptions);
    await session.destroy();
    redirect("/login");
};
