'use client'
import { useState } from 'react'

const Fees = () => {
  const [activeCampus, setActiveCampus] = useState(
    'Uttara Preschool & Primary Section'
  )

  const campuses = [
    {
      name: 'Uttara Preschool & Primary Section',
      fees: {
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
      notes: [
        'If the tuition fees are paid for the year in full, a 5% concession will be given.',
        'New admitted students will pay the first installment in full, regardless of the date of admission.',
        'The figures shown in the Yearly Tuition Fee are only for the Academic Year 2024 - 2025.'
      ]
    },
    {
      name: 'Gulshan Preschool, Primary, Middle Section',
      fees: {
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
      notes: [
        'First installment to be paid by 31.July.2024.',
        'All fees exclude VAT for the Academic Year 2024 - 2025.'
      ]
    },
    {
      name: 'Uttara Senior Section',
      fees: {
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
            installments: [
              'TK. 37,500',
              'TK. 37,500',
              'TK. 37,500',
              'TK. 37,500'
            ]
          },
          boys: {
            admission: 'TK. 50,000',
            yearly: 'TK. 2,50,000',
            installments: [
              'TK. 62,500',
              'TK. 62,500',
              'TK. 62,500',
              'TK. 62,500'
            ]
          }
        },
        transport: {
          admission: 'TK. 10,500',
          yearly: 'TK. 60,000',
          installments: ['TK. 15,000', 'TK. 15,000', 'TK. 15,000', 'TK. 15,000']
        }
      },
      notes: [
        'First installment to be paid by 31.July.2024.',
        'If the tuition fees are paid for the year in full, a 5% concession will be given.',
        'New admitted students will pay the first installment in full, regardless of the date of admission.'
      ]
    },
    {
      name: 'Chattogram Branch',
      fees: {
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
      },
      notes: [
        'First installment to be paid by 31.July.2024.',
        'All fees exclude VAT for the Academic Year 2024 - 2025.'
      ]
    }
  ]

  const renderFees = (campus) => {
    const { admission, tuition, transport, hostel } = campus.fees
    return (
      <div className='space-y-4'>
        <h3 className='text-xl font-bold text-gray-800'>Admission Fees</h3>
        {typeof admission === 'string' ? (
          <p className='text-gray-700'>School New Admission Fee: {admission}</p>
        ) : (
          Object.entries(admission).map(([grade, fee]) => (
            <p key={grade} className='text-gray-700'>
              School New Admission Fee ({grade}): {fee}
            </p>
          ))
        )}
        <h3 className='text-xl font-bold text-gray-800'>Tuition Fees</h3>
        <table className='w-full border-collapse border border-gray-300'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='border border-gray-300 p-2'>Grade</th>
              <th className='border border-gray-300 p-2'>
                Monthly Tuition Fees
              </th>
              <th className='border border-gray-300 p-2'>
                11/10 Month Installments
              </th>
              <th className='border border-gray-300 p-2'>
                Yearly Tuition Fees
              </th>
            </tr>
          </thead>
          <tbody>
            {tuition.map((item, index) => (
              <tr key={index}>
                <td className='border border-gray-300 p-2'>{item.grade}</td>
                <td className='border border-gray-300 p-2'>{item.monthly}</td>
                <td className='border border-gray-300 p-2'>
                  {item.installment}
                </td>
                <td className='border border-gray-300 p-2'>{item.yearly}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {transport && (
          <>
            <h3 className='text-xl font-bold text-gray-800'>
              Transport Fees (Uttara- Door to Door)
            </h3>
            <p className='text-gray-700'>
              Transport Admission Fee(applicable for newly admitted students
              only): {transport.admission}
            </p>
            <p className='text-gray-700'>
              Yearly Transport Fees: {transport.yearly}
            </p>
            <p className='text-gray-700'>
              Installments: {transport.installments.join(', ')}
            </p>
          </>
        )}
        {hostel && (
          <>
            <h3 className='text-xl font-bold text-gray-800'>Hostel Fees</h3>
            <h4 className='text-lg font-semibold text-gray-800'>Girls</h4>
            <p className='text-gray-700'>
              Hostel Admission Fee: {hostel.girls.admission}
            </p>
            <p className='text-gray-700'>
              Yearly Hostel Fee: {hostel.girls.yearly}
            </p>
            <p className='text-gray-700'>
              Installments: {hostel.girls.installments.join(', ')}
            </p>
            <h4 className='text-lg font-semibold text-gray-800'>Boys</h4>
            <p className='text-gray-700'>
              Hostel Admission Fee: {hostel.boys.admission}
            </p>
            <p className='text-gray-700'>
              Yearly Hostel Fee: {hostel.boys.yearly}
            </p>
            <p className='text-gray-700'>
              Installments: {hostel.boys.installments.join(', ')}
            </p>
          </>
        )}
      </div>
    )
  }

  return (
    <div className='relative p-4 md:p-8 bg-gray-100 min-h-screen'>
      <h1 className='text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6 md:mb-8'>
        Fees Structure for Academic Year 2024 - 2025
      </h1>

      {/* Buttons Container */}
      <div className='flex flex-wrap justify-center gap-2 md:gap-4 mb-6 md:mb-8 pointer-events-auto'>
        {campuses.map((campus) => (
          <button
            key={campus.name}
            onClick={() => setActiveCampus(campus.name)}
            className={`relative z-10 px-3 py-2 text-sm md:text-base rounded-md ${
              activeCampus === campus.name
                ? 'bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
            }`}
          >
            {campus.name}
          </button>
        ))}
      </div>

      {/* Fees Section */}
      <div className='campus-fees bg-white p-4 md:p-6 rounded-lg shadow-md relative z-0'>
        {renderFees(campuses.find((campus) => campus.name === activeCampus))}
      </div>
    </div>
  )
}
export default Fees
