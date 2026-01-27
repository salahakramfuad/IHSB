import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getNewsById } from '@/lib/database/news'
import Section from '@/components/ui/Section'
import { Calendar, ArrowLeft, Image as ImageIcon } from 'lucide-react'
import Button from '@/components/ui/Button'
import ImageWithLightbox from '@/components/shared/ImageWithLightbox'

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const resolvedParams = await Promise.resolve(params)
  const news = await getNewsById(resolvedParams.id)

  if (!news) {
    return (
      <main className='min-h-screen bg-gradient-to-b from-primary-50/50 via-white to-primary-green-50/50 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-900 mb-2'>News Not Found</h1>
          <p className='text-gray-600 mb-4'>The news item you're looking for doesn't exist.</p>
          <Link href='/news'>
            <Button>Back to News</Button>
          </Link>
        </div>
      </main>
    )
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Date not available'
    const date = timestamp instanceof Object && 'seconds' in timestamp
      ? new Date(timestamp.seconds * 1000)
      : typeof timestamp === 'string'
      ? new Date(timestamp)
      : timestamp instanceof Date
      ? timestamp
      : new Date()
    
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
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
    <main className='min-h-screen bg-gradient-to-b from-primary-50/60 via-white to-primary-green-50/50'>
      <Section background='gray' className='py-8'>
        <div className='max-w-4xl mx-auto px-4'>
          <Link 
            href='/news'
            className='inline-flex items-center gap-2 text-primary-green-600 hover:text-primary-green-700 mb-6 transition-colors'
          >
            <ArrowLeft className='w-4 h-4' />
            Back to News
          </Link>
        </div>
      </Section>

      <Section background='gray' className='pb-12'>
        <div className='max-w-4xl mx-auto px-4'>
          <article className='bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg'>
            {/* Image Gallery */}
            {news.photos && news.photos.length > 0 && (
              <div className='relative w-full h-96 md:h-[500px] bg-gray-100'>
                <ImageWithLightbox
                  src={news.photos[0]}
                  alt={news.title}
                  fill
                  className='object-cover cursor-pointer'
                  priority
                  sizes='(max-width: 768px) 100vw, 896px'
                  gallery={news.photos && Array.isArray(news.photos) ? news.photos.filter((p: any) => p && typeof p === 'string' && p.trim() !== '') : undefined}
                />
                {news.photos.length > 1 && (
                  <div className='absolute bottom-4 right-4 bg-black/60 text-white px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 pointer-events-none z-10'>
                    <ImageIcon className='w-4 h-4' />
                    {news.photos.filter((p: any) => p && typeof p === 'string' && p.trim() !== '').length} Photos
                  </div>
                )}
              </div>
            )}

            <div className='p-6 md:p-8'>
              {/* Category and Date */}
              <div className='flex items-center gap-3 mb-4 flex-wrap'>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(news.category)}`}>
                  {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
                </span>
                <div className='flex items-center gap-2 text-primary-green-600'>
                  <Calendar className='w-4 h-4' />
                  <time className='text-sm font-semibold'>
                    {formatDate(news.date)}
                  </time>
                </div>
              </div>

              {/* Title */}
              <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>
                {news.title}
              </h1>

              {/* Description */}
              <div className='prose max-w-none mb-8'>
                <p className='text-gray-700 leading-relaxed text-lg whitespace-pre-wrap'>
                  {news.description}
                </p>
              </div>

              {/* Additional Photos */}
              {news.photos && news.photos.length > 1 && (
                <div className='mt-8 pt-8 border-t border-gray-200'>
                  <h2 className='text-xl font-bold text-gray-900 mb-4'>More Photos</h2>
                  <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                    {news.photos.slice(1).map((photo, index) => {
                      // Calculate actual index in the full gallery (index + 1 because we skipped the first image)
                      const actualIndex = index + 1
                      return (
                        <div key={actualIndex} className='relative aspect-square rounded-lg overflow-hidden bg-gray-100 group/image'>
                          <ImageWithLightbox
                            src={photo}
                            alt={`${news.title} - Photo ${actualIndex + 1}`}
                            fill
                            className='object-cover group-hover/image:scale-110 transition-transform duration-300 cursor-pointer'
                            sizes='(max-width: 768px) 50vw, 33vw'
                            gallery={news.photos && Array.isArray(news.photos) ? news.photos.filter((p: any) => p && typeof p === 'string' && p.trim() !== '') : undefined}
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </article>
        </div>
      </Section>
    </main>
  )
}
