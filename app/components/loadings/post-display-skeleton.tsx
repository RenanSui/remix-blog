import { Separator } from '../ui/separator'
import { Skeleton } from '../ui/skeleton'

export function PostDisplaySkeleton() {
  return (
    <div className="flex h-full flex-col">
      <div className="p-2 gap-2 flex items-center justify-end">
        <Skeleton className="size-9" />
        <Separator orientation="vertical" className="mx-1 h-6" />
        <Skeleton className="size-9" />
      </div>
      <Separator />
      <Skeleton className="h-9 w-56 self-center mt-8" />
    </div>
  )
}
