import React from 'react'
import Image from 'next/image'
import { getActiveAnnouncementsService } from '@/lib/services/announcementsService'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import { Calendar, Clock, Bell, AlertCircle } from 'lucide-react'
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

  // Separate featured and regular announcements
  const featuredAnnouncements = announcements.filter(a => a.featured || a.priority === 'high')
  const regularAnnouncements = announcements.filter(a => !a.featured && a.priority !== 'high')

  return (
    <main className='min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50'>
      {/* Enhanced Hero Section */}
      <Section background='green' className='bg-gradient-to-br from-primary-green-600 via-primary-green-700 to-accent-blue-700 relative overflow-hidden'>
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl'></div>
          <div className='absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl'></div>
        </div>
        <div className='max-w-4xl mx-auto text-center text-white relative z-10'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl mb-6'>
            <Bell className='w-8 h-8 text-white' />
          </div>
          <h1 className='text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6'>
            Announcements
          </h1>
          <p className='text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed'>
            Stay updated with the latest news, updates, and important information from International Hope School Bangladesh
          </p>
        </div>
      </Section>

      <Section background='gray' className='py-16'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          {announcements.length === 0 ? (
            <Card className='text-center py-16 border-2 border-dashed border-gray-300 bg-white'>
              <div className='inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-2xl mb-6'>
                <Calendar className='w-10 h-10 text-gray-400' />
              </div>
              <h3 className='text-2xl font-bold text-gray-900 mb-3'>
                No Announcements Available
              </h3>
              <p className='text-gray-600 text-lg mb-2'>
                There are no announcements at this time.
              </p>
              <p className='text-gray-500 text-sm'>
                Please check back later for updates.
              </p>
            </Card>
          ) : (
            <div className='space-y-12'>
              {/* Featured Announcements Section */}
              {featuredAnnouncements.length > 0 && (
                <div>
                  <div className='flex items-center gap-3 mb-8'>
                    <div className='w-1 h-8 bg-gradient-to-b from-primary-green-500 to-accent-blue-500 rounded-full'></div>
                    <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>
                      Featured Announcements
                    </h2>
                  </div>
                  <div className='space-y-6'>
                    {featuredAnnouncements.map((announcement) => {
                      const dateInfo = formatDate(announcement.createdAt)
                      return (
                        <Card
                          key={announcement.id}
                          className='group border-2 border-primary-green-200 bg-gradient-to-br from-white to-primary-green-50/30 hover:shadow-2xl transition-all duration-300 hover:border-primary-green-400 overflow-hidden'
                        >
                          <div className='h-2 bg-gradient-to-r from-primary-green-500 via-accent-blue-500 to-primary-green-500 -mx-6 -mt-6 mb-6'></div>
                          <div className='md:flex gap-6'>
                            {announcement.image && (
                              <div className='relative h-64 md:h-80 md:w-96 flex-shrink-0 rounded-xl overflow-hidden border-2 border-gray-200'>
                                <ImageWithLightbox
                                  src={announcement.image}
                                  alt={announcement.title}
                                  fill
                                  className='object-cover group-hover:scale-105 transition-transform duration-500'
                                  sizes='(max-width: 768px) 100vw, 384px'
                                />
                              </div>
                            )}
                            <div className='flex-1'>
                              {/* Priority Badge */}
                              <div className='flex items-center gap-3 mb-4 flex-wrap'>
                                {announcement.priority === 'high' && (
                                  <span className='inline-flex items-center gap-2 px-4 py-1.5 bg-red-100 text-red-700 border-2 border-red-300 rounded-full text-sm font-bold'>
                                    <AlertCircle className='w-4 h-4' />
                                    High Priority
                                  </span>
                                )}
                                {announcement.featured && (
                                  <span className='inline-flex items-center gap-2 px-4 py-1.5 bg-primary-green-100 text-primary-green-700 border-2 border-primary-green-300 rounded-full text-sm font-bold'>
                                    <Bell className='w-4 h-4' />
                                    Featured
                                  </span>
                                )}
                              </div>

                              {/* Date */}
                              <div className='flex items-center gap-4 mb-4 text-sm text-gray-600'>
                                <div className='flex items-center gap-2'>
                                  <Calendar className='w-4 h-4 text-primary-green-600' />
                                  <time className='font-semibold' dateTime={announcement.createdAt?.seconds ? new Date(announcement.createdAt.seconds * 1000).toISOString() : ''}>
                                    {typeof dateInfo === 'object' ? dateInfo.full : dateInfo}
                                  </time>
                                </div>
                                <div className='flex items-center gap-2'>
                                  <Clock className='w-4 h-4 text-gray-400' />
                                  <span>{typeof dateInfo === 'object' ? dateInfo.time : ''}</span>
                                </div>
                              </div>

                              {/* Title */}
                              <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4 group-hover:text-primary-green-600 transition-colors leading-tight'>
                                {announcement.title}
                              </h2>

                              {/* Content */}
                              <div className='prose prose-lg max-w-none'>
                                <p className='text-gray-700 leading-relaxed whitespace-pre-wrap'>
                                  {announcement.content}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Regular Announcements Section */}
              {regularAnnouncements.length > 0 && (
                <div>
                  {featuredAnnouncements.length > 0 && (
                    <div className='flex items-center gap-3 mb-8'>
                      <div className='w-1 h-8 bg-gradient-to-b from-accent-blue-500 to-accent-purple-500 rounded-full'></div>
                      <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>
                        All Announcements
                      </h2>
                    </div>
                  )}
                  <div className='grid gap-6 md:grid-cols-2'>
                    {regularAnnouncements.map((announcement) => {
                      const dateInfo = formatDate(announcement.createdAt)
                      return (
                        <Card
                          key={announcement.id}
                          className='group border-2 border-gray-200 hover:border-primary-green-300 hover:shadow-xl transition-all duration-300 overflow-hidden'
                        >
                          {announcement.image && (
                            <div className='relative h-48 w-full -mx-6 -mt-6 mb-6'>
                              <ImageWithLightbox
                                src={announcement.image}
                                alt={announcement.title}
                                fill
                                className='object-cover group-hover:scale-105 transition-transform duration-300'
                                sizes='(max-width: 768px) 100vw, 50vw'
                              />
                              <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'></div>
                            </div>
                          )}
                          
                          {/* Priority Badge */}
                          {announcement.priority === 'medium' && (
                            <div className='mb-4'>
                              <span className='inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-full text-xs font-semibold'>
                                Medium Priority
                              </span>
                            </div>
                          )}

                          {/* Date */}
                          <div className='flex items-center gap-3 mb-3 text-xs text-gray-500'>
                            <div className='flex items-center gap-1.5'>
                              <Calendar className='w-3.5 h-3.5 text-primary-green-600' />
                              <time className='font-medium' dateTime={announcement.createdAt?.seconds ? new Date(announcement.createdAt.seconds * 1000).toISOString() : ''}>
                                {typeof dateInfo === 'object' ? dateInfo.short : dateInfo}
                              </time>
                            </div>
                            <div className='flex items-center gap-1.5'>
                              <Clock className='w-3.5 h-3.5' />
                              <span>{typeof dateInfo === 'object' ? dateInfo.time : ''}</span>
                            </div>
                          </div>

                          {/* Title */}
                          <h2 className='text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-green-600 transition-colors line-clamp-2'>
                            {announcement.title}
                          </h2>

                          {/* Content Preview */}
                          <p className='text-gray-600 leading-relaxed line-clamp-3 text-sm'>
                            {announcement.content}
                          </p>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Section>
    </main>
  )
}
