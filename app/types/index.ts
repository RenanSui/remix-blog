import type { Icons } from '@/components/icon'
import type { ReasonPhrases } from 'http-status-codes'

export type SidebarNavItem = {
  title: string
  href: string
  icon?: keyof typeof Icons
  disabled: boolean
}

export type Sidebar = {
  items: SidebarNavItem[]
}

export type User = {
  id: string
  email: string
  password: string
  role: 'USER' | 'ADMIN' | 'OWNER'
}

export type Profile = {
  id?: string
  name: string
  username: string
  bio?: string
  image?: string
  userId: string
}

export type Post = {
  id: string
  body: string
  authorId: string
  createdAt: Date
  updatedAt: Date
}

export type ReasonPhrase = `${ReasonPhrases}`

export type HTTPResponse<T = void, B = void> = {
  data: T | null
  message: ReasonPhrase
  status: B
  hasNextPage: boolean
  skip: number
}

export type Auth = { accessToken: string }
