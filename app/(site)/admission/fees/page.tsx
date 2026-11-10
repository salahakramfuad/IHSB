'use client'

import React, { useState } from 'react'
import type { Metadata } from 'next'
import PageHeader from '../../../components/ui/PageHeader'
import Section from '../../../components/ui/Section'
import Card from '../../../components/ui/Card'

const campuses = [
  {
    name: 'Uttara Preschool & Primary Section',
    color: 'from-accent-blue-500 to-accent-blue-600',
    bgColor: 'bg-accent-blue-50',
    borderColor: 'border-accent-blue-200',
    icon: '🏫'
  },
  {
    name: 'Gulshan Preschool, Primary, Middle Section',
    color: 'from-primary-green-500 to-primary-green-600',
    bgColor: 'bg-primary-green-50',
    borderColor: 'border-primary-green-200',
    icon: '🏛️'
  },
  {
    name: 'Uttara Senior Section',
    color: 'from-accent-purple-500 to-accent-purple-600',
    bgColor: 'bg-accent-purple-50',
    borderColor: 'border-accent-purple-200',
    icon: '🎓'
  },
  {
    name: 'Chattogram Branch',
    color: 'from-accent-orange-500 to-accent-orange-600',
    bgColor: 'bg-accent-orange-50',
    borderColor: 'border-accent-orange-200',
    icon: '🌴'
  }
]

const feesData = {
  'Uttara Preschool & Primary Section': {
    admission: 'TK. 2,00,000',
    tuition: [
      {
        grade: 'Toddler to PG',
        monthly: '12 X TK. 20,167',
        installment: '11 X TK. 22,000',
        yearly: 'TK. 2,42,000'
      },
      {
        grade: 'NUR',
        monthly: '12 X TK. 21,084',
        installment: '11 X TK. 23,000',
        yearly: 'TK. 2,53,000'
      },
      {
        grade: 'KG',
        monthly: '12 X TK. 22,000',
        installment: '11 X TK. 24,000',
        yearly: 'TK. 2,64,000'
      },
      {
        grade: 'Grade 1 to 3',
        monthly: '12 X TK. 24,750',
        installment: '11 X TK. 27,000',
        yearly: 'TK. 2,97,000'
      },
      {
        grade: 'Grade 4 to 5',
        monthly: '12 X TK. 25,667',
        installment: '11 X TK. 28,000',
        yearly: 'TK. 3,08,000'
      }
    ],
    transport: {
      admission: 'TK. 10,500',
      yearly: 'TK. 60,000',
      installments: ['TK. 15,000', 'TK. 15,000', 'TK. 15,000', 'TK. 15,000']
    }
  },
  'Gulshan Preschool, Primary, Middle Section': {
    admission: 'TK. 2,00,000',
    tuition: [
      {
        grade: 'Toddler to KG-2',
        monthly: '12 X TK. 18,838',
        installment: '11 X TK. 20,550',
        yearly: 'TK. 226,050'
      },
      {
        grade: 'Grade 1 to 5',
        monthly: '12 X TK. 22,779.2',
        installment: '11 X TK. 24,850',
        yearly: 'TK. 273,350'
      },
      {
        grade: 'Middle Section',
        monthly: '12 X TK. 24,475',
        installment: '11 X TK. 26,700',
        yearly: 'TK. 293,700'
      }
    ]
  },
  'Uttara Senior Section': {
    admission: {
      'Grade 6 to 8': 'TK. 2,00,000',
      'Grade 9 to 10': 'TK. 1,00,000',
      'Grade 11 to 12': 'TK. 75,000'
    },
    tuition: [
      {
        grade: 'Grade 6',
        monthly: '12 X TK. 27,042',
        installment: '11 X TK. 29,500',
        yearly: 'TK. 3,24,500'
      },
      {
        grade: 'Grade 7',
        monthly: '12 X TK. 29,333',
        installment: '11 X TK. 32,000',
        yearly: 'TK. 3,52,000'
      },
      {
        grade: 'Grade 8',
        monthly: '12 X TK. 30,250',
        installment: '11 X TK. 33,000',
        yearly: 'TK. 3,63,000'
      },
      {
        grade: 'Grade 9 to 10',
        monthly: '12 X TK. 30,625',
        installment: '7 X TK. 52,500',
        yearly: 'TK. 3,67,500'
      },
      {
        grade: 'Grade 11 to 12',
        monthly: '12 X TK. 27,417',
        installment: '7 X TK. 47,000',
        yearly: 'TK. 3,29,000'
      }
    ],
    hostel: {
      girls: {
        admission: 'TK. 30,000',
        yearly: 'TK. 1,50,000',
        installments: ['TK. 37,500', 'TK. 37,500', 'TK. 37,500', 'TK. 37,500']
      },
      boys: {
        admission: 'TK. 50,000',
        yearly: 'TK. 2,50,000',
        installments: ['TK. 62,500', 'TK. 62,500', 'TK. 62,500', 'TK. 62,500']
      }
    },
    transport: {
      admission: 'TK. 10,500',
      yearly: 'TK. 60,000',
      installments: ['TK. 15,000', 'TK. 15,000', 'TK. 15,000', 'TK. 15,000']
    }
  },
  'Chattogram Branch': {
    admission: 'TK. 55,000',
    tuition: [
      {
        grade: 'Toddler to KG-2',
        monthly: '12 X TK. 12,033.30',
        installment: '10 X TK. 14,440',
        yearly: 'TK. 144,400'
      },
      {
        grade: 'Grade 1 to 5',
        monthly: '12 X TK. 14,000',
        installment: '10 X TK. 16,800',
        yearly: 'TK. 168,000'
      },
      {
        grade: 'Grade 6 to 8',
        monthly: '12 X TK. 15,000',
        installment: '10 X TK. 18,000',
        yearly: 'TK. 180,000'
      },
      {
        grade: 'Grade 9 to 12',
        monthly: '12 X TK. 15,750',
        installment: '7 X TK. 27,000',
        yearly: 'TK. 189,000'
      }
    ]
  }
}

const notesData = {
  'Uttara Preschool & Primary Section': [
    'If the tuition fees are paid for the year in full, a 5% concession will be given.',
    'New admitted students will pay the first installment in full, regardless of the date of admission.',
    'The figures shown in the Yearly Tuition Fee are only for the Academic Year 2024 - 2025.'
  ],
  'Gulshan Preschool, Primary, Middle Section': [
    'First installment to be paid by 31.July.2024.',
    'All fees exclude VAT for the Academic Year 2024 - 2025.'
  ],
  'Uttara Senior Section': [
    'First installment to be paid by 31.July.2024.',
    'If the tuition fees are paid for the year in full, a 5% concession will be given.',
    'New admitted students will pay the first installment in full, regardless of the date of admission.'
  ],
  'Chattogram Branch': [
    'First installment to be paid by 31.July.2024.',
    'All fees exclude VAT for the Academic Year 2024 - 2025.'
  ]
}

export default function FeesPage() {
  const [activeCampus, setActiveCampus] = useState(
    'Uttara Preschool & Primary Section'
  )

  const activeCampusData = campuses.find((c) => c.name === activeCampus)
  const fees = feesData[activeCampus as keyof typeof feesData]
  const notes = notesData[activeCampus as keyof typeof notesData]

  return (
    <main className='min-h-screen bg-gradient-to-br from-primary-50/50 via-white to-primary-green-50/50'>
      <Section background='white'>
        <PageHeader
          title='Fees Structure'
          subtitle='Academic Year 2024 - 2025 | Transparent and affordable education'
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Admissions', href: '/admission' },
            { label: 'Fees' }
          ]}
        />
      </Section>

      <Section background='gray'>
        <div className='max-w-7xl mx-auto'>
          {/* Campus Selection Buttons */}
          <div className='flex flex-wrap justify-center gap-4 mb-8'>
            {campuses.map((campus) => (
              <button
                key={campus.name}
                onClick={() => setActiveCampus(campus.name)}
                className={`relative px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeCampus === campus.name
                    ? `bg-gradient-to-r ${campus.color} text-white shadow-xl scale-105`
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md border-2 border-gray-200'
                }`}
              >
                <span className='text-2xl mr-2'>{campus.icon}</span>
                <span className='text-sm sm:text-base'>{campus.name}</span>
              </button>
            ))}
          </div>

          {/* Fees Content */}
          <div className='space-y-8'>
            {/* Admission Fees */}
            <Card
              className={`border-2 ${activeCampusData?.borderColor} ${activeCampusData?.bgColor}`}
            >
              <div className={`h-2 bg-gradient-to-r ${activeCampusData?.color} rounded-t-xl -mx-6 -mt-6 mb-6`}></div>
              <h3 className='text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
                <span className='text-3xl'>💰</span>
                Admission Fees
              </h3>
              {typeof fees.admission === 'string' ? (
                <p className='text-lg text-gray-700 font-semibold'>
                  School New Admission Fee: <span className={`text-2xl font-bold bg-gradient-to-r ${activeCampusData?.color} bg-clip-text text-transparent`}>{fees.admission}</span>
                </p>
              ) : (
                <div className='space-y-2'>
                  {Object.entries(fees.admission).map(([grade, fee]) => (
                    <p key={grade} className='text-lg text-gray-700'>
                      <span className='font-semibold'>{grade}:</span>{' '}
                      <span className={`text-xl font-bold bg-gradient-to-r ${activeCampusData?.color} bg-clip-text text-transparent`}>{fee}</span>
                    </p>
                  ))}
                </div>
              )}
            </Card>

            {/* Tuition Fees */}
            <Card
              className={`border-2 ${activeCampusData?.borderColor} ${activeCampusData?.bgColor}`}
            >
              <div className={`h-2 bg-gradient-to-r ${activeCampusData?.color} rounded-t-xl -mx-6 -mt-6 mb-6`}></div>
              <h3 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2'>
                <span className='text-3xl'>📚</span>
                Tuition Fees
              </h3>
              <div className='overflow-x-auto'>
                <table className='w-full border-collapse'>
                  <thead>
                    <tr className={`bg-gradient-to-r ${activeCampusData?.color} text-white`}>
                      <th className='border border-white/30 p-4 text-left font-bold rounded-tl-lg'>Grade</th>
                      <th className='border border-white/30 p-4 text-left font-bold'>Monthly Tuition</th>
                      <th className='border border-white/30 p-4 text-left font-bold'>Installments</th>
                      <th className='border border-white/30 p-4 text-left font-bold rounded-tr-lg'>Yearly Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fees.tuition.map((item, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        } hover:bg-primary-green-50 transition-colors`}
                      >
                        <td className='border border-gray-200 p-4 font-semibold text-gray-900'>
                          {item.grade}
                        </td>
                        <td className='border border-gray-200 p-4 text-gray-700'>
                          {item.monthly}
                        </td>
                        <td className='border border-gray-200 p-4 text-gray-700'>
                          {item.installment}
                        </td>
                        <td className={`border border-gray-200 p-4 font-bold bg-gradient-to-r ${activeCampusData?.color} bg-clip-text text-transparent`}>
                          {item.yearly}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Transport Fees */}
            {'transport' in fees && fees.transport && (
              <Card
                className={`border-2 ${activeCampusData?.borderColor} ${activeCampusData?.bgColor}`}
              >
                <div className={`h-2 bg-gradient-to-r ${activeCampusData?.color} rounded-t-xl -mx-6 -mt-6 mb-6`}></div>
                <h3 className='text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
                  <span className='text-3xl'>🚌</span>
                  Transport Fees (Uttara - Door to Door)
                </h3>
                <div className='space-y-3'>
                  <p className='text-lg text-gray-700'>
                    <span className='font-semibold'>Transport Admission Fee:</span>{' '}
                    <span className={`text-xl font-bold bg-gradient-to-r ${activeCampusData?.color} bg-clip-text text-transparent`}>{fees.transport.admission}</span>
                    <span className='text-sm text-gray-500 ml-2'>(for newly admitted students only)</span>
                  </p>
                  <p className='text-lg text-gray-700'>
                    <span className='font-semibold'>Yearly Transport Fees:</span>{' '}
                    <span className={`text-xl font-bold bg-gradient-to-r ${activeCampusData?.color} bg-clip-text text-transparent`}>{fees.transport.yearly}</span>
                  </p>
                  <p className='text-lg text-gray-700'>
                    <span className='font-semibold'>Installments:</span>{' '}
                    <span className='font-mono'>{fees.transport.installments.join(', ')}</span>
                  </p>
                </div>
              </Card>
            )}

            {/* Hostel Fees */}
            {'hostel' in fees && fees.hostel && (
              <Card
                className={`border-2 ${activeCampusData?.borderColor} ${activeCampusData?.bgColor}`}
              >
                <div className={`h-2 bg-gradient-to-r ${activeCampusData?.color} rounded-t-xl -mx-6 -mt-6 mb-6`}></div>
                <h3 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2'>
                  <span className='text-3xl'>🏠</span>
                  Hostel Fees
                </h3>
                <div className='grid md:grid-cols-2 gap-6'>
                  <div className='bg-gradient-to-br from-accent-pink-50 to-accent-pink-100 p-6 rounded-xl border-2 border-accent-pink-200'>
                    <h4 className='text-xl font-bold text-accent-pink-700 mb-4'>Girls Hostel 👧</h4>
                    <div className='space-y-2'>
                      <p className='text-gray-700'>
                        <span className='font-semibold'>Admission Fee:</span>{' '}
                        <span className='text-lg font-bold text-accent-pink-600'>{fees.hostel.girls.admission}</span>
                      </p>
                      <p className='text-gray-700'>
                        <span className='font-semibold'>Yearly Fee:</span>{' '}
                        <span className='text-lg font-bold text-accent-pink-600'>{fees.hostel.girls.yearly}</span>
                      </p>
                      <p className='text-gray-700'>
                        <span className='font-semibold'>Installments:</span>{' '}
                        <span className='font-mono text-sm'>{fees.hostel.girls.installments.join(', ')}</span>
                      </p>
                    </div>
                  </div>
                  <div className='bg-gradient-to-br from-accent-blue-50 to-accent-blue-100 p-6 rounded-xl border-2 border-accent-blue-200'>
                    <h4 className='text-xl font-bold text-accent-blue-700 mb-4'>Boys Hostel 👦</h4>
                    <div className='space-y-2'>
                      <p className='text-gray-700'>
                        <span className='font-semibold'>Admission Fee:</span>{' '}
                        <span className='text-lg font-bold text-accent-blue-600'>{fees.hostel.boys.admission}</span>
                      </p>
                      <p className='text-gray-700'>
                        <span className='font-semibold'>Yearly Fee:</span>{' '}
                        <span className='text-lg font-bold text-accent-blue-600'>{fees.hostel.boys.yearly}</span>
                      </p>
                      <p className='text-gray-700'>
                        <span className='font-semibold'>Installments:</span>{' '}
                        <span className='font-mono text-sm'>{fees.hostel.boys.installments.join(', ')}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Important Notes */}
            <Card className='bg-gradient-to-br from-accent-yellow-50 to-accent-orange-50 border-2 border-accent-yellow-200'>
              <div className='h-2 bg-gradient-to-r from-accent-yellow-400 to-accent-orange-500 rounded-t-xl -mx-6 -mt-6 mb-6'></div>
              <h3 className='text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
                <span className='text-3xl'>📋</span>
                Important Notes
              </h3>
              <ul className='space-y-3'>
                {notes.map((note, index) => (
                  <li key={index} className='flex items-start gap-3'>
                    <span className={`text-xl font-bold bg-gradient-to-r ${activeCampusData?.color} bg-clip-text text-transparent mt-1`}>
                      {index + 1}.
                    </span>
                    <span className='text-gray-700 flex-1'>{note}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </Section>
    </main>
  )
}
