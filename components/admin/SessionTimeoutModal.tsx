'use client'

import { useEffect } from 'react'
import { AlertTriangle, X } from 'lucide-react'
import Button from '@/components/ui/Button'

interface SessionTimeoutModalProps {
  timeRemaining: number
  onStayLoggedIn: () => void
  onLogout: () => void
}

export default function SessionTimeoutModal({
  timeRemaining,
  onStayLoggedIn,
  onLogout
}: SessionTimeoutModalProps) {
  const minutes = Math.floor(timeRemaining / 60000)
  const seconds = Math.floor((timeRemaining % 60000) / 1000)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 p-6 animate-in fade-in zoom-in">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Session Timeout Warning
            </h3>
            <p className="text-gray-600 mb-4">
              Your session will expire due to inactivity in{' '}
              <span className="font-semibold text-primary-600">
                {minutes}:{seconds.toString().padStart(2, '0')}
              </span>
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Click "Stay Logged In" to continue your session, or you will be automatically logged out.
            </p>
            <div className="flex gap-3">
              <Button
                variant="primary"
                onClick={onStayLoggedIn}
                className="flex-1"
              >
                Stay Logged In
              </Button>
              <Button
                variant="outline"
                onClick={onLogout}
                className="flex-1"
              >
                Log Out Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
