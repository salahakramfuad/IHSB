'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Nav from './Nav'
import Footer from './Footer'
import ThemeCSSVars from '../shared/ThemeCSSVars'

/**
 * Layout wrapper that conditionally shows Nav/Footer
 * Excludes admin routes from public navigation
 */
export default function LayoutWrapper({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isAdminRoute, setIsAdminRoute] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsAdminRoute(pathname?.startsWith('/admin') ?? false)
  }, [pathname])

  // During SSR, always render public route structure to avoid hydration mismatch
  // This will be corrected on client-side after mount if it's an admin route
  const showNavFooter = mounted ? !isAdminRoute : true

  return (
    <>
      <ThemeCSSVars />
      <div className='gradient scroll-smooth' />
      {showNavFooter ? (
        <main suppressHydrationWarning>
          <Nav />
          {children}
          <Footer />
        </main>
      ) : (
        <div suppressHydrationWarning>{children}</div>
      )}
    </>
  )
}
