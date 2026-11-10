import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Academic Calendar',
  description:
    'View the academic calendar for International Hope School Bangladesh - important dates, holidays, exams, and events throughout the academic year.',
  openGraph: {
    title: 'Academic Calendar | IHSB',
    description: 'Stay updated with all important dates and events in the IHSB academic calendar.'
  }
}

export default function CalendarLayout({
  children
}: {
  children: React.ReactNode
}) {
  return children
}
