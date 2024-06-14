import { cn } from "@/lib/utils";
import type { SidebarNavItem } from "@/types";
import { NavLink } from "@remix-run/react";
import { Icons } from "../icon";
import { buttonVariants } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  items: SidebarNavItem[];
  isCollapsed?: boolean;
}

export function SidebarNav({
  items,
  isCollapsed,
  className,
  ...props
}: SidebarNavProps) {
  if (!items?.length) return null;

  return (
    <div
      data-collapsed={isCollapsed}
      className={cn("group flex flex-col gap-4 text-sm py-2", className)}
      {...props}
    >
      <nav className="grid gap-1 group-[[data-collapsed=true]]:justify-center">
        {items.map((item, index) => {
          const Icon = Icons[item.icon ?? "chevronLeft"];

          return isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <NavLink
                aria-label={item.title}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-9",
                    isActive ? "bg-accent text-accent-foreground" : "",
                    item.disabled && "pointer-events-none opacity-60"
                  )
                }
              >
                <TooltipTrigger className="size-full flex items-center justify-center">
                    <Icon className="h-4 w-4" />
                    <span className="sr-only">{item.title}</span>
                </TooltipTrigger>
              </NavLink>
              <TooltipContent side="right" className="flex items-center gap-4">
                {item.title}
              </TooltipContent>
            </Tooltip>
          ) : (
            <NavLink
              aria-label={item.title}
              key={index}
              to={item.href}
              className={({ isActive, isPending }) => {
                return cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "w-full px-4",
                  isActive ? "bg-accent text-accent-foreground" : "",
                  item.disabled && "pointer-events-none opacity-60"
                );
              }}
            >
              <Icon className="mr-2 h-4 w-4 shrink-0" />
              <span className="mr-auto">{item.title}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
