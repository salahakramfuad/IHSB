'use client'

import { useEffect, useState } from 'react'
import { Calendar, FileText, Megaphone, Users, Trophy } from 'lucide-react'
import { useAuth } from './AuthProvider'
import { fetchAuthenticatedData } from '@/lib/utils/api'

interface Stats {
  events: number
  admissions: number
  announcements: number
  pendingAdmissions: number
  sports: number
}

export default function DashboardStats() {
  const { user, loading: authLoading } = useAuth()
  const [stats, setStats] = useState<Stats>({
    events: 0,
    admissions: 0,
    announcements: 0,
    pendingAdmissions: 0,
    sports: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading || !user) {
      return
    }

    const fetchStats = async () => {
      try {
        // Fetch all data from API routes with authentication
        const [eventsData, admissionsData, announcementsData, sportsData] = await Promise.all([
          fetchAuthenticatedData<{ events: any[] }>('/api/events').catch(() => ({ events: [] })),
          fetchAuthenticatedData<{ admissions: any[] }>('/api/admissions').catch(() => ({ admissions: [] })),
          fetchAuthenticatedData<{ announcements: any[] }>('/api/announcements').catch(() => ({ announcements: [] })),
          fetchAuthenticatedData<{ achievements: any[] }>('/api/sports').catch(() => ({ achievements: [] }))
        ])

        const events = eventsData.events || []
        const admissions = admissionsData.admissions || []
        const announcements = announcementsData.announcements || []
        const sports = sportsData.achievements || []

        const pendingAdmissions = admissions.filter(
          (admission: any) => admission.status === 'pending'
        ).length

        setStats({
          events: events.length,
          admissions: admissions.length,
          announcements: announcements.length,
          pendingAdmissions,
          sports: sports.length
        })
      } catch (error) {
        console.error('Error fetching dashboard stats:', error)
        // Silently handle error - stats will show 0
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [user, authLoading])

  const statCards = [
    {
      title: 'Total Events',
      value: stats.events,
      icon: Calendar,
      color: 'from-accent-blue-500 to-accent-blue-600',
      bgColor: 'bg-accent-blue-50'
    },
    {
      title: 'Admissions',
      value: stats.admissions,
      icon: FileText,
      color: 'from-primary-green-500 to-primary-green-600',
      bgColor: 'bg-primary-green-50'
    },
    {
      title: 'Announcements',
      value: stats.announcements,
      icon: Megaphone,
      color: 'from-accent-purple-500 to-accent-purple-600',
      bgColor: 'bg-accent-purple-50'
    },
    {
      title: 'Sports Achievements',
      value: stats.sports,
      icon: Trophy,
      color: 'from-accent-yellow-500 to-accent-orange-600',
      bgColor: 'bg-accent-yellow-50'
    },
    {
      title: 'Pending Admissions',
      value: stats.pendingAdmissions,
      icon: Users,
      color: 'from-accent-orange-500 to-accent-orange-600',
      bgColor: 'bg-accent-orange-50'
    }
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div
            key={index}
            className={`${stat.bgColor} rounded-lg border-2 border-gray-200 p-6 hover:shadow-lg transition-shadow`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color} bg-opacity-10`}>
                <Icon className={`text-transparent bg-gradient-to-r ${stat.color} bg-clip-text`} size={24} />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">{stat.title}</h3>
            <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
              {stat.value}
            </p>
          </div>
        )
      })}
    </div>
  )
}
