import { NextRequest, NextResponse } from 'next/server'
import { adminAuth, adminDb } from '@/lib/integrations/firebase/admin'
import { verifyAdminToken } from '@/lib/auth/middleware'

const SUPERADMIN_EMAILS = (process.env.SUPERADMIN_EMAILS || '')
  .split(',')
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean)

function isSuperadmin(email?: string | null) {
  if (!email) return false
  return SUPERADMIN_EMAILS.includes(email.toLowerCase())
}

export async function GET(request: NextRequest) {
  try {
    const decoded = await verifyAdminToken(request)
    if (!decoded || !isSuperadmin(decoded.email)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    let fromDb: Array<{
      id: string
      email: string
      role: 'admin' | 'superadmin'
      active: boolean
      displayName: string | null
      createdAt: string | null
      createdByEmail: string | null
    }> = []

    try {
      const snapshot = await adminDb.collection('admins').orderBy('email').get()
      fromDb = snapshot.docs.map((doc) => {
        const data = doc.data() as any
        const rawCreated = data.createdAt
        const createdAt =
          rawCreated?.toDate?.()?.toISOString?.() ??
          (typeof rawCreated === 'string' ? rawCreated : null)
        return {
          id: doc.id,
          email: (data.email || '').toLowerCase(),
          role: data.role === 'superadmin' ? 'superadmin' : 'admin',
          active: data.active !== false,
          displayName: data.displayName || null,
          createdAt,
          createdByEmail: data.createdByEmail || null
        }
      })
    } catch (e) {
      console.error('Firestore admins list error:', e)
    }

    const emailsFromDb = new Set(fromDb.map((a) => a.email))
    const fromEnv: typeof fromDb = SUPERADMIN_EMAILS.filter((e) => !emailsFromDb.has(e)).map(
      (email, i) => ({
        id: `env-${i}-${email.replace(/[^a-z0-9]/gi, '-')}`,
        email,
        role: 'superadmin' as const,
        active: true,
        displayName: null,
        createdAt: null,
        createdByEmail: null
      })
    )

    const admins = [...fromEnv, ...fromDb].sort((a, b) =>
      a.email.localeCompare(b.email, undefined, { sensitivity: 'base' })
    )

    return NextResponse.json({ admins })
  } catch (error: any) {
    console.error('List admins error:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to list admins.' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const decoded = await verifyAdminToken(request)
    if (!decoded || !isSuperadmin(decoded.email)) {
      return NextResponse.json(
        { error: 'Only superadmins can create new admins.' },
        { status: 403 }
      )
    }

    let body: { email?: unknown; password?: unknown; role?: string; displayName?: unknown }
    try {
      const raw = await request.json()
      body = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {}
    } catch {
      return NextResponse.json(
        { error: 'Invalid request body. Send JSON with email and password.' },
        { status: 400 }
      )
    }

    const email = typeof body.email === 'string' ? body.email : ''
    const password = typeof body.password === 'string' ? body.password : ''
    const role = typeof body.role === 'string' ? body.role : 'admin'
    const displayName = typeof body.displayName === 'string' ? body.displayName : undefined

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      )
    }

    const emailTrimmed = email.trim().toLowerCase()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailTrimmed)) {
      return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 })
    }
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long.' },
        { status: 400 }
      )
    }

    // Create Firebase Auth user (same pattern as robonautsclub)
    let userRecord
    try {
      userRecord = await adminAuth.createUser({
        email: emailTrimmed,
        password,
        displayName: typeof displayName === 'string' ? displayName.trim() || undefined : undefined,
        emailVerified: false
      })
    } catch (firebaseError: any) {
      const code = firebaseError?.code || ''
      if (code === 'auth/email-already-exists' || code === 'auth/uid-already-exists') {
        return NextResponse.json(
          { error: 'A user with this email already exists.' },
          { status: 400 }
        )
      }
      if (code === 'auth/invalid-email') {
        return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 })
      }
      if (code === 'auth/weak-password') {
        return NextResponse.json(
          { error: 'Password is too weak. Use at least 6 characters.' },
          { status: 400 }
        )
      }
      console.error('Firebase createUser error:', firebaseError)
      return NextResponse.json(
        { error: firebaseError?.message || 'Failed to create user account.' },
        { status: 500 }
      )
    }

    // Create admins collection document
    const docRef = adminDb.collection('admins').doc(userRecord.uid)
    await docRef.set({
      email: emailTrimmed,
      role: role === 'superadmin' ? 'superadmin' : 'admin',
      active: true,
      displayName: typeof displayName === 'string' ? displayName.trim() || null : null,
      createdAt: new Date().toISOString(),
      createdBy: decoded.uid,
      createdByEmail: decoded.email || null
    })

    return NextResponse.json(
      {
        id: docRef.id,
        email: emailTrimmed,
        role: role === 'superadmin' ? 'superadmin' : 'admin'
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Create admin error:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to create admin.' },
      { status: 500 }
    )
  }
}

