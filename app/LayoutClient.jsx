"use client";

import Header from "./components/header/header";
import BottomNav from "./components/bottomNav/BottomNav";
import Footer from "./components/footer/Footer";

function LayoutInner({ children, session}) {
    const isLoggedIn = session?.isLoggedIn ?? false;
    const username = session?.username ?? null;

    console.log("sessionData:", session);
    console.log("isLoggedIn:", session?.isLoggedIn)
    return (
        <>
            <Header
                isLoggedIn={isLoggedIn}
                username={username}
                
            />

            <main className="main">
                {children}
                
            </main> 

            {isLoggedIn && <BottomNav />}
        </>
    );
    
}


export default function LayoutClient({ children, session}) {
    console.log("Layout session:", session)
    return <LayoutInner session={session}>
        {children}
    </LayoutInner>
}