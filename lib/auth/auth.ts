import { 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  updateProfile,
  updatePassword,
  User,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from '../integrations/firebase/config'

function getSignInErrorMessage(error: { code?: string; message?: string } | null): string {
  if (!error) return 'An error occurred during login.'
  const code = error.code || ''
  if (code === 'auth/invalid-credential' || code === 'auth/invalid-email' || code === 'auth/user-not-found' || code === 'auth/wrong-password') {
    return 'User not found or incorrect password.'
  }
  if (code === 'auth/too-many-requests') return 'Too many failed attempts. Please try again later.'
  if (code === 'auth/network-request-failed') return 'Network error. Please check your connection.'
  return error.message || 'An error occurred during login.'
}

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { user: userCredential.user, error: null }
  } catch (error: any) {
    return { user: null, error: getSignInErrorMessage(error) }
  }
}

export const signOut = async () => {
  try {
    await firebaseSignOut(auth)
    return { error: null }
  } catch (error: any) {
    return { error: error.message }
  }
}

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      resolve(user)
    })
  })
}

export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback)
}

export const updateAdminProfile = async (params: { displayName?: string; password?: string }) => {
  const user = auth.currentUser
  if (!user) {
    throw new Error('No authenticated user.')
  }

  const updates: Promise<unknown>[] = []

  if (params.displayName !== undefined) {
    updates.push(updateProfile(user, { displayName: params.displayName }))
  }

  if (params.password) {
    updates.push(updatePassword(user, params.password))
  }

  await Promise.all(updates)
}

