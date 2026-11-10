'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from 'firebase/auth'
import { onAuthChange } from '@/lib/auth/auth'

export type AdminRole = 'admin' | 'superadmin'

interface AuthContextType {
  user: User | null
  loading: boolean
  /** Role resolved by the server (GET /api/auth/me); null until known or when not an admin. */
  role: AdminRole | null
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, role: null })

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  // Keyed by uid so a stale role is never shown for a different user
  const [resolved, setResolved] = useState<{ uid: string; role: AdminRole | null } | null>(null)
  const role = user && resolved?.uid === user.uid ? resolved.role : null

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // The role always comes from the server; the client never decides who is a superadmin.
  useEffect(() => {
    if (!user) return
    const uid = user.uid
    let cancelled = false
    user
      .getIdToken()
      .then((token) => fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } }))
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { role?: AdminRole } | null) => {
        if (cancelled) return
        const role = data?.role === 'superadmin' ? 'superadmin' : data?.role === 'admin' ? 'admin' : null
        setResolved({ uid, role })
      })
      .catch(() => {
        if (!cancelled) setResolved({ uid, role: null })
      })
    return () => {
      cancelled = true
    }
  }, [user])

  return (
    <AuthContext.Provider value={{ user, loading, role }}>
      {children}
    </AuthContext.Provider>
  )
}
