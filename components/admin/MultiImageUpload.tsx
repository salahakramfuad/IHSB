'use client'

import React, { useState, useRef } from 'react'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

interface MultiImageUploadProps {
  value?: string[]
  onChange: (urls: string[]) => void
  label?: string
  required?: boolean
  maxSizeMB?: number
  maxImages?: number
}

export default function MultiImageUpload({
  value = [],
  onChange,
  label = 'Upload Images',
  required = false,
  maxSizeMB = 5,
  maxImages = 10
}: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    // Check total images limit
    if (value.length + files.length > maxImages) {
      setError(`Maximum ${maxImages} images allowed. You can add ${maxImages - value.length} more.`)
      return
    }

    // Validate all files
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
    for (const file of files) {
      if (!validTypes.includes(file.type)) {
        setError('Invalid file type. Only JPEG, PNG, and WebP are allowed.')
        return
      }
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`File size exceeds ${maxSizeMB}MB limit: ${file.name}`)
        return
      }
    }

    setError('')
    setUploading(true)

    // Upload files one by one
    const newUrls: string[] = []
    for (let i = 0; i < files.length; i++) {
      setUploadingIndex(i)
      const file = files[i]
      
      try {
        const formData = new FormData()
        formData.append('file', file)

        // Get auth token for upload
        const { auth } = await import('@/lib/integrations/firebase/config')
        const user = auth.currentUser
        if (!user) throw new Error('Not authenticated')
        const token = await user.getIdToken()

        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Upload failed')
        }

        newUrls.push(data.url)
      } catch (err: any) {
        setError(err.message || 'Upload failed')
        setUploading(false)
        setUploadingIndex(null)
        return
      }
    }

    onChange([...value, ...newUrls])
    setUploading(false)
    setUploadingIndex(null)

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleRemove = (index: number) => {
    const newUrls = value.filter((_, i) => i !== index)
    onChange(newUrls)
  }

  const handleReorder = (fromIndex: number, toIndex: number) => {
    const newUrls = [...value]
    const [removed] = newUrls.splice(fromIndex, 1)
    newUrls.splice(toIndex, 0, removed)
    onChange(newUrls)
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
        {value.length > 0 && (
          <span className="ml-2 text-gray-500 text-xs">({value.length}/{maxImages})</span>
        )}
      </label>

      {/* Image Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
          {value.map((url, index) => (
            <div key={index} className="relative group">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
                <Image
                  src={url}
                  alt={`Upload ${index + 1}`}
                  fill
                  className="object-cover"
                />
                {index === 0 && (
                  <div className="absolute top-1 left-1 bg-primary-green-600 text-white text-xs px-2 py-1 rounded">
                    Main
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={16} />
              </button>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleReorder(index, 0)}
                  className="absolute bottom-1 left-1 px-2 py-1 bg-primary-green-600 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Set Main
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      {value.length < maxImages && (
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            uploading
              ? 'border-primary-green-400 bg-primary-green-50'
              : 'border-gray-300 hover:border-primary-green-400 hover:bg-gray-50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/jpg,image/webp"
            onChange={handleFileSelect}
            className="hidden"
            disabled={uploading}
          />
          
          {uploading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="w-8 h-8 text-primary-green-600 animate-spin mb-2" />
              <p className="text-sm text-gray-600">
                Uploading {uploadingIndex !== null ? `${uploadingIndex + 1}` : ''}...
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-1">
                Click to upload images
              </p>
              <p className="text-xs text-gray-500">
                JPEG, PNG, WebP (max {maxSizeMB}MB each)
              </p>
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
