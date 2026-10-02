import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FinancePulse — Institutional Wealth Intelligence & Portfolio Command",
  description:
    "Next-generation portfolio intelligence platform for modern retail investors. Real-time asset allocation, Sharpe risk analytics, and automated yield tracking.",
  keywords: [
    "Portfolio Tracker",
    "Finance Dashboard",
    "Wealth Management",
    "Risk Analytics",
    "Crypto & Equities",
    "Asset Allocation",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#08090d] text-zinc-100 antialiased selection:bg-cyan-500/20 selection:text-cyan-200`}
      >
        {children}
      </body>
    </html>
  );
}
