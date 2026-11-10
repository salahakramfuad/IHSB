import { cn } from '../../lib/utils'

/** Placeholder block shown while content loads. Decorative: hidden from assistive tech. */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('skeleton', className)} aria-hidden />
}

/** Grid of card-shaped placeholders for list pages. */
export function CardGridSkeleton({ count = 6, columns = 3 }: { count?: number; columns?: 2 | 3 | 4 }) {
  const grid = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[columns]
  return (
    <div className={cn('grid gap-6', grid)} role='status' aria-label='Loading'>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className='overflow-hidden rounded-lg border border-line bg-paper'>
          <Skeleton className='aspect-[16/10] w-full rounded-none' />
          <div className='space-y-3 p-6'>
            <Skeleton className='h-3 w-24' />
            <Skeleton className='h-5 w-4/5' />
            <Skeleton className='h-3 w-full' />
            <Skeleton className='h-3 w-2/3' />
          </div>
        </div>
      ))}
      <span className='sr-only'>Loading content</span>
    </div>
  )
}

/** Placeholder for a page hero + content while a route segment loads. */
export function PageSkeleton() {
  return (
    <div role='status' aria-label='Loading page'>
      <div className='bg-brand-900'>
        <div className='container space-y-5 pb-14 pt-[calc(var(--nav-height)+3rem)] md:pb-20'>
          <div className='h-4 w-40 rounded bg-white/10' />
          <div className='h-12 w-3/4 max-w-xl rounded bg-white/10' />
          <div className='h-5 w-full max-w-2xl rounded bg-white/10' />
        </div>
      </div>
      <div className='container py-section-sm'>
        <CardGridSkeleton />
      </div>
      <span className='sr-only'>Loading page</span>
    </div>
  )
}
