import { Separator } from '../ui/separator'
import { Skeleton } from '../ui/skeleton'

export function PostDisplaySkeleton() {
  return (
    <div className="flex h-full flex-col">
      <div className="p-2 gap-2 flex items-center justify-between">
        <div className="flex gap-2">
          <Skeleton className="size-9" />
          <Skeleton className="size-9" />
          <Skeleton className="size-9" />
        </div>
        <Skeleton className="size-9" />
      </div>
      <Separator />
      <div className="">
        <div className="flex items-start gap-4 text-sm p-4">
          <Skeleton className="rounded-full size-10" />
          <div className="grid space-y-1">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        <Separator />
        <div className="px-4">
          <Skeleton className="h-6 w-full mt-4" />
          <Skeleton className="h-6 w-full my-1" />
          <Skeleton className="h-6 w-full my-1" />
        </div>
      </div>
    </div>
  )
}
