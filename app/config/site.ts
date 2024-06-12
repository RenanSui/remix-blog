import type { Sidebar } from '@/types'

const sidebar: Sidebar = {
  items: [
    {
      title: 'Home',
      href: '/',
      icon: 'home',
      disabled: false,
    },
    {
      title: 'Search',
      href: '/search',
      icon: 'home',
      disabled: true,
    },
  ],
}

const dashboard: Sidebar = {
  items: [
    {
      title: 'Profile',
      href: '/profile',
      icon: 'home',
      disabled: true,
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: 'home',
      disabled: true,
    },
  ],
}

export const siteConfig = {
  name: 'Blog',
  title: 'Sui Blog',
  description: 'Simple blog created with Remix.',
  // links,
  // unsplash: { auth },
  // oauthProviders,
  sidebarNav: [...sidebar.items],
  dashboardNav: [...dashboard.items],
}
