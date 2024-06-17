import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import { Skeleton } from '../ui/skeleton'

type SiteSidebarProps = React.HTMLAttributes<HTMLDivElement> & {
  isCollapsed: boolean
}

export function SiteSidebarSkeleton({ isCollapsed }: SiteSidebarProps) {
  return (
    <aside>
      <div className="flex items-center justify-center p-2">
        <Skeleton className={cn('w-full h-9', isCollapsed && 'size-9')} />
      </div>
      <Separator />
      <div>
        <ScrollArea className="h-[calc(100vh-3.3rem)]">
          <div
            data-collapsed={isCollapsed}
            className="group flex flex-col gap-4 text-sm p-2"
          >
            <div className="grid gap-1 group-[[data-collapsed=true]]:justify-center">
              {siteConfig.sidebarNav.map((item, index) => {
                return isCollapsed ? (
                  <Skeleton className="size-9" key={`nav-${index}`} />
                ) : (
                  <Skeleton className="w-full h-9" key={`nav-${index}`} />
                )
              })}
            </div>
          </div>
          <Separator />
          <div
            data-collapsed={isCollapsed}
            className="group flex flex-col gap-4 text-sm p-2"
          >
            <div className="grid gap-1 group-[[data-collapsed=true]]:justify-center">
              {siteConfig.dashboardNav.map((item, index) => {
                return isCollapsed ? (
                  <Skeleton className="size-9" key={`nav-${index}`} />
                ) : (
                  <Skeleton className="w-full h-9" key={`nav-${index}`} />
                )
              })}
            </div>
          </div>
        </ScrollArea>
      </div>
    </aside>
  )
}
