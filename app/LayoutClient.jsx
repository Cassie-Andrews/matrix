"use client";

import { TimerProvider, useTimer } from "./context/TimerContext";

import Header from "./components/header/header";
import BottomNav from "./components/bottomNav/BottomNav";
import Footer from "./components/footer/Footer";

function LayoutInner({ children, session}) {
    const isLoggedIn = session?.isLoggedIn;

    return (
        <>
            <Header
                isLoggedIn={session?.isLoggedIn}
                username={session?.username}
            />
            <main className="main">
                {children}
            </main> 
            {isLoggedIn && <BottomNav />}
            <Footer />
        </>
    )
}

export default function LayoutClient({ children, session}) {
    return (
        <TimerProvider>
            <LayoutInner session={session}>
                {children}
            </LayoutInner>
        </TimerProvider>
    )
}