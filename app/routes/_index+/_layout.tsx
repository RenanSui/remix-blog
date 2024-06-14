import SiteLayout from '@/components/layouts/site-layout'
import { profile } from '@/lib/actions/profile'
import { getSidebarCookies } from '@/lib/cookies'
import { getCookie } from '@/lib/utils'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'

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
  const defaultCollapsed = data?.collapsed ? data.collapsed.value : undefined

  return (
    <SiteLayout
      page={<Outlet />}
      profile={data.profile}
      defaultLayout={defaultLayout}
      defaultCollapsed={defaultCollapsed}
      navCollapsedSize={4}
    />
  )
}
