import React from 'react'
import { cn } from '../../lib/utils'

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  background?: 'white' | 'gray' | 'green'
  container?: boolean
  id?: string
}

export default function Section({
  children,
  background = 'white',
  container = true,
  className,
  id,
  ...props
}: SectionProps) {
  const backgrounds = {
    white: 'bg-gradient-to-b from-white to-primary-50/30',
    gray: 'bg-gradient-to-br from-primary-50 to-primary-green-50/60',
    green: 'bg-primary-green-50'
  }

  return (
    <section
      id={id}
      className={cn(
        'py-12 md:py-16',
        backgrounds[background],
        className
      )}
      {...props}
    >
      {container ? (
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  )
}

