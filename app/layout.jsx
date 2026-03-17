import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "./lib/session";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";

// layout for shared UI such as header, nav, footer
// https://nextjs.org/docs/app/api-reference/file-conventions/layout

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html lang="en">
      <Header isLoggedIn={session.isLoggedIn} username={session.username} />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      <Footer />
    </html>
  );
}
