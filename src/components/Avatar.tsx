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
        className="rounded-full object-cover duration-200 hover:scale-[110%]"
        width={100}
        height={100}
        unoptimized={true}
      />
      {text && <p className="mt-[20px] text-sm">{text}</p>}
    </div>
  );
}
