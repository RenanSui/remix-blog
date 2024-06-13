import { createCookie } from '@remix-run/node' // or cloudflare/deno

export const layoutCookie = createCookie('react-resizable-panels:layout', {
  maxAge: 60 * 60 * 24 * 30 * 12 // 360 Days
})

export const collapsedCookie = createCookie('react-resizable-panels:collapsed', {
  maxAge: 60 * 60 * 24 * 30 * 12 // 360 Days
})
