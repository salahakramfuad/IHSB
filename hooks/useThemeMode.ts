// hooks/useThemeMode.ts
'use client'

import { useState, useEffect } from 'react'
import { lightTheme, darkTheme, ThemeColors } from '../constants/Colors'

export function useThemeMode(): ThemeColors {
  const [theme, setTheme] = useState<ThemeColors>(lightTheme)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const isDark = document.documentElement.classList.contains('dark')
    setTheme(isDark ? darkTheme : lightTheme)

    const observer = new MutationObserver(() => {
      const isNowDark = document.documentElement.classList.contains('dark')
      setTheme(isNowDark ? darkTheme : lightTheme)
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  // Avoid hydration mismatch
  if (!mounted) {
    return lightTheme
  }

  return theme
}
