"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import NextLink from "next/link";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import { HeartIcon, ShoppingBagIcon, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useDrawerManager } from "../drawers/DrawerManager";
import { getCurrentUser } from "@/src/services/AuthService";
import { siteConfig } from "@/src/config/site";
import LogoutButton from "../button/LogoutButton";
import Link from "next/link";

export const Topbar = () => {
  const { openDrawer } = useDrawerManager();
  const [user, setUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // Access cookies from document.cookie on the client side
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))?.split("=")[1];

    setAccessToken(cookieValue ?? null); // If cookieValue is undefined, set it to null

    // Fetch user info if accessToken exists
    if (cookieValue) {
      const fetchUser = async () => {
        const currentUser = await getCurrentUser(); // Your function to fetch the current user
        setUser(currentUser);
      };
      fetchUser();
    }
  }, []);

  // Construct the URL with the accessToken as a query parameter
  const dashboardUrl = accessToken ? `https://judy-seide-dashboard.vercel.app?token=${accessToken}` : "/login";

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser(); // Fetch the user from cookies
      setUser(currentUser);
    };

    fetchUser();
  }, []);

  return (
    <HeroUINavbar
      className="relative max-w-screen-2xl mx-auto top-0 px-2 lg:px-12 xl:px-24 pt-2 pb-4 shadow-sm overflow-visible"
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
        <NavbarItem className="cursor-pointer hover:text-gray-600 relative z-[90]">
          <Dropdown>
            <DropdownTrigger>
              <button className="bg-none rounded-none font-semibold">
                {user ? user.name : <User />}
              </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions">
              {user ? (
                <>
                  <DropdownItem key="profile">
                    <a href={dashboardUrl}>
                      My Profile
                    </a>
                  </DropdownItem>
                  <DropdownItem key="orders">
                    <a href={dashboardUrl}>
                      My Orders
                    </a>
                  </DropdownItem>
                  <DropdownItem key="logout" className="text-danger" color="danger">
                    <LogoutButton />
                  </DropdownItem>
                </>
              ) : (
                <DropdownItem key="login">
                  <Link href={dashboardUrl}>
                    <p className="font-semibold">Sign in</p>
                  </Link>
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
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
        <NavbarItem className="cursor-pointer hover:text-gray-600 relative">
          <Dropdown>
            <DropdownTrigger>
              <button className="bg-none rounded-none font-semibold">
                {user ? user.name : <User />}
              </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions">
              {user ? (
                <>
                  <DropdownItem key="profile">
                    <a href={dashboardUrl}>
                      My Profile
                    </a>
                  </DropdownItem>
                  <DropdownItem key="orders">
                    <a href={dashboardUrl}>
                      My Orders
                    </a>
                  </DropdownItem>
                  <DropdownItem key="logout" className="text-danger" color="danger">
                    <LogoutButton />
                  </DropdownItem>
                </>
              ) : (
                <DropdownItem key="login">
                  <Link href={dashboardUrl}>
                    <p className="font-semibold">Sign in</p>
                  </Link>
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
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
