import { createCookie } from '@remix-run/node' // or cloudflare/deno

export const layoutCookie = createCookie('react-resizable-panels:layout')

export const collapsedCookie = createCookie('react-resizable-panels:collapsed')
