import Image from 'next/image'
import { cn } from '../../lib/utils'

interface AvatarProps {
  name: string
  src?: string | null
  /** Pixel size of the square */
  size?: number
  /** `arch` uses the school's arch frame; `circle` for small inline avatars */
  shape?: 'circle' | 'arch'
  className?: string
}

const initials = (name: string) =>
  name
    .replace(/^(Dr|Mr|Mrs|Ms|Prof)\.?\s+/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')

/** Portrait with an initials fallback. The name is the accessible label either way. */
export default function Avatar({ name, src, size = 56, shape = 'circle', className }: AvatarProps) {
  const frame = shape === 'arch' ? 'arch' : 'rounded-full'
  return (
    <span
      className={cn('relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-brand-100 text-brand-800', frame, className)}
      style={{ width: size, height: shape === 'arch' ? size * 1.2 : size }}
    >
      {src ? (
        <Image src={src} alt={name} fill sizes={`${size}px`} className='object-cover' />
      ) : (
        <span role='img' aria-label={name} className='font-display font-semibold' style={{ fontSize: size * 0.36 }}>
          {initials(name)}
        </span>
      )}
    </span>
  )
}
