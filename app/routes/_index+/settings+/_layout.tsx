import { SettingsSkeleton } from '@/components/loadings/settings-skeleton'
import { useMounted } from '@/hooks/use-mounted'
import { ProfileService } from '@/lib/actions/profile'
import { getCookie } from '@/lib/utils'
import { Outlet } from '@remix-run/react'
import { redirect, type LoaderFunctionArgs } from '@vercel/remix'

export const config = { runtime: 'edge' }

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie') ?? ''
  const accessToken = getCookie('accessToken', cookieHeader)
  if (!accessToken) return redirect('/signin')

  const profileService = new ProfileService(process.env.SERVER_URL)
  const data = await profileService.getMe(accessToken)
  if (!data?.data) return redirect('/signin')

  return null
}

export default function Layout() {
  const mounted = useMounted()
  return mounted ? <Outlet /> : <SettingsSkeleton />
}
