import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getAllNewsService } from '@/lib/services/newsService'
import Section from '@/components/ui/Section'
import { Calendar, Image as ImageIcon } from 'lucide-react'
import ImageWithLightbox from '@/components/ImageWithLightbox'

export default async function NewsPage() {
  const news = await getAllNewsService()

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Date not available'
    const date = timestamp instanceof Object && 'seconds' in timestamp
      ? new Date(timestamp.seconds * 1000)
      : typeof timestamp === 'string'
      ? new Date(timestamp)
      : timestamp instanceof Date
      ? timestamp
      : new Date()
    
    return {
      full: date.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      short: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'sports':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'news':
        return 'bg-green-100 text-green-700 border-green-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <main className='min-h-screen bg-gradient-to-b from-gray-50 to-white'>
      <Section background='green' className='bg-gradient-to-br from-primary-green-600 to-primary-green-700'>
        <div className='max-w-4xl mx-auto text-center text-white'>
          <h1 className='text-4xl md:text-5xl font-bold mb-4'>
            News & Highlights
          </h1>
          <p className='text-lg md:text-xl text-primary-green-50'>
            Latest updates and stories from IHSB
          </p>
        </div>
      </Section>

      <Section background='gray' className='py-12'>
        <div className='max-w-6xl mx-auto px-4'>
          {news.length === 0 ? (
            <div className='text-center py-16'>
              <div className='inline-flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mb-4'>
                <ImageIcon className='w-8 h-8 text-gray-400' />
              </div>
              <p className='text-gray-600 text-lg font-medium'>
                No news available at this time.
              </p>
              <p className='text-gray-500 text-sm mt-2'>
                Please check back later for updates.
              </p>
            </div>
          ) : (
            <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
              {news.map((item) => {
                const dateInfo = formatDate(item.date)
                const mainImage = item.photos && item.photos.length > 0 ? item.photos[0] : null
                
                return (
                  <Link
                    key={item.id}
                    href={`/news/${item.id}`}
                    className='group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-primary-green-300 active:scale-[0.98] flex flex-col focus:outline-none focus:ring-2 focus:ring-primary-green-500 focus:ring-offset-2'
                  >
                    {/* Image Gallery */}
                    {mainImage && mainImage.trim() !== '' && (
                      <div className='relative h-64 w-full overflow-hidden bg-gray-100'>
                        <ImageWithLightbox
                          src={mainImage}
                          alt={item.title}
                          fill
                          className='object-cover group-hover:scale-110 transition-transform duration-500 ease-out'
                          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                          gallery={item.photos && Array.isArray(item.photos) && item.photos.length > 0 ? item.photos.filter(p => p && typeof p === 'string' && p.trim() !== '') : undefined}
                          lightbox={false}
                        />
                        {item.photos && Array.isArray(item.photos) && item.photos.length > 1 && (
                          <div className='absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1'>
                            <ImageIcon className='w-3 h-3' />
                            {item.photos.filter(p => p && typeof p === 'string' && p.trim() !== '').length}
                          </div>
                        )}
                        {/* Category Badge */}
                        <div className='absolute top-3 left-3'>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(item.category)}`}>
                            {item.category ? item.category.charAt(0).toUpperCase() + item.category.slice(1) : 'General'}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className='flex-1 p-6 flex flex-col'>
                      {/* Date */}
                      <div className='flex items-center gap-2 mb-3 text-primary-green-600'>
                        <Calendar className='w-4 h-4' />
                        <time className='text-sm font-semibold' dateTime={item.date instanceof Date ? item.date.toISOString() : typeof item.date === 'string' ? item.date : ''}>
                          {dateInfo.short}
                        </time>
                      </div>

                      {/* Title */}
                      <h2 className='text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-green-600 transition-colors line-clamp-2'>
                        {item.title}
                      </h2>

                      {/* Description */}
                      <p className='text-gray-700 leading-relaxed mb-4 flex-1 line-clamp-4'>
                        {item.description}
                      </p>

                      {/* View Details Link */}
                      <span className='inline-flex items-center text-sm font-semibold text-primary-green-600 group-hover:text-primary-green-700 transition-colors mt-auto'>
                        Read more →
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </Section>
    </main>
  )
}
