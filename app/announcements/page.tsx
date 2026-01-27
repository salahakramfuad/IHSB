import React from 'react'
import { getActiveAnnouncementsService } from '@/lib/services/announcementsService'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import { Calendar, Clock, Bell, AlertCircle, Megaphone } from 'lucide-react'
import ImageWithLightbox from '@/components/shared/ImageWithLightbox'
import type { AnnouncementDocument } from '@/lib/database/announcements'

function formatDate(timestamp: unknown): {
  full: string
  short: string
  time: string
  iso: string
} {
  if (!timestamp) {
    return {
      full: 'Date not available',
      short: '—',
      time: '—',
      iso: ''
    }
  }
  let date: Date
  if (typeof timestamp === 'object' && timestamp !== null && 'seconds' in timestamp) {
    date = new Date((timestamp as { seconds: number }).seconds * 1000)
  } else if (typeof timestamp === 'string') {
    date = new Date(timestamp)
  } else if (timestamp instanceof Date) {
    date = timestamp
  } else {
    date = new Date()
  }
  return {
    full: date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    short: date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }),
    time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    iso: date.toISOString()
  }
}

function getPriorityStyles(priority: AnnouncementDocument['priority']) {
  switch (priority) {
    case 'high':
      return {
        badge: 'bg-primary-green-100 text-primary-green-800 border-primary-green-300',
        cardBorder: 'border-l-4 border-l-primary-green-500',
        icon: AlertCircle,
        label: 'High priority'
      }
    case 'medium':
      return {
        badge: 'bg-accent-yellow-100 text-amber-800 border-accent-yellow-300',
        cardBorder: 'border-l-4 border-l-accent-yellow-500',
        icon: Megaphone,
        label: 'Medium priority'
      }
    case 'low':
    default:
      return {
        badge: 'bg-slate-100 text-slate-700 border-slate-200',
        cardBorder: 'border-l-4 border-l-slate-400',
        icon: Bell,
        label: 'Low priority'
      }
  }
}

export default async function AnnouncementsPage() {
  const raw = await getActiveAnnouncementsService()
  // Latest first: sort by createdAt descending
  const announcements = [...raw].sort((a, b) => {
    const toMs = (t: unknown): number => {
      if (!t) return 0
      if (typeof t === 'object' && t !== null && 'seconds' in t) return (t as { seconds: number }).seconds * 1000
      if (typeof t === 'string') return new Date(t).getTime()
      return t instanceof Date ? t.getTime() : 0
    }
    return toMs(b.createdAt) - toMs(a.createdAt)
  })

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary-green-600 via-primary-green-500 to-accent-blue-600 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />
        <div className="container relative z-10 mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <Bell className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Announcements
            </h1>
            <p className="mt-4 text-lg text-white/90 sm:text-xl">
              Stay updated with the latest news and important information from International Hope
              School Bangladesh.
            </p>
            {announcements.length > 0 && (
              <p className="mt-3 text-sm font-medium text-white/80">
                {announcements.length} announcement{announcements.length !== 1 ? 's' : ''} available
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <Section background="gray" className="py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {announcements.length === 0 ? (
            <Card className="border-2 border-dashed border-gray-200 bg-white py-16 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100">
                <Bell className="h-10 w-10 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                No announcements right now
              </h2>
              <p className="mt-2 text-gray-600">
                Check back later for news and updates from IHSB.
              </p>
            </Card>
          ) : (
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 rounded-full bg-gradient-to-r from-primary-green-500 to-accent-blue-500" />
                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  All announcements
                </h2>
              </div>

              <ul className="space-y-6" role="list">
                {announcements.map((announcement) => {
                  const dateInfo = formatDate(announcement.createdAt)
                  const priorityStyles = getPriorityStyles(announcement.priority || 'low')
                  const PriorityIcon = priorityStyles.icon

                  return (
                    <li key={announcement.id}>
                      <Card
                        className={`group overflow-hidden bg-white transition-all duration-300 hover:shadow-lg ${priorityStyles.cardBorder}`}
                      >
                        <article className="flex flex-col sm:flex-row">
                          {/* Content first (left / top): primary focus */}
                          <div className="flex flex-1 flex-col p-6 sm:p-8 sm:min-w-0">
                            <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                              <time
                                className="flex items-center gap-1.5 font-medium text-primary-green-700"
                                dateTime={dateInfo.iso}
                              >
                                <Calendar className="h-4 w-4 shrink-0" />
                                <span>Added {dateInfo.full}</span>
                              </time>
                              <span className="flex items-center gap-1.5 text-gray-500">
                                <Clock className="h-4 w-4 shrink-0 text-gray-400" />
                                {dateInfo.time}
                              </span>
                            </div>

                            <div className="mb-4 flex flex-wrap items-center gap-2">
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${priorityStyles.badge}`}
                              >
                                <PriorityIcon className="h-3.5 w-3.5" />
                                {priorityStyles.label}
                              </span>
                              {announcement.featured && (
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-green-200 bg-primary-green-50 px-3 py-1 text-xs font-semibold text-primary-green-700">
                                  <Bell className="h-3.5 w-3.5" />
                                  Featured
                                </span>
                              )}
                            </div>

                            <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-primary-green-700 sm:text-2xl">
                              {announcement.title}
                            </h3>

                            <div className="prose prose-gray max-w-none flex-1 text-gray-700">
                              <p className="whitespace-pre-wrap leading-relaxed">
                                {announcement.content}
                              </p>
                            </div>
                          </div>

                          {/* Image on the right: smaller, de-emphasized */}
                          {announcement.image && (
                            <div className="relative h-28 w-full shrink-0 overflow-hidden sm:h-auto sm:min-h-[10rem] sm:w-36 sm:border-l sm:border-gray-100 sm:bg-gray-50/50 md:w-40 lg:w-44">
                              <ImageWithLightbox
                                src={announcement.image}
                                alt={announcement.title}
                                fill
                                className="object-cover opacity-90 transition duration-300 group-hover:opacity-100"
                                sizes="(max-width: 640px) 100vw, 176px"
                              />
                            </div>
                          )}
                        </article>
                      </Card>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>
      </Section>
    </main>
  )
}
