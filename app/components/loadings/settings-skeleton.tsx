import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import { Skeleton } from '../ui/skeleton'

export function SettingsSkeleton() {
  return (
    <main>
      <ScrollArea className="overflow-y-auto h-screen">
        <div className="px-4 py-[15px] sticky border-b top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Skeleton className="w-48 h-[22px] " />
        </div>
        <Separator />
        <div className="p-4 space-y-8">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="w-24 h-5" />
              <Skeleton className="w-full h-10" />
            </div>
          ))}
          <Skeleton className="w-36 h-10" />
        </div>
      </ScrollArea>
    </main>
  )
}
