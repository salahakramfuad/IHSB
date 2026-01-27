'use client'

import Link from 'next/link'
import { Bell } from 'lucide-react'

export interface NotificationItem {
  id?: string
  title: string
  content: string
}

/** Horizontal left-to-right scrolling strip for the 5 most recent notifications. */
export default function NotificationStrip({
  announcements
}: {
  announcements: NotificationItem[]
}) {
  if (announcements.length === 0) return null

  const items = announcements.slice(0, 5)

  return (
    <div
      className="w-full overflow-hidden bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-yellow-500 text-white shadow-md"
      aria-label="Recent notifications"
    >
      <div className="flex py-2.5">
        <div
          className="flex shrink-0 items-center gap-1.5 px-4 text-sm font-semibold text-white/90"
          aria-hidden
        >
          <Bell className="h-4 w-4 text-accent-yellow-200" />
          <span>Announcements</span>
        </div>
        <div className="min-w-0 flex-1 overflow-hidden">
          <div
            className="flex gap-8 animate-scroll-left-ticker"
            style={{ width: 'max-content' }}
          >
            {[...items, ...items].map((a, i) => (
              <Link
                key={a.id ? `${a.id}-${i}` : i}
                href="/announcements"
                className="shrink-0 rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm text-white/90 shadow-sm hover:bg-white/20 hover:border-white transition-colors"
              >
                <span className="font-semibold text-white">{a.title}</span>
                <span className="mx-2 text-white/60">·</span>
                <span className="text-white/80 line-clamp-1 max-w-[200px] sm:max-w-[280px] inline-block align-bottom">
                  {a.content}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
