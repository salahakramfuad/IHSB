'use client'

import { useCallback, useSyncExternalStore } from 'react'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import { THEME_STORAGE_KEY } from './ThemeScript'

const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  const media = window.matchMedia('(prefers-color-scheme: dark)')
  const onSystemChange = () => {
    // Follow the system only while the visitor has not chosen a theme
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      document.documentElement.classList.toggle('dark', media.matches)
      listener()
    }
  }
  media.addEventListener('change', onSystemChange)
  return () => {
    listeners.delete(listener)
    media.removeEventListener('change', onSystemChange)
  }
}

const getSnapshot = () => document.documentElement.classList.contains('dark')
const getServerSnapshot = () => false

export default function ThemeToggle({ className }: { className?: string }) {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggle = useCallback(() => {
    const next = !document.documentElement.classList.contains('dark')
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next ? 'dark' : 'light')
    } catch {
      // Storage unavailable (private mode): the choice lasts for this page only
    }
    listeners.forEach((listener) => listener())
  }, [])

  return (
    <button
      type='button'
      onClick={toggle}
      aria-pressed={isDark}
      aria-label='Dark theme'
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-muted transition-colors duration-fast hover:bg-sunken hover:text-ink',
        className
      )}
    >
      {/* Both icons are rendered; CSS picks one, so there is no hydration flicker */}
      <Sun className='hidden h-5 w-5 dark:block' aria-hidden />
      <Moon className='h-5 w-5 dark:hidden' aria-hidden />
    </button>
  )
}
