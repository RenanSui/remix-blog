import { SiteLayout } from '@/components/layouts/site-layout'
import { SiteSidebar } from '@/components/layouts/site-sidebar'
import { PostDisplaySkeleton } from '@/components/loadings/post-display-skeleton'
import { SiteSidebarSkeleton } from '@/components/loadings/site-sidebar-skeleton'
import { PostDisplay } from '@/components/post-display'
import { getSidebarCookies } from '@/cookies.server'
import { accessTokenAtom } from '@/hooks/use-access-token'
import { useMounted } from '@/hooks/use-mounted'
import { profileService } from '@/lib/actions/profile'
import { getCookie } from '@/lib/utils'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { useHydrateAtoms } from 'jotai/utils'
import * as React from 'react'

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie') ?? ''
  const { sidebarCookies, headers } = await getSidebarCookies(cookieHeader)

  const accessToken = getCookie('accessToken', cookieHeader)
  const profile = accessToken ? await profileService.getMe(accessToken) : null

  return json({ ...sidebarCookies, profile, accessToken }, { headers })
}

export default function Layout() {
  const data = useLoaderData<typeof loader>()
  const defaultLayout = data?.layout?.value || [20, 40, 40]
  const defaultCollapsed = data?.collapsed?.value || false
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)
  const mounted = useMounted()
  useHydrateAtoms([[accessTokenAtom, data.accessToken]])

  return mounted ? (
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
      page={null}
      rightSidebar={<PostDisplaySkeleton />}
    />
  )
}
