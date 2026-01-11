'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'

export default function NotFound() {
  const router = useRouter()
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-green-50/20 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-extrabold text-primary-green-600 mb-4">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. It may have been moved, deleted, or the URL may be incorrect.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/">
            <Button variant="primary" className="w-full sm:w-auto">
              Go to Homepage
            </Button>
          </Link>
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="w-full sm:w-auto"
            >
              Go Back
            </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <Link
            href="/about"
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-primary-green-600 mb-2">About Us</h3>
            <p className="text-sm text-gray-600">Learn more about IHSB</p>
          </Link>
          <Link
            href="/admission/apply"
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-primary-green-600 mb-2">Admissions</h3>
            <p className="text-sm text-gray-600">Apply for admission</p>
          </Link>
          <Link
            href="/contact"
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-primary-green-600 mb-2">Contact</h3>
            <p className="text-sm text-gray-600">Get in touch with us</p>
          </Link>
        </div>
      </div>
    </main>
  )
}
