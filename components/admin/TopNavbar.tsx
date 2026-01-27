'use client'

import { useAuth } from '@/components/admin/AuthProvider'
import { Bell, Settings, User, ChevronDown, Megaphone, ExternalLink } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { fetchAuthenticatedData } from '@/lib/utils/api'

interface DashboardNotification {
  id: string
  type: string
  action: string
  title: string
  description: string | null
  itemId: string
  itemHref: string
  createdBy: string
  createdByEmail: string | null
  createdByName?: string | null
  createdAt: string
}

export default function TopNavbar() {
  const { user } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState<DashboardNotification[]>([])
  const [notificationsLoading, setNotificationsLoading] = useState(false)

  useEffect(() => {
    if (!showNotifications || !user) return
    setNotificationsLoading(true)
    fetchAuthenticatedData<{ notifications: DashboardNotification[] }>('/api/notifications?limit=15')
      .then((data) => {
        setNotifications(data?.notifications ?? [])
      })
      .catch(() => setNotifications([]))
      .finally(() => setNotificationsLoading(false))
  }, [showNotifications, user])

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm fixed top-0 right-0 left-0 lg:left-64 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end h-16">
          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowUserMenu(false)
                  setShowNotifications((v) => !v)
                }}
                className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Notifications"
                aria-expanded={showNotifications}
              >
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" aria-hidden />
                )}
              </button>
              {showNotifications && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    aria-hidden
                    onClick={() => setShowNotifications(false)}
                  />
                  <div className="absolute right-0 mt-2 w-80 max-h-96 bg-white rounded-lg shadow-lg border border-gray-200 z-20 overflow-hidden flex flex-col">
                    <div className="px-4 py-3 border-b border-gray-200 flex items-center gap-2">
                      <Megaphone size={18} className="text-primary-green-600" />
                      <span className="font-semibold text-gray-900">Notifications</span>
                    </div>
                    <div className="overflow-y-auto max-h-64">
                      {notificationsLoading ? (
                        <div className="px-4 py-6 text-center text-sm text-gray-500">Loading…</div>
                      ) : notifications.length === 0 ? (
                        <div className="px-4 py-6 text-center text-sm text-gray-500">No new notifications</div>
                      ) : (
                        <ul className="py-1">
                          {notifications.map((n) => (
                            <li key={n.id}>
                              <Link
                                href={n.itemHref || '#'}
                                onClick={() => setShowNotifications(false)}
                                className="flex gap-3 px-4 py-2.5 hover:bg-gray-50 text-left"
                              >
                                <Megaphone size={16} className="text-gray-400 shrink-0 mt-0.5" />
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-medium text-gray-900 truncate">{n.title}</p>
                                  {(n.description || n.createdByName || n.createdByEmail) && (
                                    <p className="text-xs text-gray-500 truncate mt-0.5">
                                      {n.description
                                        ? n.description
                                        : (n.createdByName || n.createdByEmail)
                                          ? `by ${n.createdByName || n.createdByEmail}`
                                          : ''}
                                    </p>
                                  )}
                                </div>
                                <ExternalLink size={14} className="text-gray-400 shrink-0" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <Link
                        href="/admin"
                        onClick={() => setShowNotifications(false)}
                        className="px-4 py-2.5 text-sm font-medium text-primary-green-600 hover:bg-gray-50 border-t border-gray-100"
                      >
                        View dashboard
                      </Link>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Settings */}
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings size={20} />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary-green-500 to-accent-blue-500 flex items-center justify-center">
                  <User size={18} className="text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.email?.split('@')[0] || 'Admin'}
                  </p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <ChevronDown size={16} className="text-gray-400 hidden md:block" />
              </button>

              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                      <p className="text-xs text-gray-500 mt-1">Administrator</p>
                    </div>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile Settings
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Preferences
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
