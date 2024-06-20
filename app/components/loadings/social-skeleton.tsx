import { Icons } from '../icon'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import { Skeleton } from '../ui/skeleton'

export function SocialSkeleton() {
  return (
    <main>
      <ScrollArea className="overflow-y-auto h-screen">
        <div className="px-4 py-[15px] sticky border-b top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Skeleton className="w-48 h-[22px] " />
        </div>
        <Separator />
        <div className="pt-4">
          {Array.from({ length: 10 }).map((_, index) => (
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
  )
}
