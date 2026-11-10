import type { NotificationDoc } from '@/lib/database/notifications'
import { filler } from './filler.generated'
import { daysFromNow } from './helpers'

type Seed = Omit<NotificationDoc, 'id' | 'createdAt' | 'createdBy' | 'createdByEmail' | 'createdByName' | 'description'> & {
  daysAgo: number
  by: 0 | 1 | 2
  description?: string
}

const STAFF = [
  { uid: 'mock-admin-1', email: 'farhana.rahman@ihsb.example', name: 'Farhana Rahman' },
  { uid: 'mock-admin-2', email: 'mehmet.aydin@ihsb.example', name: 'Mehmet Aydın' },
  { uid: 'mock-admin-3', email: 'sumaiya.akter@ihsb.example', name: 'Sumaiya Akter' }
] as const

const seeds: Seed[] = [
  { type: 'announcement', action: 'created', title: 'Announcement created: Admissions open for the next academic year', itemId: 'mock-announcement-admissions-open', itemHref: '/admin/announcements/mock-announcement-admissions-open', daysAgo: 2, by: 0 },
  { type: 'admission', action: 'updated', title: 'Admission updated (approved)', description: 'Status: approved', itemId: 'mock-admission-03', itemHref: '/admin/admissions/mock-admission-03', daysAgo: 3, by: 2 },
  { type: 'event', action: 'created', title: 'Event created: Admissions Open Day', itemId: 'mock-event-open-day', itemHref: '/admin/events/mock-event-open-day', daysAgo: 4, by: 1 },
  { type: 'news', action: 'created', title: 'News created: Debate team reaches the national final', itemId: 'mock-news-debate-nationals', itemHref: '/admin/news/mock-news-debate-nationals', daysAgo: 6, by: 0 },
  { type: 'announcement', action: 'updated', title: 'Announcement updated: IGCSE and A Level mock examination timetable published', itemId: 'mock-announcement-mock-exams', itemHref: '/admin/announcements/mock-announcement-mock-exams', daysAgo: 6, by: 1 },
  { type: 'sport', action: 'created', title: 'Sports achievement created: Dhaka International Schools Cup', itemId: 'mock-sport-dhaka-international-schools-cup', itemHref: '/admin/sports/mock-sport-dhaka-international-schools-cup', daysAgo: 12, by: 1 },
  { type: 'admission', action: 'updated', title: 'Admission updated (rejected)', description: 'Status: rejected', itemId: 'mock-admission-07', itemHref: '/admin/admissions/mock-admission-07', daysAgo: 15, by: 2 },
  { type: 'alumni_story', action: 'created', title: 'Alumni story created: From the Uttara biology lab to Great Ormond Street', itemId: 'mock-story-from-uttara-to-great-ormond-street', itemHref: '/admin/alumni/stories', daysAgo: 18, by: 0 },
  { type: 'event', action: 'updated', title: 'Event updated: Annual Science & Innovation Fair', itemId: 'mock-event-science-fair', itemHref: '/admin/events/mock-event-science-fair', daysAgo: 20, by: 1 },
  { type: 'news', action: 'created', title: 'News created: Solar-powered water purifier wins the Inter-School Science Fair', itemId: 'mock-news-science-fair', itemHref: '/admin/news/mock-news-science-fair', daysAgo: 23, by: 0 },
  { type: 'academic_achievement', action: 'created', title: 'Academic achievement created: Ayesha Siddiqua', itemId: 'mock-achievement-ayesha-siddiqua', itemHref: '/admin/academic-achievements', daysAgo: 85, by: 2 },
  { type: 'alumni_featured', action: 'updated', title: 'Featured alumni updated: Arif Chowdhury', itemId: 'mock-alumni-arif-chowdhury', itemHref: '/admin/alumni/featured', daysAgo: 29, by: 0 },
  { type: 'alumni_stats', action: 'updated', title: 'Alumni statistics recalculated', itemId: 'mock-alumni-stats', itemHref: '/admin/alumni/stats', daysAgo: 30, by: 2 },
  { type: 'announcement', action: 'deleted', title: 'Announcement deleted', itemId: 'mock-announcement-old', itemHref: '/admin/announcements', daysAgo: 44, by: 1 }
]

export const mockNotifications: NotificationDoc[] = seeds
  .map(({ daysAgo, by, description, ...notification }, index) => {
    const staff = STAFF[by]
    return {
      id: `mock-notification-${String(index + 1).padStart(2, '0')}`,
      ...notification,
      description: description ?? null,
      createdBy: staff.uid,
      createdByEmail: staff.email,
      createdByName: staff.name,
      createdAt: daysFromNow(-daysAgo, 3, filler.minuteOffsets[index])
    }
  })
  .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
