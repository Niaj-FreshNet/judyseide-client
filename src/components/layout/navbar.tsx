import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { Input } from "@heroui/input";
import NextLink from "next/link";

import { siteConfig } from "@/src/config/site";
import { SearchIcon } from "@/src/components/icons";
import { NavItemWithDropdown } from "../menu/NavItemWithDropdown";
import { ThemeSwitch } from "../UI/theme-switch";

export const Navbar = () => {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "h-12 bg-default-50 rounded-none border border-orange-200",
        input: "text-md",
      }}
      labelPlacement="outside"
      placeholder="Search Jewellery"
      startContent={
        <SearchIcon className="text-base text-orange-400 pointer-events-none flex-shrink-0 mr-2" />
      }
      type="search"
    />
  );

  return (
    <HeroUINavbar
      className="relative max-w-screen-2xl mx-auto top-0 z-[40] px-2 lg:px-24 pt-2 pb-4 shadow-sm overflow-visible"
      maxWidth="full"
      position="sticky"
    >
      {/* Brand */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="text-5xl font-serif font-bold text-inherit text-orange-400">JudySeide</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Nav Items */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="center">
        <ul className="hidden lg:flex gap-6 justify-start items-center">
          {siteConfig.navItems.map((item) => (
            <li key={item.href} className="relative">
              <NavItemWithDropdown label={item.label} href={item.href} />
            </li>
          ))}
        </ul>
      </NavbarContent>

      {/* Desktop Search + Theme */}
      <NavbarContent className="hidden lg:flex basis-1/5" justify="end">
        <NavbarItem className="flex gap-2">
          <ThemeSwitch  />
        </NavbarItem>
        <NavbarItem>
          <div className="w-64">{searchInput}</div>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile & Tablet Toggle */}
      <NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="pt-[72px]">
        <div className="px-4 pt-4">{searchInput}</div>
        <div className="mx-4 mt-4 flex flex-col gap-4">
          <ul className="flex flex-col gap-2 px-4 pt-4">
            {siteConfig.navItems.map((item) => (
              <li key={item.href}>
                <NavItemWithDropdown label={item.label} href={item.href} />
              </li>
            ))}
          </ul>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
