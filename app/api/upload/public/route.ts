import { NextRequest, NextResponse } from 'next/server'
import cloudinary from '@/lib/cloudinary/config'

// Public upload endpoint for admission documents
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'application/pdf']
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, WebP, and PDF are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 5MB limit' },
        { status: 400 }
      )
    }

    // Validate Cloudinary configuration before upload
    const cloudinaryUrl = process.env.CLOUDINARY_URL
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    const isConfigured = (cloudinaryUrl && cloudinaryUrl.includes('cloudinary://')) || 
                        (cloudName && apiKey && apiSecret)

    if (!isConfigured) {
      return NextResponse.json(
        { 
          error: 'Cloudinary is not configured. Please ensure your .env.local contains:\n' +
                 'CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name\n' +
                 'Make sure to replace <your_api_key> and <your_api_secret> with actual values.\n' +
                 'After updating, restart your Next.js dev server.'
        },
        { status: 500 }
      )
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: file.type === 'application/pdf' ? 'raw' : 'image',
          folder: 'ihsb/admissions',
          transformation: file.type !== 'application/pdf' ? [
            { quality: 'auto' },
            { fetch_format: 'auto' }
          ] : undefined
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error)
            reject(error)
          } else {
            resolve(result)
          }
        }
      )
      uploadStream.end(buffer)
    })

    return NextResponse.json({
      success: true,
      url: (uploadResult as any).secure_url,
      publicId: (uploadResult as any).public_id
    })
  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: error.message || 'Upload failed' },
      { status: 500 }
    )
  }
}
