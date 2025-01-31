import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Image from "next/image";

import Avatar from "@/components/Avatar";
import NavItem from "@/components/NavMenu";
import BlueskyLogo from "../public/icons/bluesky-logo.svg";
import GithubLogo from "../public/icons/github-mark.svg";
import LinkedinLogo from "../public/icons/linkedin-logo.svg";
import HowlClimbImage from "../public/photos/howl-climb-final.png";
import OtterImage from "../public/photos/otter.png";
import MononokeGif from "../public/gifs/output-onlinegiftools.gif";

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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="mx-auto mt-[130px] flex max-w-[90%] flex-col items-start justify-start antialiased sm:flex-row lg:max-w-[70%]">
          <div className="mr-[120px] hidden min-w-[145px] flex-col items-start sm:flex xl:mr-[300px]">
            <Avatar image={OtterImage.src} text="Collum Freedman" />
            <div className="mb-5">
              <NavItem label="About Me" link="/" />
              <NavItem
                label="Work"
                isGroup={true}
                sublinks={[
                  { label: "Projects", link: "/projects" },
                  { label: "Math", link: "/math" },
                  { label: "Art", link: "/art" },
                ]}
              />
              <NavItem label="Posts" link="/" />
            </div>
            <p className="mb-[5px] text-sm">Other Contacts</p>
            <div className="mb-[5px] flex flex-row gap-x-1">
              <a
                className="rounded-md p-1 hover:bg-slate-200"
                href="https://github.com/cfreedman"
              >
                <Image
                  src={GithubLogo}
                  alt="Github Link"
                  width={22}
                  height={22}
                />
              </a>
              <a
                className="rounded-md p-1 hover:bg-slate-200"
                href="https://google.com"
              >
                <Image
                  src={BlueskyLogo}
                  alt="Bluesky Link"
                  width={22}
                  height={22}
                />
              </a>
              <a
                className="rounded-md p-1 hover:bg-slate-200"
                href="https://linkedin.com/in/collum-freedman-aa13a321b/"
              >
                <Image
                  src={LinkedinLogo}
                  alt="Linkedin Link"
                  width={22}
                  height={22}
                />
              </a>
            </div>
            <p className="text-[10px]">collum DOT freedman AT gmail DOT com</p>
          </div>
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
          className="fixed bottom-0 left-0 z-[-1] min-h-[550px] w-[100%] object-cover transition-transform duration-700 ease-in-out hover:scale-[102%]"
        />
      </body>
    </html>
  );
}
