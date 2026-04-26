import type { Metadata } from 'next'

import { QuoteThankYouClient } from '@/components/quote/QuoteThankYouClient'

export const metadata: Metadata = {
  title: 'Request received — we’ll be in touch',
  description:
    'Your instant estimate request was received. A licensed San Fernando Valley electrician will contact you within 4 business hours.',
  alternates: {
    canonical: 'https://lachargeinstall.com/get-a-quote/thank-you',
  },
  openGraph: {
    type: 'website',
    url: 'https://lachargeinstall.com/get-a-quote/thank-you',
    title: 'Request received',
    description:
      'Your estimate request was received. A licensed electrician will be in touch within 4 business hours.',
  },
  twitter: {
    card: 'summary',
    title: 'Request received',
    description: 'Your estimate request was received.',
  },
  robots: { index: false, follow: false },
}

export default function QuoteThankYouPage() {
  return <QuoteThankYouClient />
}
