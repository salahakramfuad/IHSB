import type { Metadata } from 'next'
import Link from 'next/link'
import { ButtonLink } from '@/components/ui/Button'
import PageHeader from '@/components/ui/PageHeader'
import Section, { SectionHeader } from '@/components/ui/Section'
import Timeline from '@/components/ui/Timeline'
import { schoolInfo } from '@/data/schoolInfo'

export const metadata: Metadata = {
  title: 'Admission Procedure',
  description:
    'Learn about the admission procedure at IHSB - steps to apply, required documents, admission test, interview, and important guidelines.',
  alternates: { canonical: '/admission/admissionprocedure' },
  openGraph: {
    title: 'Admission Procedure | IHSB',
    description: 'Complete guide to the admission process at International Hope School Bangladesh.'
  }
}

const documents = [
  '2 recent passport-size photos of the student (in color).',
  'A photocopy of the Birth Certificate attested by a Notary Public.',
  'A photocopy of the last year’s report card.',
  'Business cards of parents or guardians (if available).',
  'Passport photocopy of the student (if available).'
]

const instructions = [
  'The Admission Application Form is available at the respective school offices and must be submitted by the last date notified by the school management.',
  'It is the parent’s responsibility to submit all required documents with the Admission Contract.',
  'Prior to admission, pupils are required to appear for an admission test.',
  'Following the admission test, an interview will be conducted with the students and parents. Admission test results will be announced or communicated via phone calls within 3-5 days.',
  'Selected candidates must complete the admission process within seven days by paying the admission fee and submitting all necessary documents; otherwise, the admission result will not be valid.',
  'The school management reserves the right to reject a candidate at any stage of the admission process, and the school is not bound to provide reasons.'
]

const policy = [
  'In case parents fail to submit the required documents, they must submit an application explaining the reason.',
  'Acceptance of the admission application form does not necessarily mean admittance of a candidate to school.',
  'Any admission application form containing incorrect or false information will result in rejection or discontinuation from the school.',
  'IHSB does admit students outside the standard admission schedule.'
]

const ageLimits: Array<[string, string]> = [
  ['Toddler', '2+'],
  ['PG', '3+'],
  ['Nursery', '4+'],
  ['KG 1', '5+'],
  ['KG 2', '6+'],
  ['Class 1', '7+'],
  ['Class 2', '8+'],
  ['Class 3', '9+'],
  ['Class 4', '10+'],
  ['Class 5', '11+'],
  ['Class 6', '12+'],
  ['Class 7', '13+'],
  ['Class 8', '14+'],
  ['Class 9', '15+'],
  ['Class 10', '16+'],
  ['Class 11', '17+'],
  ['Class 12', '18+']
]

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className='space-y-3'>
      {items.map((item) => (
        <li key={item} className='flex gap-3 text-ink-muted'>
          <span className='mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-500' aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function AdmissionProcedurePage() {
  const half = Math.ceil(ageLimits.length / 2)

  return (
    <>
      <PageHeader
        title='Admission procedure'
        subtitle='How to apply to International Hope School Bangladesh, from the application form to the first day.'
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Admissions' }, { label: 'Admission procedure' }]}
        patternSeed={61}
        actions={
          <>
            <ButtonLink href='/admission/apply' variant='secondary'>
              Apply online
            </ButtonLink>
            <ButtonLink href='/admission/fees' variant='inverse'>
              See the fees
            </ButtonLink>
          </>
        }
      />

      <Section background='canvas' aria-labelledby='steps-heading'>
        <div className='grid gap-12 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-20'>
          <div>
            <h2 id='steps-heading' className='font-display text-display-2 text-ink'>
              Five steps to apply
            </h2>
            <div className='gold-rule mt-5 w-28' aria-hidden />
            <p className='mt-6 text-ink-muted'>
              The academic year begins in July and ends in June. The{' '}
              <Link href='/academics/calendar' className='link-underline font-semibold text-brand'>
                academic calendar
              </Link>{' '}
              has all important dates.
            </p>
          </div>

          <Timeline>
            <Timeline.Item marker='1' title='Collect an application form'>
              Purchase the form for $17.7 from the school office. It must be submitted by the last date notified by
              the school management. You can also{' '}
              <Link href='/admission/apply' className='link-underline font-semibold text-brand'>
                apply online
              </Link>
              .
            </Timeline.Item>
            <Timeline.Item marker='2' title='Submit the required documents'>
              <p className='mb-3'>Submit the Admission Application Form along with:</p>
              <BulletList items={documents} />
            </Timeline.Item>
            <Timeline.Item marker='3' title='Appear for the admission test'>
              Prior to admission, pupils are required to appear for an admission test.
            </Timeline.Item>
            <Timeline.Item marker='4' title='Attend the interview'>
              Following the admission test, an interview will be conducted with the students and parents.
            </Timeline.Item>
            <Timeline.Item marker='5' title='Complete the admission'>
              Selected candidates must complete the admission process within seven days by paying the admission fee
              and submitting all necessary documents; otherwise, the admission result will not be valid.
            </Timeline.Item>
          </Timeline>
        </div>
      </Section>

      <Section background='sunken' aria-labelledby='rules-heading'>
        <h2 id='rules-heading' className='sr-only'>
          Instructions and policy
        </h2>
        <div className='grid gap-12 lg:grid-cols-2 lg:gap-20'>
          <div>
            <h3 className='font-display text-display-3 text-ink'>General instructions</h3>
            <div className='gold-rule mb-6 mt-4 w-24' aria-hidden />
            <BulletList items={instructions} />
          </div>
          <div>
            <h3 className='font-display text-display-3 text-ink'>Admission policy</h3>
            <div className='gold-rule mb-6 mt-4 w-24' aria-hidden />
            <BulletList items={policy} />
          </div>
        </div>
      </Section>

      <Section background='canvas' aria-labelledby='age-heading'>
        <SectionHeader id='age-heading' title='Age limits for each class' description='The minimum age of a child at the start of the academic year.' />
        <div className='grid gap-x-16 md:grid-cols-2'>
          {[ageLimits.slice(0, half), ageLimits.slice(half)].map((column, index) => (
            <table key={index} className='w-full text-left'>
              <caption className='sr-only'>Minimum age by class, part {index + 1} of 2</caption>
              <thead>
                <tr className='border-b border-line-strong text-sm text-ink-subtle'>
                  <th scope='col' className='py-3 font-medium'>Class</th>
                  <th scope='col' className='py-3 text-right font-medium'>Minimum age</th>
                </tr>
              </thead>
              <tbody>
                {column.map(([name, age]) => (
                  <tr key={name} className='border-b border-line'>
                    <th scope='row' className='py-3 font-normal text-ink'>{name}</th>
                    <td className='numeral py-3 text-right text-2xl text-gold'>{age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>
      </Section>

      <Section background='brand' spacing='sm' aria-labelledby='admission-contact'>
        <div className='flex flex-col items-start justify-between gap-6 md:flex-row md:items-center'>
          <div>
            <h2 id='admission-contact' className='font-display text-display-3 text-ink'>
              Talk to the admissions office
            </h2>
            <address className='mt-2 not-italic text-ink-muted'>
              {schoolInfo.address.main}. Tel: {schoolInfo.phone.main}, {schoolInfo.phone.alternate}. Fax: {schoolInfo.fax}.
            </address>
          </div>
          <div className='flex shrink-0 flex-wrap gap-3'>
            <ButtonLink href='/admission/apply' variant='secondary'>
              Apply online
            </ButtonLink>
            <ButtonLink href='/contact' variant='inverse'>
              Contact us
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  )
}
