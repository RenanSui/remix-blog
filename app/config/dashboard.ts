import type { Sidebar } from "@/types";

export const dashboard: Sidebar = {
  items: [
    {
      title: "Profile",
      href: "/profile",
      icon: "home",
      disabled: true,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: "home",
      disabled: true,
    },
  ],
};
