import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with International Hope School Bangladesh. Find our contact information, addresses, phone numbers, and send us a message.',
  openGraph: {
    title: 'Contact Us | IHSB',
    description: 'Contact International Hope School Bangladesh - we\'d love to hear from you!'
  }
}

export default function ContactLayout({
  children
}: {
  children: React.ReactNode
}) {
  return children
}
