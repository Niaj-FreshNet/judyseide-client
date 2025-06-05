"use client";

import { useState } from "react";
import NextLink from "next/link";
import { MegaMenu } from "./MegaMenu";

export const NavItemWithDropdown = ({ label, href }: { label: string; href: string; }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <NextLink
                href={href}
                className="uppercase text-lg hover:text-orange-500 transition-colors relative after:content-[''] after:block after:w-0 after:h-0.5 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full"
            >
                {label}
            </NextLink>
            {isHovered && (
                <div className="animate-fade-in">
                    <MegaMenu />
                </div>
            )}
        </div>
    );
};
