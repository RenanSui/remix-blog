import { PageHeader, PageHeaderHeading } from '@/components/page-header'
import { PostList } from '@/components/post-list'
import {
  Profile,
  ProfileBanner,
  ProfileDescription,
  ProfileHeader,
} from '@/components/profile'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { usePostByUserId } from '@/hooks/post'
import { postService } from '@/lib/actions/post'
import { profileService } from '@/lib/actions/profile'
import { HTPPErrorMessages } from '@/lib/errors/handle-auth-error'
import { sortPostsByDate } from '@/lib/utils'
import { Post } from '@/types'
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { json, redirect, useLoaderData } from '@remix-run/react'

export async function loader({ params }: LoaderFunctionArgs) {
  const username = params.username
  if (!username) return redirect('/')

  const { data: profile, status } = await profileService.getByUsername(username)
  if (!profile) {
    const message = HTPPErrorMessages[status]
    throw new Response(null, {
      status: 404,
      statusText: message || 'An error has occured',
    })
  }

  return json({ profile })
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
  const posts = sortPostsByDate(usePostByUserId(profile?.userId).data?.data)

  return profile ? (
    <main>
      <ScrollArea className="overflow-y-auto h-screen">
        <PageHeader
          as="header"
          className="px-4 py-[15px] sticky border-b top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
          <PageHeaderHeading className="text-xl md:text-xl">
            {profile.name}&apos;s Profile
          </PageHeaderHeading>
        </PageHeader>
        <Separator />
        <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Profile>
            <ProfileBanner />
            <ProfileHeader className="-mt-16 mx-4">
              <Avatar className="size-32 border-4 border-background cursor-pointer">
                <AvatarImage className="size-32" src={profile.image} />
                <AvatarFallback>
                  {profile.name
                    .split(' ')
                    .map((chunk) => chunk[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <h2 className="font-bold text-xl -mb-1">{profile.name}</h2>
              <ProfileDescription variant="muted">
                @{profile.username}
              </ProfileDescription>
              <ProfileDescription className="py-4" size="sm">
                {profile.bio}
              </ProfileDescription>
            </ProfileHeader>
          </Profile>
          {posts && <PostList items={posts as unknown as Post[]} />}
        </div>
      </ScrollArea>
    </main>
  ) : null
}
