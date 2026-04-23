import Link from 'next/link'

import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { FaqSection } from '@/components/faq-section'
import { InternalLinksBlock } from '@/components/internal-links-block'
import { JsonLd } from '@/components/json-ld'
import { MiniEstimateCta } from '@/components/mini-estimate-cta'
import { PageHero } from '@/components/page-hero'
import { serviceGroups } from '@/lib/data/services'
import { generateMetadata } from '@/lib/seo'
import { serviceSchema } from '@/lib/schema'

const panelHubFaqs = [
  {
    question: 'When does an EV charger require a panel upgrade?',
    answer:
      'A panel upgrade may be needed when your home lacks breaker space, has limited amperage, or cannot support the added EV load safely after a load calculation review.',
  },
  {
    question: 'What panel services are covered on this hub?',
    answer:
      'These pages cover panel upgrades, 200-amp upgrades, modernization, sub-panels, main service panel work, EV-ready panels, and NEMA 14-50 outlet planning tied to EV charging.',
  },
  {
    question: 'How much does EV-related panel work cost?',
    answer:
      'Costs vary widely based on service size, equipment condition, utility coordination, and permit scope. Simpler EV-ready improvements can be much lower than full service replacements.',
  },
]

export const metadata = generateMetadata({
  title: 'Electrical Panel Upgrade Services',
  description:
    'Explore EV-triggered electrical panel service pages covering panel upgrades, 200-amp upgrades, panel modernization, NEMA 14-50 outlets, and more.',
  path: '/electrical-panel-services',
  keywords: [
    'electrical panel upgrade los angeles',
    '200 amp panel upgrade',
    'ev ready panel upgrade',
  ],
})

export default function ElectricalPanelServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Electrical Panel Services"
        title="Electrical Panel Services for EV Charging"
        description="Panel upgrades, service replacements, and sub-panel work — sized for the EV load your home is adding."
      />
      <div className="container mx-auto px-4 py-12">
        <BreadcrumbNav
          items={[
            { label: 'Home', href: '/' },
            { label: 'Electrical Panel Services', href: '/electrical-panel-services' },
          ]}
        />
        <JsonLd
          id="panel-hub-service-schema"
          data={serviceSchema({
            name: 'Electrical Panel Services for EV Charging',
            description:
              'EV-triggered panel upgrades, 200-amp upgrades, and related electrical services across the San Fernando Valley.',
            minPrice: 500,
            maxPrice: 7000,
          })}
        />
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Panel services for EV-ready homes
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            If your EV charger estimate found limited breaker space, a 100A main, or outdated equipment, these
            services explain your options — from a targeted upgrade to a full service replacement.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {serviceGroups.panel.map((service) => (
            <Link
              key={service.slug}
              href={`/electrical-panel-services/${service.slug}`}
              className="rounded-3xl border bg-background p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Panel Service</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">{service.shortTitle}</h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{service.description}</p>
              <div className="mt-6 flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">
                  ${service.minPrice.toLocaleString()} - ${service.maxPrice.toLocaleString()}
                </span>
                <span className="text-primary">View page</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <InternalLinksBlock
        title="Related services and areas"
        links={[
          {
            href: '/ev-charger-installation',
            label: 'EV Charger Installation Hub',
            description: 'All EV charger installation types, brands, and outdoor setups.',
          },
          {
            href: '/ev-charger-installation/level-2-charger',
            label: 'Level 2 Charger Installation',
            description: 'Level 2 charging details, pricing, and what to expect for your home.',
          },
          {
            href: '/locations/ev-charger-installation-pasadena',
            label: 'Pasadena City Page',
            description: 'Pasadena Water & Power rebates and older-home panel guidance.',
          },
          {
            href: '/locations/ev-charger-installation-tujunga',
            label: 'Tujunga & Sunland City Page',
            description: 'Tujunga and Sunland foothill homes and LADWP rebate context.',
          },
        ]}
      />
      <FaqSection
        title="Frequently asked questions about EV panel upgrades"
        description="Quick answers on panel capacity, upgrade timing, and EV-related electrical scope."
        items={panelHubFaqs}
      />
      <MiniEstimateCta />
    </>
  )
}
