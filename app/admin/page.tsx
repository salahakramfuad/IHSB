'use client'

import DashboardStats from '@/components/admin/DashboardStats'
import RecentActivity from '@/components/admin/RecentActivity'
import { useAuth } from '@/components/admin/AuthProvider'
import Link from 'next/link'
import { Plus, Calendar, Megaphone, Trophy, FileText, ArrowRight, TrendingUp } from 'lucide-react'

export default function AdminDashboard() {
  const { user } = useAuth()

  const displayName =
    (user?.displayName && user.displayName.trim()) ||
    (user?.email && user.email.split('@')[0]) ||
    'Admin'

  const quickActions = [
    {
      title: 'Create Event',
      description: 'Add a new school event',
      icon: Calendar,
      href: '/admin/events/new',
      color: 'from-accent-blue-500 to-accent-blue-600',
      bgColor: 'bg-accent-blue-50',
      iconBg: 'bg-accent-blue-100'
    },
    {
      title: 'New Announcement',
      description: 'Publish an announcement',
      icon: Megaphone,
      href: '/admin/announcements/new',
      color: 'from-accent-purple-500 to-accent-purple-600',
      bgColor: 'bg-accent-purple-50',
      iconBg: 'bg-accent-purple-100'
    },
    {
      title: 'Add Achievement',
      description: 'Record sports achievement',
      icon: Trophy,
      href: '/admin/sports/new',
      color: 'from-accent-yellow-500 to-accent-orange-600',
      bgColor: 'bg-accent-yellow-50',
      iconBg: 'bg-accent-yellow-100'
    },
    {
      title: 'View Admissions',
      description: 'Manage applications',
      icon: FileText,
      href: '/admin/admissions',
      color: 'from-primary-green-500 to-primary-green-600',
      bgColor: 'bg-primary-green-50',
      iconBg: 'bg-primary-green-100'
    }
  ]

  return (
    <main>
        <div className="p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-primary-green-600 to-accent-blue-600 rounded-2xl p-8 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    Welcome back, {displayName}! 👋
                  </h1>
                  <p className="text-white/90 text-lg">
                    Here's what's happening with your school today
                  </p>
                </div>
                <div className="hidden lg:block">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp size={20} />
                      <span className="text-sm font-medium">System Status</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-300 rounded-full animate-pulse"></div>
                      <span className="text-sm">All systems operational</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Cards */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Overview Statistics</h2>
              </div>
              <DashboardStats />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Actions - Takes 2 columns */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
                  <span className="text-sm text-gray-500">Get started quickly</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon
                    return (
                      <Link
                        key={index}
                        href={action.href}
                        className="group relative overflow-hidden rounded-xl border-2 border-gray-200 hover:border-transparent hover:shadow-lg transition-all duration-300 bg-white"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                        <div className="relative p-6">
                          <div className={`${action.iconBg} group-hover:bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors`}>
                            <Icon className={`text-gray-700 group-hover:text-white transition-colors`} size={24} />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-white transition-colors mb-1">
                            {action.title}
                          </h3>
                          <p className="text-sm text-gray-600 group-hover:text-white/90 transition-colors">
                            {action.description}
                          </p>
                          <div className="mt-4 flex items-center text-primary-green-600 group-hover:text-white transition-colors">
                            <span className="text-sm font-medium">Get started</span>
                            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Recent Activity - Takes 1 column */}
              <div className="lg:col-span-1">
                <RecentActivity />
              </div>
            </div>

            {/* Additional Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-accent-blue-50 to-primary-green-50 rounded-xl border border-accent-blue-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Check out our documentation or contact support for assistance with managing your school portal.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center text-sm font-medium text-primary-green-600 hover:text-primary-green-700"
                >
                  View Documentation
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>

              <div className="bg-gradient-to-br from-accent-purple-50 to-accent-pink-50 rounded-xl border border-accent-purple-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Tips & Tricks</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Pro tip: Use the search bar in the top navigation to quickly find any content or section.
                </p>
                <button className="inline-flex items-center text-sm font-medium text-accent-purple-600 hover:text-accent-purple-700">
                  Learn More
                  <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
    </main>
  )
}
