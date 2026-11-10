import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

/**
 * Design tokens live in styles/tokens.css as CSS variables (RGB channels) and
 * are exposed here as Tailwind utilities. Semantic tokens (canvas, paper, ink,
 * line, brand, gold) switch automatically between the light and dark theme.
 */
const channel = (name: string) => `rgb(var(--${name}) / <alpha-value>)`

const scale = (name: string, steps: number[]) =>
  Object.fromEntries(steps.map((step) => [step, channel(`${name}-${step}`)]))

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

const brand = { DEFAULT: channel('brand-text'), solid: channel('brand-solid'), ...scale('brand', STEPS) }
const gold = { DEFAULT: channel('gold-text'), ...scale('gold', STEPS) }
const sky = { DEFAULT: channel('sky-text'), ...scale('sky', STEPS) }

const config: Config = {
  darkMode: ['class'],
  content: ['./components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', sm: '1.5rem', lg: '2.5rem' },
      screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1216px' }
    },
    extend: {
      screens: { xs: '400px' },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'ui-serif', 'Georgia', 'serif']
      },
      fontSize: {
        // Type scale (major third on body, fluid display sizes)
        'display-1': ['clamp(2.5rem, 1.55rem + 4.6vw, 5.25rem)', { lineHeight: '1.02', letterSpacing: '-0.022em' }],
        'display-2': ['clamp(2rem, 1.45rem + 2.6vw, 3.5rem)', { lineHeight: '1.08', letterSpacing: '-0.018em' }],
        'display-3': ['clamp(1.6rem, 1.3rem + 1.3vw, 2.25rem)', { lineHeight: '1.16', letterSpacing: '-0.012em' }],
        title: ['clamp(1.25rem, 1.15rem + 0.45vw, 1.5rem)', { lineHeight: '1.25', letterSpacing: '-0.006em' }],
        lead: ['clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)', { lineHeight: '1.6' }]
      },
      colors: {
        // ---- Semantic tokens (theme aware) ----
        canvas: channel('canvas'),
        paper: channel('paper'),
        sunken: channel('sunken'),
        ink: { DEFAULT: channel('ink'), muted: channel('ink-muted'), subtle: channel('ink-subtle') },
        line: { DEFAULT: channel('line'), strong: channel('line-strong') },
        brand,
        gold,
        sky,
        danger: channel('danger'),

        // ---- Aliases kept so existing class names resolve to the new palette ----
        primary: { DEFAULT: channel('brand-700'), hover: channel('brand-800'), ...scale('brand', STEPS) },
        'primary-green': { DEFAULT: channel('brand-600'), ...scale('brand', STEPS) },
        secondary: { DEFAULT: channel('gold-500'), hover: channel('gold-600'), ...scale('gold', STEPS) },
        'accent-yellow': { DEFAULT: channel('gold-500'), ...scale('gold', STEPS) },
        'accent-blue': { DEFAULT: channel('sky-600'), ...scale('sky', STEPS) },

        // shadcn-style names
        background: channel('canvas'),
        foreground: channel('ink'),
        card: { DEFAULT: channel('paper'), foreground: channel('ink') },
        popover: { DEFAULT: channel('paper'), foreground: channel('ink') },
        muted: { DEFAULT: channel('sunken'), foreground: channel('ink-muted') },
        accent: { DEFAULT: channel('gold-500'), foreground: channel('brand-950') },
        destructive: { DEFAULT: channel('danger'), foreground: '#ffffff' },
        border: channel('line'),
        input: channel('line-strong'),
        ring: channel('focus')
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)'
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        raised: 'var(--shadow-raised)',
        floating: 'var(--shadow-floating)'
      },
      spacing: {
        section: 'var(--space-section)',
        'section-sm': 'var(--space-section-sm)',
        nav: 'var(--nav-height)'
      },
      maxWidth: { prose: '68ch', content: '76rem' },
      zIndex: {
        base: 'var(--z-base)',
        raised: 'var(--z-raised)',
        sticky: 'var(--z-sticky)',
        nav: 'var(--z-nav)',
        overlay: 'var(--z-overlay)',
        modal: 'var(--z-modal)',
        toast: 'var(--z-toast)'
      },
      transitionTimingFunction: {
        out: 'var(--ease-out)',
        'in-out': 'var(--ease-in-out)'
      },
      transitionDuration: {
        fast: 'var(--duration-fast)',
        base: 'var(--duration-base)',
        slow: 'var(--duration-slow)'
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' }
        },
        'skeleton-sheen': {
          from: { backgroundPosition: '200% 0' },
          to: { backgroundPosition: '-200% 0' }
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        skeleton: 'skeleton-sheen 1.6s ease-in-out infinite',
        'fade-up': 'fade-up var(--duration-slow) var(--ease-out) both'
      }
    }
  },
  plugins: [animate]
}

export default config
