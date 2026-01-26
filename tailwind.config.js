/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: false, // Disable dark mode
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif']
      },
      colors: {
        // Primary color theme - Vibrant school website
        primary: {
          DEFAULT: '#2563eb', // vibrant royal blue
          hover: '#1d4ed8', // deeper blue
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          DEFAULT: '#06b6d4', // vibrant cyan
          hover: '#0891b2', // deeper cyan
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
        },
        dark: '#0f172a',
        text: '#1e293b',
        light: '#f0f9ff',
        border: '#cbd5e1',
        // Legacy color names for backward compatibility - mapped to vibrant theme
        'primary-green': {
          DEFAULT: '#10b981', // vibrant emerald
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        'accent-blue': {
          DEFAULT: '#2563eb', // vibrant blue
          50: '#eff6ff',
          100: '#dbeafe',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        'accent-yellow': {
          DEFAULT: '#f59e0b', // vibrant amber
          50: '#fffbeb',
          100: '#fef3c7',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        'accent-purple': {
          DEFAULT: '#8b5cf6', // vibrant purple
          50: '#faf5ff',
          100: '#f3e8ff',
          400: '#c084fc',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        'accent-pink': {
          DEFAULT: '#ec4899', // vibrant pink
          50: '#fdf2f8',
          100: '#fce7f3',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
        },
        'accent-orange': {
          DEFAULT: '#f97316', // vibrant orange
          50: '#fff7ed',
          100: '#ffedd5',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        },
        'accent-teal': {
          DEFAULT: '#06b6d4', // vibrant cyan/teal
          50: '#ecfeff',
          100: '#cffafe',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        background: '#ffffff',
        foreground: '#1e293b',
        card: {
          DEFAULT: '#ffffff',
          foreground: '#1e293b'
        },
        popover: {
          DEFAULT: '#ffffff',
          foreground: '#1e293b'
        },
        muted: {
          DEFAULT: '#f0f9ff',
          foreground: '#475569'
        },
        accent: {
          DEFAULT: '#f59e0b',
          foreground: '#ffffff'
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff'
        },
        input: '#cbd5e1',
        ring: '#2563eb',
        chart: {
          1: '#2563eb',
          2: '#06b6d4',
          3: '#f59e0b',
          4: '#10b981',
          5: '#8b5cf6'
        }
      },
      backgroundImage: {
        'logo-gradient': 'linear-gradient(to bottom right, #FFFFFF, #E8E8E8)',
        'accent-gradient': 'linear-gradient(to bottom right, #2563eb, #06b6d4)',
        'vibrant-gradient': 'linear-gradient(135deg, #2563eb 0%, #06b6d4 50%, #10b981 100%)',
        'school-gradient': 'linear-gradient(135deg, #2563eb 0%, #3b82f6 25%, #06b6d4 50%, #10b981 75%, #f59e0b 100%)'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      animation: {
        marquee: 'marquee 20s linear infinite'
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(-100%)' }
        }
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
