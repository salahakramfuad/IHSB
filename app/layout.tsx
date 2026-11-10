// app/layout.tsx
import React from 'react'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google'
import '../styles/global.css'
import ThemeScript from '@/components/theme/ThemeScript'

// Display: Fraunces (soft, warm old-style serif). Body: Plus Jakarta Sans.
const display = Fraunces({
  subsets: ['latin', 'latin-ext'],
  axes: ['SOFT', 'opsz'],
  variable: '--font-display',
  display: 'swap'
})

const sans = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  display: 'swap'
})

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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbf8f1' },
    { media: '(prefers-color-scheme: dark)', color: '#08130f' }
  ]
}

/**
 * Root layout: <html>/<body>, fonts and the colour theme.
 * Public pages get the navbar and footer from app/(site)/layout.tsx;
 * the admin dashboard has its own layout in app/admin/layout.tsx.
 */
export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={`no-js ${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
        <noscript>
          <style>{'[data-reveal]{opacity:1!important;transform:none!important}'}</style>
        </noscript>
      </head>
      <body className='min-h-screen w-full'>{children}</body>
    </html>
  )
}
