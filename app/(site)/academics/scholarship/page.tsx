import type { Metadata } from 'next'
import { ButtonLink } from '@/components/ui/Button'
import PageHeader from '@/components/ui/PageHeader'
import Section, { SectionHeader } from '@/components/ui/Section'
import Stat from '@/components/ui/Stat'
import { schoolInfo } from '@/data/schoolInfo'

export const metadata: Metadata = {
  title: 'Scholarship Program',
  description:
    'Merit-based scholarship program for outstanding students aged 11-16. Up to 90% tuition fee waiver available.',
  alternates: { canonical: '/academics/scholarship' },
  openGraph: {
    title: 'Scholarship Program | IHSB',
    description: 'Apply for merit-based scholarships worth up to 90% of tuition fees.'
  }
}

const criteria = [
  { criteria: 'Scholarship Exam', points: 70 },
  { criteria: 'Academic Records (AY 2023-2024)', points: 20 },
  { criteria: 'CV & Viva', points: 10 }
]

const documents = ['Passport copy', 'Two passport-size photos', 'Transcripts of AY 2023-2024 session']

const conditions = [
  'Students must maintain 80% or above marks in their formative and summative assessments.',
  'They should always maintain proper discipline, and their behavioral marks need to be 100 throughout the academic year.',
  'They should always be respectful towards the laws of Bangladesh and the policies of the school.'
]

const cvSections = [
  { title: 'Applicant’s name', hint: 'Your full name.' },
  { title: 'Applicant’s address and contact number', hint: 'Where you live and a phone number.' },
  { title: 'Applicant’s school name and address', hint: 'Your current school.' },
  { title: 'Achievements in co-curricular activities', hint: 'Sports, arts, competitions and similar.' },
  {
    title: 'Statement (within 250 words)',
    hint: 'Your personality, character, suitability for the scholarship, and why you need the scholarship.'
  }
]

export default function ScholarshipPage() {
  return (
    <>
      <PageHeader
        title='Merit-based scholarship'
        subtitle='For students of other schools, aged 11 to 16. Worth up to 90% of the tuition fee.'
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Academics' }, { label: 'Scholarship' }]}
        patternSeed={53}
        actions={
          <ButtonLink href='/contact' variant='secondary'>
            Ask the admissions office
          </ButtonLink>
        }
      />

      <Section background='canvas' aria-labelledby='policy-heading'>
        <div className='grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-20'>
          <div>
            <h2 id='policy-heading' className='font-display text-display-2 text-ink'>
              Scholarship policy
            </h2>
            <div className='gold-rule mt-5 w-28' aria-hidden />
            <div className='prose-ihsb mt-6'>
              <p className='text-lead text-ink'>
                International Hope School Bangladesh (IHSB) has much to offer pupils who have outstanding talent and
                potential academically.
              </p>
              <p>
                Accordingly, this scholarship is available to exceptional students who will enhance the reputation of
                the school, whilst benefiting from an extensive range of opportunities. IHSB strives to motivate and
                empower students to achieve their higher education goals by providing knowledge, skills, and financial
                resources essential for success. The target group of students is aged 11 to 16.
              </p>
            </div>
          </div>
          <dl className='grid content-start gap-8 sm:grid-cols-2 lg:grid-cols-1'>
            <Stat value='90%' label='Maximum award' note='of the tuition fee' />
            <Stat value='11–16' label='Age of applicants' note='from other schools' size='md' />
          </dl>
        </div>
      </Section>

      <Section background='sunken' aria-labelledby='criteria-heading'>
        <SectionHeader
          id='criteria-heading'
          title='How applications are assessed'
          description='The assessment evaluates how well candidates perform in their comfort zone as well as in other areas, and whether they show the potential to develop further.'
        />
        <div className='grid gap-12 lg:grid-cols-2 lg:gap-20'>
          <div className='prose-ihsb'>
            <p>
              This will also explore potential by exposing candidates to new concepts or processes and offering
              challenging opportunities to show tenacity and leadership. Based on commitment and dependability at
              school, students&rsquo; activities will also be evaluated.
            </p>
            <h3>Selection process</h3>
            <p>
              All completed applications accompanied by all required supporting materials will be reviewed by the
              Scholarship Application Evaluation Committee to ensure that every applicant receives full consideration.
              Scholarships will be awarded in a manner that matches the higher monetary award amounts with the
              better-qualified candidates who meet all the requisite criteria.
            </p>
          </div>
          <div>
            <table className='w-full text-left'>
              <caption className='mb-4 text-left text-ink-muted'>Applicants are scored out of 100 points.</caption>
              <thead>
                <tr className='border-b border-line-strong text-sm text-ink-subtle'>
                  <th scope='col' className='py-3 pr-4 font-medium'>Criteria</th>
                  <th scope='col' className='py-3 pl-4 text-right font-medium'>Points</th>
                </tr>
              </thead>
              <tbody>
                {criteria.map((item) => (
                  <tr key={item.criteria} className='border-b border-line'>
                    <th scope='row' className='py-4 pr-4 font-display text-lg font-normal text-ink'>{item.criteria}</th>
                    <td className='numeral py-4 pl-4 text-right text-3xl text-gold'>{item.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className='mt-6 text-ink-muted'>
              The top 5 participants from each grade are selected from the merit list for a viva exam. The scholarship
              amount may vary from 20% to 90% of the total tuition fees depending on the final decision of the IHSB
              Management.
            </p>
          </div>
        </div>
      </Section>

      <Section background='canvas' aria-labelledby='registration-heading'>
        <SectionHeader
          id='registration-heading'
          title='Registration'
          description='These are the details of the most recent round. Contact the admissions office for the dates of the next one.'
        />
        <div className='grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-20'>
          <dl className='grid gap-8 sm:grid-cols-3'>
            <Stat size='md' value='20 May' label='Deadline' note='2024' />
            <Stat size='md' value='25 May' label='Exam date' note='2024, 10 AM' />
            <Stat size='md' value='500' label='Registration fee' note='BDT' />
          </dl>
          <div>
            <h3 className='font-display text-title text-ink'>Required documents</h3>
            <ul className='mt-3 divide-y divide-line border-y border-line'>
              {documents.map((document) => (
                <li key={document} className='py-3 text-ink'>
                  {document}
                </li>
              ))}
            </ul>
            <p className='mt-4 text-sm text-ink-subtle'>Bring original certificates if selected for the final viva exam.</p>
          </div>
        </div>
      </Section>

      <Section background='sunken' aria-labelledby='cv-heading'>
        <div className='grid gap-12 lg:grid-cols-2 lg:gap-20'>
          <div>
            <h2 id='cv-heading' className='font-display text-display-3 text-ink'>
              What to put in your CV
            </h2>
            <div className='gold-rule mt-4 w-24' aria-hidden />
            <ol className='mt-6 space-y-4'>
              {cvSections.map((section, index) => (
                <li key={section.title} className='flex gap-4'>
                  <span className='numeral w-6 shrink-0 text-2xl text-gold' aria-hidden>
                    {index + 1}
                  </span>
                  <span>
                    <span className='block font-semibold text-ink'>{section.title}</span>
                    <span className='block text-ink-muted'>{section.hint}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className='font-display text-display-3 text-ink'>Keeping the award</h2>
            <div className='gold-rule mt-4 w-24' aria-hidden />
            <p className='mt-6 text-ink-muted'>
              A student&rsquo;s scholarship award can be revoked if any of the following conditions are not met:
            </p>
            <ul className='mt-4 space-y-3'>
              {conditions.map((condition) => (
                <li key={condition} className='flex gap-3 text-ink'>
                  <span className='mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-500' aria-hidden />
                  {condition}
                </li>
              ))}
            </ul>
            <p className='mt-8 text-ink-muted'>
              Questions?{' '}
              <a href={`mailto:${schoolInfo.email.admission}`} className='link-underline font-semibold text-brand'>
                {schoolInfo.email.admission}
              </a>
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
