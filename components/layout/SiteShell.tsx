import React, { Suspense } from 'react'
import AnnouncementBanner from '../shared/AnnouncementBanner'
import Footer from './Footer'
import Navbar from './Navbar'

/** Chrome for every public page: notice bar, navbar, main landmark, footer. */
export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Suspense fallback={null}>
        <AnnouncementBanner />
      </Suspense>
      <Navbar />
      <main id='main' className='flex-1'>
        {children}
      </main>
      <Footer />
    </div>
  )
}
