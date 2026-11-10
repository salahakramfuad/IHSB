import type { Metadata } from 'next'
import { Check } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import PageHeader from '@/components/ui/PageHeader'
import Section from '@/components/ui/Section'
import Tabs, { TabsList, TabsPanel, TabsPanels, TabsTab } from '@/components/ui/Tabs'
import { preschoolAreas, primarySubjects } from './data'

export const metadata: Metadata = {
  title: 'Curriculum',
  description:
    'The IHSB curriculum at every stage: preschool, Cambridge Primary, Cambridge IGCSE in the senior section, and Advanced Level.',
  alternates: { canonical: '/academics/curriculum' },
  openGraph: {
    title: 'Curriculum | IHSB',
    description: 'A comprehensive, holistic approach to education for every stage of learning.'
  }
}

const igcseSubjects = [
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

const aLevelSubjects = [
  'Mathematics (P1, P2, P3, P4, M1, S1, M2, S2)',
  'Further Mathematics',
  'Chemistry',
  'Physics',
  'Biology',
  'Accounting',
  'Business Studies',
  'Economics'
]

const aLevelReasons = [
  'Expert advice for informed university choices.',
  'Opportunity to apply to universities worldwide (USA, Australia, UK, Canada, Japan, Hong Kong, etc.).',
  'In-depth university application support.',
  'University fairs and structured enrichment activities.',
  'Small classes with an average of twenty students.',
  'Option to study Further Mathematics, uniquely offered by IHSB.',
  'Choice between science, business, or a mix with complete subject control.',
  'Continuous assessments via mock exams and model tests at our British Council exam center.'
]

const aLevelSkills = [
  'In-depth subject content',
  'Independent thinking',
  'Application of knowledge to new and familiar situations',
  'Handling and evaluating various information sources',
  'Logical thinking and coherent argumentation',
  'Judgment, recommendations, and decision-making skills',
  'Effective communication in English'
]

function StageIntro({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className='max-w-3xl'>
      <h2 className='font-display text-display-2 text-ink'>{title}</h2>
      <div className='gold-rule mt-5 w-28' aria-hidden />
      <div className='prose-ihsb mt-6'>{children}</div>
    </div>
  )
}

function SubjectGrid({ items }: { items: Array<{ title: string; details: string[] }> }) {
  return (
    <ul className='mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {items.map((item) => (
        <li key={item.title} className='rounded-xl border border-line bg-paper p-7'>
          <h3 className='font-display text-title text-ink'>{item.title}</h3>
          <ul className='mt-4 space-y-2.5 text-[0.9375rem] text-ink-muted'>
            {item.details.map((detail) => (
              <li key={detail} className='flex gap-3'>
                <span className='mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-500' aria-hidden />
                {detail}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}

function Note({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <p className='mt-10 max-w-3xl border-l-2 border-gold-500 pl-5 text-ink-muted'>
      <span className='font-semibold text-ink'>{label} </span>
      {children}
    </p>
  )
}

function CheckList({ items, columns = false }: { items: string[]; columns?: boolean }) {
  return (
    <ul className={columns ? 'mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2' : 'mt-4 space-y-2.5'}>
      {items.map((item) => (
        <li key={item} className='flex gap-3 text-ink'>
          <Check className='mt-1 h-4 w-4 shrink-0 text-gold' aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function CurriculumPage() {
  return (
    <>
      <PageHeader
        title='Curriculum'
        subtitle='A comprehensive, holistic approach to education for every stage of learning.'
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Academics' }, { label: 'Curriculum' }]}
        patternSeed={47}
        actions={
          <ButtonLink href='/admission/admissionprocedure' variant='inverse'>
            How to join
          </ButtonLink>
        }
      />

      <Section background='canvas' spacing='sm' aria-label='Curriculum by stage'>
        <Tabs>
          <TabsList label='School stage'>
            <TabsTab>Preschool</TabsTab>
            <TabsTab>Primary school</TabsTab>
            <TabsTab>Senior section</TabsTab>
            <TabsTab>Advanced Level</TabsTab>
          </TabsList>
          <TabsPanels className='pt-12'>
            <TabsPanel>
              <StageIntro title='Preschool curriculum'>
                <p className='text-lead text-ink'>
                  Preschool curriculum is planned carefully for the holistic development of the children. At the focal
                  point of the curriculum framework is the child and the belief that children are curious, dynamic, and
                  competent learners.
                </p>
                <p>The year is organised around six key areas.</p>
              </StageIntro>
              <SubjectGrid items={preschoolAreas} />
              <Note label='Assessment.'>
                IHSB defines assessment as the process of setting clear and measurable learning outcomes and
                objectives, implementing balanced assessment tools, which in turn provides specific feedback to the
                parties involved in student learning and identifies appropriate targets for the education process.
              </Note>
            </TabsPanel>

            <TabsPanel>
              <StageIntro title='Primary school curriculum'>
                <p className='text-lead text-ink'>
                  Our curriculum is designed to ensure the holistic development of students through a measurable plan
                  and structure followed by our educators to deliver the highest standard of education.
                </p>
                <p>
                  The internationally recognized Cambridge Primary Curriculum and Assessment, including Cambridge
                  Primary Checkpoint and yearly progression tests from Year 2 to 5, enhances students&rsquo;
                  confidence, intellectual skills, and social competencies.
                </p>
              </StageIntro>
              <SubjectGrid items={primarySubjects} />
              <Note label='Assessment.'>
                Assessment in Primary School involves both formative (Assessment for Learning) and summative
                (Assessment of Learning) processes. Evaluation criteria include class tests, performance, homework, and
                project work. An educational portfolio is updated quarterly to reflect each child&rsquo;s progress.
              </Note>
            </TabsPanel>

            <TabsPanel>
              <StageIntro title='Senior section curriculum'>
                <p className='text-lead text-ink'>
                  We offer a Cambridge curriculum with excellent facilitation for both IGCSE and O Level specifications.
                </p>
              </StageIntro>
              <div className='mt-10 grid gap-6 lg:grid-cols-2'>
                <div className='rounded-xl border border-line bg-paper p-7'>
                  <h3 className='font-display text-title text-ink'>Cambridge IGCSE</h3>
                  <CheckList items={igcseSubjects} />
                  <p className='mt-5 border-t border-line pt-5 text-ink-muted'>
                    Each student is required to take a minimum of six subjects; up to eleven subjects may be taken with
                    extra classes provided for timetable clashes.
                  </p>
                </div>
                <div className='space-y-6'>
                  <div className='rounded-xl border border-line bg-paper p-7'>
                    <h3 className='font-display text-title text-ink'>Advanced Level</h3>
                    <p className='mt-3 text-ink-muted'>
                      Subjects include Mathematics, Further Mathematics, Chemistry, Physics, Biology, Accounting,
                      Business Studies, and Economics. Students can choose between science and business streams.
                    </p>
                  </div>
                  <div className='on-dark rounded-xl bg-brand-800 p-7'>
                    <h3 className='font-display text-title text-ink'>Recognition and progression</h3>
                    <p className='mt-3 text-ink-muted'>
                      The combination of Cambridge IGCSE qualifications with subsequent AS &amp; A Level achievements
                      gives learners a solid foundation for further study. Candidates achieving grades A* to C are well
                      prepared for a wide range of courses including Cambridge International AS &amp; A Level. These
                      qualifications are recognized by leading universities worldwide.
                    </p>
                  </div>
                </div>
              </div>
              <Note label='Note.'>All candidates for science subjects are required to take three papers.</Note>
              <Note label='Achievement.'>
                For over a decade, IHSB students have consistently shown outstanding achievement, thanks to enthusiastic
                teachers, clear guidelines, and a friendly school environment.
              </Note>
            </TabsPanel>

            <TabsPanel>
              <StageIntro title='Advanced Level curriculum'>
                <p className='text-lead text-ink'>
                  In International Hope School Bangladesh, we offer a wide variety of programs that immerse students in
                  authentic language environments both in the classroom and through field trips. Our communicative
                  approach enhances confidence and proficiency in speaking, listening, reading, and writing.
                </p>
                <p>
                  Although we currently follow Cambridge IGCSE &amp; O Level curricula, we plan to introduce Cambridge
                  AS Qualifications in the upcoming Academic Year, followed by Cambridge AS &amp; A Levels thereafter.
                </p>
              </StageIntro>

              <div className='mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]'>
                <div className='rounded-xl border border-line bg-paper p-7'>
                  <h3 className='font-display text-title text-ink'>Subjects offered in Pearson-Edexcel A Levels</h3>
                  <CheckList items={aLevelSubjects} />
                </div>
                <div className='rounded-xl border border-line bg-paper p-7'>
                  <h3 className='font-display text-title text-ink'>Why choose our A Level programme?</h3>
                  <CheckList items={aLevelReasons} columns />
                </div>
              </div>

              <div className='mt-6 grid gap-6 lg:grid-cols-2'>
                <div className='rounded-xl border border-line bg-sunken p-7'>
                  <h3 className='font-display text-title text-ink'>A Level structure</h3>
                  <dl className='mt-4 space-y-4'>
                    <div>
                      <dt className='font-semibold text-ink'>IAS (Advanced Subsidiary or AS Level)</dt>
                      <dd className='text-ink-muted'>The first half of the programme forming the foundation.</dd>
                    </div>
                    <div>
                      <dt className='font-semibold text-ink'>IAL (A2 Level)</dt>
                      <dd className='text-ink-muted'>The second part covering more complex topics.</dd>
                    </div>
                  </dl>
                  <p className='mt-5 border-t border-line pt-5 text-ink-muted'>
                    The Cambridge International A Level is reported on a scale from A* (highest) to E (minimum
                    required). Note that AS Levels are reported from A to E.
                  </p>
                </div>
                <div className='on-dark rounded-xl bg-brand-800 p-7'>
                  <h3 className='font-display text-title text-ink'>Cambridge International AS &amp; A Level develops</h3>
                  <CheckList items={aLevelSkills} />
                </div>
              </div>
            </TabsPanel>
          </TabsPanels>
        </Tabs>
      </Section>
    </>
  )
}
