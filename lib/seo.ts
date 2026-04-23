import type { Metadata } from 'next'

import { siteConfig } from '@/lib/site'

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString()
}

export function generateMetadata(input: {
  title: string
  description: string
  path: string
  keywords?: string[]
}) {
  const url = absoluteUrl(input.path)

  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      url,
      title: input.title,
      description: input.description,
      siteName: siteConfig.name,
      images: [
        {
          url: absoluteUrl('/opengraph-image'),
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} preview image`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      images: [absoluteUrl('/opengraph-image')],
    },
  } satisfies Metadata
}
