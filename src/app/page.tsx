import Image from "next/image";

import Avatar from "@/components/Avatar";
import NavItem from "@/components/NavMenu";
import BlueskyLogo from "../public/bluesky-logo.svg";
import GithubLogo from "../public/github-mark.svg";
import LinkedinLogo from "../public/linkedin-logo.svg";
import OtterImage from "../public/otter.png";
import MononokeGif from "../../public/mononoke.gif";

export default function Home() {
  return (
    <div className="flex w-full flex-row justify-between">
      <div>
        <Avatar image={OtterImage.src} text="Collum Freedman" />
        <ul className="mb-5">
          <NavItem label="About Me" link="/" />
          <NavItem
            label="Work"
            isGroup={true}
            sublinks={[
              { label: "Projects", link: "/" },
              { label: "Math", link: "/" },
              { label: "Art", link: "/" },
            ]}
          />
          <NavItem label="Posts" link="/" />
        </ul>
        <p className="mb-[5px] text-sm">Other Contacts</p>
        <div className="flex flex-row gap-x-1">
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
        <p></p>
      </div>
      <div className="relative min-h-[500px] max-w-lg">
        <h3 className="font-base mb-4">
          Hi, my name is Collum. I&apos;m a software engineer currently working
          as a freelancer on a range of projects in the web and game programming
          domain.
        </h3>
        <p>
          I have too many disparate interests to effectively pursue (although I
          still try!), but in my freetime, you can find me learning more about
          graphics programming as well as practicing my Cantonese.
        </p>
        <p className="absolute bottom-0 right-0 text-xs">
          &quot;Everything will turn out all right, the world is built on
          that&quot;
        </p>
      </div>
      <Image
        className="fixed bottom-[50%] right-0 scale-x-[-1]"
        src={MononokeGif}
        alt="GIF"
        width={100}
        height={100}
      />
    </div>
  );
}
