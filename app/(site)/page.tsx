import Feed from '../components/features/Feed'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'International Hope School Bangladesh | IHSB',
  description:
    'IHSB offers rigorous academics, character education, and global citizenship from Early Years to Grade 12. IB and Cambridge programs available.',
  openGraph: {
    title: 'International Hope School Bangladesh | IHSB',
    description:
      'IHSB offers rigorous academics, character education, and global citizenship from Early Years to Grade 12.',
    type: 'website',
    url: 'https://ihsb.edu.bd',
    siteName: 'IHSB'
  }
}

export default function HomePage() {
  return <Feed />
}
