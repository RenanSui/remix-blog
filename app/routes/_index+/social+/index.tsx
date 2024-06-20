import { Icons } from '@/components/icon'
import { SocialSkeleton } from '@/components/loadings/social-skeleton'
import { PageHeader, PageHeaderHeading } from '@/components/page-header'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useMounted } from '@/hooks/use-mounted'
import { useProfileAll } from '@/hooks/use-profile'
import { debounce } from '@/lib/utils'
import { Profile } from '@/types'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Separator } from '@radix-ui/react-separator'
import { useNavigate } from '@remix-run/react'
import * as React from 'react'

export default function SocialPage() {
  const mounted = useMounted()
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const { data, ...reactQuery } = useProfileAll(0, 15)

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

  return mounted ? (
    <main>
      <ScrollArea temporaryRef={scrollRef} className="overflow-y-auto h-screen">
        <PageHeader
          as="header"
          className="px-4 py-[15px] sticky border-b top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
          <PageHeaderHeading className="text-xl md:text-xl">
            Social
          </PageHeaderHeading>
        </PageHeader>
        <Separator />
        <div>
          <div className="p-4 space-y-2">
            {data?.pages.map((profiles, index) =>
              profiles.data?.map((profile) => (
                <ProfileItem key={index} profile={profile} />
              )),
            )}
          </div>

          {!reactQuery.hasNextPage && !reactQuery.isFetchingNextPage && (
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  End of Profiles
                </span>
              </div>
            </div>
          )}

          {reactQuery.isFetchingNextPage &&
            Array.from({ length: 7 }).map((_, index) => (
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
  ) : (
    <SocialSkeleton />
  )
}

export const ProfileItem = ({ profile }: { profile: Profile }) => {
  const navigate = useNavigate()

  return (
    <button
      className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent w-full"
      onClick={() =>
        navigate(`/profile/${profile.username}`, { replace: false })
      }
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-start">
          <div className="flex items-start gap-4 text-sm">
            <Avatar>
              <AvatarImage
                className="size-10 rounded-full"
                src={profile?.image}
                alt={`${profile?.username}'s profile picture.`}
              />
              <AvatarFallback>
                {profile?.name
                  .split(' ')
                  .map((chunk) => chunk[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex gap-2">
                <div className="font-semibold">{profile?.name}</div>
                <div className="font-semibold text-muted-foreground/50">
                  @{profile?.username}
                </div>
              </div>
              <div className="line-clamp-2 text-muted-foreground">
                {profile.bio?.substring(0, 300)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}
