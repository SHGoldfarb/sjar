"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { NavMenu } from "./layout/NavMenu";
import { Providers } from "@/providers/Providers";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <title>Sjar</title>
      <meta
        name="description"
        content="A budgetting and money management app."
      />
      <link rel="manifest" href="/manifest.webmanifest" />
      <Script src="/register-sw.js" />
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
        >
          <Suspense>
            <Providers>
              {children}
              <NavMenu />
            </Providers>
          </Suspense>
        </body>
      </html>
    </>
  );
}
