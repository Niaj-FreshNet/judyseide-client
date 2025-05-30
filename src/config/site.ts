export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Judyseide",
  description: "Jwellery website",
  navItems: [
    {
      label: "New In",
      href: "/new-in",
    },
    {
      label: "Earnings",
      href: "/earnings",
    },
    {
      label: "Bracelets",
      href: "/bracelets",
    },
    {
      label: "Necklaces",
      href: "/necklaces",
    },
    {
      label: "Rings",
      href: "/rings",
    },
  ],
  topItems: [
    {
      label: "+1234567890",
      href: "tel:+1234567890",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About us",
      href: "/about-us",
    },
    {
      label: "Help",
      href: "/help",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
