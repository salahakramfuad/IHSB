import '@styles/global.css'
import Nav from '@components/Nav'

import Footer from '@components/Footer'
import Image from 'next/image'
export const metadata = {
  title: 'IHSB',
  description: 'Discover IHSB '
}
const Rootlayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <div>
          <div className='gradient' />
        </div>
        <main>
          <Nav />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}

export default Rootlayout
