import type { Metadata } from 'next'
import AdmissionsCTA from '@/components/home/AdmissionsCTA'
import Achievements from '@/components/home/Achievements'
import AlumniWorld from '@/components/home/AlumniWorld'
import Gallery from '@/components/home/Gallery'
import Hero from '@/components/home/Hero'
import NewsEvents from '@/components/home/NewsEvents'
import Programs from '@/components/home/Programs'
import Stats from '@/components/home/Stats'
import Testimonials from '@/components/home/Testimonials'
import TrustBar from '@/components/home/TrustBar'
import WhyIHSB from '@/components/home/WhyIHSB'
import { getAllAcademicAchievementsService } from '@/lib/services/academicAchievementsService'
import { getAllFeaturedAlumniService } from '@/lib/services/alumniService'
import { getUpcomingEventsService } from '@/lib/services/eventsService'
import { getLatestNewsService } from '@/lib/services/newsService'
import {
  getGalleryService,
  getSchoolStatsService,
  getTestimonialsService
} from '@/lib/services/siteContentService'

export const metadata: Metadata = {
  title: 'International Hope School Bangladesh | IHSB',
  description:
    'IHSB offers rigorous academics, character education, and global citizenship from Early Years to Grade 12. IB and Cambridge programs available.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'International Hope School Bangladesh | IHSB',
    description:
      'IHSB offers rigorous academics, character education, and global citizenship from Early Years to Grade 12.',
    type: 'website',
    url: 'https://ihsb.edu.bd',
    siteName: 'IHSB'
  }
}

// Content changes a few times a day at most
export const revalidate = 300

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'School',
  name: 'IHSB – International Hope School Bangladesh',
  url: 'https://ihsb.edu.bd',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'BD',
    addressLocality: 'Dhaka',
    streetAddress: 'Plot:07,Road:06,Sector:04, House-25 Rd-06, Dhaka 1230'
  },
  telephone: '+880-2-4895-6999',
  sameAs: ['https://www.facebook.com/ihsbd.net', 'https://www.instagram.com/lifeatihsb'],
  logo: 'https://ihsb.edu.bd/logo.png',
  foundingDate: '1996'
}

export default async function HomePage() {
  // All sections load in parallel: no request waterfall
  const [stats, achievements, news, events, gallery, testimonials, alumni] = await Promise.all([
    getSchoolStatsService(),
    getAllAcademicAchievementsService(),
    getLatestNewsService(4),
    getUpcomingEventsService(4),
    getGalleryService(10),
    getTestimonialsService(4),
    getAllFeaturedAlumniService()
  ])

  return (
    <>
      <Hero stats={stats} />
      <TrustBar />
      <Stats stats={stats} />
      <Programs />
      <WhyIHSB />
      <Achievements achievements={achievements.slice(0, 10)} />
      <NewsEvents news={news} events={events} />
      <Gallery items={gallery} />
      <Testimonials items={testimonials} />
      <AlumniWorld alumni={alumni} />
      <AdmissionsCTA />
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    </>
  )
}
