import { Post } from '@/types'
import type { ClassValue } from 'clsx'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function serializeValue(value: unknown) {
  return btoa(JSON.stringify({ value }))
}

export function getCookie(cname: string, cookieHeader?: string) {
  const name = `${cname}=`
  const cookies = cookieHeader ? cookieHeader.split(';') : ['']
  for (const c of cookies) {
    const trimmedCookie = c.trim()
    if (trimmedCookie.indexOf(name) === 0) {
      return trimmedCookie.substring(name.length, trimmedCookie.length)
    }
  }
  return null
}

export function sortPostsByDate(posts: Post[] | null) {
  return posts
    ? posts
        .sort((item1, item2) => {
          return (
            new Date(item1.createdAt).getTime() -
            new Date(item2.createdAt).getTime()
          )
        })
        .reverse()
    : null
}
