import { LogOutButtons } from '@/components/logout-button'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Shell } from '@/components/shell'
import { profile } from '@/lib/actions/profile'
import { getCookie } from '@/lib/utils'
import {
  LoaderFunctionArgs,
  redirect,
  type MetaFunction,
} from '@remix-run/node'

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie') ?? ''
  const accessToken = getCookie('accessToken', cookieHeader)
  const Profile = accessToken ? await profile.getMe(accessToken) : null
  return !Profile ? redirect('/signin') : null
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
