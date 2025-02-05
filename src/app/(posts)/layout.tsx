import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { JSX } from "react";

import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "collum.me",
  description: "Collum Freedman Personal Site",
};

export default function RootPostsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/dark.min.css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative mx-auto mt-[130px] flex max-w-[90%] flex-col items-start justify-start antialiased sm:flex-row lg:max-w-[70%]`}
      >
        {children}
      </body>
    </html>
  );
}
