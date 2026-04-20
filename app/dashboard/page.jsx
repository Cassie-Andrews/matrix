import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "../lib/session";


import Dashboard from "../components/dashboard/Dashboard";

export default async function DashboardPage() {
  // Check for user session
  /* const cookieStore = await cookies(); */
  const session = await getIronSession(await cookies(), sessionOptions);
  
  if (!session.isLoggedIn) {
    return null;
  }

  return <Dashboard username={session.username} />
} 
    