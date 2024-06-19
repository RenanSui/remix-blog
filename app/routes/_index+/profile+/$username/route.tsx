import { Icons } from '@/components/icon'
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
import { Skeleton } from '@/components/ui/skeleton'
import { usePostByUserId } from '@/hooks/post'
import { ProfileService } from '@/lib/actions/profile'
import { HTPPErrorMessages } from '@/lib/errors/handle-auth-error'
import { debounce } from '@/lib/utils'
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { json, redirect, useLoaderData } from '@remix-run/react'
import * as React from 'react'

export async function loader({ params }: LoaderFunctionArgs) {
  const username = params.username
  if (!username) return redirect('/')

  const profileService = new ProfileService(process.env.SERVER_URL)
  const { data: profile, status } = await profileService.getByUsername(username)

  if (!profile) {
    const message = HTPPErrorMessages[status]
    throw new Response(null, { status: 404, statusText: message })
  }

  return json({ profile })
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const profile = data?.profile
  const title = `${profile?.name} (@${profile?.username}) / Blog`

  return [
    { title: profile ? title : 'Profile' },
    { name: 'description', content: 'Simple Blog built with Remix.' },
  ]
}

export default function ProfilePage() {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const { profile } = useLoaderData<typeof loader>()
  const { data, ...reactQuery } = usePostByUserId(profile?.userId, 0, 7)

  const handleScroll = debounce((e: Event) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLElement
    if (clientHeight + scrollTop + scrollHeight / 3 >= scrollHeight) {
      reactQuery.fetchNextPage()
    }
  }, 500)

  React.useEffect(() => {
    if (!scrollRef.current) return

    const main = scrollRef.current
    main.addEventListener('scroll', handleScroll)
    return () => main.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return profile ? (
    <main>
      <ScrollArea temporaryRef={scrollRef} className="overflow-y-auto h-screen">
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

          {data?.pages.map(
            (posts, index) =>
              posts.data && <PostList key={index} items={posts.data} />,
          )}

          {!reactQuery.hasNextPage && !reactQuery.isFetchingNextPage && (
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  End of Posts
                </span>
              </div>
            </div>
          )}

          {reactQuery.isFetchingNextPage &&
            Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                className="border mx-4 mb-4 py-1 cursor-pointer"
              >
                <Icons.spinner className="mx-auto animate-spin size-8 shrink-0 my-4" />
              </Skeleton>
            ))}
        </div>
      </ScrollArea>
    </main>
  ) : null
}
