import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "./lib/session";
import { redirect } from "next/navigation";

import LandingPage from "./components/LandingPage.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Header from "./components/header/Header.jsx";

export default async function Home() {
  // Check for user session
  const cookieStore = await cookies();
  const session = await getIronSession(cookieStore, sessionOptions);
  
  if (!session.isLoggedIn) {
    return (
      <>      
      <Header isLoggedIn={false} />
      <LandingPage />
      </>
    );
  } else {
    return (
      <>
        <Header isLoggedIn={true} username={session.username.username} />
        <Dashboard username={session.username.username} />
      </>
    );
  }
}