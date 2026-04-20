import { IBM_Plex_Sans, IBM_Plex_Serif } from 'next/font/google';
import "./globals.css";

import Footer from "./components/footer/Footer"
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

  return (
    <html lang="en" className={`${ibmPlexSans.variable} ${ibmPlexSerif.variable}`}>
        <body>
        <LayoutClient> 
          {children}
        </LayoutClient>
        <Footer />
        </body>
    </html>
  );
}
