import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "./lib/session";

import { IBM_Plex_Sans, IBM_Plex_Serif} from 'next/font/google';
import "./globals.css";
import Footer from "./components/footer/Footer";
import NavBar from "./components/navbar/navBar";
import BottomNav from "./components/bottomNav/BottomNav";

// layout for shared UI such as header, nav, footer
// https://nextjs.org/docs/app/api-reference/file-conventions/layout

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

// A root layout is the top-most layout in the root app directory. It is used to define the <html> and <body> tags and other globally shared UI.

export default async function RootLayout({ children }) {
  // Check for user session
  const cookieStore = await cookies();
  const session = await getIronSession(cookieStore, sessionOptions);

  return (
    <html lang="en" className={`${ibmPlexSans.variable} ${ibmPlexSerif.variable}`}>
      <body>
      <NavBar isLoggedIn={session.isLoggedIn} username={session.username} />
        <main>
          {children}
        </main>
      <BottomNav />
      <Footer />
      </body>
    </html>
  );
}
