import type { Metadata } from 'next'
import Accordion, { AccordionItem } from '@/components/ui/Accordion'
import { ButtonLink } from '@/components/ui/Button'
import PageHeader from '@/components/ui/PageHeader'
import Section from '@/components/ui/Section'
import Tabs, { TabsList, TabsPanel, TabsPanels, TabsTab } from '@/components/ui/Tabs'
import { schoolInfo } from '@/data/schoolInfo'
import { campuses, feesData, notesData } from './data'

export const metadata: Metadata = {
  title: 'Fees',
  description:
    'Admission, tuition, transport and hostel fees at International Hope School Bangladesh for each campus, Academic Year 2024 - 2025.',
  alternates: { canonical: '/admission/fees' },
  openGraph: { title: 'Fees | IHSB', description: 'Admission, tuition, transport and hostel fees for each IHSB campus.' }
}

type CampusName = keyof typeof feesData
interface Instalments {
  admission: string
  yearly: string
  installments: string[]
}

function InstalmentBlock({ title, fee, note }: { title: string; fee: Instalments; note?: string }) {
  return (
    <div>
      <h4 className='font-semibold text-ink'>{title}</h4>
      <dl className='mt-2 grid gap-x-6 gap-y-1.5 text-[0.9375rem] sm:grid-cols-[auto_minmax(0,1fr)]'>
        <dt className='text-ink-subtle'>Admission fee</dt>
        <dd className='tabular-nums text-ink'>
          {fee.admission}
          {note && <span className='text-ink-subtle'> ({note})</span>}
        </dd>
        <dt className='text-ink-subtle'>Yearly fee</dt>
        <dd className='tabular-nums text-ink'>{fee.yearly}</dd>
        <dt className='text-ink-subtle'>Instalments</dt>
        <dd className='tabular-nums text-ink'>{fee.installments.join(', ')}</dd>
      </dl>
    </div>
  )
}

export default function FeesPage() {
  return (
    <>
      <PageHeader
        title='Fees'
        subtitle='Admission, tuition, transport and hostel fees for the Academic Year 2024 - 2025. Choose a campus.'
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Admissions' }, { label: 'Fees' }]}
        patternSeed={59}
        actions={
          <ButtonLink href='/admission/apply' variant='secondary'>
            Apply for admission
          </ButtonLink>
        }
      />

      <Section background='canvas' spacing='sm' aria-label='Fees by campus'>
        <Tabs>
          <TabsList label='Campus'>
            {campuses.map((campus) => (
              <TabsTab key={campus.name}>{campus.name}</TabsTab>
            ))}
          </TabsList>
          <TabsPanels className='pt-10'>
            {campuses.map((campus) => {
              const fees = feesData[campus.name as CampusName] as {
                admission: string | Record<string, string>
                tuition: Array<{ grade: string; monthly: string; installment: string; yearly: string }>
                transport?: Instalments
                hostel?: { girls: Instalments; boys: Instalments }
              }
              const notes = notesData[campus.name as CampusName]

              return (
                <TabsPanel key={campus.name}>
                  <div className='grid gap-12 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-16'>
                    <div>
                      <h2 className='font-display text-display-3 text-ink'>{campus.name}</h2>
                      <div className='gold-rule mt-4 w-24' aria-hidden />
                      <h3 className='mt-8 text-sm font-semibold text-gold'>New admission fee</h3>
                      {typeof fees.admission === 'string' ? (
                        <p className='numeral mt-1 text-4xl text-ink'>{fees.admission}</p>
                      ) : (
                        <dl className='mt-2 space-y-3'>
                          {Object.entries(fees.admission).map(([grade, fee]) => (
                            <div key={grade}>
                              <dt className='text-sm text-ink-subtle'>{grade}</dt>
                              <dd className='numeral text-3xl text-ink'>{fee}</dd>
                            </div>
                          ))}
                        </dl>
                      )}
                    </div>

                    <div className='min-w-0'>
                      <h3 className='font-display text-title text-ink'>Tuition fees</h3>
                      <div className='mt-4 overflow-x-auto rounded-lg border border-line'>
                        <table className='w-full min-w-[36rem] text-left text-[0.9375rem]'>
                          <caption className='sr-only'>Tuition fees for {campus.name}</caption>
                          <thead className='bg-sunken text-sm text-ink-muted'>
                            <tr>
                              <th scope='col' className='px-4 py-3 font-semibold'>Grade</th>
                              <th scope='col' className='px-4 py-3 font-semibold'>Monthly</th>
                              <th scope='col' className='px-4 py-3 font-semibold'>Instalments</th>
                              <th scope='col' className='px-4 py-3 text-right font-semibold'>Yearly total</th>
                            </tr>
                          </thead>
                          <tbody className='divide-y divide-line bg-paper tabular-nums'>
                            {fees.tuition.map((row) => (
                              <tr key={row.grade}>
                                <th scope='row' className='px-4 py-3.5 font-semibold text-ink'>{row.grade}</th>
                                <td className='px-4 py-3.5 text-ink-muted'>{row.monthly}</td>
                                <td className='px-4 py-3.5 text-ink-muted'>{row.installment}</td>
                                <td className='px-4 py-3.5 text-right font-semibold text-ink'>{row.yearly}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <Accordion className='mt-10'>
                        <AccordionItem title='Payment notes' defaultOpen as='h3'>
                          <ol className='list-decimal space-y-2 pl-5'>
                            {notes.map((note) => (
                              <li key={note}>{note}</li>
                            ))}
                          </ol>
                        </AccordionItem>
                        {fees.transport && (
                          <AccordionItem title='Transport fees (Uttara, door to door)' as='h3'>
                            <InstalmentBlock title='School transport' fee={fees.transport} note='for newly admitted students only' />
                          </AccordionItem>
                        )}
                        {fees.hostel && (
                          <AccordionItem title='Hostel fees' as='h3'>
                            <div className='grid gap-8 sm:grid-cols-2'>
                              <InstalmentBlock title='Girls hostel' fee={fees.hostel.girls} />
                              <InstalmentBlock title='Boys hostel' fee={fees.hostel.boys} />
                            </div>
                          </AccordionItem>
                        )}
                      </Accordion>
                    </div>
                  </div>
                </TabsPanel>
              )
            })}
          </TabsPanels>
        </Tabs>
      </Section>

      <Section background='sunken' spacing='sm' aria-labelledby='fees-help'>
        <div className='flex flex-col items-start justify-between gap-6 md:flex-row md:items-center'>
          <div>
            <h2 id='fees-help' className='font-display text-display-3 text-ink'>
              A question about fees?
            </h2>
            <p className='mt-2 max-w-prose text-ink-muted'>
              The accounts office at each branch can explain instalments, concessions and scholarships.
            </p>
          </div>
          <div className='flex flex-wrap gap-3'>
            <ButtonLink href='/academics/scholarship' variant='outline'>
              Scholarships
            </ButtonLink>
            <a href={`tel:${schoolInfo.phone.uttaraAdmission}`} className='link-underline self-center font-semibold text-brand'>
              {schoolInfo.phone.uttaraAdmission}
            </a>
          </div>
        </div>
      </Section>
    </>
  )
}
