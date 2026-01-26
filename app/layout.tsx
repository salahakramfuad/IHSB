// app/layout.tsx
import React from 'react'
import type { Metadata } from 'next'
import '../styles/global.css'
import LayoutWrapper from '../components/layout/LayoutWrapper'

export const metadata: Metadata = {
  metadataBase: new URL('https://ihsb.edu.bd'),
  title: {
    default: 'International Hope School Bangladesh | IHSB',
    template: '%s | IHSB'
  },
  description:
    'International Hope School Bangladesh (IHSB) offers world-class education with IB and Cambridge programs. Nurturing future leaders with excellence, compassion, and global citizenship.',
  keywords: [
    'IHSB',
    'International Hope School Bangladesh',
    'international school',
    'IB school',
    'Cambridge school',
    'Dhaka school',
    'education Bangladesh'
  ],
  authors: [{ name: 'IHSB' }],
  creator: 'International Hope School Bangladesh',
  publisher: 'International Hope School Bangladesh',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ihsb.edu.bd',
    siteName: 'International Hope School Bangladesh',
    title: 'International Hope School Bangladesh | IHSB',
    description:
      'World-class international education with IB and Cambridge programs in Dhaka, Bangladesh.',
    images: [
      {
        url: '/assets/images/ihsb.jpg',
        width: 1200,
        height: 630,
        alt: 'IHSB Campus'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'International Hope School Bangladesh | IHSB',
    description:
      'World-class international education with IB and Cambridge programs.',
    images: ['/assets/images/ihsb.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
}

/**
 * Root layout - provides html/body structure
 * LayoutWrapper conditionally renders Nav/Footer based on route
 * Admin routes are excluded from public navigation
 */
export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className='w-full'>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}
