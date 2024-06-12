import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import * as React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { AuthDropdown } from "./auth-dropdown";
import { SidebarNav } from "./sidebar-nav";

interface SiteLayoutProps {
  user: { name: string };
  // mails: Mail[]
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
  page: React.ReactNode;
}

export default function SiteLayout({
  user,
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
  page,
}: SiteLayoutProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes
        )}`;
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
          setIsCollapsed(true);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            true
          )}`;
        }}
        onExpand={() => {
          setIsCollapsed(false);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            false
          )}`;
        }}
        className={cn(
          isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out"
        )}
      >
        <div
          className={cn(
            "flex h-[52px] items-center justify-center",
            isCollapsed ? "h-[52px]" : "px-2"
          )}
        >
          <AuthDropdown user={user} isCollapsed={isCollapsed} />
        </div>
        <Separator />
        <aside>
          <ScrollArea className="h-[calc(100vh-3.3rem)]">
            <SidebarNav
              items={siteConfig.sidebarNav}
              className="px-2 py-2"
              isCollapsed={isCollapsed}
            />
            <Separator />
            <SidebarNav
              items={siteConfig.dashboardNav}
              className="px-2 py-2"
              isCollapsed={isCollapsed}
            />
          </ScrollArea>
        </aside>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        {page}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
