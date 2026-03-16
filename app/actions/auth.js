"use server";

import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions } from "./lib/session";
import { redirect } from "next/navigation";

export async function login(formData) {
    const username = formData.get("username");
    const password = formData.get("password");

    if (username === "admin" && password === "password") {
        const session = await getIronSession(cookies(), sessionOptions);
        session.user = { username };
        await session.save();
        redirect("/");
    } else {
        redirect("/login?error=Invalid%20credentials"); 
    }
};

export async function logout() {
    const session = await getIronSession(await cookies(), sessionOptions);
    session.destroy();
    redirect("/login");
};
