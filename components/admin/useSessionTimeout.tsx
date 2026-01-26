'use client'

import { useEffect, useRef, useState } from 'react'
import { signOut } from '@/lib/auth/auth'
import { useRouter } from 'next/navigation'

const SESSION_TIMEOUT = 30 * 60 * 1000 // 30 minutes in milliseconds
const WARNING_TIME = 5 * 60 * 1000 // Show warning 5 minutes before timeout

export function useSessionTimeout() {
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null)
  const [showWarning, setShowWarning] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const warningTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const lastActivityRef = useRef<number>(Date.now())
  const warningStartTimeRef = useRef<number | null>(null)
  const router = useRouter()

  const resetTimer = () => {
    // Clear existing timers
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current)
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current)
    }

    // Reset activity timestamp
    lastActivityRef.current = Date.now()
    setShowWarning(false)
    setTimeRemaining(null)
    warningStartTimeRef.current = null

    // Set warning timer (25 minutes from now)
    warningTimeoutRef.current = setTimeout(() => {
      warningStartTimeRef.current = Date.now()
      setShowWarning(true)
      setTimeRemaining(WARNING_TIME)
      
      // Start countdown
      countdownIntervalRef.current = setInterval(() => {
        if (warningStartTimeRef.current) {
          const elapsed = Date.now() - warningStartTimeRef.current
          const remaining = WARNING_TIME - elapsed
          
          if (remaining <= 0) {
            if (countdownIntervalRef.current) {
              clearInterval(countdownIntervalRef.current)
            }
            setTimeRemaining(0)
          } else {
            setTimeRemaining(remaining)
          }
        }
      }, 1000)
    }, SESSION_TIMEOUT - WARNING_TIME)

    // Set logout timer (30 minutes from now)
    timeoutRef.current = setTimeout(async () => {
      // Check if user was active in the last minute (to avoid race conditions)
      const timeSinceLastActivity = Date.now() - lastActivityRef.current
      if (timeSinceLastActivity >= SESSION_TIMEOUT - 1000) {
        if (countdownIntervalRef.current) {
          clearInterval(countdownIntervalRef.current)
        }
        await signOut()
        router.push('/admin/login?timeout=true')
      }
    }, SESSION_TIMEOUT)
  }

  useEffect(() => {
    // Track user activity events
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
    
    const handleActivity = () => {
      resetTimer()
    }

    // Add event listeners
    events.forEach((event) => {
      window.addEventListener(event, handleActivity, { passive: true })
    })

    // Initialize timer
    resetTimer()

    // Cleanup
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity)
      })
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current)
      }
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current)
      }
    }
  }, [])

  const handleStayLoggedIn = () => {
    resetTimer()
  }

  const handleLogout = async () => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current)
    }
    await signOut()
    router.push('/admin/login')
  }

  return {
    showWarning,
    timeRemaining,
    handleStayLoggedIn,
    handleLogout
  }
}
