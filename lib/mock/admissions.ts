/**
 * Mock admission applications. Admin view only: never exposed on public pages.
 * All people and contact details are fictional.
 */
import type { AdmissionDocument } from '@/lib/database/admissions'
import { filler } from './filler.generated'
import { daysFromNow, ts, yearFromNow } from './helpers'

interface Seed {
  surname: string
  studentName: string
  gender: 'Male' | 'Female'
  nationality: string
  classAppliedFor: string
  branch: string
  fatherName: string
  motherName: string
  status: AdmissionDocument['status']
  daysAgo: number
  notes?: string
  medicationName?: string
}

const seeds: Seed[] = [
  { surname: 'Rahman', studentName: 'Ayaan Rahman', gender: 'Male', nationality: 'Bangladeshi', classAppliedFor: 'Grade 6', branch: 'Uttara Senior Section', fatherName: 'Mizanur Rahman', motherName: 'Shirin Akter', status: 'pending', daysAgo: 1 },
  { surname: 'Chowdhury', studentName: 'Inaya Chowdhury', gender: 'Female', nationality: 'Bangladeshi', classAppliedFor: 'KG 1', branch: 'Gulshan Preschool', fatherName: 'Tanvir Chowdhury', motherName: 'Rumana Chowdhury', status: 'pending', daysAgo: 3 },
  { surname: 'Demir', studentName: 'Kerem Demir', gender: 'Male', nationality: 'Turkish', classAppliedFor: 'Grade 9', branch: 'Uttara Senior Section', fatherName: 'Hakan Demir', motherName: 'Zeynep Demir', status: 'approved', daysAgo: 9, notes: 'Assessment passed. Offer letter sent.' },
  { surname: 'Hossain', studentName: 'Mehreen Hossain', gender: 'Female', nationality: 'Bangladeshi', classAppliedFor: 'Grade 3', branch: 'Gulshan Primary & Middle Section', fatherName: 'Kamal Hossain', motherName: 'Farzana Hossain', status: 'approved', daysAgo: 14, notes: 'Sibling already enrolled in Grade 5.' },
  { surname: 'Sharma', studentName: 'Vihaan Sharma', gender: 'Male', nationality: 'Indian', classAppliedFor: 'Grade 7', branch: 'Uttara Senior Section', fatherName: 'Rajesh Sharma', motherName: 'Priya Sharma', status: 'pending', daysAgo: 6 },
  { surname: 'Islam', studentName: 'Zunairah Islam', gender: 'Female', nationality: 'Bangladeshi', classAppliedFor: 'Playgroup', branch: 'Uttara Preschool & Primary Section', fatherName: 'Shafiqul Islam', motherName: 'Nasrin Sultana', status: 'pending', daysAgo: 2, medicationName: 'Salbutamol inhaler (as needed)' },
  { surname: 'Park', studentName: 'Ji-ho Park', gender: 'Male', nationality: 'South Korean', classAppliedFor: 'Grade 10', branch: 'Uttara Senior Section', fatherName: 'Min-jun Park', motherName: 'Seo-yeon Kim', status: 'rejected', daysAgo: 21, notes: 'No seats available in Grade 10 this session. Added to the waiting list.' },
  { surname: 'Ahmed', studentName: 'Rayan Ahmed', gender: 'Male', nationality: 'Bangladeshi', classAppliedFor: 'Grade 1', branch: 'Chattogram Branch', fatherName: 'Imtiaz Ahmed', motherName: 'Sabrina Ahmed', status: 'approved', daysAgo: 28 },
  { surname: 'Karim', studentName: 'Alisha Karim', gender: 'Female', nationality: 'Bangladeshi', classAppliedFor: 'Grade 11 (AS Level)', branch: 'Uttara Senior Section', fatherName: 'Rezaul Karim', motherName: 'Dilruba Karim', status: 'pending', daysAgo: 4, notes: 'Scholarship applicant. Awaiting IGCSE statement of results.' },
  { surname: 'Okafor', studentName: 'Chidi Okafor', gender: 'Male', nationality: 'Nigerian', classAppliedFor: 'Grade 5', branch: 'Gulshan Primary & Middle Section', fatherName: 'Emeka Okafor', motherName: 'Ngozi Okafor', status: 'approved', daysAgo: 35 },
  { surname: 'Sarker', studentName: 'Anika Sarker', gender: 'Female', nationality: 'Bangladeshi', classAppliedFor: 'Grade 8', branch: 'Uttara Senior Section', fatherName: 'Dipak Sarker', motherName: 'Moushumi Sarker', status: 'rejected', daysAgo: 42, notes: 'Incomplete documents after two reminders.' },
  { surname: 'Yildiz', studentName: 'Defne Yildiz', gender: 'Female', nationality: 'Turkish', classAppliedFor: 'KG 2', branch: 'Gulshan Preschool', fatherName: 'Murat Yildiz', motherName: 'Elif Yildiz', status: 'pending', daysAgo: 8 }
]

const emailFor = (name: string) => `${name.toLowerCase().replace(/[^a-z]+/g, '.')}@example.com`

export const mockAdmissions: AdmissionDocument[] = seeds.map((seed, index) => {
  const created = daysFromNow(-seed.daysAgo, 2, filler.minuteOffsets[index])
  const address = filler.addresses[index]
  return {
    id: `mock-admission-${String(index + 1).padStart(2, '0')}`,
    branch: seed.branch,
    academicYear: `${yearFromNow(0)}-${yearFromNow(1)}`,
    applicationNumber: `APP-${yearFromNow(0)}-${filler.applicationCodes[index]}`,
    surname: seed.surname,
    studentName: seed.studentName,
    dateOfBirth: filler.birthDates[index],
    gender: seed.gender,
    nationality: seed.nationality,
    classAppliedFor: seed.classAppliedFor,
    presentAddress: address,
    permanentAddress: address,
    fatherName: seed.fatherName,
    fatherContact: filler.phones[index],
    fatherEmail: emailFor(seed.fatherName),
    motherName: seed.motherName,
    motherContact: filler.phones[index + 12],
    motherEmail: emailFor(seed.motherName),
    onMedication: Boolean(seed.medicationName),
    ...(seed.medicationName ? { medicationName: seed.medicationName } : {}),
    paymentReference: filler.paymentReferences[index],
    status: seed.status,
    ...(seed.notes ? { notes: seed.notes } : {}),
    createdAt: ts(created),
    updatedAt: ts(created)
  }
})
