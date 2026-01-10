'use client'

import { usePathname } from 'next/navigation'
import { AuthProvider } from '@/components/admin/AuthProvider'
import ProtectedRoute from '@/components/admin/ProtectedRoute'
import Sidebar from '@/components/admin/Sidebar'
import TopNavbar from '@/components/admin/TopNavbar'

/**
 * Admin layout - isolated dashboard layout
 * No Nav/Footer (handled by LayoutWrapper in root layout)
 * Provides authentication and route protection
 * Includes Sidebar and TopNavbar for all admin pages
 */
export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname?.includes('/admin/login')

  // Login page doesn't need protection or dashboard layout
  if (isLoginPage) {
    return <>{children}</>
  }

  // Protected admin routes with dashboard layout
  return (
    <AuthProvider>
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50">
          <Sidebar />
          <TopNavbar />
          <div className="lg:pl-64 pt-16">
            {children}
          </div>
        </div>
      </ProtectedRoute>
    </AuthProvider>
  )
}
