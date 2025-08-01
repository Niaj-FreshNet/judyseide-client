import "@/src/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { ReactNode } from "react";

import { Providers } from "../lib/Providers";

import { siteConfig } from "@/src/config/site";
import { fontSans, fontSerif } from "@/src/config/fonts";

export const metadata: Metadata = {
  title: "Bella D'or",
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontSerif.variable}`}
      lang="en"
    >
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
