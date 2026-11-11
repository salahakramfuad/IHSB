import { 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  updateProfile,
  updatePassword,
  User,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from '../integrations/firebase/config'
import { DEV_LOGIN, devSignIn, devSignOut, getDevUser, onDevAuthChange, updateDevDisplayName } from './devSession'

function getSignInErrorMessage(error: { code?: string; message?: string } | null): string {
  if (!error) return 'An error occurred during login.'
  const code = error.code || ''
  if (code === 'auth/invalid-credential' || code === 'auth/invalid-email' || code === 'auth/user-not-found' || code === 'auth/wrong-password') {
    return 'User not found or incorrect password.'
  }
  if (code === 'auth/too-many-requests') return 'Too many failed attempts. Please try again later.'
  if (code === 'auth/network-request-failed') return 'Network error. Please check your connection.'
  return 'An error occurred during login.'
}

export const signIn = async (email: string, password: string) => {
  if (DEV_LOGIN) return devSignIn(email, password)
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { user: userCredential.user, error: null }
  } catch (error: any) {
    return { user: null, error: getSignInErrorMessage(error) }
  }
}

export const signOut = async () => {
  if (DEV_LOGIN) {
    devSignOut()
    return { error: null }
  }
  try {
    await firebaseSignOut(auth)
    return { error: null }
  } catch (error) {
    console.error('Sign out failed:', error)
    return { error: 'Failed to sign out.' }
  }
}

export const getCurrentUser = (): Promise<User | null> => {
  if (DEV_LOGIN) return Promise.resolve(getDevUser())
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      resolve(user)
    })
  })
}

export const onAuthChange = (callback: (user: User | null) => void) => {
  if (DEV_LOGIN) return onDevAuthChange(callback)
  return onAuthStateChanged(auth, callback)
}

export const updateAdminProfile = async (params: { displayName?: string; password?: string }) => {
  if (DEV_LOGIN) {
    if (params.password) throw new Error('The local login password is set by DEV_ADMIN_PASSWORD in .env.local.')
    if (params.displayName !== undefined) updateDevDisplayName(params.displayName)
    return
  }
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

