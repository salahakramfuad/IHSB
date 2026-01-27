'use client'

import Link from 'next/link'
import { Bell } from 'lucide-react'

export interface NotificationItem {
  id?: string
  title: string
  content: string
  priority?: 'low' | 'medium' | 'high'
}

const getPriorityClasses = (priority?: string) => {
  switch (priority) {
    case 'high':
      // Strong red pill for urgent items
      return 'bg-red-500 text-white border-red-300'
    case 'medium':
      // Amber pill for medium items
      return 'bg-accent-yellow-400 text-gray-900 border-accent-yellow-300'
    case 'low':
      // Calm blue/cyan for low items
      return 'bg-secondary-500 text-white border-secondary-300'
    default:
      // Neutral pill
      return 'bg-white/10 text-white border-white/40'
  }
}

/** Vibrant horizontal scrolling strip for the 5 most recent notifications, color-coded by priority. */
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
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium shadow-sm transition-colors ${getPriorityClasses(
                  a.priority
                )}`}
              >
                <span className="font-semibold mr-1">{a.title}</span>
                <span className="mx-1 text-white/80">·</span>
                <span className="line-clamp-1 max-w-[220px] inline-block align-bottom">
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
