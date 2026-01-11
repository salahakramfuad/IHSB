/**
 * Debug utility for announcements
 * Use this to test Firestore queries and see what data is actually in the database
 */

import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'

export async function debugAnnouncements() {
  try {
    const snapshot = await getDocs(collection(db, 'announcements'))
    const allDocs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as any[]
    
    console.log('=== All Announcements in Firestore ===')
    console.log(`Total documents: ${allDocs.length}`)
    allDocs.forEach((doc: any, index) => {
      console.log(`\n[${index + 1}] ID: ${doc.id}`)
      console.log(`  Title: ${doc.title || 'N/A'}`)
      console.log(`  Featured: ${doc.featured}`)
      console.log(`  isActive: ${doc.isActive}`)
      console.log(`  Priority: ${doc.priority || 'N/A'}`)
      console.log(`  CreatedAt: ${doc.createdAt ? (doc.createdAt.seconds ? new Date(doc.createdAt.seconds * 1000).toISOString() : doc.createdAt) : 'N/A'}`)
      console.log(`  ExpiresAt: ${doc.expiresAt ? (doc.expiresAt.seconds ? new Date(doc.expiresAt.seconds * 1000).toISOString() : doc.expiresAt) : 'N/A'}`)
    })
    
    return allDocs
  } catch (error) {
    console.error('Debug error:', error)
    return []
  }
}
