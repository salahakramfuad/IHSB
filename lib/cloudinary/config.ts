import { v2 as cloudinary } from 'cloudinary'

// Cloudinary configuration
// Supports both CLOUDINARY_URL and individual environment variables
// CLOUDINARY_URL format: cloudinary://api_key:api_secret@cloud_name
// Example: cloudinary://123456789012345:abcdefghijklmnopqrstuvwxyz@dvxxa4sho

const cloudinaryUrl = process.env.CLOUDINARY_URL
const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const apiKey = process.env.CLOUDINARY_API_KEY || process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
const apiSecret = process.env.CLOUDINARY_API_SECRET

// Parse and configure Cloudinary
let isConfigured = false

if (cloudinaryUrl) {
  // Check if URL contains placeholders (should not contain < >)
  if (cloudinaryUrl.includes('<') || cloudinaryUrl.includes('>')) {
    console.error('❌ Cloudinary configuration error: CLOUDINARY_URL contains placeholders')
    console.error('   Please replace <your_api_key> and <your_api_secret> with actual values')
    console.error('   Format: CLOUDINARY_URL=cloudinary://actual_api_key:actual_api_secret@cloud_name')
  } else if (cloudinaryUrl.startsWith('cloudinary://')) {
    // Parse CLOUDINARY_URL format: cloudinary://api_key:api_secret@cloud_name
    const urlMatch = cloudinaryUrl.match(/cloudinary:\/\/([^:]+):([^@]+)@(.+)/)
    if (urlMatch && urlMatch[1] && urlMatch[2] && urlMatch[3]) {
      const parsedApiKey = urlMatch[1].trim()
      const parsedApiSecret = urlMatch[2].trim()
      const parsedCloudName = urlMatch[3].trim()
      
      // Validate values are not placeholders or empty
      if (parsedApiKey && parsedApiSecret && parsedCloudName &&
          parsedApiKey !== 'your_api_key' && 
          parsedApiSecret !== 'your_api_secret' &&
          !parsedApiKey.includes('<') && !parsedApiSecret.includes('<')) {
        cloudinary.config({
          cloud_name: parsedCloudName,
          api_key: parsedApiKey,
          api_secret: parsedApiSecret
        })
        isConfigured = true
        
        if (process.env.NODE_ENV === 'development') {
          console.log('✅ Cloudinary configured successfully')
        }
      } else {
        console.error('❌ Cloudinary configuration error: Invalid or placeholder values')
        console.error('   Make sure CLOUDINARY_URL contains actual API credentials, not placeholders')
      }
    } else {
      console.error('❌ Invalid CLOUDINARY_URL format')
      console.error('   Expected: cloudinary://api_key:api_secret@cloud_name')
      // Hide secret in error message
      const safeUrl = cloudinaryUrl.replace(/:([^:@]+)@/, ':****@')
      console.error('   Got:', safeUrl)
    }
  }
}

if (!isConfigured && cloudName && apiKey && apiSecret) {
  // Use individual environment variables
  cloudinary.config({
    cloud_name: cloudName.trim(),
    api_key: apiKey.trim(),
    api_secret: apiSecret.trim()
  })
  isConfigured = true
}

if (!isConfigured && process.env.NODE_ENV === 'development') {
  console.warn('⚠️  Cloudinary not configured properly')
  console.warn('   Set in .env.local: CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name')
  console.warn('   Make sure to replace <your_api_key> and <your_api_secret> with actual values!')
  console.warn('   Then restart your dev server: npm run dev')
}

export default cloudinary
