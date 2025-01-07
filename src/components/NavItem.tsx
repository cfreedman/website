"use client";

import { JSX } from "react";

export interface NavItemProps {
  text: string;
  link: string;
}

export default function NavItem({ text, link }: NavItemProps): JSX.Element {
  return (
    <li className="h-5.5 w-fit">
      <a
        href={link}
        className="relative text-sm after:absolute after:bottom-[-3px] after:left-0 after:block after:h-[2px] after:w-0 after:bg-black after:duration-300 after:content-[''] after:hover:w-[calc(100%+5px)]"
      >
        {text}
      </a>
    </li>
  );
}
