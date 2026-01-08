import React from 'react'
import Image from 'next/image'
import type { Metadata } from 'next'
import PageHeader from '../../components/ui/PageHeader'
import Section from '../../components/ui/Section'
import Card from '../../components/ui/Card'

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
      <section className='relative bg-gradient-to-br from-primary-green-600 via-primary-green-700 to-primary-green-800 text-white py-20 md:py-28'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='max-w-4xl mx-auto text-center'>
            <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-wide mb-6'>
              Welcome to International Hope School Bangladesh
            </h1>
            <p className='text-lg sm:text-xl md:text-2xl text-primary-green-50 mb-6'>
              Inspiring Future Leaders with Excellence and Compassion
            </p>
            <p className='text-base sm:text-lg text-primary-green-100 max-w-3xl mx-auto'>
              At International Hope School Bangladesh, we are dedicated to
              nurturing young minds in an environment of academic excellence,
              creativity, and ethical growth. Our committed teachers and holistic
              approach empower students to excel in both their studies and
              personal development.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <Section background='white'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl md:text-4xl font-bold text-primary-green-700 mb-6'>
            Mission & Vision of IHSB
          </h2>
          <div className='text-lg text-gray-700 space-y-4'>
            <p>
              Our experienced teachers and management aim to impart education of
              the highest standard. Our goal is not solely to achieve academic
              excellence but to foster well-rounded graduates who are ready to
              face the challenges of the 21st century.
            </p>
            <p>
              Our students are encouraged to engage wholeheartedly in any
              activity they choose, be it in science, business, the humanities,
              or family life, with strong moral values.
            </p>
          </div>
        </div>
      </Section>

      {/* Why Choose IHSB */}
      <Section background='gray'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl md:text-4xl font-bold text-primary-green-700 mb-8 text-center'>
            Why Choose IHSB?
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            <Card>
              <h3 className='text-xl font-semibold text-primary-green-600 mb-3'>
                Build Confidence
              </h3>
              <p className='text-gray-600'>
                We focus on reinforcing self-esteem and the confidence of
                students to overcome life's challenges.
              </p>
            </Card>
            <Card>
              <h3 className='text-xl font-semibold text-primary-green-600 mb-3'>
                Fostering Respect
              </h3>
              <p className='text-gray-600'>
                We encourage mutual respect and understanding in an environment
                conducive to both academic and moral development.
              </p>
            </Card>
            <Card>
              <h3 className='text-xl font-semibold text-primary-green-600 mb-3'>
                Academic Excellence
              </h3>
              <p className='text-gray-600'>
                We provide a diverse and reliable curriculum designed to ensure
                academic success in a global context.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      {/* Chairman's Message */}
      <Section background='white'>
        <div className='max-w-4xl mx-auto'>
          <Card className='flex flex-col md:flex-row gap-6 p-6'>
            <div className='relative w-40 h-40 mx-auto md:mx-0 flex-shrink-0'>
              <Image
                src='/assets/images/chairman.png'
                alt='Chairman Timothy Doland Fisher'
                fill
                className='object-cover rounded-full border-4 border-primary-green-600'
              />
            </div>
            <div className='flex-1 text-center md:text-left'>
              <h3 className='text-2xl font-semibold text-primary-green-600 mb-4'>
                Message from the Chairman
              </h3>
              <p className='text-gray-700 mb-4'>
                A great school is where wisdom shines, and a teacher is the
                guiding light. We strive to create such an environment to nurture
                young minds and shape future leaders.
              </p>
              <p className='font-semibold text-gray-900'>
                Timothy Doland Fisher
              </p>
              <p className='text-gray-600'>
                Chairman, International Hope School Bangladesh
              </p>
            </div>
          </Card>
        </div>
      </Section>

      {/* Principal's Message */}
      <Section background='gray'>
        <div className='max-w-4xl mx-auto'>
          <Card className='flex flex-col md:flex-row gap-6 p-6'>
            <div className='relative w-40 h-40 mx-auto md:mx-0 flex-shrink-0'>
              <Image
                src='/assets/images/principal.png'
                alt='Principal Roksana Zarin'
                fill
                className='object-cover rounded-full border-4 border-primary-green-600'
              />
            </div>
            <div className='flex-1 text-center md:text-left'>
              <h3 className='text-2xl font-semibold text-primary-green-600 mb-4'>
                Message from the Principal
              </h3>
              <p className='text-gray-700 mb-4'>
                We aim to cultivate lifelong learners who are not only
                academically proficient but also ready to contribute to society
                in meaningful ways.
              </p>
              <p className='text-gray-700 mb-4'>
                Our community of students, parents, and faculty come together to
                create a supportive environment for growth and success.
              </p>
              <p className='font-semibold text-gray-900'>Roksana Zarin</p>
              <p className='text-gray-600'>
                Principal, International Hope School Bangladesh
              </p>
            </div>
          </Card>
        </div>
      </Section>

      {/* Image Gallery */}
      <Section background='white'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-bold text-primary-green-700 mb-8 text-center'>
            Our School
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            <div className='relative aspect-video rounded-xl overflow-hidden shadow-lg'>
              <Image
                src='/assets/images/ihsb.png'
                alt='IHSB Campus'
                fill
                className='object-cover'
              />
            </div>
            <div className='relative aspect-video rounded-xl overflow-hidden shadow-lg'>
              <Image
                src='/assets/images/teachers.png'
                alt='IHSB Teachers'
                fill
                className='object-cover'
              />
            </div>
            <div className='relative aspect-video rounded-xl overflow-hidden shadow-lg'>
              <Image
                src='/assets/images/students.png'
                alt='IHSB Students'
                fill
                className='object-cover'
              />
            </div>
          </div>
        </div>
      </Section>
    </main>
  )
}
