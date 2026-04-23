import type { Metadata } from 'next'

import { QuoteWizard } from '@/components/quote/QuoteWizard'

export const metadata: Metadata = {
  title: 'Get Your Free Estimate in 60 Seconds',
  description:
    'Get an instant EV charger installation or panel upgrade estimate for your San Fernando Valley home in about 60 seconds, with local rebate and permit guidance.',
  alternates: {
    canonical: 'https://lachargeinstall.com/get-a-quote',
  },
  openGraph: {
    type: 'website',
    url: 'https://lachargeinstall.com/get-a-quote',
    title: 'Get Your Free Estimate in 60 Seconds',
    description:
      'Get an instant EV charger installation or panel upgrade estimate for your San Fernando Valley home in about 60 seconds, with local rebate and permit guidance.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get Your Free Estimate in 60 Seconds',
    description:
      'Get an instant EV charger installation or panel upgrade estimate for your San Fernando Valley home in about 60 seconds, with local rebate and permit guidance.',
  },
  robots: { index: false, follow: false },
}

export default function GetAQuotePage() {
  return <QuoteWizard />
}
