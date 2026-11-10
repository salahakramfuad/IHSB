import { schoolInfo } from '@/data/schoolInfo'
import type { SchoolStats } from '@/data/stats'
import CountUp from '../motion/CountUp'
import Section from '../ui/Section'
import Stat from '../ui/Stat'

export default function Stats({ stats }: { stats: SchoolStats }) {
  const years = new Date().getFullYear() - schoolInfo.foundingYear
  const entries = [
    { value: stats.students, label: 'Students', note: 'across all branches' },
    { value: `${years}`, label: 'Years of teaching', note: `since ${schoolInfo.foundingYear}` },
    { value: stats.clubs, label: 'Clubs and societies', note: 'run with students' },
    { value: stats.scholarships, label: 'Scholarships awarded', note: 'merit and need based' },
    { value: stats.branches, label: 'Branches', note: 'Dhaka and Chattogram' }
  ]

  return (
    <Section background='canvas' aria-labelledby='stats-heading'>
      <div className='grid gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16'>
        <div>
          <h2 id='stats-heading' className='font-display text-display-2 text-ink'>
            IHSB at a glance
          </h2>
          <div className='gold-rule mt-5 w-28' aria-hidden />
          <p className='mt-5 text-ink-muted'>
            A Cambridge school that has grown from one campus in {schoolInfo.foundingYear} to a community across two
            cities.
          </p>
        </div>
        <dl className='grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3'>
          {entries.map((entry) => (
            <Stat key={entry.label} value={<CountUp value={entry.value} />} label={entry.label} note={entry.note} />
          ))}
        </dl>
      </div>
    </Section>
  )
}
