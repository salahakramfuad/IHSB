/**
 * Detect the real file type from its leading "magic" bytes.
 * The browser-supplied MIME type and file extension are attacker-controlled
 * and must never be trusted.
 */
export type DetectedFileType = 'image/jpeg' | 'image/png' | 'image/webp' | 'application/pdf'

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024 // 5MB

const startsWith = (bytes: Uint8Array, signature: number[], offset = 0) =>
  bytes.length >= offset + signature.length && signature.every((byte, i) => bytes[offset + i] === byte)

export function detectFileType(bytes: Uint8Array): DetectedFileType | null {
  // JPEG: FF D8 FF
  if (startsWith(bytes, [0xff, 0xd8, 0xff])) return 'image/jpeg'
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return 'image/png'
  // WebP: "RIFF" .... "WEBP"
  if (startsWith(bytes, [0x52, 0x49, 0x46, 0x46]) && startsWith(bytes, [0x57, 0x45, 0x42, 0x50], 8)) {
    return 'image/webp'
  }
  // PDF: "%PDF-"
  if (startsWith(bytes, [0x25, 0x50, 0x44, 0x46, 0x2d])) return 'application/pdf'
  return null
}
