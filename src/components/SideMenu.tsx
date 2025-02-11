import { JSX } from "react";
import Image from "next/image";

import Avatar from "@/components/Avatar";
import NavItem from "@/components/NavMenu";
import BlueskyLogo from "@/icons/bluesky-logo.svg";
import GithubLogo from "@/icons/github-mark.svg";
import LinkedinLogo from "@/icons/linkedin-logo.svg";
import OtterImage from "@/photos/otter.png";

export default function SideMenu(): JSX.Element {
  return (
    <div className="mr-[120px] hidden min-h-[450px] min-w-[145px] flex-col items-start sm:flex xl:mr-[300px]">
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
        <NavItem label="Posts" link="/posts" />
      </div>
      <p className="mb-[5px] text-sm">Other Contacts</p>
      <div className="mb-[5px] flex flex-row gap-x-1">
        <a
          className="rounded-md p-1 hover:bg-slate-200"
          href="https://github.com/cfreedman"
        >
          <Image src={GithubLogo} alt="Github Link" width={22} height={22} />
        </a>
        <a
          className="rounded-md p-1 hover:bg-slate-200"
          href="https://google.com"
        >
          <Image src={BlueskyLogo} alt="Bluesky Link" width={22} height={22} />
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
  );
}
