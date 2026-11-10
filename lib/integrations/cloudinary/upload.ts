/**
 * Validated uploads to Cloudinary (server-only).
 */
import cloudinary, { isCloudinaryConfigured } from './config'
import { detectFileType, MAX_UPLOAD_BYTES, type DetectedFileType } from '@/lib/security/fileType'

export type UploadFailure = { ok: false; status: number; error: string }
export type UploadSuccess = { ok: true; url: string; publicId: string; type: DetectedFileType }

interface UploadOptions {
  folder: string
  allowedTypes: readonly DetectedFileType[]
}

const TYPE_LABELS: Record<DetectedFileType, string> = {
  'image/jpeg': 'JPEG',
  'image/png': 'PNG',
  'image/webp': 'WebP',
  'application/pdf': 'PDF'
}

/**
 * Validate (size + real content type via magic bytes) and upload one file.
 * The client-supplied MIME type and file name are ignored.
 */
export async function validateAndUpload(file: unknown, options: UploadOptions): Promise<UploadFailure | UploadSuccess> {
  if (!(file instanceof File)) {
    return { ok: false, status: 400, error: 'No file provided' }
  }
  if (file.size === 0) {
    return { ok: false, status: 400, error: 'File is empty' }
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return { ok: false, status: 413, error: 'File size exceeds 5MB limit' }
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const type = detectFileType(buffer)
  if (!type || !options.allowedTypes.includes(type)) {
    const allowed = options.allowedTypes.map((t) => TYPE_LABELS[t]).join(', ')
    return { ok: false, status: 415, error: `Invalid file type. Allowed: ${allowed}.` }
  }

  if (!isCloudinaryConfigured()) {
    console.error('[upload] Cloudinary is not configured')
    return { ok: false, status: 503, error: 'File upload service is not available. Please try again later.' }
  }

  const isPdf = type === 'application/pdf'
  const result = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: isPdf ? 'raw' : 'image',
        folder: options.folder,
        // Random public id; never derived from the user-supplied file name
        use_filename: false,
        unique_filename: true,
        overwrite: false,
        format: isPdf ? 'pdf' : undefined,
        transformation: isPdf ? undefined : [{ quality: 'auto' }, { fetch_format: 'auto' }]
      },
      (error, uploaded) => {
        if (error || !uploaded) reject(error || new Error('Empty Cloudinary response'))
        else resolve(uploaded)
      }
    )
    stream.end(buffer)
  })

  return { ok: true, url: result.secure_url, publicId: result.public_id, type }
}
