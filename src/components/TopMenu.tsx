import { JSX } from "react";

import OtterImage from "@/photos/otter.png";
import Avatar from "./Avatar";
import NavItem from "./NavMenu";

export default function TopMenu(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center sm:hidden">
      <Avatar image={OtterImage.src} className="mb-[20px]" />
      <div className="mb-5 flex h-[150px] min-w-[200px] justify-between">
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
    </div>
  );
}
