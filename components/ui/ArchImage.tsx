import Image from 'next/image'
import { cn } from '../../lib/utils'

interface ArchImageProps {
  src: string
  alt: string
  sizes: string
  priority?: boolean
  /** Aspect ratio utility, e.g. 'aspect-[4/5]' */
  ratio?: string
  /** Offset gold outline behind the image */
  outlined?: boolean
  className?: string
  imageClassName?: string
}

/** Image in the school's arch frame (see `.arch` in styles/global.css). */
export default function ArchImage({
  src,
  alt,
  sizes,
  priority,
  ratio = 'aspect-[4/5]',
  outlined = false,
  className,
  imageClassName
}: ArchImageProps) {
  return (
    <div className={cn('relative', className)}>
      {outlined && (
        <div className='arch absolute inset-0 translate-x-3 translate-y-3 border-2 border-gold-400/70' aria-hidden />
      )}
      <div className={cn('arch relative overflow-hidden bg-sunken', ratio)}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={cn('object-cover', imageClassName)} />
      </div>
    </div>
  )
}
