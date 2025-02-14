"use client";

import Image from "next/image";
import { JSX } from "react";

export interface AvatarProps {
  image: string;
  text?: string;
  className?: string;
}

export default function Avatar({
  image,
  text,
  className,
}: AvatarProps): JSX.Element {
  return (
    <div
      className={`mb-8 flex flex-col items-center justify-center ${className}`}
    >
      <Image
        src={image}
        alt="Avatar image"
        className="h-16 w-16 rounded-full object-cover duration-200 hover:scale-[110%]"
        width={25}
        height={25}
        unoptimized={true}
      />
      {text && <p className="mt-[20px] text-sm">{text}</p>}
    </div>
  );
}
