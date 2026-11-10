import type { Metadata } from 'next'
import Link from 'next/link'
import SiteShell from '@/components/layout/SiteShell'
import { ButtonLink } from '@/components/ui/Button'
import PageHeader from '@/components/ui/PageHeader'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false }
}

const suggestions = [
  { title: 'Admissions', description: 'Procedure, fees and the online application', href: '/admission/admissionprocedure' },
  { title: 'Curriculum', description: 'What is taught at each stage', href: '/academics/curriculum' },
  { title: 'News', description: 'Stories from the school community', href: '/news' },
  { title: 'Events', description: 'What is on this term', href: '/events' },
  { title: 'Our branches', description: 'Uttara and Gulshan campuses', href: '/uttarasenior' },
  { title: 'Contact', description: 'Addresses, phone numbers and a map', href: '/contact' }
]

export default function NotFound() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow='Error 404'
        title='We could not find that page'
        subtitle='The address may be mistyped, or the page may have moved. These are the places people look for most.'
        actions={
          <ButtonLink href='/' variant='secondary'>
            Go to the home page
          </ButtonLink>
        }
      />
      <section className='container py-section-sm' aria-label='Suggested pages'>
        <ul className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {suggestions.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className='block h-full rounded-lg border border-line bg-paper p-6 transition-[border-color,box-shadow] duration-base hover:border-line-strong hover:shadow-raised'
              >
                <span className='font-display text-title text-ink'>{item.title}</span>
                <span className='mt-1 block text-ink-muted'>{item.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </SiteShell>
  )
}
