import type { Metadata } from 'next'
import BranchTemplate from '@/components/content/BranchTemplate'
import { schoolInfo } from '@/data/schoolInfo'
import { GULSHAN_MAP, campusPhotos } from '@/lib/branchMedia'

export const metadata: Metadata = {
  title: 'Gulshan Branch | Primary & Middle Section',
  description:
    'Gulshan Primary & Middle Section of IHSB - Providing quality pre and primary-school education in a caring, stimulating environment in the heart of Gulshan.',
  alternates: { canonical: '/gulshanbranch' },
  openGraph: {
    title: 'Gulshan Branch | IHSB',
    description:
      'Discover our Gulshan campus offering preschool, primary, and middle section programs with modern facilities and experienced educators.'
  }
}

export default function GulshanBranchPage() {
  return (
    <BranchTemplate
      title='Gulshan Primary & Middle Section'
      tagline='Preschool, primary and middle school in the heart of Gulshan.'
      branch={schoolInfo.branches.gulshanPrimaryMiddle}
      heroImage={{ src: '/assets/images/ihsb.png', alt: 'The Gulshan branch campus' }}
      patternSeed={73}
      about={[
        'The early years are crucial for children’s holistic development. A quality pre and primary-school education provides children with opportunities to build self-confidence, learn social skills, and develop learning dispositions.',
        'These build a strong foundation for children’s future learning and success, preparing them for academic excellence and personal growth.'
      ]}
      aim='The School provides a caring, stimulating environment where your child will be given the time and opportunity to develop his/her physical, intellectual, emotional, and social skills. Our well-trained, confident teachers deliver the curriculum in ways that foster a child’s uniqueness and individuality as they work towards common goals.'
      programmes={[
        { title: 'Preschool', age: 'Ages 3-5', description: 'Early years foundation for ages 3-5' },
        { title: 'Primary', age: 'Grades 1-5', description: 'Grades 1-5 with Cambridge curriculum' },
        { title: 'Middle School', age: 'Grades 6-8', description: 'Grades 6-8 preparing for secondary' }
      ]}
      highlights={[
        {
          title: 'Caring environment',
          description:
            'A stimulating environment where children develop physical, intellectual, emotional, and social skills through play-based and structured learning.'
        },
        {
          title: 'Confident teachers',
          description:
            'Well-trained, confident teachers who deliver curriculum fostering each child’s uniqueness and individuality while working towards common goals.'
        },
        {
          title: 'Independent learning',
          description:
            'Children are encouraged to become independent learners through structured and spontaneous activities that build confidence and curiosity.'
        },
        {
          title: 'Fun learning',
          description:
            'Discovering that learning is fun through engaging activities, hands-on experiences, and creative exploration that sparks lifelong curiosity.'
        }
      ]}
      gallery={campusPhotos}
      map={{ src: GULSHAN_MAP, title: 'Map showing the IHSB Gulshan branch' }}
    />
  )
}
