"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import { DrawerProvider } from "@/src/components/drawers/DrawerManager";
import UserProvider from "@/src/context/user.proider";
import { CartProvider } from "@/src/context/cart.context";
import { WishlistProvider } from "@/src/context/wishlist.context";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>["push"]>[1]>;
  }
}

const queryClient = new QueryClient();
export function Providers({
  children,
  themeProps = {
    attribute: "class",
    defaultTheme: "light",
    enableSystem: false,
  },
}: ProvidersProps) {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <WishlistProvider>
          <UserProvider>
            <HeroUIProvider navigate={router.push}>
              <Toaster />
              <DrawerProvider>
                <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
              </DrawerProvider>
            </HeroUIProvider>
          </UserProvider>
        </WishlistProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}
