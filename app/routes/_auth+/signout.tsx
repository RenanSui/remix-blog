import { LogOutButtons } from '@/components/logout-button'
import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
} from '@/components/page-header'
import { Shell } from '@/components/shell'
import type { MetaFunction } from '@remix-run/node'

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
