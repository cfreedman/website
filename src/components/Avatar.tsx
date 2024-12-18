"use client"

import { StaticImageData } from "next/image"
import { JSX } from "react"

export interface AvatarProps {
    image: string,
    text: string,
}

export default function Avatar({image, text}: AvatarProps): JSX.Element {
    return (
        <div className="flex flex-col justify-center items-center mb-8">
            <img src={image} alt="Avatar image" className="mb-4 w-16 h-16 rounded-full object-cover" />
            <p className="text-sm">{text}</p>
        </div>
    )
}