'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50/20 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-extrabold text-red-600 mb-4">
            500
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Something went wrong
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            We're sorry, but something unexpected happened. Our team has been notified and is working on fixing the issue.
          </p>
          {process.env.NODE_ENV === 'development' && error.message && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
              <p className="text-sm font-mono text-red-800">{error.message}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="primary"
            onClick={reset}
            className="w-full sm:w-auto"
          >
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto">
              Go to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
