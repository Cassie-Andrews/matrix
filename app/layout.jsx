import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
