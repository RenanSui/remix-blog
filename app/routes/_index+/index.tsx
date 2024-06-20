import { Icons } from '@/components/icon'
import { PageHeader, PageHeaderHeading } from '@/components/page-header'
import { PostList } from '@/components/post-list'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { usePostAll } from '@/hooks/post'
import { useMounted } from '@/hooks/use-mounted'
import { debounce } from '@/lib/utils'
import { type MetaFunction } from '@remix-run/node'
import * as React from 'react'

export const meta: MetaFunction = () => {
  return [
    { title: 'Home / Blog' },
    { name: 'description', content: 'Simple Blog built with Remix.' },
  ]
}

export default function Index() {
  const mounted = useMounted()
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const { data, ...reactQuery } = usePostAll(0, 10)

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
        <PageHeader as="header" className="px-4 py-[15px]">
          <PageHeaderHeading className="text-xl md:text-xl">
            Home
          </PageHeaderHeading>
        </PageHeader>
        <Separator />
        <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <form className="p-4">
            <div className="relative">
              <Icons.search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search" className="pl-8" />
            </div>
          </form>

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
    <main>
      <ScrollArea className="overflow-y-auto h-screen">
        <div className="px-4 py-[15px] sticky border-b top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Skeleton className="w-48 h-[22px] " />
        </div>
        <Separator />
        <div className="p-4 space-y-8">
          <Skeleton className="w-full h-10" />
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton
            key={index}
            className="border mx-4 mb-4 py-1 cursor-pointer"
          >
            <Icons.spinner className="mx-auto animate-spin size-8 shrink-0 my-4" />
          </Skeleton>
        ))}
      </ScrollArea>
    </main>
  )
}
