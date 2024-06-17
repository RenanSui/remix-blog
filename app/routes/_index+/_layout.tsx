import { SiteLayout } from '@/components/layouts/site-layout'
import { SiteSidebar } from '@/components/layouts/site-sidebar'
import { getSidebarCookies } from '@/cookies.server'
import { accessTokenAtom } from '@/hooks/use-access-token'
import { useMounted } from '@/hooks/use-mounted'
import { profile } from '@/lib/actions/profile'
import { getCookie } from '@/lib/utils'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { useHydrateAtoms } from 'jotai/utils'
import * as React from 'react'

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie') ?? ''
  const { sidebarCookies, headers } = await getSidebarCookies(cookieHeader)

  const accessToken = getCookie('accessToken', cookieHeader)
  const Profile = accessToken ? await profile.getMe(accessToken) : null

  return json({ ...sidebarCookies, profile: Profile, accessToken }, { headers })
}

export default function Layout() {
  const data = useLoaderData<typeof loader>()
  const defaultLayout = data?.layout?.value || undefined
  const defaultCollapsed = data?.collapsed?.value || false
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)

  const mounted = useMounted()
  // const isTablet = useMediaQuery('(min-width: 768px)')
  // const [post] = usePost()

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
      rightSidebar={
        <div></div>
        // <PostDisplay
        //   profile={data.profile}
        //   post={posts.find((item) => item.id === post.selected)}
        // />
      }
    />
  ) : (
    <div></div>
  )
}
