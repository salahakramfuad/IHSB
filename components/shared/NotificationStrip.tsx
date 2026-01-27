'use client'

import Link from 'next/link'
import { Bell } from 'lucide-react'

export interface NotificationItem {
  id?: string
  title: string
  content: string
  priority?: 'low' | 'medium' | 'high'
}

/** Priority-based pill colors aligned with site theme (primary-green, accent-blue, accent-yellow). */
const getPriorityClasses = (priority?: string) => {
  switch (priority) {
    case 'high':
      return 'bg-white/95 text-primary-green-800 border-primary-green-400 shadow-sm'
    case 'medium':
      return 'bg-accent-yellow-100 text-amber-900 border-accent-yellow-400 shadow-sm'
    case 'low':
      return 'bg-slate-100 text-slate-800 border-slate-300 shadow-sm'
    default:
      return 'bg-white/20 text-white border-white/40 backdrop-blur-sm'
  }
}

/** Horizontal scrolling strip for the 7 most recent announcements. Banner uses theme gradient; pills are color-coded by priority. */
export default function NotificationStrip({
  announcements
}: {
  announcements: NotificationItem[]
}) {
  if (announcements.length === 0) return null

  const items = announcements.slice(0, 7)

  return (
    <div
      className="w-full overflow-hidden bg-gradient-to-r from-primary-green-600 via-primary-green-500 to-accent-blue-600 text-white shadow-md"
      aria-label="Recent notifications"
    >
      <div className="flex py-2.5">
        <div
          className="flex shrink-0 items-center gap-1.5 px-4 text-sm font-semibold text-white/95"
          aria-hidden
        >
          <Bell className="h-4 w-4 text-white" />
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
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${getPriorityClasses(
                  a.priority
                )}`}
              >
                <span className="font-semibold mr-1">{a.title}</span>
                <span className="mx-1 opacity-80" aria-hidden>·</span>
                <span className="line-clamp-1 max-w-[220px] inline-block align-bottom opacity-90">
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
