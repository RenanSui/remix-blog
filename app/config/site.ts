import { Sidebar } from '@/types'

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
      href: '/',
      icon: 'home',
      disabled: false,
    },
  ],
}

const dashboard: Sidebar = {
  items: [
    {
      title: 'Profile',
      href: '/',
      icon: 'home',
      disabled: false,
    },
    {
      title: 'Settings',
      href: '/',
      icon: 'home',
      disabled: false,
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
