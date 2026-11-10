import React from 'react'
import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '../../lib/utils'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-semibold transition-[background-color,color,border-color,box-shadow,transform] duration-fast ease-out disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
  {
    variants: {
      variant: {
        // Deep green: the main action on a page
        primary:
          'rounded-full bg-brand-solid text-white shadow-soft hover:bg-brand-800 hover:shadow-raised active:translate-y-px dark:hover:bg-brand-500',
        // Gold: the one emphasised action, e.g. "Apply now"
        secondary:
          'rounded-full bg-gold-400 text-brand-950 shadow-soft hover:bg-gold-300 hover:shadow-raised active:translate-y-px',
        outline:
          'rounded-full border border-line-strong bg-transparent text-ink hover:border-brand hover:bg-brand-solid/5 active:translate-y-px',
        ghost: 'rounded-full text-ink-muted hover:bg-sunken hover:text-ink',
        // For dark green bands
        inverse:
          'rounded-full border border-white/35 bg-white/5 text-white hover:border-white/70 hover:bg-white/15 active:translate-y-px',
        // Text link with the drawn gold underline
        link: 'link-underline rounded-sm text-brand'
      },
      size: {
        sm: 'min-h-9 px-4 text-sm',
        md: 'min-h-11 px-5 text-[0.9375rem]',
        lg: 'min-h-[3.25rem] px-7 text-base'
      }
    },
    compoundVariants: [{ variant: 'link', className: 'min-h-0 px-0 pb-0.5' }],
    defaultVariants: { variant: 'primary', size: 'md' }
  }
)

export type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>['variant']>
export type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>['size']>

/** Class names for anything that should look like a button. */
export function buttonStyles(options: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) {
  const { className, ...variants } = options
  return cn(buttonVariants(variants), className)
}

interface SharedProps {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Icon before the label (decorative) */
  leftIcon?: React.ReactNode
  /** Icon after the label (decorative) */
  rightIcon?: React.ReactNode
}

export interface ButtonProps extends SharedProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Shows a spinner and blocks further clicks while a request is running */
  loading?: boolean
  ref?: React.Ref<HTMLButtonElement>
}

export default function Button({
  className,
  variant,
  size,
  type = 'button',
  loading = false,
  leftIcon,
  rightIcon,
  disabled,
  children,
  ref,
  ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonStyles({ variant, size, className })}
      {...props}
    >
      {loading ? <Loader2 className='h-4 w-4 animate-spin' aria-hidden /> : leftIcon}
      {children}
      {rightIcon}
    </button>
  )
}

export interface ButtonLinkProps extends SharedProps, Omit<React.ComponentProps<typeof Link>, 'className'> {
  className?: string
}

/** A link that looks like a button. Use this instead of nesting a <button> inside a link. */
export function ButtonLink({ variant, size, className, leftIcon, rightIcon, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonStyles({ variant, size, className })} {...props}>
      {leftIcon}
      {children}
      {rightIcon}
    </Link>
  )
}
