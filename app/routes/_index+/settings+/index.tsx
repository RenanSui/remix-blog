import { SettingsSkeleton } from '@/components/loadings/settings-skeleton'
import { PageHeader, PageHeaderHeading } from '@/components/page-header'
import { ProfileForm } from '@/components/profile-form'
import { buttonVariants } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { accessTokenCookie } from '@/cookies.server'
import { useMounted } from '@/hooks/use-mounted'
import { ProfileService } from '@/lib/actions/profile'
import { cn } from '@/lib/utils'
import { Await, Link, useLoaderData } from '@remix-run/react'
import { defer, redirect, type LoaderFunctionArgs } from '@vercel/remix'
import * as React from 'react'

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie') ?? ''
  const accessToken: string | null = await accessTokenCookie.parse(cookieHeader)
  if (!accessToken) return redirect('/signin')

  const profileService = new ProfileService(process.env.SERVER_URL)
  const data = profileService.getMe(accessToken)

  return defer({ data })
}

export default function SettingsPage() {
  const { data } = useLoaderData<typeof loader>()
  const mounted = useMounted()

  return mounted ? (
    <main>
      <ScrollArea className="overflow-y-auto h-screen">
        <PageHeader
          as="header"
          className="px-4 py-[15px] sticky border-b top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
          <PageHeaderHeading className="text-xl md:text-xl">
            Settings
          </PageHeaderHeading>
        </PageHeader>
        <Separator />
        <React.Suspense fallback={<SettingsSkeleton />}>
          <Await resolve={data} errorElement={<p>Error loading settings</p>}>
            {(data) => {
              return data?.data ? (
                <div className="p-4">
                  <ProfileForm profile={data.data} />
                </div>
              ) : (
                <div className="p-8 flex flex-col items-center gap-4">
                  Sign in to modify your settings.
                  <Link
                    to="/signin"
                    className={cn(buttonVariants({ size: 'sm' }))}
                  >
                    Sign In
                  </Link>
                </div>
              )
            }}
          </Await>
        </React.Suspense>
      </ScrollArea>
    </main>
  ) : (
    <SettingsSkeleton />
  )
}
