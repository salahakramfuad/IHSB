import type { Metadata } from 'next'
import {
  BookOpen,
  Brush,
  ChefHat,
  Cpu,
  Dumbbell,
  FlaskConical,
  Languages,
  Mic,
  Music,
  Palette,
  Puzzle,
  Scissors,
  Sparkles,
  Theater,
  Trophy,
  Users,
  type LucideIcon
} from 'lucide-react'
import Reveal from '@/components/motion/Reveal'
import { ButtonLink } from '@/components/ui/Button'
import PageHeader from '@/components/ui/PageHeader'
import Section, { SectionHeader } from '@/components/ui/Section'

export const metadata: Metadata = {
  title: 'Clubs',
  description:
    'Join one of our many student clubs at IHSB - from sports to arts, technology to culture. Explore your passions and connect with peers.',
  alternates: { canonical: '/academics/clubs' },
  openGraph: {
    title: 'Student Clubs | IHSB',
    description: 'Explore diverse student clubs and activities at International Hope School Bangladesh.'
  }
}

const categories: Array<{ name: string; summary: string; Icon: LucideIcon; clubs: Array<{ name: string; Icon: LucideIcon }> }> = [
  {
    name: 'Arts and culture',
    summary: 'Make, perform and read.',
    Icon: Palette,
    clubs: [
      { name: 'Art Club', Icon: Brush },
      { name: 'Cultural Club', Icon: Users },
      { name: 'Dance Club', Icon: Sparkles },
      { name: 'Drama Club', Icon: Theater },
      { name: 'Music Club', Icon: Music },
      { name: 'Guitar Club', Icon: Music },
      { name: 'Book Club', Icon: BookOpen }
    ]
  },
  {
    name: 'Sports',
    summary: 'Train, compete and keep fit.',
    Icon: Trophy,
    clubs: [
      { name: 'Karate Club', Icon: Dumbbell },
      { name: 'Table Tennis Club', Icon: Trophy },
      { name: 'Badminton Club', Icon: Trophy },
      { name: 'Football Club', Icon: Trophy },
      { name: 'Basketball Club', Icon: Trophy }
    ]
  },
  {
    name: 'Academic',
    summary: 'Argue, calculate and investigate.',
    Icon: FlaskConical,
    clubs: [
      { name: 'Maths Club', Icon: Puzzle },
      { name: 'Science Club', Icon: FlaskConical },
      { name: 'Debate Club', Icon: Mic },
      { name: 'Speakers Club', Icon: Mic },
      { name: 'Library Club', Icon: BookOpen },
      { name: 'Rubik’s Cube Club', Icon: Puzzle }
    ]
  },
  {
    name: 'Technology',
    summary: 'Code it, then build it.',
    Icon: Cpu,
    clubs: [
      { name: 'Programming Club', Icon: Cpu },
      { name: 'Robotics Club', Icon: Cpu }
    ]
  },
  {
    name: 'Life skills',
    summary: 'Useful for the rest of your life.',
    Icon: ChefHat,
    clubs: [
      { name: 'Cooking Club', Icon: ChefHat },
      { name: 'Sewing & Craft Club', Icon: Scissors },
      { name: 'Tidiness Club', Icon: Sparkles },
      { name: 'Chess Club', Icon: Puzzle },
      { name: 'French Club', Icon: Languages },
      { name: 'Guidance Club', Icon: Users }
    ]
  }
]

const goals = [
  'Utilizing school facilities more effectively.',
  'Promoting healthy, active lifestyles among students.',
  'Providing co-curricular opportunities for all interested students.'
]

export default function ClubsPage() {
  const total = categories.reduce((sum, category) => sum + category.clubs.length, 0)

  return (
    <>
      <PageHeader
        title='Student clubs'
        subtitle='Explore your passions, develop new skills and connect with peers through our range of student clubs.'
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Campus life' }, { label: 'Clubs' }]}
        patternSeed={37}
      />

      <Section background='canvas' aria-labelledby='why-clubs'>
        <div className='grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-20'>
          <div>
            <h2 id='why-clubs' className='font-display text-display-2 text-ink'>
              Why join a club?
            </h2>
            <div className='gold-rule mt-5 w-28' aria-hidden />
            <div className='prose-ihsb mt-6'>
              <p className='text-lead text-ink'>
                IHSB clubs offer fun, learning and personal growth. They impact behavior, attendance and achievement,
                fostering a sense of belonging and confidence.
              </p>
              <p>
                Students engage in various teams and clubs, requiring commitment and enthusiasm. These activities are
                rewarding and vital to school life, encouraging student involvement and ideas.
              </p>
            </div>
          </div>
          <div className='rounded-xl border border-line bg-paper p-7'>
            <p className='numeral text-6xl text-gold'>{total}</p>
            <p className='mt-1 text-ink-muted'>clubs across five areas</p>
            <h3 className='mt-6 font-display text-title text-ink'>Our goals</h3>
            <ul className='mt-3 space-y-2 text-ink-muted'>
              {goals.map((goal) => (
                <li key={goal} className='flex gap-3'>
                  <span className='mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-500' aria-hidden />
                  {goal}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section background='sunken' aria-labelledby='all-clubs'>
        <SectionHeader
          id='all-clubs'
          title='Clubs by area'
          description='Available clubs may vary from one branch to another. Ask your branch office which ones run this term.'
        />
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {categories.map((category, index) => (
            <Reveal key={category.name} delay={(index % 3) * 0.06} className='rounded-xl border border-line bg-paper p-7'>
              <category.Icon className='h-7 w-7 text-gold' aria-hidden />
              <h3 className='mt-4 font-display text-title text-ink'>{category.name}</h3>
              <p className='text-ink-subtle'>{category.summary}</p>
              <ul className='mt-5 divide-y divide-line border-t border-line'>
                {category.clubs.map((club) => (
                  <li key={club.name} className='flex items-center gap-3 py-2.5 text-ink'>
                    <club.Icon className='h-4 w-4 shrink-0 text-brand' aria-hidden />
                    {club.name}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
          <div className='on-dark flex flex-col justify-between rounded-xl bg-brand-800 p-7'>
            <div>
              <h3 className='font-display text-title text-ink'>Beyond the clubs</h3>
              <p className='mt-2 text-ink-muted'>Competitions, festivals, field trips and special days run through the year.</p>
            </div>
            <ButtonLink href='/academics/extracurricular' variant='inverse' className='mt-6 self-start'>
              Extracurricular activities
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  )
}
