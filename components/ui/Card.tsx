import React from 'react'
import Image from 'next/image'
import { cn } from '../../lib/utils'

/**
 * Card: a surface for one self-contained piece of content.
 *
 * Compose it from parts:
 *   <Card>
 *     <Card.Media src alt />
 *     <Card.Body>
 *       <Card.Eyebrow>…</Card.Eyebrow>
 *       <Card.Title>…</Card.Title>
 *       <Card.Meta>…</Card.Meta>
 *     </Card.Body>
 *     <Card.Footer>…</Card.Footer>
 *   </Card>
 *
 * The `image`, `header` and `footer` props remain as a shorthand (used by the admin dashboard).
 */
export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  image?: { src: string; alt: string; priority?: boolean }
  header?: React.ReactNode
  footer?: React.ReactNode
  /** Lift on hover; use for cards that are links */
  interactive?: boolean
  as?: 'article' | 'div' | 'li' | 'section'
  ref?: React.Ref<HTMLElement>
}

export const cardSurface = 'rounded-lg border border-line bg-paper shadow-soft'

function CardRoot({ className, children, image, header, footer, interactive, as = 'article', ref, ...props }: CardProps) {
  const Component = as as React.ElementType
  const shorthand = Boolean(image?.src?.trim() || header || footer)

  return (
    <Component
      ref={ref}
      className={cn(
        cardSurface,
        'group/card relative flex flex-col overflow-hidden',
        interactive &&
          'transition-[box-shadow,transform,border-color] duration-base ease-out focus-within:border-line-strong hover:-translate-y-0.5 hover:border-line-strong hover:shadow-raised',
        className
      )}
      {...props}
    >
      {shorthand ? (
        <>
          {image?.src?.trim() && <CardMedia src={image.src} alt={image.alt} priority={image.priority} />}
          {header && <div className='border-b border-line px-6 pb-4 pt-6'>{header}</div>}
          <CardBody>{children}</CardBody>
          {footer && <CardFooter>{footer}</CardFooter>}
        </>
      ) : (
        children
      )}
    </Component>
  )
}

interface CardMediaProps {
  src: string
  alt: string
  priority?: boolean
  sizes?: string
  /** Aspect ratio utility */
  ratio?: string
  className?: string
  children?: React.ReactNode
}

function CardMedia({
  src,
  alt,
  priority,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  ratio = 'aspect-[16/10]',
  className,
  children
}: CardMediaProps) {
  return (
    <div className={cn('relative w-full overflow-hidden bg-sunken', ratio, className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className='object-cover transition-transform duration-slow ease-out group-hover/card:scale-[1.03]'
      />
      {children}
    </div>
  )
}

function CardBody({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('flex flex-1 flex-col px-6 py-5', className)}>{children}</div>
}

/** Small line above the title: a category or a date. Use only when it carries information. */
function CardEyebrow({ className, children }: { className?: string; children: React.ReactNode }) {
  return <p className={cn('mb-2 text-sm font-semibold text-gold', className)}>{children}</p>
}

function CardTitle({
  as: Heading = 'h3',
  className,
  children
}: {
  as?: 'h2' | 'h3' | 'h4'
  className?: string
  children: React.ReactNode
}) {
  return <Heading className={cn('font-display text-title text-ink', className)}>{children}</Heading>
}

function CardMeta({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-subtle', className)}>{children}</div>
}

function CardFooter({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('border-t border-line px-6 py-4', className)}>{children}</div>
}

const Card = Object.assign(CardRoot, {
  Media: CardMedia,
  Body: CardBody,
  Eyebrow: CardEyebrow,
  Title: CardTitle,
  Meta: CardMeta,
  Footer: CardFooter
})

export default Card
