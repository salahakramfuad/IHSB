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
      className="w-full overflow-hidden border-b border-gray-200 bg-gray-50/95 text-gray-800"
      aria-label="Recent notifications"
    >
      <div className="flex py-2.5">
        <div
          className="flex shrink-0 items-center gap-1.5 px-4 text-sm font-medium text-gray-500"
          aria-hidden
        >
          <Bell className="h-4 w-4" />
          <span>Notifications</span>
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
                className="shrink-0 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm hover:border-gray-300 hover:bg-gray-50"
              >
                <span className="font-medium text-gray-900">{a.title}</span>
                <span className="mx-2 text-gray-400">·</span>
                <span className="text-gray-600 line-clamp-1 max-w-[200px] sm:max-w-[280px] inline-block align-bottom">
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
