export const siteConfig = {
  name: 'LA EV Charger Installation & Panel Upgrades',
  shortName: 'LA Charge Install',
  description:
    'EV charger installation and EV-triggered electrical panel upgrades across the San Fernando Valley, with fast estimates, local rebate guidance, and licensed contractor dispatch.',
  url: 'https://lachargeinstall.com',
  phoneDisplay: '(818) 934-0824',
  phoneHref: 'tel:+18189340824',
  email: 'info@lachargeinstall.com',
  tagline: 'Installed Right. In the Valley.',
  serviceArea: 'San Fernando Valley, Los Angeles County, CA',
  address: {
    addressLocality: 'San Fernando Valley',
    addressRegion: 'CA',
    addressCountry: 'US',
  },
  socialProof: {
    installsThisMonth: 47,
    responseTime: 'Less than 24 hours',
  },
} as const

export const trustSignals = [
  'Licensed contractor network',
  'Verified local rebate guidance',
  '4-hour response target',
] as const
