'use client'

import Link from 'next/link'
import { useSyncExternalStore } from 'react'
import { X } from 'lucide-react'

export interface NotificationItem {
  id?: string
  title: string
  content: string
  priority?: 'low' | 'medium' | 'high'
}

const STORAGE_KEY = 'ihsb-notice-dismissed'
const listeners = new Set<() => void>()

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
const readDismissed = () => {
  try {
    return sessionStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

/**
 * Slim notice bar above the navbar showing the latest announcement.
 * Dismissing hides it for the browser session (until a newer notice appears).
 */
export default function NotificationStrip({ announcements }: { announcements: NotificationItem[] }) {
  const latest = announcements[0]
  const key = latest?.id ?? latest?.title ?? ''
  const dismissed = useSyncExternalStore(subscribe, readDismissed, () => null)

  if (!latest || dismissed === key) return null

  const dismiss = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, key)
    } catch {
      // Storage unavailable: hide for this page view only
    }
    listeners.forEach((listener) => listener())
  }

  const more = announcements.length - 1

  return (
    <aside aria-label='Latest announcement' className='relative z-nav bg-gold-400 text-brand-950'>
      <div className='container flex min-h-10 items-center gap-3 py-1.5 text-sm'>
        <p className='min-w-0 flex-1 truncate'>
          <span className='font-semibold'>{latest.title}</span>
          <span className='hidden text-brand-900/80 md:inline'> {latest.content}</span>
        </p>
        <Link
          href='/announcements'
          className='shrink-0 font-semibold underline decoration-brand-950/40 underline-offset-4 hover:decoration-brand-950'
        >
          {more > 0 ? `Read all ${more + 1} notices` : 'Read more'}
        </Link>
        <button
          type='button'
          onClick={dismiss}
          aria-label='Dismiss announcement'
          className='-mr-2 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-brand-950/10'
        >
          <X className='h-4 w-4' aria-hidden />
        </button>
      </div>
    </aside>
  )
}
