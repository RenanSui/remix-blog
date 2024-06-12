import { cn } from '@/lib/utils'
import type { SidebarNavItem } from '@/types'
import { Link } from '@remix-run/react'
import { Icons } from '../icon'
import { buttonVariants } from '../ui/button'

export interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  items: SidebarNavItem[]
  isCollapsed?: boolean
}

export function SidebarNav({
  items,
  isCollapsed,
  className,
  ...props
}: SidebarNavProps) {
  if (!items?.length) return null

  return (
    <div
      data-collapsed={isCollapsed}
      className={cn(
        'group flex flex-col gap-4 text-sm py-2',
        className,
      )}
      {...props}
    >
      <nav className="grid gap-1 group-[[data-collapsed=true]]:justify-center">
        {items.map((item, index) => {
          const Icon = Icons[item.icon ?? 'chevronLeft']

          return isCollapsed ? (
            <Link
              aria-label={item.title}
              key={index}
              to={item.href}
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                'h-9 w-9',
                item.disabled && 'pointer-events-none opacity-60',
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="sr-only">{item.title}</span>
            </Link>
          ) : (
            <Link
              aria-label={item.title}
              key={index}
              to={item.href}
              className={cn(
                buttonVariants({ variant: 'ghost', size: "sm" }),
                'w-full',
                item.disabled && 'pointer-events-none opacity-60',
              )}
            >
              <Icon className="mr-2 h-4 w-4" />
              <span className='mr-auto'>{item.title}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
