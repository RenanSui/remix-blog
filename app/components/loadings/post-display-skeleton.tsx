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
      <Skeleton className="h-9 w-56 self-center mt-8" />
    </div>
  )
}
