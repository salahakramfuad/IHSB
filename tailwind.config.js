/** @type {import('tailwindcss').Config} */
module.exports = {
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
        'primary-orange': '#FF5722'
      },
      backgroundImage: {
        'logo-gradient': 'linear-gradient(to bottom right, #FFFFFF, #E8E8E8)', // White to light gray for a clean backdrop
        'accent-gradient': 'linear-gradient(to bottom right, #E53935, #4CAF50)' // Red to green for a vibrant touch
      }
    }
  },
  plugins: []
}
