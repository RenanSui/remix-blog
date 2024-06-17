import { cn, serializeValue, setCookie } from '@/lib/utils'
import * as React from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../ui/resizable'
import { TooltipProvider } from '../ui/tooltip'

interface SiteLayoutProps {
  // mails: Mail[]
  defaultLayout: number[] | undefined
  navCollapsedSize: number
  isCollapsed: boolean
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>

  leftSidebar: React.ReactNode
  page: React.ReactNode
  rightSidebar: React.ReactNode
}

export function SiteLayout({
  defaultLayout = [20, 80],
  isCollapsed,
  setIsCollapsed,
  navCollapsedSize,
  leftSidebar,
  rightSidebar,
  page,
}: SiteLayoutProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          setCookie({
            name: 'react-resizable-panels:layout',
            value: serializeValue(sizes),
            path: '/',
            maxAge: 60 * 60 * 24 * 30 * 12, // 360 Days
          })
        }}
        className="h-full items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            setIsCollapsed(true)
            setCookie({
              name: 'react-resizable-panels:collapsed',
              value: serializeValue(true),
              path: '/',
              maxAge: 60 * 60 * 24 * 30 * 12, // 360 Days
            })
          }}
          onExpand={() => {
            setIsCollapsed(false)
            setCookie({
              name: 'react-resizable-panels:collapsed',
              value: serializeValue(false),
              path: '/',
              maxAge: 60 * 60 * 24 * 30 * 12, // 360 Days
            })
          }}
          className={cn(
            isCollapsed &&
              'min-w-[50px] transition-all duration-300 ease-in-out',
          )}
        >
          {leftSidebar}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize={defaultLayout[1]}
          minSize={25}
          maxSize={50}
        >
          {page}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
          {rightSidebar}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}
