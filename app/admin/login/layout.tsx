'use client'

import { AuthProvider } from '@/components/admin/AuthProvider'

export default function LoginLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ minHeight: '100vh' }}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </div>
  )
}
