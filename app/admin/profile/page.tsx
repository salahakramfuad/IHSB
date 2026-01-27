'use client'

import { useState } from 'react'
import { useAuth } from '@/components/admin/AuthProvider'
import { updateAdminProfile } from '@/lib/auth/auth'
import { Lock, Mail, UserCircle2 } from 'lucide-react'

export default function AdminProfilePage() {
  const { user } = useAuth()
  const [displayName, setDisplayName] = useState(user?.displayName || '')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    setMessage(null)
    setError(null)

    try {
      await updateAdminProfile({ displayName, password: password || undefined })
      setMessage('Profile updated successfully.')
      setPassword('')
    } catch (err: any) {
      setError(err?.message || 'Failed to update profile.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="p-6 lg:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
            <UserCircle2 className="text-primary-green-600" />
            My Profile
          </h1>
          <p className="mt-2 text-gray-600">
            Update your profile information and password.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-primary-green-100 flex items-center justify-center">
              <UserCircle2 className="text-primary-green-700" size={32} />
            </div>
            <div>
              <div className="flex items-center gap-2 text-gray-900 font-semibold">
                {user?.email?.split('@')[0] || 'Admin'}
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Mail size={16} />
                <span>{user?.email}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Display name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-green-500 focus:border-primary-green-500"
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                New password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-400">
                  <Lock size={16} />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-green-500 focus:border-primary-green-500"
                  placeholder="Leave blank to keep current password"
                  minLength={6}
                />
              </div>
              <p className="text-xs text-gray-500">
                Password must be at least 6 characters.
              </p>
            </div>

            {message && (
              <p className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                {message}
              </p>
            )}
            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !user}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary-green-600 text-white font-medium hover:bg-primary-green-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Saving...' : 'Save changes'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

