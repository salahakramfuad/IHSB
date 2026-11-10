import type { Metadata } from 'next'
import BranchTemplate from '@/components/content/BranchTemplate'
import { schoolInfo } from '@/data/schoolInfo'
import { UTTARA_MAP, campusPhotos } from '@/lib/branchMedia'

export const metadata: Metadata = {
  title: 'Uttara Junior Section',
  description:
    'Uttara Preschool & Primary Section of IHSB - a nurturing, engaging learning environment for the early years and Grades 1 to 5.',
  alternates: { canonical: '/uttarajunior' },
  openGraph: {
    title: 'Uttara Junior Section | IHSB',
    description: 'Preschool and primary education at the IHSB Uttara campus.'
  }
}

export default function UttaraJuniorPage() {
  return (
    <BranchTemplate
      title='Uttara Junior Section'
      tagline='Preschool and primary school on the Uttara campus.'
      branch={schoolInfo.branches.uttaraPreschoolPrimary}
      heroImage={{ src: '/assets/images/students.png', alt: 'Pupils of the Uttara Junior Section' }}
      patternSeed={79}
      about={[
        'Our preschool and primary section provide a nurturing and engaging learning environment where children develop cognitive, social, and emotional skills through innovative teaching and interactive experiences.',
        'We believe in creating a foundation for lifelong learning and success, preparing each child for their academic journey ahead.'
      ]}
      aim='We strive to foster a love for learning in a safe and inclusive atmosphere. Our dedicated teachers encourage curiosity, creativity, and confidence, preparing students for a bright academic journey. Every child is valued, respected, and given opportunities to shine.'
      programmes={[
        { title: 'Preschool', age: 'Ages 3-5', description: 'Early years foundation for ages 3-5 with play-based learning' },
        { title: 'Primary', age: 'Grades 1-5', description: 'Grades 1-5 with Cambridge curriculum and interactive learning' }
      ]}
      highlights={[
        {
          title: 'Nurturing environment',
          description:
            'A safe and inclusive atmosphere that encourages curiosity, creativity, and confidence through play-based learning and structured activities.'
        },
        {
          title: 'Innovative teaching',
          description:
            'Interactive and engaging teaching methods that make learning fun and effective, using modern technology and hands-on experiences.'
        },
        {
          title: 'Holistic development',
          description:
            'Focus on cognitive, social, and emotional skills development to prepare well-rounded individuals ready for future challenges.'
        },
        {
          title: 'Dedicated teachers',
          description:
            'Experienced and caring educators committed to your child’s success, providing personalized attention and support.'
        }
      ]}
      gallery={campusPhotos}
      map={{ src: UTTARA_MAP, title: 'Map showing the IHSB Uttara campus' }}
    />
  )
}
