"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import NextLink from "next/link";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import { HeartIcon, ShoppingBagIcon, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useDrawerManager } from "../drawers/DrawerManager";
import { getCurrentUser } from "@/src/services/AuthService";
import { siteConfig } from "@/src/config/site";
import LogoutButton from "../button/LogoutButton";

export const Topbar = () => {
  const { openDrawer } = useDrawerManager();
  const [user, setUser] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // To toggle the dropdown

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser(); // Fetch the user from cookies
      setUser(currentUser);
    };

    fetchUser();
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <HeroUINavbar
      className="relative max-w-screen-2xl mx-auto top-0 z-[40] px-2 lg:px-24 pt-2 pb-4 shadow-sm overflow-visible"
      maxWidth="full"
      position="sticky"
    >
      {/* Left-side Menu Items */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <ul className="flex gap-4 lg:gap-6 justify-start">
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
          <NextLink href="#" onClick={() => openDrawer("wishlist")}>
            <HeartIcon />
          </NextLink>
        </NavbarItem>
        <NavbarItem className="cursor-pointer hover:text-gray-600">
          <NextLink href="#" onClick={() => openDrawer("cart")}>
            <ShoppingBagIcon />
          </NextLink>
        </NavbarItem>
        <NavbarItem
          className="cursor-pointer hover:text-gray-600 relative"
          onClick={toggleDropdown}
        >
          {user ? (
            <span>{user.name}</span> // Display user's name
          ) : (
            <NextLink href="/login">
              <User />
            </NextLink>
          )}
          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md transform translate-y-1">
              <div className="px-4 py-2 text-sm text-gray-800 font-semibold">
                Welcome back, {user?.name}
              </div>
              <NextLink href="/profile">
                <div className="px-4 py-2 hover:bg-gray-200 cursor-pointer">My Profile</div>
              </NextLink>
              <NextLink href="/orders">
                <div className="px-4 py-2 hover:bg-gray-200 cursor-pointer">My Orders</div>
              </NextLink>
              <div className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-red-500"><LogoutButton /></div>
            </div>
          )}
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Icons */}
      <NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
        <NavbarItem className="cursor-pointer hover:text-gray-600">
          <NextLink href="#" onClick={() => openDrawer("wishlist")}>
            <HeartIcon />
          </NextLink>
        </NavbarItem>
        <NavbarItem className="cursor-pointer hover:text-gray-600">
          <NextLink href="#" onClick={() => openDrawer("cart")}>
            <ShoppingBagIcon />
          </NextLink>
        </NavbarItem>
        <NavbarItem
          className="cursor-pointer hover:text-gray-600 relative"
          onClick={toggleDropdown}
        >
          {user ? (
            <span>{user.name}</span> // Display user's name on mobile too
          ) : (
            <NextLink href="/login">
              <User />
            </NextLink>
          )}
          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50 transform translate-y-1">
              <div className="px-4 py-2 text-sm text-gray-800 font-semibold">
                Welcome back, {user?.name}
              </div>
              <NextLink href="/profile">
                <div className="px-4 py-2 hover:bg-gray-200 cursor-pointer">My Profile</div>
              </NextLink>
              <NextLink href="/orders">
                <div className="px-4 py-2 hover:bg-gray-200 cursor-pointer">My Orders</div>
              </NextLink>
              <NextLink href="/logout">
                <div className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-red-500">Sign Out</div>
              </NextLink>
            </div>
          )}
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Dropdown Menu */}
      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.topItems?.map((item, index) => (
            <NavbarMenuItem key={`${item.href}-${index}`}>
              <NextLink className="text-sm hover:text-orange-500" href={item.href}>
                {item.label}
              </NextLink>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
