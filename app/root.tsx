import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from '@remix-run/react'
import SiteLayout from './components/layouts/site-layout'
import { collapsedCookie, layoutCookie } from './cookies.server'
import stylesheet from './tailwind.css?url'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
]

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie')
  const layout = await layoutCookie.parse(cookieHeader)
  const collapsed = await collapsedCookie.parse(cookieHeader)

  if (layout && collapsed) {
    return json({ layout, collapsed })
  }

  return json(
    { layout, collapsed },
    {
      headers: [
        [
          'Set-Cookie',
          await layoutCookie.serialize({ value: [265, 440, 655] }),
        ],
        ['Set-Cookie', await collapsedCookie.serialize({ value: false })],
      ],
    },
  )
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { collapsed, layout } = useLoaderData<typeof loader>()
  const defaultLayout = layout ? layout.value : undefined
  const defaultCollapsed = collapsed ? layout.value : undefined

  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <SiteLayout
          user={{ name: 'Renan Sui' }}
          page={children}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
