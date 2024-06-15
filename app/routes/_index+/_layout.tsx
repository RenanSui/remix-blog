import { SiteLayout } from '@/components/layouts/site-layout'
import { SiteSidebar } from '@/components/layouts/site-sidebar'
import { useMediaQuery } from '@/hooks/use-media-query'
import { profile } from '@/lib/actions/profile'
import { getSidebarCookies } from '@/lib/cookies'
import { getCookie } from '@/lib/utils'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import * as React from 'react'

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie') ?? ''
  const { sidebarCookies, headers } = await getSidebarCookies(cookieHeader)

  const accessToken = getCookie('accessToken', cookieHeader)
  const Profile = accessToken ? await profile.getMe(accessToken) : null

  return json({ ...sidebarCookies, profile: Profile }, { headers })
}

export default function Layout() {
  const data = useLoaderData<typeof loader>()
  const defaultLayout = data?.layout ? data.layout.value : undefined
  const defaultCollapsed = data?.collapsed ? data.collapsed.value : false
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)
  const isTablet = useMediaQuery('(min-width: 768px)')

  return isTablet ? (
    <SiteLayout
      defaultLayout={defaultLayout}
      navCollapsedSize={4}
      isCollapsed={isCollapsed}
      setIsCollapsed={setIsCollapsed}
      leftSidebar={
        <SiteSidebar profile={data.profile} isCollapsed={isCollapsed} />
      }
      page={<Outlet />}
      rightSidebar={<div>Oi</div>}
    />
  ) : (
    <Outlet />
  )
}
