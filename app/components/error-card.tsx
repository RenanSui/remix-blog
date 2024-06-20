import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import * as React from 'react'

import { buttonVariants } from '@/components/ui/button'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Link } from '@remix-run/react'

interface ErrorCardProps extends React.ComponentPropsWithoutRef<typeof Card> {
  icon?: React.ComponentType<{ className?: string }>
  title: string
  description: string
  retryLink?: string
  retryLinkText?: string
  reset?: () => void
}

export function ErrorCard({
  icon: Icon = ExclamationTriangleIcon,
  title,
  description,
  retryLink,
  retryLinkText = 'Go back',
  className,
  ...props
}: ErrorCardProps) {
  return (
    <Card
      as="section"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={cn(
        'flex w-full min-w-0 flex-col items-center justify-center overflow-hidden p-10',
        className,
      )}
      {...props}
    >
      <div className="grid place-items-center rounded-full border border-dashed border-muted-foreground/75 p-6">
        <Icon className="size-10 text-muted-foreground/75" aria-hidden="true" />
      </div>
      <div className="flex flex-col items-center justify-center space-y-1.5 py-14 text-center">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="line-clamp-4">
          {description}
        </CardDescription>
      </div>
      {retryLink ? (
        <Link
          to={retryLink}
          className={cn(
            buttonVariants({
              variant: 'ghost',
            }),
          )}
        >
          {retryLinkText}
          <span className="sr-only">{retryLinkText}</span>
        </Link>
      ) : null}
    </Card>
  )
}
