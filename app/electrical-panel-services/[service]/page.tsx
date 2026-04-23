import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { FaqSection } from '@/components/faq-section'
import { InternalLinksBlock } from '@/components/internal-links-block'
import { JsonLd } from '@/components/json-ld'
import { MiniEstimateCta } from '@/components/mini-estimate-cta'
import { PageHero } from '@/components/page-hero'
import { PriceTable } from '@/components/price-table'
import { ServiceAreaGrid } from '@/components/service-area-grid'
import { getLocationBySlug, getLocationPath } from '@/lib/data/locations'
import { getServiceBySlug, getServicePath, serviceGroups, type ServicePage } from '@/lib/data/services'
import { generateMetadata as buildMetadata } from '@/lib/seo'
import { serviceSchema } from '@/lib/schema'

export const dynamicParams = false

type PageProps = {
  params: Promise<{ service: string }>
}

export function generateStaticParams() {
  return serviceGroups.panel.map((service) => ({ service: service.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: serviceSlug } = await params
  const service = getServiceBySlug(serviceSlug)

  if (!service || service.category !== 'panel') {
    return {}
  }

  return buildMetadata({
    title: service.title,
    description: service.description,
    path: getServicePath(service),
    keywords: [service.targetKeyword, `${service.shortTitle} los angeles`, 'EV panel upgrade'],
  })
}

export default async function PanelServicePage({ params }: PageProps) {
  const { service: serviceSlug } = await params
  const service = getServiceBySlug(serviceSlug)

  if (!service || service.category !== 'panel') {
    notFound()
  }

  const relatedLinks = buildRelatedLinks(service)

  return (
    <>
      <PageHero eyebrow="Panel Upgrade Service" title={service.h1} description={service.description} />
      <div className="container mx-auto px-4 py-12">
        <BreadcrumbNav
          items={[
            { label: 'Home', href: '/' },
            { label: 'Electrical Panel Services', href: '/electrical-panel-services' },
            { label: service.shortTitle, href: getServicePath(service) },
          ]}
        />
        <JsonLd
          id={`panel-service-${service.slug}`}
          data={serviceSchema({
            name: service.title,
            description: service.description,
            minPrice: service.minPrice,
            maxPrice: service.maxPrice,
          })}
        />

        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="space-y-10">
            <section className="space-y-5">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Why EV charging often requires panel work
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">{service.intro}</p>
              <p className="text-lg leading-relaxed text-muted-foreground">{service.localAngle}</p>
              <p className="text-lg leading-relaxed text-muted-foreground">{service.panelAngle}</p>
            </section>

            <PriceTable
              title={`Typical pricing for ${service.shortTitle}`}
              items={[
                {
                  label: 'Smaller-scope work',
                  range: `$${service.minPrice.toLocaleString()} - $${Math.round(
                    (service.minPrice + service.maxPrice) / 2
                  ).toLocaleString()}`,
                  note: 'Best fit when the home needs targeted panel work instead of a full service replacement.',
                },
                {
                  label: 'Common range',
                  range: `$${service.minPrice.toLocaleString()} - $${service.maxPrice.toLocaleString()}`,
                  note: 'Reflects the EV-triggered upgrades most homeowners discover during the estimate process.',
                },
                {
                  label: 'With utility coordination',
                  range: '$3,500 - $7,000',
                  note: 'Applies when meter work, service changes, or more extensive replacement is involved.',
                },
              ]}
            />

            <section>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">What our panel work covers</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {service.highlights.map((highlight) => (
                  <div key={highlight} className="rounded-2xl border bg-background p-6 shadow-sm">
                    <p className="text-base leading-relaxed text-muted-foreground">{highlight}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                The full EV-to-panel upgrade path
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">{service.processBody}</p>
            </section>

            <section className="space-y-5">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Why local expertise matters
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">{service.upgradeBody}</p>
            </section>
          </article>

          <aside className="space-y-6">
            <ServiceAreaGrid compact />
          </aside>
        </div>
      </div>
      <FaqSection
        title={`Frequently asked questions about ${service.shortTitle}`}
        description="Common questions about EV-triggered panel work in the San Fernando Valley."
        items={service.faqs}
      />
      <MiniEstimateCta city="the San Fernando Valley" />
      <InternalLinksBlock title="Related EV and Panel Pages" links={relatedLinks} />
    </>
  )
}

function buildRelatedLinks(service: ServicePage) {
  const parentLink = {
    href: '/electrical-panel-services',
    label: 'Electrical Panel Services Hub',
    description: 'Return to the EV-triggered panel service hub.',
  }

  const chargerHubLink = {
    href: '/ev-charger-installation',
    label: 'EV Charger Installation Hub',
    description: 'Start with the charger that leads many homeowners to panel work.',
  }

  const featuredCity = getLocationBySlug(service.featuredCitySlug)
  const cityLink = featuredCity
    ? {
        href: getLocationPath(featuredCity.slug),
        label: `${featuredCity.city} city page`,
        description: `City-specific utility and housing stock context for ${featuredCity.city}.`,
      }
    : null

  const related = service.relatedSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((item): item is ServicePage => Boolean(item))
    .map((item) => ({
      href: getServicePath(item),
      label: item.shortTitle,
      description: item.description,
    }))

  return [parentLink, chargerHubLink, ...(cityLink ? [cityLink] : []), ...related]
}
