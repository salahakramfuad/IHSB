import type { Metadata } from 'next'
import BranchTemplate from '@/components/content/BranchTemplate'
import Tabs, { TabsList, TabsPanel, TabsPanels, TabsTab } from '@/components/ui/Tabs'
import { schoolInfo } from '@/data/schoolInfo'
import { UTTARA_MAP, campusPhotos } from '@/lib/branchMedia'
import { getFacultyService, getGalleryService, getTestimonialsService } from '@/lib/services/siteContentService'

export const metadata: Metadata = {
  title: 'Uttara Senior Section',
  description:
    'Uttara Senior Section of IHSB - Offering IGCSE and A Levels programs with excellent facilities, experienced faculty, and comprehensive academic support.',
  alternates: { canonical: '/uttarasenior' },
  openGraph: {
    title: 'Uttara Senior Section | IHSB',
    description: 'Discover our senior section campus in Uttara offering IGCSE and A Levels programs.'
  }
}

export const revalidate = 300

const IGCSE_SUBJECTS = [
  'Accounting (0452)',
  'Biology (0610)',
  'Business Studies (0450)',
  'Chemistry (0620)',
  'Information and Communication Technology (0417)',
  'Economics (0455)',
  'English as First Language (0500)',
  'English as a Second Language (0510)',
  'Mathematics (0580)',
  'Additional Mathematics (0606)',
  'Physics (0625)',
  'World Literature (0408)',
  'Computer Science (0478)'
]

const ALEVEL_SUBJECTS = [
  'Mathematics (P1, P2, P3, P4, M1, S1, M2, S2)',
  'Further Mathematics',
  'Chemistry',
  'Physics',
  'Biology',
  'Accounting',
  'Business Studies',
  'Economics'
]

function SubjectList({ subjects, note }: { subjects: string[]; note: string }) {
  return (
    <div className='grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)]'>
      <ul className='grid gap-x-10 sm:grid-cols-2'>
        {subjects.map((subject) => (
          <li key={subject} className='border-b border-line py-2.5 text-ink'>
            {subject}
          </li>
        ))}
      </ul>
      <p className='self-start border-l-2 border-gold-500 pl-5 text-ink-muted'>{note}</p>
    </div>
  )
}

export default async function UttaraSeniorPage() {
  const [gallery, testimonials, staff] = await Promise.all([
    getGalleryService(8),
    getTestimonialsService(6),
    getFacultyService(4)
  ])

  return (
    <BranchTemplate
      title='Uttara Senior Section'
      tagline='Cambridge IGCSE and A Levels, with the facilities to match.'
      branch={schoolInfo.branches.uttaraSenior}
      heroImage={{ src: '/assets/images/ihsb.jpg', alt: 'Students at the Uttara Senior Section' }}
      patternSeed={83}
      about={[
        'International Hope School Bangladesh is one of the flourishing educational institutions of Bangladesh. The Senior Section features an indoor stadium, gymnasium, modern labs, a rich library, a 550-seat auditorium, a 130-bed hostel, and spacious classrooms.',
        'The building sits beside the Junior Section with a large playground and landscaped gardens. Rooms are air-conditioned with ample natural light and equipped with smart boards, multimedia systems, and contemporary science laboratories to meet international standards.'
      ]}
      programmes={[
        { title: 'Cambridge IGCSE', age: 'Grades 9 and 10', description: 'Students typically choose 6–11 Cambridge IGCSE subjects.' },
        { title: 'A Levels', age: 'Grades 11 and 12', description: 'Pearson-Edexcel A Levels in science and business streams.' }
      ]}
      highlights={[
        { title: 'Laboratories built for practical work', description: 'Contemporary science laboratories that meet international standards.' },
        { title: 'Smart classrooms', description: 'Air-conditioned rooms with natural light, smart boards and multimedia systems.' },
        { title: 'Sport every day', description: 'An indoor stadium, a gymnasium, and football, volleyball and basketball courts.' },
        { title: 'University preparation', description: 'Structured support for subject selection and university applications.' }
      ]}
      facilities={[
        'Indoor sports hall, football field, volleyball and basketball courts',
        'Mini golf and tennis courts',
        'Table tennis facilities and a fitness center',
        '550-seated auditorium and 130-bedded hostel',
        'Smart boards and multimedia systems'
      ]}
      gallery={gallery.length > 0 ? gallery : campusPhotos}
      staff={staff}
      testimonials={testimonials}
      map={{ src: UTTARA_MAP, title: 'Map showing the IHSB Uttara Senior Section' }}
    >
      <h3 className='mb-6 font-display text-display-3 text-ink'>Subjects</h3>
      <Tabs>
        <TabsList label='Qualification'>
          <TabsTab>IGCSE</TabsTab>
          <TabsTab>A Levels</TabsTab>
        </TabsList>
        <TabsPanels>
          <TabsPanel>
            <SubjectList
              subjects={IGCSE_SUBJECTS}
              note='Students typically choose 6–11 Cambridge IGCSE subjects. Additional classes may be arranged to resolve timetable conflicts.'
            />
          </TabsPanel>
          <TabsPanel>
            <SubjectList
              subjects={ALEVEL_SUBJECTS}
              note='IHSB offers Pearson-Edexcel A Levels and plans to commence Cambridge AS & A Levels soon. Students receive structured support for subject selection and university preparation.'
            />
          </TabsPanel>
        </TabsPanels>
      </Tabs>
    </BranchTemplate>
  )
}
