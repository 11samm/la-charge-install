import type { MetadataRoute } from 'next'

import { locations } from '@/lib/data/locations'
import { serviceGroups } from '@/lib/data/services'
import { siteConfig } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/ev-charger-installation`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/electrical-panel-services`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/how-it-works`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/privacy-policy`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.2,
    },
    {
      url: `${siteConfig.url}/terms-of-service`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.2,
    },
  ]

  const evPages = serviceGroups.ev.map((service) => ({
    url: `${siteConfig.url}/ev-charger-installation/${service.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const panelPages = serviceGroups.panel.map((service) => ({
    url: `${siteConfig.url}/electrical-panel-services/${service.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const locationPages = locations.map((location) => ({
    url: `${siteConfig.url}/locations/${location.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...evPages, ...panelPages, ...locationPages]
}
