import { LogOutButtons } from '@/components/logout-button'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Shell } from '@/components/shell'
import { ProfileService } from '@/lib/actions/profile'
import { getCookie } from '@/lib/utils'
import { LoaderFunctionArgs, redirect, type MetaFunction } from '@vercel/remix'

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie') ?? ''
  const accessToken = getCookie('accessToken', cookieHeader)

  const profileService = new ProfileService(process.env.SERVER_URL)
  const profile = (await profileService.getMe(accessToken))?.data || null

  return !profile ? redirect('/signin') : null
}

export const meta: MetaFunction = () => {
  return [{ title: 'Blog - Sign out', description: 'Sign out of your account' }]
}

export default function SignOutPage() {
  return (
    <Shell className="max-w-md">
      <PageHeader className="text-center">
        <PageHeaderHeading size="sm">Sign out</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Are you sure you want to sign out?
        </PageHeaderDescription>
      </PageHeader>
      <LogOutButtons />
    </Shell>
  )
}
