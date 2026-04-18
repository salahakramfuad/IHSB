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
      <div className="flex items-stretch py-1.5">
        <div
          className="flex shrink-0 items-center gap-1.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-white/95"
          aria-hidden
        >
          <Bell className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
          <span>Announcements</span>
        </div>
        <div className="min-w-0 flex-1 overflow-hidden">
          <div
            className="flex gap-4 sm:gap-6 animate-scroll-left-ticker"
            style={{ width: 'max-content' }}
          >
            {[...items, ...items].map((a, i) => (
              <Link
                key={a.id ? `${a.id}-${i}` : i}
                href="/announcements"
                className={`flex max-w-[min(88vw,220px)] shrink-0 flex-col gap-0.5 rounded-lg px-2.5 py-1.5 text-left text-xs font-medium leading-snug transition-colors sm:max-w-[260px] sm:px-3 sm:text-[13px] ${getPriorityClasses(
                  a.priority
                )}`}
              >
                <span className="line-clamp-1 min-w-0 break-words font-semibold">{a.title}</span>
                <span className="line-clamp-1 min-w-0 break-words text-[11px] font-normal opacity-90 sm:text-xs">
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
