import { locations } from '@/lib/data/locations'
import { serviceGroups } from '@/lib/data/services'

export const hubPages = [
  { href: '/', label: 'Home' },
  { href: '/ev-charger-installation', label: 'EV Charger Installation' },
  { href: '/electrical-panel-services', label: 'Electrical Panel Services' },
  { href: '/how-it-works', label: 'How It Works' },
]

export const evServiceLinks = serviceGroups.ev.map((service) => ({
  href: `/ev-charger-installation/${service.slug}`,
  label: service.shortTitle,
}))

export const panelServiceLinks = serviceGroups.panel.map((service) => ({
  href: `/electrical-panel-services/${service.slug}`,
  label: service.shortTitle,
}))

export const locationLinks = locations.map((location) => ({
  href: `/locations/${location.slug}`,
  label: location.city,
}))
