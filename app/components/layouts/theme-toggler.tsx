import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'
import { Icons } from '../icon'

export const ThemeToggler = ({
  labelled,
  combobox,
}: {
  labelled?: boolean
  combobox?: boolean
}) => {
  const { setTheme, theme } = useTheme()

  useEffect(() => {
    setTimeout(() => theme)
  }, [theme])

  if (combobox) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            size="sm"
            className="w-fit justify-between p-1 py-0"
          >
            <div className="flex items-center gap-1 capitalize">
              <Icons.sun className="h-3 w-3 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Icons.moon className="absolute h-3 w-3 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              {theme}
              <Icons.caretSortIcon className="h-4 w-4 shrink-0 opacity-50" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-0">
          <DropdownMenuItem
            role="light-toggle"
            onClick={() => setTheme('light')}
          >
            <Icons.sun className="mr-2 h-3 w-3" />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem role="dark-toggle" onClick={() => setTheme('dark')}>
            <Icons.moon className="mr-2 h-3 w-3" />
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            role="system-toggle"
            onClick={() => setTheme('system')}
          >
            <Icons.laptopIcon className="mr-2 h-3 w-3" />
            <span>System</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={labelled ? 'default' : 'icon'}
          aria-label="theme-toggler"
        >
          <span className="item-center flex gap-2 capitalize">
            <Icons.sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Icons.moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            {labelled ? theme : null}
          </span>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem role="light-toggle" onClick={() => setTheme('light')}>
          <Icons.sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem role="dark-toggle" onClick={() => setTheme('dark')}>
          <Icons.moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          role="system-toggle"
          onClick={() => setTheme('system')}
        >
          <Icons.laptopIcon className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
