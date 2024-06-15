import { PageHeader, PageHeaderHeading } from '@/components/page-header'
import {
  Profile,
  ProfileBanner,
  ProfileDescription,
  ProfileHeader,
} from '@/components/profile'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { Separator } from '@/components/ui/separator'
import { profile } from '@/lib/actions/profile'
import { HTPPErrorMessages } from '@/lib/errors/handle-auth-error'
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { json, redirect, useLoaderData } from '@remix-run/react'

export async function loader({ params }: LoaderFunctionArgs) {
  const username = params.username
  if (!username) return redirect('/')

  const { data, status } = await profile.getByUsername(username)
  if (!data) {
    const message = HTPPErrorMessages[status]
    throw new Response(null, {
      status: 404,
      statusText: message || 'An error has occured',
    })
  }

  // const posts = posts.getByUserId

  return json({ profile: data })
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const profile = data?.profile

  return [
    {
      title: profile
        ? `${profile.name} (@${profile.username}) / Blog`
        : 'Profile',
    },
    { name: 'description', content: 'Simple Blog built with Remix.' },
  ]
}

export default function ProfilePage() {
  const { profile } = useLoaderData<typeof loader>()

  return profile ? (
    <main>
      <PageHeader as="header" className="px-4 py-[15px]">
        <PageHeaderHeading className="text-xl md:text-xl">
          Profile
        </PageHeaderHeading>
      </PageHeader>
      <Separator />
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Profile>
          <ProfileBanner />
          <ProfileHeader className="-mt-16 mx-4">
            <Avatar className="size-32 border-4 border-background cursor-pointer">
              <AvatarImage className="size-32" src={profile.image} />
              <AvatarFallback />
            </Avatar>
            <h2 className="font-bold text-xl -mb-1">{profile.name}</h2>
            <ProfileDescription variant="muted">
              @{profile.username}
            </ProfileDescription>
            <ProfileDescription className="py-4" size="sm">
              {profile.bio}
              Freelance Artist│Acid Bufferzone, SILENT HILL 1/2/3/Short
              Message_Art direction/creature, environment design, etc.│Prohibit
              the use of contents for AI training
            </ProfileDescription>
          </ProfileHeader>
        </Profile>
        <pre className="p-4">{JSON.stringify(profile, null, 2)}</pre>
      </div>
    </main>
  ) : null
}
