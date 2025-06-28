'use client';

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
import { getProducts } from "@/src/services/Products";
import { useEffect, useRef, useState } from "react";
import SearchResults from "../search/SearchResults";
import { Filters } from "@/src/types";

export const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term
  const [searchResults, setSearchResults] = useState<any[]>([]); // State to store search results
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [showResults, setShowResults] = useState(false); // Control visibility of search results

  const searchInputRef = useRef<HTMLInputElement | null>(null); // Ref to the search input
  const searchResultsRef = useRef<HTMLDivElement | null>(null); // Ref to search results container

  useEffect(() => {
    if (searchTerm.length > 0) {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const filters: Filters = {
            availability: { inStock: false, outOfStock: false },
            price: {
              under150: false,
              "150to300": false,
              "300to500": false,
              above500: false,
            },
            sortBy: "price-low-to-high",
            categoryName: "",
            material: "",
          };
          const response = await getProducts(filters, 1, 10, searchTerm); // Pass search term here
          setSearchResults(response.products);
        } catch (error) {
          console.error("Search error: ", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    } else {
      setSearchResults([]); // Clear results if no search term
    }
  }, [searchTerm]); // Run whenever the search term changes

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowResults(false); // Hide search results if clicked outside of both input and results
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "h-12 bg-default-50 rounded-none border border-orange-200",
        input: "text-md",
      }}
      labelPlacement="outside"
      placeholder="Search"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      startContent={
        <SearchIcon className="text-base text-orange-400 pointer-events-none flex-shrink-0 mr-2" />
      }
      type="search"
      onFocus={() => setShowResults(true)} // Show results when the input is focused
      ref={searchInputRef} // Attach ref to the search input
    />
  );

  return (
    <HeroUINavbar
      className="relative max-w-screen-2xl mx-auto top-0 z-[40] px-2 lg:px-12 xl:px-24 pt-2 pb-4 shadow-sm overflow-visible  "
      maxWidth="full"
      position="sticky"
    >
      {/* Brand */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="text-5xl font-serif font-bold text-inherit text-orange-400">Bella D'or</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Nav Items */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="center">
        <ul className="hidden lg:flex gap-4 xl:gap-6 justify-start items-center">
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
        </NavbarItem>
        <NavbarItem>
          <div className="w-44 lg:w-48 xl:w-72">{searchInput}</div>
        </NavbarItem>
        <ThemeSwitch />
      </NavbarContent>

      {/* Mobile & Tablet Toggle */}
      <NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="pt-[84px]">
        <div>
          <NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
            <ThemeSwitch />
            <NavbarMenuToggle />
          </NavbarContent>
        </div>
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

      {/* Search Results Component */}
      {showResults && searchTerm.length > 0 && !isLoading && (
        <div
          ref={searchResultsRef} // Attach ref to the results container
          className="absolute top-20 right-6 lg:right-8 bg-[#FEF6F1] shadow-lg rounded-md max-h-96 max-w-sm md:max-w-md lg:max-w-lg overflow-y-auto "
        >
          <SearchResults
            results={isLoading ? [] : searchResults} // Pass empty array if loading
            isLoading={isLoading}
          />
        </div>
      )}
    </HeroUINavbar>
  );
};