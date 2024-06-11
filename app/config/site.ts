import { Navbar } from '@/types'

const navbar: Navbar = {
  items: [
    {
      title: 'Home',
      href: '/',
      icon: 'home',
      disabled: false,
    },
    {
      title: 'Search',
      href: '/post/search',
      icon: 'home',
      disabled: false,
    },
    {
      title: 'Profile',
      href: '/profile',
      icon: 'home',
      disabled: false,
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: 'home',
      disabled: false,
    },
  ],
}

const dashboard: Navbar = {
  items: [],
}

export const siteConfig = {
  name: 'Blog',
  title: 'Sui Blog',
  description: 'Simple blog created with Remix.',
  // links,
  // unsplash: { auth },
  // oauthProviders,
  sidebarNav: [...navbar.items],
  dashboardNav: [...dashboard.items],
}
