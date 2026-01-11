import React from 'react'
import Image from 'next/image'
import { getActiveAnnouncementsService } from '@/lib/services/announcementsService'
import Section from '@/components/ui/Section'
import { Calendar, Clock } from 'lucide-react'
import ImageWithLightbox from '@/components/ImageWithLightbox'

export default async function AnnouncementsPage() {
  const announcements = await getActiveAnnouncementsService()

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

  return (
    <main className='min-h-screen bg-gradient-to-b from-gray-50 to-white'>
      <Section background='green' className='bg-gradient-to-br from-primary-green-600 to-primary-green-700'>
        <div className='max-w-4xl mx-auto text-center text-white'>
          <h1 className='text-4xl md:text-5xl font-bold mb-4'>
            Announcements
          </h1>
          <p className='text-lg md:text-xl text-primary-green-50'>
            Stay updated with the latest news and updates from IHSB
          </p>
        </div>
      </Section>

      <Section background='gray' className='py-12'>
        <div className='max-w-5xl mx-auto px-4'>
          {announcements.length === 0 ? (
            <div className='text-center py-16'>
              <div className='inline-flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mb-4'>
                <Calendar className='w-8 h-8 text-gray-400' />
              </div>
              <p className='text-gray-600 text-lg font-medium'>
                No announcements available at this time.
              </p>
              <p className='text-gray-500 text-sm mt-2'>
                Please check back later for updates.
              </p>
            </div>
          ) : (
            <div className='space-y-8'>
              {announcements.map((announcement, index) => {
                const dateInfo = formatDate(announcement.createdAt)
                return (
                  <article
                    key={announcement.id}
                    className='group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-primary-green-300'
                  >
                    <div className='md:flex'>
                      {announcement.image && (
                        <div className='relative h-64 md:h-auto md:w-80 flex-shrink-0'>
                          <ImageWithLightbox
                            src={announcement.image}
                            alt={announcement.title}
                            fill
                            className='object-cover group-hover:scale-105 transition-transform duration-300'
                            sizes='(max-width: 768px) 100vw, 320px'
                          />
                        </div>
                      )}
                      <div className='flex-1 p-6 md:p-8'>
                        {/* Date and Priority Badge */}
                        <div className='flex items-center gap-3 mb-4 flex-wrap'>
                          <div className='flex items-center gap-2 text-primary-green-600'>
                            <Calendar className='w-4 h-4' />
                            <time className='text-sm font-semibold' dateTime={announcement.createdAt?.seconds ? new Date(announcement.createdAt.seconds * 1000).toISOString() : ''}>
                              {typeof dateInfo === 'object' ? dateInfo.full : dateInfo}
                            </time>
                          </div>
                          <div className='flex items-center gap-1 text-gray-500 text-xs'>
                            <Clock className='w-3 h-3' />
                            <span>{typeof dateInfo === 'object' ? dateInfo.time : ''}</span>
                          </div>
                          {announcement.priority === 'high' && (
                            <span className='inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded-full text-xs font-semibold'>
                              <span className='w-2 h-2 bg-red-500 rounded-full animate-pulse'></span>
                              High Priority
                            </span>
                          )}
                          {announcement.priority === 'medium' && (
                            <span className='inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-full text-xs font-semibold'>
                              Medium Priority
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-primary-green-600 transition-colors'>
                          {announcement.title}
                        </h2>

                        {/* Content */}
                        <div className='prose max-w-none'>
                          <p className='text-gray-700 leading-relaxed whitespace-pre-wrap text-base'>
                            {announcement.content}
                          </p>
                        </div>

                        {/* Divider */}
                        {index < announcements.length - 1 && (
                          <div className='mt-6 pt-6 border-t border-gray-100'></div>
                        )}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </Section>
    </main>
  )
}
