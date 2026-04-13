import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "./lib/session";

import LandingPage from "./components/landing/LandingPage.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";

export default async function Home() {
  // Check for user session
  const cookieStore = await cookies();
  const session = await getIronSession(cookieStore, sessionOptions);
  
  return (
      <>      
      {session.isLoggedIn ? (
        <Dashboard username={session.username} />
      ) : (
        <LandingPage />
      )}
      </>
  );
} 
    