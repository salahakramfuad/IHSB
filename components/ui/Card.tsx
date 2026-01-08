import React from 'react'
import { cn } from '../../lib/utils'
import Image from 'next/image'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  image?: {
    src: string
    alt: string
    priority?: boolean
  }
  header?: React.ReactNode
  footer?: React.ReactNode
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, image, header, footer, ...props }, ref) => {
    return (
      <article
        ref={ref}
        className={cn(
          'bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-shadow hover:shadow-md',
          className
        )}
        {...props}
      >
        {image && (
          <div className='relative w-full aspect-video'>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className='object-cover'
              priority={image.priority}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          </div>
        )}
        {header && (
          <div className='px-6 pt-6 pb-4 border-b border-gray-100'>
            {header}
          </div>
        )}
        <div className={cn('px-6 py-4', !header && image && 'pt-6')}>
          {children}
        </div>
        {footer && (
          <div className='px-6 pt-4 pb-6 border-t border-gray-100'>
            {footer}
          </div>
        )}
      </article>
    )
  }
)

Card.displayName = 'Card'

export default Card

