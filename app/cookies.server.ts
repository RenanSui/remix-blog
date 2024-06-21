import { createCookie } from '@vercel/remix' // or cloudflare/deno

export const layoutCookie = createCookie('react-resizable-panels:layout', {
  maxAge: 60 * 60 * 24 * 30 * 12, // 360 Days
  path: '/',
})

export const collapsedCookie = createCookie(
  'react-resizable-panels:collapsed',
  {
    maxAge: 60 * 60 * 24 * 30 * 12, // 360 Days
    path: '/',
  },
)

type Layout = { value: number[] | null }
type Collapsed = { value: boolean | null }
export async function getSidebarCookies(cookieHeader: string | null) {
  const layout: Layout = await layoutCookie.parse(cookieHeader)
  const collapsed: Collapsed = await collapsedCookie.parse(cookieHeader)

  const sidebarCookies = { layout, collapsed }
  const headers: HeadersInit | undefined = [
    ['Set-Cookie', await layoutCookie.serialize({ value: [20, 80] })],
    ['Set-Cookie', await collapsedCookie.serialize({ value: false })],
  ]

  return {
    sidebarCookies,
    headers: !layout || !collapsed ? headers : undefined,
  }
}
