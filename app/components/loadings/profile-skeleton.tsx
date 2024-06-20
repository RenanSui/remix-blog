import { Icons } from '../icon'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import { Skeleton } from '../ui/skeleton'

export function ProfileSkeleton() {
  return (
    <main>
      <ScrollArea className="overflow-y-auto h-screen">
        <div className="px-4 py-[15px] sticky border-b top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Skeleton className="w-48 h-[22px] " />
        </div>
        <Separator />
        <div>
          <Skeleton className="w-full h-[200px]" />
          <div className="-mt-16 mx-4">
            <div className="relative z-10 size-32 bg-accent border-4 border-background rounded-full" />
            <Skeleton className="h-6 w-36 mb-1" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-full mt-4" />
            <Skeleton className="h-6 w-full my-1" />
            <Skeleton className="h-6 w-full my-1" />
          </div>

          <div className="pt-4">
            {Array.from({ length: 7 }).map((_, index) => (
              <Skeleton
                key={index}
                className="border mx-4 mb-4 py-1 cursor-pointer"
              >
                <Icons.spinner className="mx-auto animate-spin size-8 shrink-0 my-4" />
              </Skeleton>
            ))}
          </div>
        </div>
      </ScrollArea>
    </main>
  )
}
