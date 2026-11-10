import type { Metadata } from 'next'
import { Bus, Lightbulb, PartyPopper, Palette, GraduationCap, Target, Theater, Trophy, Users, type LucideIcon } from 'lucide-react'
import Reveal from '@/components/motion/Reveal'
import PageHeader from '@/components/ui/PageHeader'
import Section, { SectionHeader } from '@/components/ui/Section'

export const metadata: Metadata = {
  title: 'Extracurricular Activities',
  description:
    'Discover diverse extracurricular activities at IHSB - from cultural events and sports competitions to field trips and special celebrations.',
  alternates: { canonical: '/academics/extracurricular' },
  openGraph: {
    title: 'Extracurricular Activities | IHSB',
    description: 'Enriching activities that complement academic performance and refine social skills.'
  }
}

const activities: Array<{ category: string; Icon: LucideIcon; items: string[] }> = [
  {
    category: 'Cultural',
    Icon: Theater,
    items: [
      'Dance competitions',
      'Cultural functions',
      'Drama and talent shows',
      'Singing contests',
      'International culture festivals',
      'Poetry competitions',
      'Bangla movie day',
      'Bangla week',
      'English week'
    ]
  },
  {
    category: 'Academic',
    Icon: GraduationCap,
    items: [
      'Handwriting competitions',
      'Essay competitions',
      'Debate competitions',
      'Spelling bee',
      'Bangla olympiad',
      'Maths olympiad',
      'International olympiads',
      'Reading competitions',
      'Book Fair'
    ]
  },
  {
    category: 'Sports',
    Icon: Trophy,
    items: [
      'Table tennis tournaments',
      'Badminton tournaments',
      'Football matches',
      'Basketball games',
      'Volleyball matches',
      'Athletics competitions'
    ]
  },
  {
    category: 'Field trips',
    Icon: Bus,
    items: [
      'Visiting museums',
      'Visiting amusement parks',
      'Visiting factories',
      'Kids day out',
      'Picnics',
      'Hosting or visiting exhibitions'
    ]
  },
  {
    category: 'Special events',
    Icon: PartyPopper,
    items: [
      'Kazi Nazrul Islam day',
      'Kids shows',
      'Mother’s Day special quiz shows',
      'Traditional food days',
      'Fun shows',
      'Science fairs',
      'Children’s festival',
      'Profession / career days',
      'Cooking',
      'Kids-and-mothers / kids-and-fathers days',
      'Grandparent’s day'
    ]
  },
  {
    category: 'Creative',
    Icon: Palette,
    items: ['Kite making', 'Art competitions']
  }
]

const benefits = [
  { Icon: Target, title: 'Skill development', text: 'Build leadership, teamwork, and communication skills through hands-on experiences.' },
  { Icon: Users, title: 'Social growth', text: 'Form meaningful friendships and learn to work collaboratively with peers.' },
  { Icon: Lightbulb, title: 'Creative expression', text: 'Explore talents and interests that may not be covered in regular classes.' }
]

export default function ExtracurricularPage() {
  return (
    <>
      <PageHeader
        title='Extracurricular activities'
        subtitle='Complementing academic performance and refining social skills through diverse activities.'
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Campus life' }, { label: 'Extracurricular activities' }]}
        patternSeed={41}
      />

      <Section background='canvas' aria-labelledby='beyond-heading'>
        <div className='grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20'>
          <div>
            <h2 id='beyond-heading' className='font-display text-display-2 text-ink'>
              Student life beyond the classroom
            </h2>
            <div className='gold-rule mt-5 w-28' aria-hidden />
            <p className='mt-6 max-w-prose text-lead text-ink-muted'>
              At IHSB, we believe that education extends far beyond textbooks. Our extracurricular program offers
              students opportunities to explore interests, develop talents, build friendships, and create lasting
              memories while complementing their academic journey.
            </p>
          </div>
          <ul className='space-y-6'>
            {benefits.map(({ Icon, title, text }) => (
              <li key={title} className='flex gap-5 border-t border-line pt-6 first:border-t-0 first:pt-0'>
                <Icon className='mt-1 h-6 w-6 shrink-0 text-gold' aria-hidden />
                <div>
                  <h3 className='font-display text-title text-ink'>{title}</h3>
                  <p className='mt-1 text-ink-muted'>{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section background='sunken' aria-labelledby='activities-heading'>
        <SectionHeader id='activities-heading' title='What happens during the year' />
        <div className='columns-1 gap-6 md:columns-2 lg:columns-3 [&>*]:mb-6'>
          {activities.map((activity, index) => (
            <Reveal key={activity.category} delay={(index % 3) * 0.06} className='break-inside-avoid rounded-xl border border-line bg-paper p-7'>
              <div className='flex items-center justify-between gap-4'>
                <h3 className='font-display text-title text-ink'>{activity.category}</h3>
                <activity.Icon className='h-6 w-6 text-gold' aria-hidden />
              </div>
              <ul className='mt-4 divide-y divide-line border-t border-line'>
                {activity.items.map((item) => (
                  <li key={item} className='py-2.5 text-ink-muted'>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  )
}
