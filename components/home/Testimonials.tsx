import type { Testimonial } from '@/lib/services/siteContentService'
import Reveal from '../motion/Reveal'
import Avatar from '../ui/Avatar'
import Section, { SectionHeader } from '../ui/Section'

export default function Testimonials({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null
  const [lead, ...rest] = items

  return (
    <Section background='canvas' aria-labelledby='testimonials-heading'>
      <SectionHeader id='testimonials-heading' title='In the words of our community' description='Parents, students and alumni on what the school has meant to them.' />

      <div className='grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]'>
        <Reveal as='div' className='on-dark relative overflow-hidden rounded-xl bg-brand-800 p-8 md:p-12'>
          <div className='tessellate absolute inset-0' aria-hidden />
          <figure className='relative flex h-full flex-col justify-between gap-10'>
            <blockquote className='font-display text-display-3 leading-snug text-ink'>
              <p>&ldquo;{lead.text}&rdquo;</p>
            </blockquote>
            <figcaption className='flex items-center gap-4'>
              <Avatar name={lead.name} src={lead.avatar} size={64} />
              <span>
                <span className='block font-semibold text-ink'>{lead.name}</span>
                <span className='block text-sm text-ink-subtle'>{lead.grade}</span>
              </span>
            </figcaption>
          </figure>
        </Reveal>

        <ul className='grid gap-6 sm:grid-cols-2 lg:grid-cols-1'>
          {rest.slice(0, 3).map((testimonial, index) => (
            <Reveal as='li' key={testimonial.id} delay={index * 0.06} className='rounded-xl border border-line bg-paper p-6'>
              <figure>
                <blockquote className='text-ink-muted'>
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
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  )
}
