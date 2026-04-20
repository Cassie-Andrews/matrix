import { TimerProvider } from "../context/TimerContext";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "../lib/session";
import LayoutClient from "../LayoutClient";


export default async function DashboardLayout({ children }) {
  // Check for user session
  const session = await getIronSession(await cookies(), sessionOptions);

  // reformat 
  const sessionData = {
    isLoggedIn: session.isLoggedIn ?? false,
    username: session.username ?? null,
    userId: session.userId ?? null,
  };


  return (
    <TimerProvider>
        <LayoutClient session={sessionData}> 
            {children}
        </LayoutClient>
    </TimerProvider>
  );
}

