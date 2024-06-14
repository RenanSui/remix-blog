import type { Sidebar } from "@/types";

export const sidebar: Sidebar = {
  items: [
    {
      title: "Home",
      href: "/",
      icon: "home",
      disabled: false,
    },
    {
      title: "Search",
      href: "/search",
      icon: 'search',
      disabled: true,
    },
  ],
};
