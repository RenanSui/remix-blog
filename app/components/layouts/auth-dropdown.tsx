import { cn } from '@/lib/utils'
import type { Profile } from '@/types'
import { Link } from '@remix-run/react'
import { Icons } from '../icon'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import type { ButtonProps } from '../ui/button'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { ThemeToggler } from './theme-toggler'

type AuthDropdownProps = ButtonProps & {
  profile: Profile | null
  isCollapsed?: boolean
}

export function AuthDropdown({
  profile,
  isCollapsed,
  className,
  ...props
}: AuthDropdownProps) {
  if (!profile) {
    return (
      <Button
        size="sm"
        variant="default"
        className={cn('w-full', isCollapsed && 'h-9 w-9', className)}
        {...props}
        asChild
      >
        <Link to="/signin" className="gap-2">
          <Icons.logInIcon className="size-4 shrink-0" />
          <span className={cn('mr-auto', isCollapsed && 'hidden')}>
            Sign In
          </span>
          <span className="sr-only">Sign In</span>
        </Link>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={cn('', className)}>
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
            {profile?.image ? (
              <Avatar className="size-4">
                <AvatarImage
                  src={profile?.image}
                  alt={`${profile?.username}'s profile picture.`}
                />
                <AvatarFallback>
                  {profile.name
                    .split(' ')
                    .map((chunk) => chunk[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
            ) : (
              <Icons.logo className="mr-1" />
            )}
            {isCollapsed ? null : profile.name}
            <Icons.chevronsUpDown
              className={cn('ml-auto size-4 shrink-0', isCollapsed && 'hidden')}
            />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 ml-2" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{profile.name}</p>
            <p className="text-xs leading-none text-neutral-500">
              {profile.username}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <div className="flex items-center justify-between px-2 py-1.5">
            <div className="flex items-center text-sm">
              <Icons.sun className="mr-2 size-4" aria-hidden="true" />
              Theme
            </div>
            <ThemeToggler combobox />
          </div>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/signout">
            <Icons.exitIcon className="mr-2 size-4" aria-hidden="true" />
            Log out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
