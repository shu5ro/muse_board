import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { lineSeedTh, lineSeedRg, lineSeedBd, lineSeedEb } from "@/styles/fonts";




// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "MuseBoard | 画像生成プロンプト集",
  description: "画像生成プロンプト集",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={` ${lineSeedTh.variable} ${lineSeedRg.variable} ${lineSeedBd.variable} ${lineSeedEb.variable} antialiased`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId="NEXT_PUBLIC_GA_ID" />
    </html>
  );
}
