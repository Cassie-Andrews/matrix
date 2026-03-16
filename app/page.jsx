import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "./lib/session";

import LandingPage from "./components/LandingPage.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Header from "./components/header/Header.jsx";

export default async function Home() {
  // Check for user session
  const cookieStore = await cookies();
  const session = await getIronSession(cookieStore, sessionOptions);
  
  return (
      <>      
      <Header isLoggedIn={session.isLoggedIn} username={session.username} />
      {session.isLoggedIn ? (
        <Dashboard username={session.username} />
      ) : (
        <LandingPage />
      )}
      </>
  );
} 
    