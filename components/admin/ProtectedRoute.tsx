'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from './AuthProvider'
import { useSessionTimeout } from './useSessionTimeout'
import SessionTimeoutModal from './SessionTimeoutModal'
import { getAuthToken } from '@/lib/utils/api'
import { signOut } from '@/lib/auth/auth'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [adminAllowed, setAdminAllowed] = useState<boolean | null>(null)
  const { showWarning, timeRemaining, handleStayLoggedIn, handleLogout } = useSessionTimeout()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (!user) {
      setAdminAllowed(null)
      return
    }
    let cancelled = false
    getAuthToken()
      .then((token) => {
        if (cancelled) return
        return fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      })
      .then((res) => {
        if (cancelled) return
        if (res?.ok) setAdminAllowed(true)
        else {
          signOut().then(() => router.push('/admin/login'))
        }
      })
      .catch(() => {
        if (!cancelled) signOut().then(() => router.push('/admin/login'))
      })
    return () => {
      cancelled = true
    }
  }, [user?.uid, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (adminAllowed !== true) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying access...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {children}
      {showWarning && timeRemaining !== null && (
        <SessionTimeoutModal
          timeRemaining={timeRemaining}
          onStayLoggedIn={handleStayLoggedIn}
          onLogout={handleLogout}
        />
      )}
    </>
  )
}
