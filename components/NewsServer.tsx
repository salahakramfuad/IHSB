import Image from 'next/image'
import Link from 'next/link'
import { getLatestHighlights } from '@/lib/services/highlightsService'
import type { HighlightItem } from '@/lib/services/highlightsService'
import { Calendar, Image as ImageIcon, Trophy } from 'lucide-react'
import { Timestamp } from 'firebase/firestore'
import ImageWithLightbox from './ImageWithLightbox'

interface NewsServerProps {
  limit?: number
}

/**
 * Server-side component for News & Highlights section
 * Combines sports achievements and news, shows latest 3 items
 */
export default async function NewsServer({ limit = 3 }: NewsServerProps) {
  try {
    const highlights = await getLatestHighlights(limit)

    if (highlights.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <p>No highlights available at this time.</p>
        </div>
      )
    }

    const formatDate = (date: any) => {
      if (!date) return 'Date not available'
      
      try {
        let dateObj: Date
        if (date instanceof Timestamp) {
          dateObj = date.toDate()
        } else if (date && typeof date === 'object' && 'seconds' in date) {
          dateObj = new Date(date.seconds * 1000)
        } else if (date && typeof date === 'object' && 'toDate' in date && typeof date.toDate === 'function') {
          dateObj = date.toDate()
        } else if (typeof date === 'string') {
          dateObj = new Date(date)
          // Check if date is valid
          if (isNaN(dateObj.getTime())) {
            return 'Date not available'
          }
        } else if (date instanceof Date) {
          dateObj = date
        } else {
          return 'Date not available'
        }
        
        // Validate the date object
        if (isNaN(dateObj.getTime())) {
          return 'Date not available'
        }
        
        return dateObj.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        })
      } catch {
        return 'Date not available'
      }
    }

    const getTypeBadge = (type: string, category?: string) => {
      if (type === 'sports') {
        return {
          label: 'Sports',
          className: 'bg-blue-100 text-blue-700 border-blue-200'
        }
      } else if (category === 'sports') {
        return {
          label: 'Sports News',
          className: 'bg-blue-100 text-blue-700 border-blue-200'
        }
      } else if (category === 'news') {
        return {
          label: 'News',
          className: 'bg-green-100 text-green-700 border-green-200'
        }
      } else {
        return {
          label: 'General',
          className: 'bg-gray-100 text-gray-700 border-gray-200'
        }
      }
    }

    const getItemLink = (item: HighlightItem) => {
      if (item.type === 'sports' && item.slug) {
        return `/achievements/sports/${item.slug}`
      } else {
        return `/news/${item.id}`
      }
    }

    // Filter out items without valid images
    const validHighlights = highlights.filter(item => item.image && typeof item.image === 'string' && item.image.trim() !== '')

    if (validHighlights.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <p>No highlights available at this time.</p>
        </div>
      )
    }

    return (
      <div className='grid grid-cols-1 gap-8 sm:grid-cols-3'>
        {validHighlights.map((item, idx) => {
          const badge = getTypeBadge(item.type, item.category)
          
          return (
            <Link
              key={`${item.type}-${item.id}`}
              href={getItemLink(item)}
              className='group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 active:translate-y-0 active:scale-[0.98] flex flex-col focus:outline-none focus:ring-2 focus:ring-primary-green-500 focus:ring-offset-2'
            >
              <div className='relative h-48 w-full overflow-hidden bg-gray-100'>
                <ImageWithLightbox
                  src={item.image}
                  alt={item.title || 'Highlight'}
                  fill
                  className='object-cover group-hover:scale-105 transition-transform duration-300 ease-out'
                  sizes='(max-width: 768px) 100vw, 33vw'
                  gallery={item.type === 'news' && item.photos && item.photos.length > 0 ? item.photos.filter(p => p && typeof p === 'string' && p.trim() !== '') : undefined}
                  lightbox={false}
                />
                <div className='absolute top-3 left-3'>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${badge.className}`}>
                    {item.type === 'sports' && <Trophy className='w-3 h-3 mr-1' />}
                    {badge.label}
                  </span>
                </div>
              </div>
              <div className={`relative -mt-4 -mx-6 mb-4`}>
                <div className={`h-1 bg-gradient-to-r ${
                  idx === 0 ? 'from-accent-blue-500 to-accent-blue-600' :
                  idx === 1 ? 'from-accent-purple-500 to-accent-pink-500' :
                  'from-primary-green-500 to-accent-teal-500'
                } rounded-t-xl`}></div>
              </div>
              <div className='px-6 pb-6 flex-1 flex flex-col'>
                <div className='flex items-center gap-2 mb-2 text-primary-green-600'>
                  <Calendar className='w-3 h-3' />
                  <span className='text-xs font-semibold'>
                    {formatDate(item.date)}
                  </span>
                </div>
                <h3 className='text-lg font-bold text-gray-900 group-hover:text-primary-green-600 transition-colors mb-3 line-clamp-2'>
                  {item.title}
                </h3>
                <p className='text-sm text-gray-700 mb-4 flex-1 line-clamp-3'>
                  {item.description}
                </p>
                <span className='inline-block font-semibold text-primary-green-600 group-hover:text-primary-green-700 transition-colors text-sm'>
                  Read more →
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    )
  } catch (error) {
    console.error('Error in NewsServer:', error)
    return (
      <div className="text-center py-8 text-red-500">
        <p>Error loading highlights. Please try again later.</p>
      </div>
    )
  }
}
