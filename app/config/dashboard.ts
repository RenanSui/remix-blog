import type { Sidebar } from '@/types'

export const dashboard: Sidebar = {
  items: [
    {
      title: 'Profile',
      href: '/profile',
      icon: 'user',
      disabled: false,
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: 'gear',
      disabled: false,
    },
  ],
}
