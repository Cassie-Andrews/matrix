"use server";

import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions } from "../lib/session";
import { redirect } from "next/navigation";

export async function login(formData) {
    const cookieStore = await cookies();
    const session = await getIronSession(cookieStore, sessionOptions);

    const username = formData.get("username");
    const password = formData.get("password");

    if (username === "admin" && password === "password") {
        session.isLoggedIn = true;
        session.username = { username };
        await session.save();
        redirect("/");
    } else {
        redirect("/login"); 
    }
};

export async function logout() {
    const cookieStore = await cookies();
    const session = await getIronSession(await cookies(), sessionOptions);
    session.destroy();
    redirect("/login");
};
