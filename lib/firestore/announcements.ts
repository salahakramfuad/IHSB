import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore'
import { db } from '../firebase/config'

export interface AnnouncementDocument {
  id?: string
  title: string
  content: string
  image?: string
  priority: 'low' | 'medium' | 'high'
  featured: boolean
  isActive: boolean
  expiresAt?: Timestamp | string
  createdAt?: Timestamp
  updatedAt?: Timestamp
  createdBy?: string
  createdByEmail?: string
  updatedBy?: string
  updatedByEmail?: string
}

// Get all announcements (uses client SDK - for admin dashboard client components)
export const getAllAnnouncements = async (): Promise<AnnouncementDocument[]> => {
  try {
    let snapshot
    try {
      const q = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'))
      snapshot = await getDocs(q)
    } catch (orderError: any) {
      // If orderBy fails (e.g., createdAt missing or index needed), fetch all without ordering
      snapshot = await getDocs(collection(db, 'announcements'))
    }
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as AnnouncementDocument))
  } catch (error: any) {
    console.error('Error fetching all announcements:', error?.message || error)
    return []
  }
}


// Get active announcements (isActive=true and not expired)
// Uses client SDK (same pattern as events.ts) - works for server-side rendering
export const getActiveAnnouncements = async (): Promise<AnnouncementDocument[]> => {
  try {
    const now = Timestamp.now()
    
    // Fetch all announcements (same approach as events.ts)
    let snapshot
    try {
      const q = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'))
      snapshot = await getDocs(q)
    } catch (orderError: any) {
      // If orderBy fails (missing index or createdAt), fetch all without ordering
      snapshot = await getDocs(collection(db, 'announcements'))
    }
    
    const allAnnouncements = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as AnnouncementDocument))
    
    // Very lenient filtering - only exclude explicitly inactive or expired
    const activeAnnouncements = allAnnouncements.filter(announcement => {
      // Only exclude if explicitly set to inactive
      if (announcement.isActive === false) {
        return false
      }
      
      // Check expiration (only if expiresAt exists and is valid)
      if (announcement.expiresAt) {
        try {
          let expiresAt: Timestamp | null = null
          if (announcement.expiresAt instanceof Timestamp) {
            expiresAt = announcement.expiresAt
          } else if (typeof announcement.expiresAt === 'object' && announcement.expiresAt && 'seconds' in announcement.expiresAt) {
            expiresAt = Timestamp.fromMillis((announcement.expiresAt as any).seconds * 1000)
          } else if (typeof announcement.expiresAt === 'string') {
            expiresAt = Timestamp.fromDate(new Date(announcement.expiresAt))
          }
          
          if (expiresAt && expiresAt <= now) {
            return false
          }
        } catch (e) {
          // Invalid expiration format - include the announcement
        }
      }
      
      return true
    })
    
    // Sort by date (newest first) - primary sort
    return activeAnnouncements.sort((a, b) => {
      const getDateValue = (ts: any): number => {
        if (!ts) return 0
        if (ts instanceof Timestamp) return ts.toMillis()
        if (ts.seconds) return ts.seconds * 1000 + (ts.nanoseconds || 0) / 1000000
        if (ts.toDate) return ts.toDate().getTime()
        return new Date(ts).getTime()
      }
      
      // Primary sort: by date (newest first)
      const dateDiff = getDateValue(b.createdAt) - getDateValue(a.createdAt)
      if (dateDiff !== 0) return dateDiff
      
      // Secondary sort: by priority (if dates are the same)
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      const aPriority = (a.priority || 'medium') as keyof typeof priorityOrder
      const bPriority = (b.priority || 'medium') as keyof typeof priorityOrder
      return (priorityOrder[bPriority] || 2) - (priorityOrder[aPriority] || 2)
    })
  } catch (error: any) {
    console.error('Error fetching active announcements:', error?.message || error)
    return []
  }
}

// Get featured announcements (all active announcements, sorted by date, limited)
// Uses client SDK (same pattern as events.ts)
// Note: All active announcements are treated as "featured" - this just limits the count
export const getFeaturedAnnouncements = async (limit: number = 3): Promise<AnnouncementDocument[]> => {
  try {
    // Simply get active announcements and return the first 'limit' items
    const activeAnnouncements = await getActiveAnnouncements()
    return activeAnnouncements.slice(0, limit)
  } catch (error: any) {
    console.error('Error fetching featured announcements:', error?.message || error)
    return []
  }
}

// Get single announcement
export const getAnnouncementById = async (id: string): Promise<AnnouncementDocument | null> => {
  const docRef = doc(db, 'announcements', id)
  const docSnap = await getDoc(docRef)
  
  if (!docSnap.exists()) {
    return null
  }
  
  return {
    id: docSnap.id,
    ...docSnap.data()
  } as AnnouncementDocument
}

// Create announcement
export const createAnnouncement = async (announcementData: Omit<AnnouncementDocument, 'id' | 'createdAt' | 'updatedAt'>, creatorEmail?: string): Promise<string> => {
  const announcementRef = collection(db, 'announcements')
  const { expiresAt, ...restData } = announcementData
  const data: any = {
    ...restData,
    isActive: announcementData.isActive !== undefined ? announcementData.isActive : true,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    createdByEmail: creatorEmail || null,
    createdBy: creatorEmail || null
  }
  
  // Only include expiresAt if it has a value (not undefined or null)
  if (expiresAt !== undefined && expiresAt !== null) {
    data.expiresAt = typeof expiresAt === 'string'
      ? Timestamp.fromDate(new Date(expiresAt))
      : expiresAt
  }
  
  const docRef = await addDoc(announcementRef, data)
  return docRef.id
}

// Update announcement
export const updateAnnouncement = async (id: string, announcementData: Partial<AnnouncementDocument>, updaterEmail?: string): Promise<void> => {
  const docRef = doc(db, 'announcements', id)
  const { expiresAt, ...restData } = announcementData
  const updateData: any = {
    ...restData,
    updatedAt: Timestamp.now()
  }
  
  // Only include expiresAt if it has a value (not undefined)
  // If it's explicitly set to null, include it to clear the field
  if (expiresAt !== undefined) {
    if (expiresAt === null) {
      updateData.expiresAt = null
    } else {
      updateData.expiresAt = typeof expiresAt === 'string'
        ? Timestamp.fromDate(new Date(expiresAt))
        : expiresAt
    }
  }
  
  if (updaterEmail) {
    updateData.updatedByEmail = updaterEmail
    updateData.updatedBy = updaterEmail
  }
  
  // Remove id if present
  delete updateData.id
  
  // Remove any undefined values
  Object.keys(updateData).forEach(key => {
    if (updateData[key] === undefined) {
      delete updateData[key]
    }
  })
  
  await updateDoc(docRef, updateData)
}

// Delete announcement
export const deleteAnnouncement = async (id: string): Promise<void> => {
  const docRef = doc(db, 'announcements', id)
  await deleteDoc(docRef)
}
