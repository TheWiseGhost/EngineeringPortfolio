import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import BackgroundAnimation from "@/components/BackgroundAnimation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Advanced Multi-Sensing Mobility System",
  description: "Smart Glasses for the Visually Impaired - Engineering Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${dmSans.variable} ${jetBrainsMono.variable} antialiased`}
      >
        <BackgroundAnimation />
        <Navigation />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}

