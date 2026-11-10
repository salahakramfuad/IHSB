import Image from 'next/image'
import { Check } from 'lucide-react'
import { img } from '@/lib/mock/images'
import { ButtonLink } from '../ui/Button'
import Section, { SectionHeader } from '../ui/Section'
import Tabs, { TabsList, TabsPanel, TabsPanels, TabsTab } from '../ui/Tabs'

const programmes = [
  {
    tab: 'Early Years',
    title: 'Preschool',
    ages: 'Playgroup to KG, ages 3 to 5',
    summary:
      'Children learn through play, stories and making. The day is planned around six areas, from early literacy in English and Bangla to discovering the world around them.',
    points: ['Phonics-based reading in English and Bangla', 'Number, shape and pattern through daily experience', 'Art, music and movement every week'],
    image: img.primaryClass,
    alt: 'Young children listening to a story in a preschool classroom'
  },
  {
    tab: 'Primary',
    title: 'Primary school',
    ages: 'Grades 1 to 5',
    summary:
      'Cambridge Primary English, mathematics and science, taught by enquiry, alongside Bangla from the national curriculum, computing and character education.',
    points: ['Cambridge Primary in English, mathematics and science', 'Bangla following the national curriculum', 'Cambridge ICT Starters and values education'],
    image: img.classroomTeacher,
    alt: 'A teacher helping primary pupils at their desks'
  },
  {
    tab: 'Secondary',
    title: 'Senior section',
    ages: 'Grades 6 to 10',
    summary:
      'Cambridge Lower Secondary leads into IGCSE. Students choose from sciences, mathematics, business subjects and languages, with laboratories and clubs to match.',
    points: ['Cambridge Lower Secondary, then IGCSE', 'Thirteen IGCSE subjects to choose from', 'Science, ICT and design laboratories'],
    image: img.scienceLab,
    alt: 'Students carrying out an experiment in a science laboratory'
  },
  {
    tab: 'A Level',
    title: 'Advanced Level',
    ages: 'Grades 11 and 12',
    summary:
      'Cambridge International AS and A Levels in mathematics, sciences and business subjects, with university and careers counselling from the first term.',
    points: ['AS and A Level in eight subjects', 'One-to-one university counselling', 'Mock examinations under Cambridge regulations'],
    image: img.studying,
    alt: 'A senior student studying with textbooks'
  }
]

export default function Programs() {
  return (
    <Section background='sunken' aria-labelledby='programmes-heading'>
      <SectionHeader
        id='programmes-heading'
        title='One pathway, four stages'
        description='Children can join at any stage. Each one builds on the last, so a pupil who starts in Playgroup can leave with A Levels.'
        action={{ label: 'See the full curriculum', href: '/academics/curriculum' }}
      />

      <Tabs>
        <TabsList label='School stages'>
          {programmes.map((programme) => (
            <TabsTab key={programme.tab}>{programme.tab}</TabsTab>
          ))}
        </TabsList>
        <TabsPanels>
          {programmes.map((programme) => (
            <TabsPanel key={programme.tab}>
              <div className='grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16'>
                <div>
                  <p className='text-sm font-semibold text-gold'>{programme.ages}</p>
                  <h3 className='mt-2 font-display text-display-3 text-ink'>{programme.title}</h3>
                  <p className='mt-4 max-w-prose text-lead text-ink-muted'>{programme.summary}</p>
                  <ul className='mt-6 space-y-3'>
                    {programme.points.map((point) => (
                      <li key={point} className='flex gap-3 text-ink'>
                        <Check className='mt-1 h-4 w-4 shrink-0 text-gold' aria-hidden />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <ButtonLink href='/academics/curriculum' variant='outline' className='mt-8'>
                    Curriculum in detail
                  </ButtonLink>
                </div>
                <div className='relative mx-auto w-full max-w-sm lg:max-w-none'>
                  <div className='arch absolute inset-0 translate-x-3 translate-y-3 border border-gold-500/70' aria-hidden />
                  <div className='arch relative aspect-[4/5] overflow-hidden bg-paper'>
                    <Image src={programme.image} alt={programme.alt} fill sizes='(max-width: 1024px) 80vw, 26rem' className='object-cover' />
                  </div>
                </div>
              </div>
            </TabsPanel>
          ))}
        </TabsPanels>
      </Tabs>
    </Section>
  )
}
