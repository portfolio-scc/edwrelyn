
import Navigation from "@/components/Navigation";
import ViewCounter from "@/components/ViewCounter";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Edwrelyn Buhian | Portfolio",
  description: "Computer Engineering student with experience in customer service, technical support, and leadership.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-white text-black relative`}
      >
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <ViewCounter />
      </body>
    </html>
  );
}
