import { Icons } from '~/components/icon'

export type NavbarItem = {
  title: string
  href: string
  icon?: keyof typeof Icons
  disabled: boolean
}

export type Navbar = {
  items: NavbarItem[]
}
