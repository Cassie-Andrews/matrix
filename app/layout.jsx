import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "./lib/session";

import { IBM_Plex_Sans, IBM_Plex_Serif } from 'next/font/google';
import "./globals.css";

import LayoutClient from "./LayoutClient";

const ibmPlexSans = IBM_Plex_Sans({
  weight: 'variable',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-sans',
})

const ibmPlexSerif = IBM_Plex_Serif({
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-serif',
})

export const metadata = {
  title: "Matrix",
  description: "Punch card study companion",
};


export default async function RootLayout({ children }) {
  // Check for user session
  const cookieStore = await cookies();
  const session = await getIronSession(cookieStore, sessionOptions);

  // reformat 
  const sessionData = {
    isLoggedIn: session.isLoggedIn ?? false,
    username: session.username ?? null,
    userId: session.userId ?? null,
  }

  return (
    <html lang="en" className={`${ibmPlexSans.variable} ${ibmPlexSerif.variable}`}>
        <body>
        <LayoutClient session={sessionData}> 
          {children}
        </LayoutClient>
        </body>
    </html>
  );
}
