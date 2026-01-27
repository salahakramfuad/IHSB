'use client'

import { FormEvent, useCallback, useEffect, useState } from 'react'
import { useAuth } from '@/components/admin/AuthProvider'
import { Shield, ShieldCheck, UserCog, UserPlus, Loader2, Users } from 'lucide-react'
import { authenticatedFetch, fetchAuthenticatedData } from '@/lib/utils/api'

interface AdminRecord {
  id: string
  email: string
  role: 'admin' | 'superadmin'
  active?: boolean
  displayName?: string | null
  createdAt?: string | null
  createdByEmail?: string | null
}

export default function AdminManagementPage() {
  const { user } = useAuth()
  const [admins, setAdmins] = useState<AdminRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)
  const [createSuccess, setCreateSuccess] = useState<string | null>(null)
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newDisplayName, setNewDisplayName] = useState('')
  const [newRole, setNewRole] = useState<'admin' | 'superadmin'>('admin')

  const loadAdmins = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchAuthenticatedData<{ admins: AdminRecord[] }>('/api/admins')
      setAdmins(data.admins || [])
    } catch (err: any) {
      setError(err?.message || 'Failed to load admins.')
      setAdmins([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!user) return
    loadAdmins()
  }, [user, loadAdmins])

  const isOwnAccount = (email: string) =>
    !!user?.email && user.email.toLowerCase() === email.toLowerCase()

  const refreshAdmins = useCallback(async () => {
    await loadAdmins()
  }, [loadAdmins])

  const handleCreateAdmin = async (e: FormEvent) => {
    e.preventDefault()
    setCreateError(null)
    setCreateSuccess(null)

    const emailTrimmed = newEmail.trim()
    if (!emailTrimmed || !newPassword) {
      setCreateError('Email and password are required.')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailTrimmed)) {
      setCreateError('Invalid email format.')
      return
    }
    if (newPassword.length < 6) {
      setCreateError('Password must be at least 6 characters long.')
      return
    }

    setCreating(true)
    try {
      const res = await authenticatedFetch('/api/admins', {
        method: 'POST',
        body: JSON.stringify({
          email: emailTrimmed,
          password: newPassword,
          displayName: newDisplayName.trim() || undefined,
          role: newRole
        })
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(typeof data?.error === 'string' ? data.error : 'Failed to create admin.')
      }

      setCreateSuccess('Admin account created successfully.')
      setNewEmail('')
      setNewPassword('')
      setNewDisplayName('')
      setNewRole('admin')
      await refreshAdmins()
    } catch (err: any) {
      setCreateError(err?.message || 'Failed to create admin.')
    } finally {
      setCreating(false)
    }
  }

  return (
    <main className="p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
              <ShieldCheck className="text-primary-green-600" />
              Manage Admins
            </h1>
            <p className="mt-2 text-gray-600">
              View and manage administrator accounts. Only superadmins can add or modify admins.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
          {/* Create admin form */}
          <section className="border border-dashed border-gray-200 rounded-xl p-4 bg-gray-50/60">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-full bg-primary-green-100 flex items-center justify-center">
                <UserPlus className="text-primary-green-700" size={18} />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-900">Add new admin</h2>
                <p className="text-xs text-gray-500">
                  Create a new admin account with email, password, and optional display name.
                </p>
              </div>
            </div>

            <form onSubmit={handleCreateAdmin} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
              {createError && (
                <div className="md:col-span-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {createError}
                </div>
              )}
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-medium text-gray-700">Email *</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-green-500 focus:border-primary-green-500"
                  placeholder="admin@ihsb.edu.bd"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700">Password *</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-green-500 focus:border-primary-green-500"
                  placeholder="Min 6 characters"
                />
                <p className="text-xs text-gray-500">Must be at least 6 characters</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700">Display name (optional)</label>
                <input
                  type="text"
                  value={newDisplayName}
                  onChange={(e) => setNewDisplayName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-green-500 focus:border-primary-green-500"
                  placeholder="Name"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700">Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as 'admin' | 'superadmin')}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-green-500 focus:border-primary-green-500 bg-white"
                >
                  <option value="admin">Admin</option>
                  <option value="superadmin">Super Admin</option>
                </select>
              </div>
              <div className="md:col-span-4 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={creating}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-green-600 text-white text-sm font-medium hover:bg-primary-green-700 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {creating && <Loader2 className="animate-spin" size={16} />}
                  <span>Create admin</span>
                </button>
                {createSuccess && (
                  <span className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                    {createSuccess}
                  </span>
                )}
              </div>
            </form>
          </section>

          {/* All Admins list */}
          <section className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Users className="text-primary-green-600" size={22} />
                All Admins
              </h2>
              {!loading && admins.length > 0 && (
                <span className="text-sm text-gray-500">{admins.length} admin{admins.length !== 1 ? 's' : ''}</span>
              )}
            </div>

            {loading && (
              <p className="text-gray-600 text-sm py-4">Loading admin list…</p>
            )}
            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
                {error}
              </p>
            )}

            {!loading && !error && admins.length === 0 && (
              <p className="text-gray-600 text-sm py-6">
                No admins yet. Use the form above to add your first admin. Superadmins (from env) and anyone you add here will appear in this list.
              </p>
            )}

            {!loading && admins.length > 0 && (
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      <th className="px-4 py-3 border-b border-gray-200">Admin</th>
                      <th className="px-4 py-3 border-b border-gray-200">Role</th>
                      <th className="px-4 py-3 border-b border-gray-200">Status</th>
                      <th className="px-4 py-3 border-b border-gray-200">Added</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins.map((admin) => (
                      <tr key={admin.id} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/60 text-sm">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary-green-100 flex items-center justify-center shrink-0">
                              <UserCog className="text-primary-green-700" size={18} />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {admin.displayName || admin.email}
                              </div>
                              <div className="text-xs text-gray-500">{admin.email}</div>
                              {isOwnAccount(admin.email) && (
                                <div className="text-xs text-primary-green-700 font-medium mt-0.5">
                                  This is you
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                              admin.role === 'superadmin'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            <Shield size={14} />
                            {admin.role === 'superadmin' ? 'Super Admin' : 'Admin'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                              admin.active !== false
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            {admin.active !== false ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-500">
                          {admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}

