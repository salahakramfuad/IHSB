import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth/middleware'
import { getAllFeaturedAlumni, getFeaturedAlumni, getFeaturedAlumniByYear, createFeaturedAlumni } from '@/lib/firestore/alumni'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    const year = searchParams.get('year')
    const featured = searchParams.get('featured')

    let alumni

    if (year) {
      alumni = await getFeaturedAlumniByYear(year)
    } else if (limit) {
      alumni = await getFeaturedAlumni(parseInt(limit, 10))
    } else {
      alumni = await getAllFeaturedAlumni()
    }

    // Filter by featured if specified
    if (featured === 'true') {
      alumni = alumni.filter(a => a.featured === true)
    }

    return NextResponse.json({ alumni })
  } catch (error: any) {
    console.error('Error fetching featured alumni:', error)
    return NextResponse.json(
      { error: 'Failed to fetch featured alumni' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const decodedToken = await verifyAdminToken(request)
    if (!decodedToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const alumniData = {
      name: body.name,
      description: body.description,
      achievement: body.achievement,
      graduationYear: body.graduationYear,
      imageUrl: body.imageUrl,
      email: body.email,
      linkedin: body.linkedin,
      company: body.company,
      location: body.location,
      featured: body.featured || false
    }

    const creatorEmail = decodedToken.email || decodedToken.uid || 'unknown'
    const id = await createFeaturedAlumni(alumniData, creatorEmail)
    return NextResponse.json({ id, ...alumniData })
  } catch (error: any) {
    console.error('Error creating featured alumni:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create featured alumni' },
      { status: 500 }
    )
  }
}
