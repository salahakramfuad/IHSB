import { Timestamp } from 'firebase-admin/firestore'
import { adminDb } from '../integrations/firebase/admin'
import { cleanForWrite, withId } from './shared'

export interface AdmissionDocument {
  id?: string
  branch: string
  academicYear: string
  applicationNumber: string
  
  // Student Information
  surname: string
  studentName: string
  dateOfBirth: string
  gender: string
  nationality: string
  classAppliedFor: string
  
  // Address Information
  presentAddress: string
  permanentAddress: string
  
  // Parent Information
  fatherName: string
  fatherContact: string
  fatherEmail?: string
  motherName?: string
  motherContact?: string
  motherEmail?: string
  
  // Additional Information
  onMedication: boolean
  medicationName?: string
  
  // Documents
  studentPhoto?: string
  birthCertificateImage?: string
  lastYearReportCardImage?: string
  passportImage?: string
  visitingCardImage?: string
  
  // Payment
  paymentReference: string
  
  // Status
  status: 'pending' | 'approved' | 'rejected'
  notes?: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

const admissions = () => adminDb.collection('admissions')

// Get all admissions
export const getAllAdmissions = async (): Promise<AdmissionDocument[]> => {
  const snapshot = await admissions().orderBy('createdAt', 'desc').get()
  return snapshot.docs.map((doc) => withId<AdmissionDocument>(doc))
}

// Get admissions by status
export const getAdmissionsByStatus = async (status: string): Promise<AdmissionDocument[]> => {
  const all = await getAllAdmissions()
  return all.filter((admission) => admission.status === status)
}

// Get single admission
export const getAdmissionById = async (id: string): Promise<AdmissionDocument | null> => {
  const snap = await admissions().doc(id).get()
  return snap.exists ? withId<AdmissionDocument>(snap) : null
}

// Create admission (always starts as "pending")
export const createAdmission = async (
  admissionData: Omit<AdmissionDocument, 'id' | 'createdAt' | 'updatedAt' | 'status'> & {
    status?: AdmissionDocument['status']
  }
): Promise<string> => {
  const docRef = await admissions().add(
    cleanForWrite({
      ...admissionData,
      status: 'pending',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    })
  )
  return docRef.id
}

// Update admission
export const updateAdmission = async (id: string, admissionData: Partial<AdmissionDocument>): Promise<void> => {
  await admissions().doc(id).update(
    cleanForWrite({
      ...admissionData,
      updatedAt: Timestamp.now()
    })
  )
}
