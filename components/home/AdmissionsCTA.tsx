import { schoolInfo } from '@/data/schoolInfo'
import ContourLines from '../patterns/ContourLines'
import { ButtonLink } from '../ui/Button'

// A real sequence, so the steps are numbered
const steps = [
  { title: 'Enquire', text: 'Call or write to the admissions office, or start the online form.' },
  { title: 'Visit', text: 'Tour the campus and meet the section head.' },
  { title: 'Assess', text: 'Your child sits a short assessment and an interview.' },
  { title: 'Enrol', text: 'Accept the offer, submit documents and pay the admission fee.' }
]

export default function AdmissionsCTA() {
  return (
    <section aria-labelledby='admissions-heading' className='on-dark relative isolate overflow-hidden bg-brand-800 py-section'>
      <ContourLines seed={42} lines={18} className='-z-10 text-gold-300 opacity-35' />

      <div className='container'>
        <div className='grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-20'>
          <div>
            <h2 id='admissions-heading' className='font-display text-display-2 text-ink'>
              Admissions are open
            </h2>
            <div className='gold-rule mt-5 w-28' aria-hidden />
            <p className='mt-5 max-w-md text-lead text-ink-muted'>
              Places are available from Playgroup to Grade 11. The online application takes about fifteen minutes.
            </p>
            <div className='mt-8 flex flex-wrap gap-3'>
              <ButtonLink href='/admission/apply' variant='secondary' size='lg'>
                Apply for admission
              </ButtonLink>
              <ButtonLink href='/admission/admissionprocedure' variant='inverse' size='lg'>
                How admission works
              </ButtonLink>
            </div>
            <p className='mt-6 text-sm text-ink-subtle'>
              Admissions office:{' '}
              <a href={`tel:${schoolInfo.phone.uttaraAdmission}`} className='link-underline font-semibold text-ink'>
                {schoolInfo.phone.uttaraAdmission}
              </a>
            </p>
          </div>

          <ol className='grid gap-x-8 gap-y-8 sm:grid-cols-2'>
            {steps.map((step, index) => (
              <li key={step.title} className='border-t border-gold-400/50 pt-4'>
                <span className='numeral text-5xl text-gold' aria-hidden>
                  {index + 1}
                </span>
                <h3 className='mt-3 font-display text-title text-ink'>
                  <span className='sr-only'>Step {index + 1}: </span>
                  {step.title}
                </h3>
                <p className='mt-1.5 text-ink-muted'>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
