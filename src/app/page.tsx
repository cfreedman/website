import Image from "next/image";

import Avatar from "@/components/Avatar";
import NavItem from "@/components/NavItem";
import BlueskyLogo from "../public/bluesky-logo.png"
import GithubLogo from "../public/github-mark.png"
import LinkedinLogo from "../public/linkedin-logo.png"
import OtterImage from "../public/otter.png"

export default function Home() {
  return (
    <div className="flex flex-row w-full justify-between">
      <div>
        <Avatar image={OtterImage.src} text="Collum Freedman" />
        <ul>
          <NavItem text="About Me" link="/" />
          <NavItem text="Work" link="/" />
          <NavItem text="Posts" link="/" />
        </ul>
        <p>Other Contacts</p>
        <div className="flex flex-row gap-x-3.5">
          <a href="https://github.com/cfreedman">
            <Image src={GithubLogo} alt="Github Link" width={22} height={22} />
          </a>
          <a href="https://google.com">
            <Image src={BlueskyLogo} alt="Bluesky Link" width={22} height={22} />
          </a>
          <a href="https://linkedin.com/in/collum-freedman-aa13a321b/">
            <Image src={LinkedinLogo} alt="Linkedin Link" width={22} height={22} />
          </a>
        </div>
        <p></p>
      </div>
      <div className="max-w-lg">
        <h3 className="font-bold">Hi, I'm Collum, a software engineer.</h3>
        <p>I have too many disparate interests to effectively pursue (although I still try!), but in my freetime, you can find me learning more about graphics programming as well as practicing my Cantonese.</p>
      </div>
    </div>
  );
}
