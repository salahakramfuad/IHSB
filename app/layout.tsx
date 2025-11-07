// app/layout.tsx
import type { Metadata } from 'next'
import '../styles/global.css'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ThemeCSSVars from '../components/ThemeCSSVars'

export const metadata: Metadata = {
  title: 'IHSB',
  description: 'Discover IHSB'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <ThemeCSSVars />
        <div className='gradient scroll-smooth' />
        <main>
          <Nav />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
