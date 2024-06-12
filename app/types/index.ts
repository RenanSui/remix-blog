import type { Icons } from '@/components/icon'

export type SidebarNavItem = {
  title: string
  href: string
  icon?: keyof typeof Icons
  disabled: boolean
}

export type Sidebar = {
  items: SidebarNavItem[]
}
