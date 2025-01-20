import { JSX } from "react";

import Image from "next/image";

import ChromeLogo from "../../public/chrome-logo.svg";
import GameIcon from "../../public/game.svg";
import GithubLogo from "../../public/github-mark.svg";

export default function ProjectsPage(): JSX.Element {
  return (
    <div className="flex flex-col">
      <h1 className="mb-[50px] self-start text-lg font-bold">Projects</h1>
      <div className="mb-[200px] w-full">
        <h3 className="mb-[15px] font-semibold underline">Rust Raytracer</h3>
        <p>
          A raytracer built in Rust from first principles following the guidance
          outlined in the <i>Raytracing in One Weekend</i> book series.
          Implements a variety of visual elements including various materials,
          texture mappings along with traditional accelerants for the raytracing
          algorithm like{" "}
          <a href="https://en.wikipedia.org/wiki/Bounding_volume_hierarchy">
            bounding volume hierarchy
          </a>{" "}
          computation and element instancing.
        </p>
        <div className="mt-[10px] flex flex-row gap-x-[10px]">
          <a href="https://github.com/cfreedman">
            <Image
              className="rounded-md p-1 hover:bg-slate-200"
              src={GithubLogo}
              alt="Github Link"
              width={35}
              height={35}
            />
          </a>
        </div>
      </div>
      <div className="mb-[200px] w-full">
        <h3 className="mb-[15px] font-semibold underline">Pewpewboom</h3>
        <p className="mb-[15px]">
          Turn-based strategy game based on laser redirection with base-building
          and economy elements. Built entirely in the open-source and
          quickly-advancing Bevy ECS game engine and additional crates in the
          surrounding ecosystem.
        </p>
        <p>
          Try it out with a friend here in browser using a WASM compilation with
          the button below!
        </p>
        <div className="mt-[10px] flex flex-row gap-x-[8px]">
          <a href="https://github.com/cfreedman">
            <Image
              className="rounded-md p-1 hover:bg-slate-200"
              src={GithubLogo}
              alt="Github Link"
              width={35}
              height={35}
            />
          </a>
          <a href="/">
            <Image
              className="rounded-md p-1 hover:bg-slate-200"
              src={GameIcon}
              alt="Game Link"
              width={35}
              height={35}
            />
          </a>
        </div>
      </div>
      <div className="mb-[200px] w-full">
        <h3 className="mb-[15px] font-semibold underline">JyutTube</h3>
        <p>
          A browser extension for performing automatic transliteration of
          Chinese character subtitles in Youtube videos into their romanized
          form. Currently supporting translation into Jyutping (Cantonese) and
          Pinyin (Mandarin) for both Traditional and Simplified Chinese
          characters.
        </p>
        <div className="flex flex-col content-center justify-center">
          <p className="my-[15px]">Ex:</p>
          <p className="ml-[10%] w-full">
            仍然自由自我，永遠高唱我歌, 走遍千里
          </p>
          <p className="relative ml-[10%] w-full">
            <span className="absolute -left-[20px] scale-x-[200%]">&rarr;</span>
            jing4 jin4 zi6 jau4 zi6 ngo5, wing5 jyun5 gou1 coeng3 ngo5 go1, zau2
            pin3 cin1 lei5
          </p>
        </div>
        <div className="mt-[20px] flex flex-row gap-x-[10px]">
          <a href="https://github.com/cfreedman">
            <Image
              className="rounded-md p-1 hover:bg-slate-200"
              src={GithubLogo}
              alt="Github Link"
              width={35}
              height={35}
            />
          </a>
          <a>
            <Image
              className="rounded-md p-1 hover:bg-slate-200"
              src={ChromeLogo}
              alt="Chrome Extension Link"
              width={35}
              height={35}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
