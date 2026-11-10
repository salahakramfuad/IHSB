import Image from 'next/image'
import { FlaskConical, Globe2, HeartHandshake, Trophy } from 'lucide-react'
import { schoolInfo } from '@/data/schoolInfo'
import { img } from '@/lib/mock/images'
import Reveal from '../motion/Reveal'
import Section, { SectionHeader } from '../ui/Section'

/** Asymmetric bento grid: two photographs and four short proof points. */
export default function WhyIHSB() {
  return (
    <Section background='canvas' aria-labelledby='why-heading'>
      <SectionHeader
        id='why-heading'
        title='Why families choose IHSB'
        description='Experienced teachers, modern classrooms and laboratories, and a full life outside lessons.'
        action={{ label: 'About the school', href: '/about' }}
      />

      <div className='grid gap-5 md:grid-cols-6 md:grid-rows-[auto_auto]'>
        <Reveal className='relative isolate flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-xl p-7 text-white md:col-span-4 md:row-span-2 md:min-h-[32rem]'>
          <Image
            src={img.studentsOutdoor}
            alt='Students working together outdoors on campus'
            fill
            sizes='(max-width: 768px) 100vw, 66vw'
            className='-z-20 object-cover'
          />
          <div className='absolute inset-0 -z-10 bg-gradient-to-t from-brand-950 via-brand-950/55 to-transparent' aria-hidden />
          <p className='numeral text-6xl text-gold-300'>{schoolInfo.foundingYear}</p>
          <h3 className='mt-3 max-w-md font-display text-display-3'>Three decades of Cambridge teaching in Dhaka</h3>
          <p className='mt-3 max-w-lg text-white/85'>
            Established in {schoolInfo.foundingYear}, IHSB teaches the full Cambridge curriculum, from toddler to
            A&nbsp;Level, across five branches in Dhaka and Chattogram.
          </p>
        </Reveal>

        <Reveal delay={0.06} className='rounded-xl border border-line bg-paper p-7 md:col-span-2'>
          <FlaskConical className='h-7 w-7 text-gold' aria-hidden />
          <h3 className='mt-5 font-display text-title text-ink'>Learning by doing</h3>
          <p className='mt-2 text-ink-muted'>Science and ICT laboratories, smart boards and maker time from the primary years.</p>
        </Reveal>

        <Reveal delay={0.12} className='on-dark rounded-xl bg-brand-800 p-7 md:col-span-2'>
          <HeartHandshake className='h-7 w-7 text-gold' aria-hidden />
          <h3 className='mt-5 font-display text-title text-ink'>Character first</h3>
          <p className='mt-2 text-ink-muted'>Honesty, empathy, responsibility and respect are taught, practised and noticed.</p>
        </Reveal>

        <Reveal className='rounded-xl border border-line bg-sunken p-7 md:col-span-2'>
          <Trophy className='h-7 w-7 text-gold' aria-hidden />
          <h3 className='mt-5 font-display text-title text-ink'>A full life outside lessons</h3>
          <p className='mt-2 text-ink-muted'>Football, basketball, chess, debate, Model UN, robotics and more than twenty-five clubs.</p>
        </Reveal>

        <Reveal delay={0.06} className='relative isolate flex min-h-[15rem] flex-col justify-end overflow-hidden rounded-xl p-7 text-white md:col-span-2'>
          <Image src={img.library} alt='The school library' fill sizes='(max-width: 768px) 100vw, 33vw' className='-z-20 object-cover' />
          <div className='absolute inset-0 -z-10 bg-gradient-to-t from-brand-950 via-brand-950/50 to-transparent' aria-hidden />
          <h3 className='font-display text-title'>Space to read and think</h3>
        </Reveal>

        <Reveal delay={0.12} className='rounded-xl border border-line bg-paper p-7 md:col-span-2'>
          <Globe2 className='h-7 w-7 text-gold' aria-hidden />
          <h3 className='mt-5 font-display text-title text-ink'>Ready for the world</h3>
          <p className='mt-2 text-ink-muted'>University counselling from Grade 9, and graduates studying on four continents.</p>
        </Reveal>
      </div>
    </Section>
  )
}
