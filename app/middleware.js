import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "../app/lib/session";
import { get } from "mongoose";

export async function middleware(req) {
    const res = NextResponse.next();

    const session = await getIronSession(
        req.cookies,
        res.cookies,
        sessionOptions
    );

    const { pathname } = req.nextUrl;

    // if logged in, redir from landing to dash
    if (pathname === "/" && session.isLoggedIn) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // login redir to dash if already logged in
    if (pathname === "/login" && session.isLoggedIn) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // sign up redir to dash if already logged in
    if (pathname === "/signup" && session.isLoggedIn) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // logged in only for dashboard
    if (pathname.startsWith("/dashboard") && !session.isLoggedIn) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    return res;
}

export const config = {
    matcher: ["/", "/dashboard"],
};