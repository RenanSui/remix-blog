'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useMounted } from '@/hooks/use-mounted'
import { auth } from '@/lib/actions/auth'
import { cn } from '@/lib/utils'
import { useNavigate } from '@remix-run/react'

export function LogOutButtons() {
  const navigate = useNavigate()
  const mounted = useMounted()

  return (
    <div className="flex w-full flex-col-reverse items-center gap-2 sm:flex-row">
      <Button
        variant="secondary"
        size="sm"
        className="w-full"
        onClick={() => navigate(-1)}
      >
        Go back
        <span className="sr-only">Previous page</span>
      </Button>
      {mounted ? (
        <Button
          size="sm"
          className="w-full"
          onClick={() => {
            auth.signOut()
            navigate('/')
          }}
        >
          Log out
          <span className="sr-only">Log out</span>
        </Button>
      ) : (
        <Skeleton
          className={cn(
            buttonVariants({ size: 'sm' }),
            'w-full bg-muted text-muted-foreground',
          )}
        >
          Log out
        </Skeleton>
      )}
    </div>
  )
}
