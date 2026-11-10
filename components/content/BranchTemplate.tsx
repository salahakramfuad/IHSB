import React from 'react'
import Image from 'next/image'
import { Check, Mail, MapPin, Phone } from 'lucide-react'
import { schoolInfo } from '@/data/schoolInfo'
import type { FacultyMember, GalleryItem, Testimonial } from '@/lib/services/siteContentService'
import Reveal from '../motion/Reveal'
import LightboxGallery from '../shared/LightboxGallery'
import Avatar from '../ui/Avatar'
import { ButtonLink } from '../ui/Button'
import PageHeader from '../ui/PageHeader'
import Section, { SectionHeader } from '../ui/Section'

export interface BranchTemplateProps {
  /** Page title, e.g. "Uttara Senior Section" */
  title: string
  /** One line under the title: what the branch teaches */
  tagline: string
  branch: { name: string; address: string; phone: string[]; email: string }
  heroImage: { src: string; alt: string }
  about: string[]
  /** Optional second column beside "About" */
  aim?: string
  programmes: Array<{ title: string; age: string; description: string }>
  highlights: Array<{ title: string; description: string }>
  facilities?: string[]
  /** Extra section between programmes and highlights (e.g. subject lists) */
  children?: React.ReactNode
  gallery: GalleryItem[]
  staff?: FacultyMember[]
  testimonials?: Testimonial[]
  map: { src: string; title: string }
  patternSeed?: number
}

const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, '')}`

/** Shared layout for the branch pages: hero, about, programmes, highlights, facilities, gallery, people, contact. */
export default function BranchTemplate({
  title,
  tagline,
  branch,
  heroImage,
  about,
  aim,
  programmes,
  highlights,
  facilities,
  children,
  gallery,
  staff = [],
  testimonials = [],
  map,
  patternSeed = 71
}: BranchTemplateProps) {
  return (
    <>
      <PageHeader
        title={title}
        subtitle={tagline}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Branches' }, { label: title }]}
        patternSeed={patternSeed}
        actions={
          <>
            <ButtonLink href='/admission/apply' variant='secondary'>
              Apply now
            </ButtonLink>
            <ButtonLink href='/contact' variant='inverse'>
              Book a visit
            </ButtonLink>
          </>
        }
        media={
          <div className='relative mx-auto hidden w-full max-w-sm lg:block'>
            <div className='arch absolute inset-0 translate-x-3 translate-y-3 border border-gold-400/70' aria-hidden />
            <div className='arch relative aspect-[4/5] overflow-hidden bg-brand-800'>
              <Image src={heroImage.src} alt={heroImage.alt} fill priority sizes='24rem' className='object-cover' />
            </div>
          </div>
        }
      >
        <address className='mt-8 flex flex-col gap-2 text-[0.9375rem] not-italic text-ink-muted sm:flex-row sm:flex-wrap sm:gap-x-6'>
          <span className='inline-flex items-center gap-2'>
            <MapPin className='h-4 w-4 shrink-0 text-gold' aria-hidden />
            {branch.address}
          </span>
          <a href={telHref(branch.phone[0])} className='link-underline inline-flex items-center gap-2'>
            <Phone className='h-4 w-4 shrink-0 text-gold' aria-hidden />
            {branch.phone[0]}
          </a>
        </address>
      </PageHeader>

      {/* ---- About ---- */}
      <Section background='canvas' aria-labelledby='branch-about'>
        <div className='grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-20'>
          <div>
            <h2 id='branch-about' className='font-display text-display-2 text-ink'>
              About this section
            </h2>
            <div className='gold-rule mt-5 w-28' aria-hidden />
            <div className='prose-ihsb mt-6'>
              {about.map((paragraph, index) => (
                <p key={index} className={index === 0 ? 'text-lead text-ink' : undefined}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          {aim && (
            <aside className='on-dark relative self-start overflow-hidden rounded-xl bg-brand-800 p-8'>
              <div className='tessellate absolute inset-0' aria-hidden />
              <div className='relative'>
                <h3 className='font-display text-title text-gold'>Our aim</h3>
                <p className='mt-3 text-ink'>{aim}</p>
              </div>
            </aside>
          )}
        </div>
      </Section>

      {/* ---- Programmes ---- */}
      <Section background='sunken' aria-labelledby='branch-programmes'>
        <SectionHeader id='branch-programmes' title='Programmes offered' />
        <ul className={`grid gap-6 ${programmes.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
          {programmes.map((programme, index) => (
            <Reveal as='li' key={programme.title} delay={index * 0.06} className='rounded-xl border border-line bg-paper p-7'>
              <p className='text-sm font-semibold text-gold'>{programme.age}</p>
              <h3 className='mt-2 font-display text-display-3 text-ink'>{programme.title}</h3>
              <p className='mt-3 text-ink-muted'>{programme.description}</p>
            </Reveal>
          ))}
        </ul>
        {children && <div className='mt-14'>{children}</div>}
      </Section>

      {/* ---- Highlights and facilities ---- */}
      <Section background='canvas' aria-labelledby='branch-highlights'>
        <SectionHeader id='branch-highlights' title='What makes this section special' />
        <ul className='grid gap-x-12 gap-y-10 md:grid-cols-2'>
          {highlights.map((highlight) => (
            <li key={highlight.title} className='border-t border-gold-500/60 pt-5'>
              <h3 className='font-display text-title text-ink'>{highlight.title}</h3>
              <p className='mt-2 text-ink-muted'>{highlight.description}</p>
            </li>
          ))}
        </ul>

        {facilities && facilities.length > 0 && (
          <div className='mt-16 rounded-xl border border-line bg-paper p-8'>
            <h3 className='font-display text-display-3 text-ink'>Facilities</h3>
            <ul className='mt-5 grid gap-x-10 gap-y-3 md:grid-cols-2'>
              {facilities.map((facility) => (
                <li key={facility} className='flex gap-3 text-ink'>
                  <Check className='mt-1 h-4 w-4 shrink-0 text-gold' aria-hidden />
                  {facility}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      {/* ---- Gallery ---- */}
      {gallery.length > 0 && (
        <Section background='sunken' aria-labelledby='branch-gallery'>
          <SectionHeader id='branch-gallery' title='Campus life' description='Select a photo to see it larger.' />
          <LightboxGallery images={gallery} />
        </Section>
      )}

      {/* ---- People ---- */}
      {staff.length > 0 && (
        <Section background='canvas' aria-labelledby='branch-staff'>
          <SectionHeader id='branch-staff' title='Section leadership' />
          <ul className='grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4'>
            {staff.map((member) => (
              <li key={member.id}>
                <div className='arch relative aspect-[4/5] overflow-hidden bg-brand-100 dark:bg-brand-800'>
                  <Image src={member.photo} alt={`Portrait of ${member.name}`} fill sizes='(max-width: 768px) 50vw, 22vw' className='object-cover' />
                </div>
                <h3 className='mt-4 font-display text-title text-ink'>{member.name}</h3>
                <p className='text-ink-muted'>{member.role}</p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {testimonials.length > 0 && (
        <Section background='brand' aria-labelledby='branch-voices'>
          <SectionHeader id='branch-voices' title='Student and parent voices' />
          <ul className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {testimonials.map((testimonial) => (
              <li key={testimonial.id} className='rounded-xl border border-line bg-brand-800 p-6'>
                <figure>
                  <blockquote className='text-ink'>
                    <p>&ldquo;{testimonial.text}&rdquo;</p>
                  </blockquote>
                  <figcaption className='mt-5 flex items-center gap-3'>
                    <Avatar name={testimonial.name} src={testimonial.avatar} size={44} />
                    <span>
                      <span className='block text-[0.9375rem] font-semibold text-ink'>{testimonial.name}</span>
                      <span className='block text-sm text-ink-subtle'>{testimonial.grade}</span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* ---- Contact and map ---- */}
      <Section background='canvas' aria-labelledby='branch-contact'>
        <div className='grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16'>
          <div>
            <h2 id='branch-contact' className='font-display text-display-2 text-ink'>
              Visit us
            </h2>
            <div className='gold-rule mt-5 w-28' aria-hidden />
            <address className='mt-7 space-y-5 not-italic text-ink'>
              <p className='flex gap-3'>
                <MapPin className='mt-1 h-5 w-5 shrink-0 text-gold' aria-hidden />
                <span>
                  <span className='block font-semibold'>{branch.name}</span>
                  {branch.address}
                </span>
              </p>
              <div className='flex gap-3'>
                <Phone className='mt-1 h-5 w-5 shrink-0 text-gold' aria-hidden />
                <ul className='space-y-1'>
                  {branch.phone.map((phone) => (
                    <li key={phone}>
                      <a href={telHref(phone)} className='link-underline'>
                        {phone}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <p className='flex gap-3'>
                <Mail className='mt-1 h-5 w-5 shrink-0 text-gold' aria-hidden />
                <a href={`mailto:${branch.email}`} className='link-underline'>
                  {branch.email}
                </a>
              </p>
            </address>
            <dl className='mt-7 space-y-1 border-t border-line pt-5 text-[0.9375rem]'>
              {schoolInfo.officeHours.map((entry) => (
                <div key={entry.days} className='flex justify-between gap-4'>
                  <dt className='text-ink-subtle'>{entry.days}</dt>
                  <dd className='text-ink'>{entry.hours}</dd>
                </div>
              ))}
            </dl>
            <ButtonLink href='/contact' className='mt-8'>
              Send a message
            </ButtonLink>
          </div>
          <div className='overflow-hidden rounded-xl border border-line'>
            <iframe
              src={map.src}
              title={map.title}
              width='100%'
              height='460'
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              allowFullScreen
              className='block h-full min-h-[22rem] w-full border-0'
            />
          </div>
        </div>
      </Section>
    </>
  )
}
