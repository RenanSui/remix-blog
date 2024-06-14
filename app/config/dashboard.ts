import type { Sidebar } from "@/types";

export const dashboard: Sidebar = {
  items: [
    {
      title: "Profile",
      href: "/profile",
      icon: 'user',
      disabled: true,
    },
    {
      title: 'Social',
      href: '/social',
      icon: 'social',
      disabled: false,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: "gear",
      disabled: true,
    },
  ],
};
