import React from 'react'
import SiteShell from '@/components/layout/SiteShell'

/** Layout for all public pages (navbar + footer). The admin dashboard is outside this group. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>
}
