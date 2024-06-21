import { ProfileService } from '@/lib/actions/profile'
import { getCookie } from '@/lib/utils'
import { redirect, type LoaderFunctionArgs } from '@vercel/remix'

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie') ?? ''
  const accessToken = getCookie('accessToken', cookieHeader)
  if (!accessToken) return redirect('/signin')

  const profileService = new ProfileService(process.env.SERVER_URL)
  const profile = (await profileService.getMe(accessToken))?.data || null
  if (!profile) return redirect('/signin')

  return redirect(`/profile/${profile.username}`)
}
