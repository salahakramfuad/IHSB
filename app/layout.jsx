import '@styles/global.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'
import Footer from '@components/Footer'
export const metadata = {
  title: 'ihsbhostel',
  description: 'Discover IHSB Hostel'
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
