// Fee schedule by campus (Academic Year 2024 - 2025).

export const campuses = [
  {
    name: 'Uttara Preschool & Primary Section'
  },
  {
    name: 'Gulshan Preschool, Primary, Middle Section'
  },
  {
    name: 'Uttara Senior Section'
  },
  {
    name: 'Chattogram Branch'
  }
]

export const feesData = {
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

export const notesData = {
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
