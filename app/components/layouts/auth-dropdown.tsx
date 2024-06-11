import { cn } from '@/lib/utils'
import { ExitIcon } from '@radix-ui/react-icons'
import { Link } from '@remix-run/react'
import { ChevronsUpDown } from 'lucide-react'
import { Icons } from '../icon'
import { Button, ButtonProps } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

type User = { name: string }

type AuthDropdownProps = ButtonProps & {
  user: User | null
}

export function AuthDropdown({ user, className, ...props }: AuthDropdownProps) {
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
        <Button variant="outline" className="w-full hover:bg-transparent">
          <Icons.logo className="size-4 min-h-4 min-w-4 mr-2" />
          <span className="mr-auto max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
            {user.name}
          </span>
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
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
