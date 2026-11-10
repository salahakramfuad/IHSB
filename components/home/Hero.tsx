import { CalendarCheck, FileText } from 'lucide-react'
import { schoolInfo } from '@/data/schoolInfo'
import type { SchoolStats } from '@/data/stats'
import ContourLines from '../patterns/ContourLines'
import HeroScene from '../three/HeroScene'
import { ButtonLink } from '../ui/Button'

/**
 * Home hero. The headline is the LCP element: it is plain server-rendered text,
 * and the 3D scene beside it loads afterwards (a static poster holds its place).
 */
export default function Hero({ stats }: { stats: SchoolStats }) {
  const facts = [
    { value: String(schoolInfo.foundingYear), label: 'Founded' },
    { value: stats.students, label: 'Students' },
    { value: stats.branches, label: 'Branches' }
  ]

  return (
    <section aria-labelledby='hero-heading' className='on-dark relative isolate overflow-hidden bg-brand-900'>
      <div
        className='absolute inset-0 -z-10 bg-[radial-gradient(95%_80%_at_82%_18%,rgb(var(--brand-600)/0.7),transparent_64%)]'
        aria-hidden
      />
      <ContourLines seed={1996} lines={16} className='-z-10 text-gold-300 opacity-45' />

      <div className='container grid items-center gap-8 pb-16 pt-[calc(var(--nav-height)+3rem)] lg:min-h-[min(54rem,100svh)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:pb-24'>
        <div className='max-w-2xl'>
          <p className='text-[0.9375rem] font-semibold text-gold' translate='no'>
            {schoolInfo.name}
          </p>
          <h1 id='hero-heading' className='mt-4 font-display text-display-1 text-ink'>
            Where future leaders grow
          </h1>
          <div className='gold-rule mt-7 w-36' aria-hidden />
          <p className='mt-7 max-w-xl text-lead text-ink-muted'>
            An English-medium school in Dhaka since {schoolInfo.foundingYear}. One Cambridge pathway from the early
            years to A&nbsp;Level, with character, citizenship and readiness for the wider world.
          </p>

          <div className='mt-9 flex flex-wrap gap-3'>
            <ButtonLink href='/admission/apply' variant='secondary' size='lg' leftIcon={<FileText className='h-5 w-5' aria-hidden />}>
              Apply for admission
            </ButtonLink>
            <ButtonLink href='/contact' variant='inverse' size='lg' leftIcon={<CalendarCheck className='h-5 w-5' aria-hidden />}>
              Book a visit
            </ButtonLink>
          </div>

          <dl className='mt-12 grid max-w-md grid-cols-3 gap-6'>
            {facts.map((fact) => (
              <div key={fact.label} className='flex flex-col-reverse border-t border-gold-400/50 pt-3'>
                <dt className='text-sm text-ink-subtle'>{fact.label}</dt>
                <dd className='numeral text-3xl text-ink sm:text-4xl'>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <HeroScene className='mx-auto aspect-[6/5] w-full max-w-md lg:max-w-none' />
      </div>
    </section>
  )
}
