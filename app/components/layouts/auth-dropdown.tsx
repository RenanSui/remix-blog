import { cn } from '@/lib/utils'
import { ExitIcon } from '@radix-ui/react-icons'
import { Link } from '@remix-run/react'
import { ChevronsUpDown } from 'lucide-react'
import { Icons } from '../icon'
import type { ButtonProps } from '../ui/button';
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

type User = { name: string }

type AuthDropdownProps = ButtonProps & {
  user: User | null
  isCollapsed?: boolean
}

export function AuthDropdown({
  user,
  isCollapsed,
  className,
  ...props
}: AuthDropdownProps) {
  if (!user) {
    return (
      <Button
        size="sm"
        variant="outline"
        className={cn('w-full', className)}
        {...props}
        asChild
      >
        <Link to="/signin">
          Sign In
          <span className="sr-only">Sign In</span>
        </Link>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full hover:bg-transparent',
            'flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0',
            isCollapsed &&
              'flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto',
          )}
        >
          <span className="flex w-full items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
            {/* eslint-disable-next-line react/jsx-pascal-case */}
            <Icons.logo className="size-4 shrink-0" />
            {isCollapsed ? null : user.name}
            <ChevronsUpDown
              className={cn('ml-auto size-4 shrink-0', isCollapsed && 'hidden')}
            />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="end" forceMount>
        <DropdownMenuItem asChild>
          <Link to="/signout">
            <ExitIcon className="mr-2 size-4" aria-hidden="true" />
            Log out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
