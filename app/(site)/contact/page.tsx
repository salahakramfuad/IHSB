import React from 'react'
import type { Metadata } from 'next'
import { Clock, Mail, MapPin, Phone, Printer } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import Section, { SectionHeader } from '@/components/ui/Section'
import { schoolInfo } from '@/data/schoolInfo'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with International Hope School Bangladesh. Find our contact information, addresses, phone numbers, and send us a message.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Us | IHSB',
    description: 'Contact International Hope School Bangladesh - we\'d love to hear from you!'
  }
}

const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, '')}`
const mapHref = (name: string, address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${schoolInfo.name} ${name} ${address}`)}`

const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.797609401391!2d90.39961447539362!3d23.861319578594895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c42256771bad%3A0x662d13081edbb710!2sInternational%20Hope%20School%20Bangladesh!5e0!3m2!1sen!2sbd!4v1738793777927!5m2!1sen!2sbd'

export default function ContactPage() {
  const branches = Object.values(schoolInfo.branches)

  return (
    <>
      <PageHeader
        title='Contact us'
        subtitle='Call or write to the front office, send a message below, or visit one of our branches.'
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        patternSeed={29}
      />

      <Section background='canvas' aria-label='Contact details and message form'>
        <div className='grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20'>
          <div>
            <h2 className='font-display text-display-3 text-ink'>Front office</h2>
            <div className='gold-rule mt-4 w-24' aria-hidden />
            <address className='mt-7 space-y-6 not-italic'>
              <p className='flex gap-4'>
                <MapPin className='mt-1 h-5 w-5 shrink-0 text-gold' aria-hidden />
                <span className='text-ink'>
                  <span className='block font-semibold' translate='no'>
                    {schoolInfo.name}
                  </span>
                  {schoolInfo.address.main}
                </span>
              </p>
              <div className='flex gap-4'>
                <Phone className='mt-1 h-5 w-5 shrink-0 text-gold' aria-hidden />
                <dl className='grid gap-x-6 gap-y-2 text-ink sm:grid-cols-[auto_minmax(0,1fr)]'>
                  <dt className='text-ink-subtle'>Telephone</dt>
                  <dd>
                    <a href={telHref(schoolInfo.phone.main)} className='link-underline'>
                      {schoolInfo.phone.main}
                    </a>
                    , {schoolInfo.phone.alternate}
                  </dd>
                  <dt className='text-ink-subtle'>Admissions office</dt>
                  <dd>
                    <a href={telHref(schoolInfo.phone.uttaraAdmission)} className='link-underline'>
                      {schoolInfo.phone.uttaraAdmission}
                    </a>
                  </dd>
                </dl>
              </div>
              <p className='flex gap-4'>
                <Printer className='mt-1 h-5 w-5 shrink-0 text-gold' aria-hidden />
                <span className='text-ink'>
                  <span className='text-ink-subtle'>Fax </span>
                  {schoolInfo.fax}
                </span>
              </p>
              <div className='flex gap-4'>
                <Mail className='mt-1 h-5 w-5 shrink-0 text-gold' aria-hidden />
                <dl className='grid gap-x-6 gap-y-2 text-ink sm:grid-cols-[auto_minmax(0,1fr)]'>
                  <dt className='text-ink-subtle'>General enquiries</dt>
                  <dd>
                    <a href={`mailto:${schoolInfo.email.general}`} className='link-underline break-all'>
                      {schoolInfo.email.general}
                    </a>
                  </dd>
                  <dt className='text-ink-subtle'>Admissions</dt>
                  <dd>
                    <a href={`mailto:${schoolInfo.email.admission}`} className='link-underline break-all'>
                      {schoolInfo.email.admission}
                    </a>
                  </dd>
                </dl>
              </div>
              <div className='flex gap-4'>
                <Clock className='mt-1 h-5 w-5 shrink-0 text-gold' aria-hidden />
                <dl className='grid gap-x-6 gap-y-2 text-ink sm:grid-cols-[auto_minmax(0,1fr)]'>
                  {schoolInfo.officeHours.map((entry) => (
                    <React.Fragment key={entry.days}>
                      <dt className='text-ink-subtle'>{entry.days}</dt>
                      <dd>{entry.hours}</dd>
                    </React.Fragment>
                  ))}
                </dl>
              </div>
            </address>
          </div>

          <div className='rounded-xl border border-line bg-paper p-6 shadow-soft sm:p-9'>
            <h2 className='font-display text-display-3 text-ink'>Send a message</h2>
            <p className='mb-7 mt-2 text-ink-muted'>We reply by email, usually within two working days.</p>
            <ContactForm />
          </div>
        </div>
      </Section>

      <Section background='sunken' aria-labelledby='branches-heading'>
        <SectionHeader id='branches-heading' title='Our branches' description='Each branch has its own front office.' />
        <ul className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {branches.map((branch) => (
            <li key={branch.name} className='flex flex-col rounded-xl border border-line bg-paper p-6'>
              <h3 className='font-display text-title text-ink'>{branch.name}</h3>
              <p className='mt-2 text-ink-muted'>{branch.address}</p>
              <ul className='mt-4 space-y-1 text-ink'>
                {branch.phone.map((phone) => (
                  <li key={phone}>
                    <a href={telHref(phone)} className='link-underline'>
                      {phone}
                    </a>
                  </li>
                ))}
              </ul>
              <p className='mt-auto pt-5'>
                <a
                  href={mapHref(branch.name, branch.address)}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='link-underline inline-flex items-center gap-1.5 font-semibold text-brand'
                >
                  <MapPin className='h-4 w-4' aria-hidden />
                  Open in Maps<span className='sr-only'> (opens in a new tab)</span>
                </a>
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section background='canvas' spacing='sm' aria-labelledby='map-heading'>
        <h2 id='map-heading' className='mb-6 font-display text-display-3 text-ink'>
          Find the Uttara campus
        </h2>
        <div className='overflow-hidden rounded-xl border border-line'>
          <iframe
            src={MAP_EMBED}
            title='Map showing International Hope School Bangladesh in Uttara, Dhaka'
            width='100%'
            height='450'
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            allowFullScreen
            className='block border-0'
          />
        </div>
      </Section>
    </>
  )
}
