import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  query,
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore'
import { db } from '../firebase/config'

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

// Get all admissions
export const getAllAdmissions = async (): Promise<AdmissionDocument[]> => {
  const q = query(collection(db, 'admissions'), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as AdmissionDocument))
}

// Get admissions by status
export const getAdmissionsByStatus = async (status: string): Promise<AdmissionDocument[]> => {
  const q = query(
    collection(db, 'admissions'),
    where('status', '==', status),
    orderBy('createdAt', 'desc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as AdmissionDocument))
}

// Get single admission
export const getAdmissionById = async (id: string): Promise<AdmissionDocument | null> => {
  const docRef = doc(db, 'admissions', id)
  const docSnap = await getDoc(docRef)
  
  if (!docSnap.exists()) {
    return null
  }
  
  return {
    id: docSnap.id,
    ...docSnap.data()
  } as AdmissionDocument
}

// Create admission
export const createAdmission = async (admissionData: Omit<AdmissionDocument, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  const admissionRef = collection(db, 'admissions')
  const docRef = await addDoc(admissionRef, {
    ...admissionData,
    status: 'pending',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  })
  return docRef.id
}

// Update admission
export const updateAdmission = async (id: string, admissionData: Partial<AdmissionDocument>): Promise<void> => {
  const docRef = doc(db, 'admissions', id)
  await updateDoc(docRef, {
    ...admissionData,
    updatedAt: Timestamp.now()
  })
}
