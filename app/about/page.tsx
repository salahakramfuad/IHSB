import React from 'react'
import Image from 'next/image'
import ImageWithLightbox from '@/components/shared/ImageWithLightbox'
import type { Metadata } from 'next'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import {
  BookOpen,
  Target,
  Heart,
  Award,
  Quote,
  GraduationCap,
  Sparkles
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about International Hope School Bangladesh - our mission, vision, values, and commitment to nurturing future leaders with excellence and compassion.',
  openGraph: {
    title: 'About IHSB | International Hope School Bangladesh',
    description:
      'Discover our mission to impart the highest standard of education and foster well-rounded graduates ready for the 21st century.'
  }
}

export default function AboutPage() {
  return (
    <main className='min-h-screen bg-white'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700 text-white py-24 md:py-32 overflow-hidden'>
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute top-0 right-0 w-[28rem] h-[28rem] bg-white rounded-full blur-3xl' />
          <div className='absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl' />
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary-400/30 rounded-full blur-3xl' />
        </div>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <div className='max-w-4xl mx-auto text-center'>
            <div className='inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl mb-8'>
              <GraduationCap className='w-10 h-10 text-white' />
            </div>
            <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6'>
              Welcome to International Hope School Bangladesh
            </h1>
            <p className='text-xl md:text-2xl text-white/95 font-medium mb-6'>
              Inspiring Future Leaders with Excellence and Compassion
            </p>
            <p className='text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed'>
              We nurture young minds in an environment of academic excellence,
              creativity, and ethical growth — empowering students to excel in
              studies and personal development.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <Section background='white' className='py-16 md:py-24'>
        <div className='max-w-5xl mx-auto'>
          <div className='text-center mb-12'>
            <div className='inline-flex items-center gap-2 text-primary-600 mb-4'>
              <Target className='w-6 h-6' />
              <span className='text-sm font-semibold uppercase tracking-wider'>
                Our Purpose
              </span>
            </div>
            <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6'>
              Mission & Vision of IHSB
            </h2>
          </div>
          <div className='grid md:grid-cols-2 gap-8'>
            <div className='rounded-2xl bg-gradient-to-br from-primary-50 to-white p-8 border border-primary-100/80 shadow-sm'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center'>
                  <Target className='w-6 h-6 text-primary-600' />
                </div>
                <h3 className='text-xl font-semibold text-gray-900'>Our Mission</h3>
              </div>
              <p className='text-gray-700 leading-relaxed'>
                Our experienced teachers and management aim to impart education
                of the highest standard. Our goal is not solely academic
                excellence but to foster well-rounded graduates ready for the
                challenges of the 21st century.
              </p>
            </div>
            <div className='rounded-2xl bg-gradient-to-br from-secondary-50 to-white p-8 border border-secondary-100/80 shadow-sm'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-12 h-12 rounded-xl bg-secondary-100 flex items-center justify-center'>
                  <Sparkles className='w-6 h-6 text-secondary-600' />
                </div>
                <h3 className='text-xl font-semibold text-gray-900'>Our Vision</h3>
              </div>
              <p className='text-gray-700 leading-relaxed'>
                We encourage students to engage wholeheartedly in science,
                business, the humanities, or family life — with strong moral
                values and mutual respect in an environment conducive to both
                academic and character development.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Why Choose IHSB */}
      <Section background='gray' className='py-16 md:py-24'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-12'>
            <div className='inline-flex items-center gap-2 text-primary-600 mb-4'>
              <Award className='w-6 h-6' />
              <span className='text-sm font-semibold uppercase tracking-wider'>
                What We Offer
              </span>
            </div>
            <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
              Why Choose IHSB?
            </h2>
            <p className='text-gray-600 max-w-2xl mx-auto text-lg'>
              A learning community built on confidence, respect, and excellence.
            </p>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            <Card className='group rounded-2xl border border-gray-200/80 bg-white p-8 shadow-sm hover:shadow-lg hover:border-primary-200/60 transition-all duration-300 hover:-translate-y-1'>
              <div className='w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center mb-6 group-hover:bg-primary-200/80 transition-colors'>
                <Heart className='w-7 h-7 text-primary-600' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                Build Confidence
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                We focus on reinforcing self-esteem and confidence so students
                can overcome life&apos;s challenges with resilience.
              </p>
            </Card>
            <Card className='group rounded-2xl border border-gray-200/80 bg-white p-8 shadow-sm hover:shadow-lg hover:border-primary-200/60 transition-all duration-300 hover:-translate-y-1'>
              <div className='w-14 h-14 rounded-2xl bg-secondary-100 flex items-center justify-center mb-6 group-hover:bg-secondary-200/80 transition-colors'>
                <BookOpen className='w-7 h-7 text-secondary-600' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                Fostering Respect
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                We encourage mutual respect and understanding in an environment
                conducive to both academic and moral development.
              </p>
            </Card>
            <Card className='group rounded-2xl border border-gray-200/80 bg-white p-8 shadow-sm hover:shadow-lg hover:border-primary-200/60 transition-all duration-300 hover:-translate-y-1'>
              <div className='w-14 h-14 rounded-2xl bg-accent-yellow-100 flex items-center justify-center mb-6 group-hover:bg-accent-yellow-200/80 transition-colors'>
                <Award className='w-7 h-7 text-accent-yellow-600' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                Academic Excellence
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                A diverse and reliable curriculum designed to ensure academic
                success in a global context.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      {/* Chairman's Message */}
      <Section background='white' className='py-16 md:py-24'>
        <div className='max-w-4xl mx-auto'>
          <Card className='overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-lg'>
            <div className='flex flex-col md:flex-row gap-8 p-8 md:p-10'>
              <div className='relative w-44 h-44 mx-auto md:mx-0 flex-shrink-0'>
                <Image
                  src='/assets/images/chairman.png'
                  alt='Chairman Timothy Doland Fisher'
                  fill
                  className='object-cover rounded-2xl ring-4 ring-primary-100'
                  sizes='176px'
                />
              </div>
              <div className='flex-1 text-center md:text-left'>
                <div className='flex justify-center md:justify-start mb-4'>
                  <Quote className='w-10 h-10 text-primary-200' />
                </div>
                <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                  Message from the Chairman
                </h3>
                <p className='text-gray-700 leading-relaxed mb-6 text-lg'>
                  A great school is where wisdom shines, and a teacher is the
                  guiding light. We strive to create such an environment to
                  nurture young minds and shape future leaders.
                </p>
                <div>
                  <p className='font-semibold text-gray-900 text-lg'>
                    Timothy Doland Fisher
                  </p>
                  <p className='text-gray-600'>
                    Chairman, International Hope School Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Principal's Message */}
      <Section background='gray' className='py-16 md:py-24'>
        <div className='max-w-4xl mx-auto'>
          <Card className='overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-lg'>
            <div className='flex flex-col md:flex-row gap-8 p-8 md:p-10'>
              <div className='relative w-44 h-44 mx-auto md:mx-0 flex-shrink-0 order-2 md:order-1'>
                <Image
                  src='/assets/images/principal.png'
                  alt='Principal Roksana Zarin'
                  fill
                  className='object-cover rounded-2xl ring-4 ring-secondary-100'
                  sizes='176px'
                />
              </div>
              <div className='flex-1 text-center md:text-left order-1 md:order-2'>
                <div className='flex justify-center md:justify-start mb-4'>
                  <Quote className='w-10 h-10 text-secondary-200' />
                </div>
                <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                  Message from the Principal
                </h3>
                <p className='text-gray-700 leading-relaxed mb-4 text-lg'>
                  We aim to cultivate lifelong learners who are not only
                  academically proficient but also ready to contribute to
                  society in meaningful ways.
                </p>
                <p className='text-gray-700 leading-relaxed mb-6'>
                  Our community of students, parents, and faculty come together
                  to create a supportive environment for growth and success.
                </p>
                <div>
                  <p className='font-semibold text-gray-900 text-lg'>
                    Roksana Zarin
                  </p>
                  <p className='text-gray-600'>
                    Principal, International Hope School Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Image Gallery */}
      <Section background='white' className='py-16 md:py-24'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-12'>
            <div className='inline-flex items-center gap-2 text-primary-600 mb-4'>
              <Sparkles className='w-6 h-6' />
              <span className='text-sm font-semibold uppercase tracking-wider'>
                Our School
              </span>
            </div>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>
              Glimpses of IHSB
            </h2>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
            <div className='relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group'>
              <ImageWithLightbox
                src='/assets/images/ihsb.png'
                alt='IHSB Campus'
                fill
                className='object-cover transition-transform duration-300 group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end'>
                <p className='text-white font-medium p-4'>Campus</p>
              </div>
            </div>
            <div className='relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group'>
              <ImageWithLightbox
                src='/assets/images/teachers.png'
                alt='IHSB Teachers'
                fill
                className='object-cover transition-transform duration-300 group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end'>
                <p className='text-white font-medium p-4'>Our Teachers</p>
              </div>
            </div>
            <div className='relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group'>
              <ImageWithLightbox
                src='/assets/images/students.png'
                alt='IHSB Students'
                fill
                className='object-cover transition-transform duration-300 group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end'>
                <p className='text-white font-medium p-4'>Our Students</p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </main>
  )
}
