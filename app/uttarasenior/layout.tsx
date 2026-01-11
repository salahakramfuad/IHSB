import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Uttara Senior Section',
  description:
    'Uttara Senior Section of IHSB - Offering IGCSE and A Levels programs with excellent facilities, experienced faculty, and comprehensive academic support.',
  openGraph: {
    title: 'Uttara Senior Section | IHSB',
    description: 'Discover our senior section campus in Uttara offering IGCSE and A Levels programs.'
  }
}

export default function UttaraSeniorLayout({
  children
}: {
  children: React.ReactNode
}) {
  return children
}
