import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import NextLink from "next/link";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";

import { siteConfig } from "@/src/config/site";
import { HeartIcon, ShoppingBagIcon, User } from "lucide-react";

export const Topbar = () => {
  return (
    <HeroUINavbar maxWidth="full" position="sticky" className="shadow-sm">
      {/* Left-side Menu Items */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <ul className="flex gap-4 lg:gap-6 justify-start ml-2">
          {siteConfig.topItems?.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "uppercase text-sm md:text-md lg:text-lg data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      {/* Desktop Icons (hidden on mobile) */}
      <NavbarContent className="hidden lg:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="cursor-pointer hover:text-gray-600">
          <NextLink href="/wishlist">
            <HeartIcon />
          </NextLink>
        </NavbarItem>
        <NavbarItem className="cursor-pointer hover:text-gray-600">
          <NextLink href="/cart">
            <ShoppingBagIcon />
          </NextLink>
        </NavbarItem>
        <NavbarItem className="cursor-pointer hover:text-gray-600">
          <NextLink href="/login">
            <User />
          </NextLink>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Icons */}
      <NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
        <NavbarItem className="cursor-pointer hover:text-gray-600">
          <NextLink href="/wishlist">
            <HeartIcon />
          </NextLink>
        </NavbarItem>
        <NavbarItem className="cursor-pointer hover:text-gray-600">
          <NextLink href="/cart">
            <ShoppingBagIcon />
          </NextLink>
        </NavbarItem>
        <NavbarItem className="cursor-pointer hover:text-gray-600">
          <NextLink href="/login">
            <User />
          </NextLink>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Dropdown Menu */}
      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.topItems?.map((item, index) => (
            <NavbarMenuItem key={`${item.href}-${index}`}>
              <NextLink
                className="text-sm hover:text-orange-500"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
