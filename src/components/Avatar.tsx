"use client";

import { StaticImageData } from "next/image";
import { JSX } from "react";

export interface AvatarProps {
  image: string;
  text: string;
}

export default function Avatar({ image, text }: AvatarProps): JSX.Element {
  return (
    <div className="mb-8 flex flex-col items-center justify-center">
      <img
        src={image}
        alt="Avatar image"
        className="mb-4 h-16 w-16 rounded-full object-cover duration-200 hover:scale-[110%]"
      />
      <p className="text-sm">{text}</p>
    </div>
  );
}
