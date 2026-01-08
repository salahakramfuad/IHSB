import React from 'react'
import type { Metadata } from 'next'
import PageHeader from '../../../components/ui/PageHeader'
import Section from '../../../components/ui/Section'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'

export const metadata: Metadata = {
  title: 'Scholarship Program',
  description:
    'Merit-based scholarship program for outstanding students aged 11-16. Up to 90% tuition fee waiver available.',
  openGraph: {
    title: 'Scholarship Program | IHSB',
    description: 'Apply for merit-based scholarships worth up to 90% of tuition fees.'
  }
}

const criteriaData = [
  {
    criteria: 'Scholarship Exam',
    points: 70,
    color: 'from-primary-green-500 to-primary-green-600',
    bgColor: 'bg-primary-green-50',
    icon: '📝'
  },
  {
    criteria: 'Academic Records (AY 2023-2024)',
    points: 20,
    color: 'from-accent-blue-500 to-accent-blue-600',
    bgColor: 'bg-accent-blue-50',
    icon: '📊'
  },
  {
    criteria: 'CV & Viva',
    points: 10,
    color: 'from-accent-purple-500 to-accent-purple-600',
    bgColor: 'bg-accent-purple-50',
    icon: '🎤'
  }
]

export default function ScholarshipPage() {
  return (
    <main className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-green-50/20'>
      <Section background='white'>
        <PageHeader
          title='Merit-Based Scholarship Program'
          subtitle='For Students of Other Schools | Age: 11-16 | Worth up to 90% of tuition fee'
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Academics', href: '/academics' },
            { label: 'Scholarship' }
          ]}
        />
      </Section>

      <Section background='gray'>
        <div className='max-w-5xl mx-auto space-y-8'>
          {/* Scholarship Policy */}
          <Card className='bg-gradient-to-br from-accent-blue-50 to-primary-green-50 border-2 border-accent-blue-200'>
            <div className='h-2 bg-gradient-to-r from-accent-blue-500 to-primary-green-500 rounded-t-xl -mx-6 -mt-6 mb-6'></div>
            <div className='flex items-start gap-4 mb-4'>
              <div className='text-5xl'>🎓</div>
              <div>
                <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                  Scholarship Program Policy
                </h2>
                <p className='text-gray-700 leading-relaxed'>
                  International Hope School Bangladesh (IHSB) has much to offer pupils
                  who have outstanding talent and potential academically. Accordingly,
                  this scholarship is available to exceptional students who will
                  enhance the reputation of the school, whilst benefiting from an
                  extensive range of opportunities. IHSB strives to motivate and
                  empower students to achieve their higher education goals by
                  providing knowledge, skills, and financial resources essential for
                  success. The target group of students is aged 11 to 16. This
                  scholarship program is worth up to{' '}
                  <span className='font-bold text-2xl bg-gradient-to-r from-primary-green-600 to-accent-blue-600 bg-clip-text text-transparent'>
                    90%
                  </span>{' '}
                  of the tuition fee.
                </p>
              </div>
            </div>
          </Card>

          {/* Assessment Criteria */}
          <Card className='border-2 border-primary-green-200 bg-white'>
            <div className='h-2 bg-gradient-to-r from-primary-green-500 to-primary-green-600 rounded-t-xl -mx-6 -mt-6 mb-6'></div>
            <div className='flex items-start gap-4 mb-6'>
              <div className='text-5xl'>📊</div>
              <div className='flex-1'>
                <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                  Scholarship Assessment Criteria
                </h2>
                <p className='text-gray-700 mb-6 leading-relaxed'>
                  The assessment process for all scholarships will enable the school
                  to evaluate how well candidates can perform in their comfort zone as
                  well as in other areas, and whether they can demonstrate the
                  potential to develop further. This will also explore potential by
                  exposing candidates to new concepts or processes and offering
                  challenging opportunities to show tenacity and leadership. Based on
                  commitment and dependability at school, students' activities will
                  also be evaluated.
                </p>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>
                  Selection Process for Academic Scholarships
                </h3>
                <p className='text-gray-700 mb-6 leading-relaxed'>
                  All completed applications accompanied by all required supporting
                  materials will be reviewed by the Scholarship Application Evaluation
                  Committee to ensure that every applicant receives full
                  consideration. Scholarships will be awarded in a manner that matches
                  the higher monetary award amounts with the better-qualified
                  candidates who meet all the requisite criteria. Applicants will be
                  scored using a percentage system based on the following criteria:
                </p>
              </div>
            </div>

            {/* Scoring Cards */}
            <div className='grid md:grid-cols-3 gap-4 mb-6'>
              {criteriaData.map((item, index) => (
                <Card
                  key={index}
                  className={`${item.bgColor} border-2 border-gray-200`}
                >
                  <div className={`h-1 bg-gradient-to-r ${item.color} rounded-t-xl -mx-6 -mt-6 mb-4`}></div>
                  <div className='text-center'>
                    <div className='text-4xl mb-2'>{item.icon}</div>
                    <h4 className='text-sm font-semibold text-gray-900 mb-2'>
                      {item.criteria}
                    </h4>
                    <div className={`text-3xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                      {item.points}
                    </div>
                    <p className='text-xs text-gray-600 mt-1'>points</p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Scoring Table */}
            <div className='overflow-x-auto mb-6'>
              <table className='w-full border-collapse'>
                <thead>
                  <tr className='bg-gradient-to-r from-primary-green-600 to-accent-blue-600 text-white'>
                    <th className='p-4 text-left font-bold rounded-tl-lg'>Criteria</th>
                    <th className='p-4 text-center font-bold rounded-tr-lg'>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {criteriaData.map((item, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                      } hover:bg-primary-green-50 transition-colors`}
                    >
                      <td className='p-4 border border-gray-200 font-medium text-gray-900'>
                        {item.criteria}
                      </td>
                      <td className='p-4 border border-gray-200 text-center font-bold text-primary-green-600'>
                        {item.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className='bg-accent-yellow-50 border-2 border-accent-yellow-200 rounded-xl p-4'>
              <p className='text-gray-700 leading-relaxed'>
                According to the provided table, the top 5 participants will be
                selected from the merit list for a Viva exam from each grade/class.
                The scholarship amount may vary from{' '}
                <span className='font-bold text-lg text-primary-green-700'>
                  20% to 90%
                </span>{' '}
                of the total tuition fees depending on the final decision of the IHSB
                Management.
              </p>
            </div>
          </Card>

          {/* Registration Details */}
          <Card className='bg-gradient-to-br from-accent-yellow-50 to-accent-orange-50 border-2 border-accent-yellow-200'>
            <div className='h-2 bg-gradient-to-r from-accent-yellow-400 to-accent-orange-500 rounded-t-xl -mx-6 -mt-6 mb-6'></div>
            <div className='flex items-start gap-4 mb-4'>
              <div className='text-5xl'>📝</div>
              <div className='flex-1'>
                <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                  Scholarship Program Registration
                </h2>
                <div className='grid md:grid-cols-3 gap-4'>
                  <div className='bg-white rounded-xl p-4 border-2 border-primary-green-200'>
                    <div className='text-2xl mb-2'>📅</div>
                    <p className='text-sm text-gray-600 mb-1'>Deadline</p>
                    <p className='font-bold text-lg text-gray-900'>20th May, 2024</p>
                  </div>
                  <div className='bg-white rounded-xl p-4 border-2 border-accent-blue-200'>
                    <div className='text-2xl mb-2'>💰</div>
                    <p className='text-sm text-gray-600 mb-1'>Registration Fee</p>
                    <p className='font-bold text-lg text-gray-900'>BDT 500</p>
                  </div>
                  <div className='bg-white rounded-xl p-4 border-2 border-accent-purple-200'>
                    <div className='text-2xl mb-2'>📆</div>
                    <p className='text-sm text-gray-600 mb-1'>Exam Date</p>
                    <p className='font-bold text-lg text-gray-900'>25th May, 2024</p>
                    <p className='text-sm text-gray-600'>10 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Required Documents */}
          <Card className='bg-gradient-to-br from-accent-blue-50 to-primary-green-50 border-2 border-accent-blue-200'>
            <div className='h-2 bg-gradient-to-r from-accent-blue-500 to-primary-green-500 rounded-t-xl -mx-6 -mt-6 mb-6'></div>
            <div className='flex items-start gap-4 mb-4'>
              <div className='text-5xl'>📃</div>
              <div className='flex-1'>
                <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                  Required Documents
                </h2>
                <ul className='space-y-3'>
                  {['Passport copy', 'Two passport-size photos', 'Transcripts of AY 2023-2024 session'].map(
                    (doc, index) => (
                      <li
                        key={index}
                        className='flex items-center gap-3 bg-white rounded-lg p-3 border-2 border-gray-200'
                      >
                        <span className='text-2xl'>✓</span>
                        <span className='text-gray-700 font-medium'>{doc}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </Card>

          {/* Scholarship Award Cancellation */}
          <Card className='bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200'>
            <div className='h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-t-xl -mx-6 -mt-6 mb-6'></div>
            <div className='flex items-start gap-4 mb-4'>
              <div className='text-5xl'>⚠️</div>
              <div className='flex-1'>
                <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                  Scholarship Award Cancellation
                </h2>
                <p className='text-gray-700 mb-4 leading-relaxed'>
                  A student's scholarship award can be revoked if any of the following
                  conditions are found:
                </p>
                <ul className='space-y-3'>
                  {[
                    {
                      text: 'Students must maintain',
                      highlight: '80% or above',
                      rest: 'marks in their formative and summative assessments.'
                    },
                    {
                      text: 'They should always maintain proper discipline, and their behavioral marks need to be',
                      highlight: '100',
                      rest: 'throughout the academic year.'
                    },
                    {
                      text: 'They should always be respectful towards the laws of Bangladesh and the policies of the school.',
                      highlight: null,
                      rest: null
                    }
                  ].map((item, index) => (
                    <li
                      key={index}
                      className='flex items-start gap-3 bg-white rounded-lg p-4 border-2 border-gray-200'
                    >
                      <span className='text-xl font-bold text-red-600 mt-1'>
                        {index + 1}.
                      </span>
                      <span className='text-gray-700 leading-relaxed'>
                        {item.text}{' '}
                        {item.highlight && (
                          <span className='font-bold text-red-600'>{item.highlight}</span>
                        )}{' '}
                        {item.rest}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          {/* CV Template */}
          <Card className='bg-gradient-to-br from-primary-green-50 to-accent-teal-50 border-2 border-primary-green-200'>
            <div className='h-2 bg-gradient-to-r from-primary-green-500 to-accent-teal-500 rounded-t-xl -mx-6 -mt-6 mb-6'></div>
            <div className='flex items-start gap-4 mb-4'>
              <div className='text-5xl'>📄</div>
              <div className='flex-1'>
                <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                  CV Template
                </h2>
                <div className='bg-white rounded-xl p-6 border-2 border-gray-200 space-y-4'>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-1'>
                      Applicant's Name:
                    </label>
                    <input
                      type='text'
                      placeholder='Enter your full name'
                      className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green-500 focus:border-transparent'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-1'>
                      Applicant's Address and Contact Number:
                    </label>
                    <input
                      type='text'
                      placeholder='Enter address and phone number'
                      className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green-500 focus:border-transparent'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-1'>
                      Applicant's School Name and Address:
                    </label>
                    <input
                      type='text'
                      placeholder='Enter current school name and address'
                      className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green-500 focus:border-transparent'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-1'>
                      Achievements in Co-curricular Activities:
                    </label>
                    <textarea
                      rows={3}
                      placeholder='List your achievements in sports, arts, competitions, etc.'
                      className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green-500 focus:border-transparent'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-1'>
                      Statement (Within 250 words):
                    </label>
                    <textarea
                      rows={4}
                      placeholder='Write about your personality, character, suitability for the scholarship, and why you need the scholarship.'
                      className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green-500 focus:border-transparent'
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Footer Note */}
          <Card className='bg-gradient-to-br from-accent-yellow-50 to-accent-orange-50 border-2 border-accent-yellow-200'>
            <div className='h-2 bg-gradient-to-r from-accent-yellow-400 to-accent-orange-500 rounded-t-xl -mx-6 -mt-6 mb-6'></div>
            <div className='flex items-center gap-4'>
              <div className='text-4xl'>📢</div>
              <p className='text-gray-700 font-medium'>
                <strong>Note:</strong> Bring original certificates if selected for the
                final Viva exam.
              </p>
            </div>
          </Card>
        </div>
      </Section>
    </main>
  )
}
