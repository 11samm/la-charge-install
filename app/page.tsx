import { Hero } from '@/components/hero'
import { breadcrumbSchema } from '@/lib/schema'
import { HowItWorksSection } from '@/components/how-it-works-section'
import { FaqSection } from '@/components/faq-section'
import { JsonLd } from '@/components/json-ld'
import { serviceGroups } from '@/lib/data/services'
import { TrustBar } from '@/components/trust-bar'
import { ServiceAreaGrid } from '@/components/service-area-grid'
import { OrbitalBrands } from '@/components/orbital-brands'
import Link from 'next/link'

const homeFaqs = [
  {
    question: 'How much does EV charger installation cost in Los Angeles?',
    answer:
      'Many installs fall between $750 and $1,800 before rebates, with higher pricing when the home needs a panel upgrade, a longer wire run, or an outdoor charger setup.',
  },
  {
    question: 'Do I need a panel upgrade for a Level 2 EV charger?',
    answer:
      'Not always, but many older homes in the San Fernando Valley have 100A or 150A panels that may need an upgrade or load-management review before installation.',
  },
  {
    question: 'Do city and utility rebates change by service area?',
    answer:
      'Yes. LADWP, Burbank Water & Power, Glendale Water & Power, Pasadena Water & Power, and SCE all create different rebate and permitting contexts.',
  },
]

export default function Home() {
  return (
    <main className="flex-1">
      <JsonLd id="homepage-breadcrumb-schema" data={breadcrumbSchema([{ name: 'Home', path: '/' }])} />
      <Hero />
      <OrbitalBrands />
      <HowItWorksSection />
      <TrustBar />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">EV Charger Services</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                EV charger installation services
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Choose your charger type or installation setup to get an accurate estimate.
              </p>
              <div className="mt-8 grid gap-4">
                {serviceGroups.ev.slice(0, 3).map((service) => (
                  <div
                    key={service.slug}
                    className="group cursor-pointer rounded-2xl border bg-background p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <h3 className="text-xl font-semibold tracking-tight">{service.shortTitle}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                    <Link
                      href={`/ev-charger-installation/${service.slug}`}
                      className="mt-3 inline-flex items-center text-sm font-medium text-primary group-hover:text-primary/80"
                      aria-label={`View details: ${service.shortTitle}`}
                    >
                      View Details →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Panel Services</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                Electrical panel services for EV homes
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Your EV charger estimate may reveal panel capacity issues — we handle both.
              </p>
              <div className="mt-8 grid gap-4">
                {serviceGroups.panel.slice(0, 3).map((service) => (
                  <div
                    key={service.slug}
                    className="group cursor-pointer rounded-2xl border bg-background p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <h3 className="text-xl font-semibold tracking-tight">{service.shortTitle}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                    <Link
                      href={`/electrical-panel-services/${service.slug}`}
                      className="mt-3 inline-flex items-center text-sm font-medium text-primary group-hover:text-primary/80"
                      aria-label={`View details: ${service.shortTitle}`}
                    >
                      View Details →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="service-areas">
        <ServiceAreaGrid />
      </section>
      <FaqSection
        title="Frequently asked questions about EV charger installation"
        description="Common questions from homeowners across the San Fernando Valley."
        items={homeFaqs}
      />
    </main>
  )
}
