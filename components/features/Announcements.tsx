'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnnouncementDocument } from '@/lib/database/announcements'

interface AnnouncementsProps {
  limit?: number
  featured?: boolean
}

export default function Announcements({ limit = 3, featured = false }: AnnouncementsProps) {
  const [announcements, setAnnouncements] = useState<AnnouncementDocument[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnnouncements()
  }, [featured, limit])

  const fetchAnnouncements = async () => {
    try {
      const url = featured 
        ? `/api/announcements?featured=true&active=true`
        : `/api/announcements?active=true`
      
      const response = await fetch(url)
      const data = await response.json()
      
      const announcements = data.announcements || []
      setAnnouncements(announcements.slice(0, limit))
    } catch (error) {
      // Silently handle error - component will show empty state
      setAnnouncements([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-100 rounded-lg p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  if (announcements.length === 0) {
    return null
  }

  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {announcements.map((announcement) => (
        <div
          key={announcement.id}
          className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
        >
          {announcement.image && (
            <div className="relative h-32 w-full mb-4 rounded-lg overflow-hidden">
              <Image
                src={announcement.image}
                alt={announcement.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="text-sm font-bold text-primary-green-600 mb-2">
            {announcement.priority === 'high' && (
              <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            )}
            {announcement.createdAt 
              ? (() => {
                  try {
                    const dateValue = announcement.createdAt instanceof Object && 'seconds' in announcement.createdAt
                      ? new Date(announcement.createdAt.seconds * 1000)
                      : typeof announcement.createdAt === 'string'
                      ? new Date(announcement.createdAt)
                      : null
                    return dateValue ? dateValue.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Date not available'
                  } catch {
                    return 'Date not available'
                  }
                })()
              : 'Date not available'}
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">{announcement.title}</h3>
          <p className="text-sm text-gray-700 mb-4 line-clamp-3">{announcement.content}</p>
          <Link
            href="/events"
            className="inline-block text-sm font-semibold text-primary-green-600 hover:text-primary-green-700 transition-colors"
          >
            Read more →
          </Link>
        </div>
      ))}
    </div>
  )
}
