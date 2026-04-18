"use client";

import { TimerProvider, useTimer } from "./context/TimerContext";

import NavBar from "./components/navbar/navBar";
import BottomNav from "./components/bottomNav/BottomNav";
import Footer from "./components/footer/Footer";
import TimerWidget from "./components/timer/TimerWidget";

function LayoutInner({ children, session}) {
    const { showTimer, setShowTimer } = useTimer();

    return (
        <>
            <NavBar
                isLoggedIn={session.isLoggedIn}
                username={session.username}
            />
            <main>
                {children}
                
                {showTimer && (
                    <TimerWidget onClose={() => setShowTimer(false)} />
                )}
                
                <BottomNav 
                    showTimer={showTimer}
                    setShowTimer={setShowTimer}
                />

                <Footer />
            </main>
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