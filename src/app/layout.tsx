import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";
import { lineSeedTh, lineSeedRg, lineSeedBd, lineSeedEb } from "@/styles/fonts";

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
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
    </html>
  );
}
