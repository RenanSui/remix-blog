import { profile } from '@/lib/actions/profile'
import { getCookie } from '@/lib/utils'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie') ?? ''
  const accessToken = getCookie('accessToken', cookieHeader)
  if (!accessToken) return redirect('/signin')

  const Profile = accessToken ? await profile.getMe(accessToken) : null
  if (!Profile) return redirect('/signin')

  return redirect(`/profile/${Profile.username}`)
}
