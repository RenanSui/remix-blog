import { cn } from '@/lib/utils'
import { SidebarNavItem } from '@/types'
import { Link } from '@remix-run/react'
import { Icons } from '../icon'
import { buttonVariants } from '../ui/button'

export interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  items: SidebarNavItem[]
}

export function SidebarNav({ items, className, ...props }: SidebarNavProps) {
  if (!items?.length) return null

  return (
    <div
      className={cn('flex w-full flex-col gap-1 text-sm', className)}
      {...props}
    >
      {items.map((item, index) => {
        const Icon = Icons[item.icon ?? 'chevronLeft']

        return (
          <Link aria-label={item.title} key={index} to={item.href}>
            <span
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'group flex justify-start px-3 gap-2',
                item.disabled && 'pointer-events-none opacity-60',
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              <span>{item.title}</span>
            </span>
          </Link>
        )
      })}
    </div>
  )
}
