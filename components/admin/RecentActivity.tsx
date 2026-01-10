'use client'

import { useEffect, useState } from 'react'
import { Calendar, FileText, Megaphone, Trophy, Clock } from 'lucide-react'
import Link from 'next/link'

interface ActivityItem {
  id: string
  type: 'event' | 'admission' | 'announcement' | 'sport'
  title: string
  action: string
  time: string
  href: string
}

const typeConfig = {
  event: { icon: Calendar, color: 'text-accent-blue-600', bg: 'bg-accent-blue-50' },
  admission: { icon: FileText, color: 'text-primary-green-600', bg: 'bg-primary-green-50' },
  announcement: { icon: Megaphone, color: 'text-accent-purple-600', bg: 'bg-accent-purple-50' },
  sport: { icon: Trophy, color: 'text-accent-yellow-600', bg: 'bg-accent-yellow-50' }
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching recent activities
    // In production, fetch from Firestore ordered by createdAt
    const fetchActivities = async () => {
      try {
        // Mock data - replace with actual Firestore query
        const mockActivities: ActivityItem[] = [
          {
            id: '1',
            type: 'event',
            title: 'Annual Sports Day',
            action: 'Created',
            time: '2 hours ago',
            href: '/admin/events'
          },
          {
            id: '2',
            type: 'admission',
            title: 'New Admission Application',
            action: 'Received',
            time: '5 hours ago',
            href: '/admin/admissions'
          },
          {
            id: '3',
            type: 'announcement',
            title: 'School Holiday Notice',
            action: 'Published',
            time: '1 day ago',
            href: '/admin/announcements'
          }
        ]
        
        setActivities(mockActivities)
      } catch (error) {
        // Handle error
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 animate-pulse">
              <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <Link
          href="/admin"
          className="text-sm text-primary-green-600 hover:text-primary-green-700 font-medium"
        >
          View All
        </Link>
      </div>
      
      <div className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">No recent activity</p>
        ) : (
          activities.map((activity) => {
            const config = typeConfig[activity.type]
            const Icon = config.icon
            
            return (
              <Link
                key={activity.id}
                href={activity.href}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className={`${config.bg} p-2 rounded-lg`}>
                  <Icon className={config.color} size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 group-hover:text-primary-green-600 transition-colors">
                    {activity.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">{activity.action}</span>
                    <span className="text-gray-300">•</span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock size={12} />
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })
        )}
      </div>
    </div>
  )
}
