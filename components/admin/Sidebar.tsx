'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from '@/lib/auth/auth'
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  Megaphone, 
  Trophy,
  Newspaper,
  GraduationCap,
  Users,
  BookOpen,
  BarChart3,
  LogOut,
  Menu,
  X,
  Shield,
  UserCircle2
} from 'lucide-react'
import { useState } from 'react'
import { useAuth } from './AuthProvider'

const SUPERADMIN_EMAILS = (process.env.NEXT_PUBLIC_SUPERADMIN_EMAILS || '')
  .split(',')
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean)

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/events', label: 'Events', icon: Calendar },
  { href: '/admin/admissions', label: 'Admissions', icon: FileText },
  { href: '/admin/announcements', label: 'Announcements', icon: Megaphone },
  { href: '/admin/news', label: 'News', icon: Newspaper },
  { href: '/admin/sports', label: 'Sports & Achievements', icon: Trophy },
  { href: '/admin/academic-achievements', label: 'Academic Achievements', icon: GraduationCap },
  { href: '/admin/alumni/featured', label: 'Featured Alumni', icon: Users },
  { href: '/admin/alumni/stories', label: 'Alumni Stories', icon: BookOpen },
  { href: '/admin/alumni/stats', label: 'Alumni Statistics', icon: BarChart3 }
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isSuperAdmin =
    !!user &&
    !!user.email &&
    SUPERADMIN_EMAILS.includes(user.email.toLowerCase())

  const handleLogout = async () => {
    await signOut()
    router.push('/')
  }

  const goTo = (href: string) => {
    setMobileMenuOpen(false)
    router.push(href)
  }

  const renderNavLink = (
    href: string,
    label: string,
    Icon: React.ComponentType<{ size?: number }>
  ) => {
    const isActive =
      pathname === href || (href !== '/admin' && pathname.startsWith(href))

    return (
      <button
        key={href}
        onClick={() => goTo(href)}
        className={`
          w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left
          ${isActive
            ? 'bg-primary-green-600 text-white shadow-lg shadow-primary-green-500/50'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }
        `}
      >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
      </button>
    )
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-primary-green-600 text-white shadow-lg"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-900 to-gray-800 border-r border-gray-700 z-30 shadow-xl
          transform transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-700">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-green-400 to-accent-blue-400 bg-clip-text text-transparent">
              IHSB Admin
            </h1>
            <p className="text-sm text-gray-400 mt-1">Management Portal</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => renderNavLink(item.href, item.label, item.icon))}

            {/* Divider */}
            <div className="mt-4 mb-2 border-t border-gray-700 pt-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Account
            </div>

            {renderNavLink('/admin/profile', 'My Profile', UserCircle2)}

            {isSuperAdmin && (
              <>
                <div className="mt-4 mb-2 border-t border-gray-700 pt-3 text-xs font-semibold uppercase tracking-wide text-amber-400">
                  Super Admin
                </div>
                {renderNavLink('/admin/admins', 'Manage Admins', Shield)}
              </>
            )}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-all"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
