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

const evHubFaqs = [
  {
    question: 'How much does EV charger installation usually cost?',
    answer:
      'Most home EV charger installs fall between roughly $750 and $2,200 before rebates, depending on wire run distance, charger location, permit requirements, and whether panel work is needed.',
  },
  {
    question: 'Do I need a permit for a home EV charger?',
    answer:
      'Many cities in the San Fernando Valley require permits and inspection for a new 240V circuit or hardwired charger. The exact process depends on your city and utility territory.',
  },
  {
    question: 'Can you install Tesla, ChargePoint, and other Level 2 chargers?',
    answer:
      'Yes. The service pages on this hub cover Tesla Wall Connector, ChargePoint, Emporia, Level 2 chargers, outdoor installs, and related permit or outlet scenarios.',
  },
]

export const metadata = generateMetadata({
  title: 'EV Charger Installation Services',
  description:
    'Explore EV charger installation pages for Tesla, ChargePoint, Level 2 charging, permit guidance, outdoor installs, and more across the San Fernando Valley.',
  path: '/ev-charger-installation',
  keywords: [
    'ev charger installation los angeles',
    'level 2 charger installation',
    'tesla wall connector installation',
  ],
})

export default function EvChargerInstallationPage() {
  return (
    <>
      <PageHero
        eyebrow="EV Charger Installation"
        title="EV Charger Installation in the San Fernando Valley"
        description="Browse every home EV charger installation service we offer — from Tesla and ChargePoint to Level 2 circuits, outdoor setups, and permit-ready installs."
      />
      <div className="container mx-auto px-4 py-12">
        <BreadcrumbNav
          items={[
            { label: 'Home', href: '/' },
            { label: 'EV Charger Installation', href: '/ev-charger-installation' },
          ]}
        />
        <JsonLd
          id="ev-hub-service-schema"
          data={serviceSchema({
            name: 'EV Charger Installation',
            description:
              'EV charger installation across the San Fernando Valley with utility-aware rebate guidance and EV-triggered panel upgrade estimates.',
            minPrice: 750,
            maxPrice: 2200,
          })}
        />
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            All EV charger installation services
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            From brand-specific chargers to outlet installs and permit guidance, every service below connects to a
            vetted, licensed electrician in your part of the Valley.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {serviceGroups.ev.map((service) => (
            <Link
              key={service.slug}
              href={`/ev-charger-installation/${service.slug}`}
              className="rounded-3xl border bg-background p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">EV Charger Service</p>
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
        title="Service areas"
        links={[
          {
            href: '/locations/ev-charger-installation-burbank',
            label: 'Burbank EV Charger Installation',
            description: 'Burbank Water & Power rebates and permit contacts for Burbank homes.',
          },
          {
            href: '/locations/ev-charger-installation-glendale',
            label: 'Glendale EV Charger Installation',
            description: 'Glendale Water & Power rebates, hillside install context, and permit details.',
          },
          {
            href: '/locations/ev-charger-installation-pasadena',
            label: 'Pasadena EV Charger Installation',
            description: 'Pasadena Water & Power rebates, historic home panel guidance.',
          },
          {
            href: '/how-it-works',
            label: 'How It Works',
            description: 'How the estimate request and contractor match process works.',
          },
        ]}
      />
      <FaqSection
        title="Frequently asked questions about EV charger installation services"
        description="Answers to common pricing, permit, and charger-type questions for San Fernando Valley homeowners."
        items={evHubFaqs}
      />
      <MiniEstimateCta />
    </>
  )
}
