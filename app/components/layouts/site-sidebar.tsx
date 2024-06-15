import { siteConfig } from '@/config/site'
import { Profile } from '@/types'
import * as React from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import { AuthDropdown } from './auth-dropdown'
import { SidebarNav } from './sidebar-nav'

type SiteSidebarProps = React.HTMLAttributes<HTMLDivElement> & {
  profile: Profile | null
  isCollapsed: boolean
}

export function SiteSidebar({ isCollapsed, profile }: SiteSidebarProps) {
  return (
    <aside>
      <div className="flex items-center justify-center p-2">
        <AuthDropdown profile={profile} isCollapsed={isCollapsed} />
      </div>
      <Separator />
      <div>
        <ScrollArea className="h-[calc(100vh-3.3rem)]">
          <SidebarNav
            items={siteConfig.sidebarNav}
            className="p-2"
            isCollapsed={isCollapsed}
          />
          <Separator />
          <SidebarNav
            items={siteConfig.dashboardNav}
            className="p-2"
            isCollapsed={isCollapsed}
          />
        </ScrollArea>
      </div>
    </aside>
  )
}
