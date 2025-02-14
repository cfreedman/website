import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";

import "./globals.css";
import HowlClimbImage from "@/photos/howl-climb-final.png";
import MononokeGif from "@/gifs/output-onlinegiftools.gif";
import CloudsImage from "@/photos/clouds.png";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} relative`}>
        <Image
          src={CloudsImage}
          alt="Clouds"
          className="max-h-[350px] min-h-[200px] w-[100%] flex-auto object-cover transition-transform duration-700 ease-in-out hover:scale-[102%]"
        />
        <div className="mx-auto mt-[100px] flex max-w-[90%] flex-col items-center antialiased sm:flex-row sm:items-start sm:justify-start lg:max-w-[70%]">
          {children}
        </div>
        <Image
          src={MononokeGif}
          alt="Elk rider"
          width={100}
          height={100}
          className="fixed bottom-0 right-0"
          unoptimized
        />
        <Image
          src={HowlClimbImage}
          alt="Howl Climb Background"
          className="min-h-[550px] w-[100%] flex-auto object-cover transition-transform duration-700 ease-in-out hover:scale-[102%]"
        />
      </body>
    </html>
  );
}
