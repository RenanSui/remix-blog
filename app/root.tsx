import type { LinksFunction } from '@remix-run/node'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from '@remix-run/react'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import { ErrorCard } from './components/error-card'
import { Shell } from './components/shell'
import stylesheet from './tailwind.css?url'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary() {
  const error = useRouteError()
  return (
    <html>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <Shell variant="centered" className="max-w-md">
          {isRouteErrorResponse(error) ? (
            <ErrorCard
              title={error.statusText}
              description=""
              retryLink="/"
              retryLinkText="Go to Home"
            />
          ) : error instanceof Error ? (
            error.message
          ) : (
            'Unknown Error'
          )}
        </Shell>
        <Scripts />
      </body>
    </html>
  )
}
