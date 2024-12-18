"use client"

import { JSX } from "react";

export interface NavItemProps {
    text: string,
    link: string,
}

export default function NavItem({text, link}: NavItemProps): JSX.Element {
    return (
        <li className="h-5.5">
            <a href={link} className="group transition duration-300 text-sm">{text}</a>
            <span className="block w-0 group-hover:w-full transition-all duration-500 h-1 bg-black"></span>
        </li>
    )
}