import React from 'react'
import { cn } from '../../lib/utils'

export interface PageHeaderProps {
  title: string
  subtitle?: string
  breadcrumbs?: Array<{ label: string; href?: string }>
  className?: string
}

export default function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  className
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        'mb-8 pb-6 border-b border-gray-200',
        className
      )}
    >
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label='Breadcrumb' className='mb-4'>
          <ol className='flex flex-wrap items-center gap-2 text-sm text-gray-600'>
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className='flex items-center gap-2'>
                {index > 0 && (
                  <span className='text-gray-400' aria-hidden='true'>
                    /
                  </span>
                )}
                {crumb.href ? (
                  <a
                    href={crumb.href}
                    className='hover:text-primary-green-700 transition-colors'
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span className='text-gray-900 font-medium'>
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-2'>
        {title}
      </h1>
      {subtitle && (
        <p className='text-lg text-gray-600 max-w-3xl'>{subtitle}</p>
      )}
    </header>
  )
}

