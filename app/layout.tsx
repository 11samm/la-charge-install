import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { DM_Mono, DM_Sans, Sora } from 'next/font/google'
import Script from 'next/script'

import { MainChrome } from '@/components/main-chrome'
import { JsonLd } from '@/components/json-ld'
import { localBusinessSchema } from '@/lib/schema'
import { siteConfig } from '@/lib/site'

import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['600', '700', '800'],
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  weight: ['400'],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'EV Charger Installation & Panel Upgrades | LA Charge Install',
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  icons: {
    icon: [
      {
        url: '/logos/main/main-logo.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/logos/main/main-logo.svg',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    title: 'EV Charger Installation & Panel Upgrades | LA Charge Install',
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} open graph image`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EV Charger Installation & Panel Upgrades | LA Charge Install',
    description: siteConfig.description,
    images: ['/opengraph-image'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body
        className={`${sora.variable} ${dmSans.variable} ${dmMono.variable} max-w-full overflow-x-hidden font-sans antialiased`}
      >
        <JsonLd id="local-business-schema" data={localBusinessSchema()} />
        <MainChrome>{children}</MainChrome>
        <Script
          defer
          data-domain="lachargeinstall.com"
          src="https://plausible.io/js/plausible.js"
          strategy="afterInteractive"
        />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
