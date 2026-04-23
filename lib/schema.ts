import { siteConfig } from '@/lib/site'

type BreadcrumbItem = {
  name: string
  path: string
}

type FaqItem = {
  question: string
  answer: string
}

function buildPostalAddress() {
  const addressEntries = Object.entries(siteConfig.address).flatMap(([key, value]) => {
    return typeof value === 'string' && value.trim().length > 0 ? [[key, value] as const] : []
  })

  if (addressEntries.length === 0) {
    return undefined
  }

  return {
    '@type': 'PostalAddress',
    ...Object.fromEntries(addressEntries),
  }
}

export function localBusinessSchema(overrides?: {
  name?: string
  description?: string
  areaServed?: string[]
}) {
  const address = buildPostalAddress()
  const offeredServices = [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'EV Charger Installation',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Electrical Panel Upgrade',
      },
    },
  ]

  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Electrician'],
    name: overrides?.name ?? siteConfig.name,
    description: overrides?.description ?? siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phoneDisplay,
    email: siteConfig.email,
    priceRange: '$$',
    areaServed:
      overrides?.areaServed ?? [
        'Burbank',
        'Glendale',
        'North Hollywood',
        'Pasadena',
        'Studio City',
        'Van Nuys',
        'Encino',
        'Northridge',
        'Tujunga',
        'Altadena',
        'La Cañada Flintridge',
      ],
    makesOffer: offeredServices,
    ...(address ? { address } : {}),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'EV Charging and Electrical Panel Services',
      itemListElement: offeredServices,
    },
  }
}

export function serviceSchema(input: {
  name: string
  description: string
  minPrice: number
  maxPrice: number
  areaServed?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: input.name,
    name: input.name,
    description: input.description,
    provider: {
      '@type': 'Electrician',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: input.areaServed ?? siteConfig.serviceArea,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: input.minPrice,
        maxPrice: input.maxPrice,
        priceCurrency: 'USD',
      },
    },
  }
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteConfig.url).toString(),
    })),
  }
}

export function faqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}
