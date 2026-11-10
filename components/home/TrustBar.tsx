import Marquee from '../ui/Marquee'

/** Curricula and examinations taught at IHSB. Set as wordmarks until logo files are supplied. */
const curricula = [
  'Cambridge Early Years',
  'Cambridge Primary',
  'Cambridge Lower Secondary',
  'Cambridge IGCSE',
  'Cambridge International AS Level',
  'Cambridge International A Level',
  'National Curriculum Bangla'
]

export default function TrustBar() {
  return (
    <section aria-label='Curricula and examinations' className='border-b border-line bg-paper py-6'>
      <Marquee label='Curricula and examinations taught at IHSB'>
        {curricula.map((name) => (
          <li key={name} className='flex items-center gap-12 whitespace-nowrap font-display text-lg text-ink-muted'>
            {name}
            <span className='h-1.5 w-1.5 rotate-45 bg-gold-500' aria-hidden />
          </li>
        ))}
      </Marquee>
    </section>
  )
}
