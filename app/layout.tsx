import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Background } from "@/components/Background";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ManasRam M | Data Analyst Portfolio",
  description:
    "Premium modern portfolio of ManasRam M – Data Analyst and Data Science graduate focused on turning data into business insights.",
    verification: {
      google: "enbXmRS29Yq07Xyp_2r5MYZmd2S_GR1wzwgzga1tRo4",
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#020617] text-slate-100`}
      >
        <Background />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
