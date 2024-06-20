import { cn } from '@/lib/utils'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import * as React from 'react'

interface ProfileProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
}

export function Profile({
  className,
  children,
  as: Comp = 'section',
  ...props
}: ProfileProps) {
  return (
    <Comp className={cn('', className)} {...props}>
      {children}
    </Comp>
  )
}

export function ProfileBanner({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('w-full h-[200px] bg-accent', className)} {...props} />
  )
}

type ProfileHeaderProps = React.HTMLAttributes<HTMLDivElement>

export function ProfileHeader({
  className,
  children,
  ...props
}: ProfileHeaderProps) {
  return (
    <header className={cn(className)} {...props}>
      {children}
    </header>
  )
}

interface ProfileHeaderHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export function ProfileHeaderHeading({
  className,
  as: Comp = 'h1',
  ...props
}: ProfileHeaderHeadingProps) {
  return <Comp className={cn('font-bold text-xl', className)} {...props} />
}

const descriptionVariants = cva('max-w-[46.875rem] text-balance', {
  variants: {
    variant: {
      default: '',
      muted: 'text-muted-foreground/50',
    },
    size: {
      default: 'text-base sm:text-lg',
      sm: 'text-sm sm:text-base',
      lg: 'text-lg sm:text-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

interface ProfileDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof descriptionVariants> {}

export function ProfileDescription({
  className,
  variant,
  size,
  ...props
}: ProfileDescriptionProps) {
  return (
    <p
      className={cn(descriptionVariants({ variant, size, className }))}
      {...props}
    />
  )
}
