"use client";

import Link from "next/link";
import { JSX, useState } from "react";

interface NavSingleProps {
  isGroup?: false;
  label: string;
  link?: string;
}

interface NavGroupProps {
  isGroup: true;
  label: string;
  sublinks: NavSingleProps[];
}

function NavSingle({ label, link }: NavSingleProps): JSX.Element {
  return (
    <div className="w-fit py-[5px]">
      {link ? (
        <Link
          href={link}
          className="relative text-sm after:absolute after:bottom-[-3px] after:left-0 after:block after:h-[2px] after:w-0 after:bg-black after:duration-300 after:content-[''] after:hover:w-[calc(100%+5px)]"
        >
          {label}
        </Link>
      ) : (
        <p className="relative text-sm after:absolute after:bottom-[-3px] after:left-0 after:block after:h-[2px] after:w-0 after:bg-black after:duration-300 after:content-[''] after:hover:w-[calc(100%+5px)]">
          {label}
        </p>
      )}
    </div>
  );
}

function NavGroup({ label, sublinks }: NavGroupProps): JSX.Element {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="w-fit">
      <p
        className="relative w-fit cursor-pointer text-sm after:absolute after:bottom-[-3px] after:left-0 after:block after:h-[2px] after:w-0 after:bg-black after:duration-300 after:content-[''] after:hover:w-[calc(100%+5px)]"
        onClick={() => setOpen((prev) => !prev)}
      >
        {label}
      </p>
      {isOpen && (
        <div className="relative left-[10px] py-[5px]">
          {sublinks.map((sublink) => (
            <NavSingle
              label={sublink.label}
              link={sublink.link}
              key={sublink.label}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export type NavItemProps = NavSingleProps | NavGroupProps;

export default function NavItem(props: NavItemProps): JSX.Element {
  return props.isGroup ? (
    <NavGroup label={props.label} sublinks={props.sublinks} isGroup={true} />
  ) : (
    <NavSingle label={props.label} link={props.link} />
  );
}
