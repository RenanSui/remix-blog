import { PageHeader, PageHeaderHeading } from '@/components/page-header'
import { ProfileForm } from '@/components/profile-form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { ProfileService } from '@/lib/actions/profile'
import { getCookie } from '@/lib/utils'
import { LoaderFunctionArgs, json, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie') ?? ''
  const accessToken = getCookie('accessToken', cookieHeader)
  if (!accessToken) return redirect('/signin')

  const profileService = new ProfileService(process.env.SERVER_URL)
  const profile = (await profileService.getMe(accessToken))?.data || null
  if (!profile) return redirect('/signin')

  return json({ profile })
}

export default function SettingsIndex() {
  const { profile } = useLoaderData<typeof loader>()

  return (
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
        <div className="p-4">
          <ProfileForm profile={profile} />
        </div>
      </ScrollArea>
    </main>
  )
}
