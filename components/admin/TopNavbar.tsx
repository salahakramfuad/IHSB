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
    <nav className="bg-paper border-b border-line shadow-sm fixed top-0 right-0 left-0 lg:left-64 z-40">
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
                className="relative p-2 text-ink-subtle hover:text-ink-muted hover:bg-sunken rounded-lg transition-colors"
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
                  <div className="absolute right-0 mt-2 w-80 max-h-96 bg-paper rounded-lg shadow-lg border border-line z-20 overflow-hidden flex flex-col">
                    <div className="px-4 py-3 border-b border-line flex items-center gap-2">
                      <Megaphone size={18} className="text-primary-green-600" />
                      <span className="font-semibold text-ink">Notifications</span>
                    </div>
                    <div className="overflow-y-auto max-h-64">
                      {notificationsLoading ? (
                        <div className="px-4 py-6 text-center text-sm text-ink-subtle">Loading…</div>
                      ) : notifications.length === 0 ? (
                        <div className="px-4 py-6 text-center text-sm text-ink-subtle">No new notifications</div>
                      ) : (
                        <ul className="py-1">
                          {notifications.map((n) => (
                            <li key={n.id}>
                              <Link
                                href={n.itemHref || '#'}
                                onClick={() => setShowNotifications(false)}
                                className="flex gap-3 px-4 py-2.5 hover:bg-sunken text-left"
                              >
                                <Megaphone size={16} className="text-ink-subtle shrink-0 mt-0.5" />
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-medium text-ink truncate">{n.title}</p>
                                  {(n.description || n.createdByName || n.createdByEmail) && (
                                    <p className="text-xs text-ink-subtle truncate mt-0.5">
                                      {n.description
                                        ? n.description
                                        : (n.createdByName || n.createdByEmail)
                                          ? `by ${n.createdByName || n.createdByEmail}`
                                          : ''}
                                    </p>
                                  )}
                                </div>
                                <ExternalLink size={14} className="text-ink-subtle shrink-0" />
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
                        className="px-4 py-2.5 text-sm font-medium text-primary-green-600 hover:bg-sunken border-t border-line"
                      >
                        View dashboard
                      </Link>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Settings */}
            <button className="p-2 text-ink-subtle hover:text-ink-muted hover:bg-sunken rounded-lg transition-colors">
              <Settings size={20} />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-sunken transition-colors"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary-green-500 to-accent-blue-500 flex items-center justify-center">
                  <User size={18} className="text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-ink">
                    {user?.email?.split('@')[0] || 'Admin'}
                  </p>
                  <p className="text-xs text-ink-subtle">Administrator</p>
                </div>
                <ChevronDown size={16} className="text-ink-subtle hidden md:block" />
              </button>

              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-paper rounded-lg shadow-lg border border-line py-1 z-20">
                    <div className="px-4 py-2 border-b border-line">
                      <p className="text-sm font-medium text-ink">{user?.email}</p>
                      <p className="text-xs text-ink-subtle mt-1">Administrator</p>
                    </div>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-ink-muted hover:bg-sunken"
                    >
                      Profile Settings
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-ink-muted hover:bg-sunken"
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
