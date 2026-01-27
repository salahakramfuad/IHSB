'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

const DEFAULT_MAX_LENGTH = 20_000

export interface ImproveWithAIButtonProps {
  getAuthToken: () => Promise<string>
  currentText: string
  onImproved: (text: string) => void
  disabled?: boolean
  maxLength?: number
  className?: string
}

const TOOLTIP_TEXT =
  'AI improves grammar and clarity only. Meaning stays the same. You can edit the result before saving.'

export function ImproveWithAIButton({
  getAuthToken,
  currentText,
  onImproved,
  disabled = false,
  maxLength = DEFAULT_MAX_LENGTH,
  className,
}: ImproveWithAIButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleClick = async () => {
    const trimmed = currentText.trim()
    setError(null)

    if (!trimmed) {
      setError('Add some text first, then click to improve.')
      return
    }
    if (trimmed.length > maxLength) {
      setError(`Text must be at most ${maxLength.toLocaleString()} characters.`)
      return
    }

    setLoading(true)
    try {
      const token = await getAuthToken()
      const res = await fetch('/api/ai/improve-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: trimmed }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Improvement failed. Try again.')
        return
      }
      if (typeof data.improvedText === 'string') {
        onImproved(data.improvedText)
      }
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <span className={cn('inline-flex flex-col items-end gap-0.5', className)}>
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled || loading}
        title={TOOLTIP_TEXT}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-sm font-medium text-gray-700',
          'hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-green-500 focus:ring-offset-1',
          'disabled:opacity-50 disabled:cursor-not-allowed'
        )}
        aria-label={TOOLTIP_TEXT}
      >
        {loading ? (
          <>
            <span
              className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-gray-300 border-t-primary-green-600"
              aria-hidden
            />
            <span>Improving…</span>
          </>
        ) : (
          <>✨ Improve with AI</>
        )}
      </button>
      {error && (
        <span className="text-xs text-red-600" role="alert">
          {error}
        </span>
      )}
    </span>
  )
}
