import { SiteLayout } from '@/components/layouts/site-layout'
import { SiteSidebar } from '@/components/layouts/site-sidebar'
import { PostDisplaySkeleton } from '@/components/loadings/post-display-skeleton'
import { SiteSidebarSkeleton } from '@/components/loadings/site-sidebar-skeleton'
import { PostDisplay } from '@/components/post-display'
import { getSidebarCookies } from '@/cookies.server'
import { accessTokenAtom } from '@/hooks/use-access-token'
import { useMounted } from '@/hooks/use-mounted'
import { serverURLAtom } from '@/hooks/use-server-url'
import { ProfileService } from '@/lib/actions/profile'
import { getCookie } from '@/lib/utils'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { useHydrateAtoms } from 'jotai/utils'
import * as React from 'react'

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie') ?? ''

  console.log({ cookieHeader })

  const accessToken = getCookie('accessToken', cookieHeader)

  console.log({ accessToken })

  const serverURL = process.env.SERVER_URL

  console.log({ serverURL })

  const profileService = new ProfileService(serverURL)
  const profile = (await profileService.getMe(accessToken))?.data || null

  console.log({ profile })

  const { sidebarCookies, headers } = await getSidebarCookies(cookieHeader)
  const { collapsed, layout } = sidebarCookies

  return json(
    { collapsed, layout, profile, accessToken, serverURL },
    { headers },
  )
}

export default function Layout() {
  const data = useLoaderData<typeof loader>()
  const mounted = useMounted()

  console.log({ data })

  const defaultLayout = data.layout?.value || [20, 40, 40]
  const defaultCollapsed = data.collapsed?.value || false
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)

  useHydrateAtoms([[accessTokenAtom, data.accessToken]])
  useHydrateAtoms([[serverURLAtom, data.serverURL]])

  return (
    <div className="max-w-7xl mx-auto border-x">
      {mounted ? (
        <SiteLayout
          defaultLayout={defaultLayout}
          navCollapsedSize={4}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          leftSidebar={
            <SiteSidebar profile={data.profile} isCollapsed={isCollapsed} />
          }
          page={<Outlet />}
          rightSidebar={<PostDisplay profile={data.profile} />}
        />
      ) : (
        <SiteLayout
          defaultLayout={defaultLayout}
          navCollapsedSize={4}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          leftSidebar={<SiteSidebarSkeleton isCollapsed={isCollapsed} />}
          page={<Outlet />}
          rightSidebar={<PostDisplaySkeleton />}
        />
      )}
    </div>
  )
}
