import type { Metadata } from 'next'
import Image from 'next/image'
import { Award, BookOpen, Heart } from 'lucide-react'
import Reveal from '@/components/motion/Reveal'
import LightboxGallery from '@/components/shared/LightboxGallery'
import { ButtonLink } from '@/components/ui/Button'
import PageHeader from '@/components/ui/PageHeader'
import Section, { SectionHeader } from '@/components/ui/Section'
import Timeline from '@/components/ui/Timeline'
import { schoolInfo } from '@/data/schoolInfo'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about International Hope School Bangladesh - our mission, vision, values, and commitment to nurturing future leaders with excellence and compassion.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About IHSB | International Hope School Bangladesh',
    description:
      'Discover our mission to impart the highest standard of education and foster well-rounded graduates ready for the 21st century.'
  }
}

const values = [
  {
    Icon: Heart,
    title: 'Build confidence',
    text: 'We focus on reinforcing self-esteem and confidence so students can overcome life’s challenges with resilience.'
  },
  {
    Icon: BookOpen,
    title: 'Foster respect',
    text: 'We encourage mutual respect and understanding in an environment conducive to both academic and moral development.'
  },
  {
    Icon: Award,
    title: 'Academic excellence',
    text: 'A diverse and reliable curriculum designed to ensure academic success in a global context.'
  }
]

const leaders = [
  {
    name: 'Timothy Doland Fisher',
    role: 'Chairman, International Hope School Bangladesh',
    image: '/assets/images/chairman.png',
    heading: 'Message from the Chairman',
    message: [
      'A great school is where wisdom shines, and a teacher is the guiding light. We strive to create such an environment to nurture young minds and shape future leaders.'
    ]
  },
  {
    name: 'Roksana Zarin',
    role: 'Principal, International Hope School Bangladesh',
    image: '/assets/images/principal.png',
    heading: 'Message from the Principal',
    message: [
      'We aim to cultivate lifelong learners who are not only academically proficient but also ready to contribute to society in meaningful ways.',
      'Our community of students, parents, and faculty come together to create a supportive environment for growth and success.'
    ]
  }
]

const campusPhotos = [
  { src: '/assets/images/ihsb.png', caption: 'The IHSB campus' },
  { src: '/assets/images/teachers.png', caption: 'Our teachers' },
  { src: '/assets/images/students.png', caption: 'Our students' }
]

export default function AboutPage() {
  const branchCount = Object.keys(schoolInfo.branches).length

  return (
    <>
      <PageHeader
        title='About IHSB'
        subtitle='We nurture young minds in an environment of academic excellence, creativity and ethical growth, so that students excel in their studies and as people.'
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
        patternSeed={19}
        actions={
          <>
            <ButtonLink href='/admission/admissionprocedure' variant='secondary'>
              How to join
            </ButtonLink>
            <ButtonLink href='/contact' variant='inverse'>
              Book a visit
            </ButtonLink>
          </>
        }
      />

      {/* ---- Mission and vision ---- */}
      <Section background='canvas' aria-labelledby='mission-heading'>
        <div className='grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20'>
          <div>
            <h2 id='mission-heading' className='font-display text-display-2 text-ink'>
              Mission and vision
            </h2>
            <div className='gold-rule mt-5 w-28' aria-hidden />
            <p className='mt-5 font-display text-title text-gold'>{schoolInfo.motto}</p>
          </div>
          <div className='grid gap-10 md:grid-cols-2'>
            <Reveal>
              <h3 className='font-display text-display-3 text-ink'>Our mission</h3>
              <p className='mt-3 text-lead text-ink-muted'>
                Our experienced teachers and management aim to impart education of the highest standard. Our goal is
                not solely academic excellence but to foster well-rounded graduates ready for the challenges of the
                21st century.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className='font-display text-display-3 text-ink'>Our vision</h3>
              <p className='mt-3 text-lead text-ink-muted'>
                We encourage students to engage wholeheartedly in science, business, the humanities, or family life,
                with strong moral values and mutual respect, in an environment conducive to both academic and
                character development.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---- Story ---- */}
      <Section background='sunken' aria-labelledby='story-heading'>
        <div className='grid gap-12 lg:grid-cols-2 lg:gap-20'>
          <div>
            <SectionHeader
              id='story-heading'
              title='Our story'
              description='A leading English-medium school in Dhaka and Chattogram, teaching the full Cambridge curriculum from toddler to A Level.'
              className='mb-8 md:mb-10'
            />
            <Timeline>
              <Timeline.Item marker={schoolInfo.foundingYear} title='The school opens'>
                International Hope School Bangladesh is established in Dhaka as an English-medium school.
              </Timeline.Item>
              <Timeline.Item marker='Cambridge' title='One pathway from preschool to A Level'>
                Students follow the Cambridge curriculum through primary and lower secondary to IGCSE and
                International AS and A Level.
              </Timeline.Item>
              <Timeline.Item marker='Today' title={`${branchCount} branches in two cities`}>
                Uttara and Gulshan in Dhaka, and Chattogram, with modern classrooms, science and ICT laboratories and
                a wide range of activities outside lessons.
              </Timeline.Item>
            </Timeline>
          </div>
          <div className='relative mx-auto w-full max-w-md lg:max-w-none'>
            <div className='arch absolute inset-0 translate-x-3 translate-y-3 border border-gold-500/70' aria-hidden />
            <div className='arch relative aspect-[4/5] overflow-hidden bg-paper'>
              <Image
                src='/assets/images/ihsb.jpg'
                alt='The IHSB campus with students'
                fill
                sizes='(max-width: 1024px) 90vw, 36rem'
                className='object-cover'
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ---- Values ---- */}
      <Section background='canvas' aria-labelledby='values-heading'>
        <SectionHeader
          id='values-heading'
          title='What we stand for'
          description='A learning community built on confidence, respect and excellence.'
        />
        <ul className='grid gap-6 md:grid-cols-3'>
          {values.map(({ Icon, title, text }, index) => (
            <Reveal as='li' key={title} delay={index * 0.06} className='rounded-xl border border-line bg-paper p-7'>
              <Icon className='h-7 w-7 text-gold' aria-hidden />
              <h3 className='mt-5 font-display text-title text-ink'>{title}</h3>
              <p className='mt-2 text-ink-muted'>{text}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ---- Leadership ---- */}
      <Section background='brand' aria-labelledby='leadership-heading'>
        <SectionHeader id='leadership-heading' title='Leadership' />
        <div className='grid gap-12 lg:grid-cols-2'>
          {leaders.map((leader) => (
            <figure key={leader.name} className='grid gap-6 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8'>
              <div className='arch relative aspect-[4/5] w-40 overflow-hidden bg-brand-800'>
                <Image src={leader.image} alt={`Portrait of ${leader.name}`} fill sizes='160px' className='object-cover object-top' />
              </div>
              <div>
                <h3 className='text-sm font-semibold text-gold'>{leader.heading}</h3>
                <blockquote className='mt-3 space-y-3 font-display text-title leading-snug text-ink'>
                  {leader.message.map((paragraph, index) => (
                    <p key={index}>
                      {index === 0 && '“'}
                      {paragraph}
                      {index === leader.message.length - 1 && '”'}
                    </p>
                  ))}
                </blockquote>
                <figcaption className='mt-5'>
                  <span className='block font-semibold text-ink'>{leader.name}</span>
                  <span className='block text-sm text-ink-subtle'>{leader.role}</span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </Section>

      {/* ---- Campus ---- */}
      <Section background='canvas' aria-labelledby='glimpses-heading'>
        <SectionHeader id='glimpses-heading' title='Glimpses of IHSB' description='Select a photo to see it larger.' />
        <LightboxGallery layout='grid' images={campusPhotos} className='lg:grid-cols-3' />
      </Section>
    </>
  )
}
