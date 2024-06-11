import { cn } from '@/lib/utils'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import { AuthDropdown } from './auth-dropdown'
import { SidebarNav } from './sidebar-nav'
import { siteConfig } from '@/config/site'

type User = { name: string }

type SiteSidebarProps = React.HTMLAttributes<HTMLElement> & {
  user: User | null
}

export function SiteSidebar({ user, className }: SiteSidebarProps) {
  return (
    <aside className={cn('h-screen w-full max-w-64 border-r', className)}>
      <div>
        <div className="p-2">
          <AuthDropdown user={user} />
        </div>
        <Separator />
        <ScrollArea className="h-[calc(100vh-3.5rem)]">
          <SidebarNav items={siteConfig.sidebarNav} className="px-3 py-2" />
          <Separator />
          <SidebarNav items={siteConfig.dashboardNav} className="px-3 py-2" />
        </ScrollArea>
      </div>
    </aside>
  )
}
