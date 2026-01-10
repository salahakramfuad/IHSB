'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from '@/lib/auth/auth'
import { useAuth } from '@/components/admin/AuthProvider'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { X } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  useEffect(() => {
    if (!authLoading && user) {
      router.push('/admin')
    }
  }, [user, authLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { user, error: signInError } = await signIn(email, password)
      
      if (signInError) {
        setError(signInError)
        setLoading(false)
      } else if (user) {
        // Successful login - redirect to dashboard
        router.push('/admin')
        router.refresh() // Refresh to ensure auth state is updated
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during login')
      setLoading(false)
    }
  }

  // If already logged in, redirect (this will be handled by useEffect)
  // But still show the form while checking, then redirect happens

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-green-50 via-white to-accent-blue-50 relative">
      {/* Close Button */}
      <Link
        href="/"
        className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors z-10"
        aria-label="Close and return to homepage"
      >
        <X size={24} />
      </Link>

      <div className="w-full max-w-md px-4">
        {authLoading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        ) : (
          <Card className="border-2 border-primary-green-200 relative">
            <div className="h-2 bg-gradient-to-r from-primary-green-500 to-accent-blue-500 rounded-t-xl -mx-6 -mt-6 mb-6"></div>
            
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Admin Login
              </h1>
              <p className="text-gray-600">
                Sign in to access the dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green-500 focus:border-transparent"
                  placeholder="admin@ihsb.edu.bd"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full bg-gradient-to-r from-primary-green-600 to-accent-blue-600 hover:from-primary-green-700 hover:to-accent-blue-700"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              <p>International Hope School Bangladesh</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
