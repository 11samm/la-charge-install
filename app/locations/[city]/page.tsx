import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { FaqSection } from '@/components/faq-section'
import { InternalLinksBlock } from '@/components/internal-links-block'
import { JsonLd } from '@/components/json-ld'
import { MiniEstimateCta } from '@/components/mini-estimate-cta'
import { PageHero } from '@/components/page-hero'
import { PriceTable } from '@/components/price-table'
import { getLocationBySlug, getLocationPath, locations, type LocationPage } from '@/lib/data/locations'
import { getServiceBySlug, getServicePath, type ServicePage } from '@/lib/data/services'
import { generateMetadata as buildMetadata } from '@/lib/seo'
import { localBusinessSchema } from '@/lib/schema'

export const dynamicParams = false

type PageProps = {
  params: Promise<{ city: string }>
}

export function generateStaticParams() {
  return locations.map((location) => ({ city: location.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params
  const location = getLocationBySlug(city)

  if (!location) {
    return {}
  }

  return buildMetadata({
    title: location.h1,
    description: location.description,
    path: getLocationPath(location.slug),
    keywords: [location.targetKeyword, `${location.city} EV charger installation`, location.utility],
  })
}

export default async function LocationPage({ params }: PageProps) {
  const { city } = await params
  const location = getLocationBySlug(city)

  if (!location) {
    notFound()
  }

  const relatedLinks = buildRelatedLinks(location)

  return (
    <>
      <PageHero eyebrow="EV Charger Installation" title={location.h1} description={location.description} />
      <div className="container mx-auto px-4 py-12">
        <BreadcrumbNav
          items={[
            { label: 'Home', href: '/' },
            { label: 'Locations', href: '/#service-areas' },
            { label: location.city, href: getLocationPath(location.slug) },
          ]}
        />
        <JsonLd
          id={`city-local-business-${location.slug}`}
          data={localBusinessSchema({
            description: location.description,
            areaServed: [location.city],
          })}
        />

        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="space-y-10">
            <section className="space-y-5">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                How much does EV charger installation cost in {location.city}?
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Pricing in {location.city} depends on charger type, wire run length, permit requirements, and whether
                the panel is ready for a new 240V circuit. {location.utility} offers {location.rebateProgram} —{' '}
                {location.rebateAmount} — which can meaningfully lower your net install cost.
              </p>
              <PriceTable
                title={`Typical pricing in ${location.city}`}
                items={[
                  {
                    label: 'EV-only install',
                    range: '$750 - $1,200',
                    note: `Best fit when the panel has capacity and the charger route is straightforward in ${location.city}.`,
                  },
                  {
                    label: 'EV + panel work',
                    range: '$2,400 - $4,800',
                    note: 'Common when the estimate reveals a full panel, older service, or lack of breaker space.',
                  },
                  {
                    label: 'Premium or outdoor installs',
                    range: '$1,400 - $2,500',
                    note: 'Applies to longer wire runs, outdoor equipment, hillside layouts, or more complex mounting.',
                  },
                ]}
              />
            </section>

            <section className="space-y-5">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                EV charger installation process in {location.city}
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                The process starts with an estimate request and a panel photo. That gives the electrician enough to
                identify likely pricing, upgrade needs, and permit authority before calling you back. In{' '}
                {location.city}, permits run through {location.permitAuthority}.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Once you have your estimate, you can compare install scope against the rebate path available through{' '}
                {location.utility}. Knowing both numbers before any work starts is how we keep the process
                transparent.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Does your {location.city} home need a panel upgrade?
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">{location.housingSignal}</p>
              <p className="text-lg leading-relaxed text-muted-foreground">{location.localAngle}</p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Your estimate includes a panel readiness check — so if the existing electrical service is at
                capacity or needs modernization before a charger can be installed, you find out during the quote, not
                on install day.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Why {location.city} homeowners choose LA Charge Install
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border bg-background p-6 shadow-sm">
                  <h3 className="text-xl font-semibold tracking-tight">Utility-aware guidance</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    We know {location.utility}&apos;s rebate programs and requirements, so your estimate reflects what
                    is actually available in {location.city}.
                  </p>
                </div>
                <div className="rounded-2xl border bg-background p-6 shadow-sm">
                  <h3 className="text-xl font-semibold tracking-tight">Permit-aware routing</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    Homeowners see that permit expectations connect directly to {location.permitAuthority}.
                  </p>
                </div>
                <div className="rounded-2xl border bg-background p-6 shadow-sm">
                  <h3 className="text-xl font-semibold tracking-tight">Local housing insight</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    We understand the housing stock, lot layouts, and electrical conditions common in {location.city}{' '}
                    neighborhoods.
                  </p>
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-3xl border shadow-sm">
              <iframe
                title={`Map of ${location.city}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(location.mapQuery)}&output=embed`}
                loading="lazy"
                className="h-[320px] w-full border-0"
              />
            </section>
          </article>

          <aside className="space-y-6">
            <div className="rounded-3xl border bg-muted/30 p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Utility provider</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">{location.utility}</h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {location.rebateProgram}: {location.rebateAmount}
              </p>
            </div>
            <div className="rounded-3xl border bg-background p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Neighborhood signals</p>
              <ul className="mt-4 space-y-3 text-base leading-relaxed text-muted-foreground">
                {location.neighborhoods.map((neighborhood) => (
                  <li key={neighborhood}>• {neighborhood}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
      <FaqSection
        title={`Frequently asked questions about EV charger installation in ${location.city}`}
        description={`Common questions from homeowners in ${location.city} before booking an install.`}
        items={location.faqs}
      />
      <MiniEstimateCta city={location.city} />
      <InternalLinksBlock title={`Explore More ${location.city} EV Topics`} links={relatedLinks} />
    </>
  )
}

function buildRelatedLinks(location: LocationPage) {
  const serviceLinks = location.featuredServices
    .map((slug) => getServiceBySlug(slug))
    .filter((item): item is ServicePage => Boolean(item))
    .map((item) => ({
      href: getServicePath(item),
      label: item.shortTitle,
      description: item.description,
    }))

  return [
    {
      href: '/ev-charger-installation',
      label: 'EV Charger Installation Hub',
      description: 'Return to the main EV charging category.',
    },
    {
      href: '/electrical-panel-services',
      label: 'Electrical Panel Services Hub',
      description: 'Panel capacity options when your EV charger estimate reveals electrical upgrades are needed.',
    },
    ...serviceLinks,
  ]
}
