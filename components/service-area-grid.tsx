import Link from 'next/link'
import { Clock, MapPin, Phone } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { locations } from '@/lib/data/locations'
import { siteConfig } from '@/lib/site'

type ServiceAreaGridProps = {
  /** Compact sidebar version for service pages—links only, no full section padding. */
  compact?: boolean
}

export function ServiceAreaGrid({ compact = false }: ServiceAreaGridProps) {
  if (compact) {
    return (
      <div className="rounded-3xl border bg-muted/20 p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Areas we serve</p>
        <h3 className="mt-2 text-lg font-semibold tracking-tight">San Fernando Valley & nearby</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          For utility-specific rebates, permits, and neighborhood context, open your city page.
        </p>
        <ul className="mt-4 grid gap-2">
          {locations.map((area) => (
            <li key={area.slug}>
              <Link
                href={`/locations/${area.slug}`}
                className="text-sm font-medium text-primary hover:text-primary/80"
              >
                {area.city}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm font-medium text-primary tracking-wide uppercase mb-4">
            Service Areas
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-balance mb-4">
            Local Expertise, City by City
          </h2>
          <p className="text-muted-foreground text-lg">
            We know your city&apos;s permitting process, utility programs, and rebate opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 max-w-6xl mx-auto md:grid-cols-2 xl:grid-cols-3">
          {locations.map((area) => (
            <Card
              key={area.slug}
              className="group border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center size-12 rounded-xl bg-primary/10 text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <MapPin className="size-5" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-semibold tracking-tight">
                        {area.city}
                      </h3>
                      <span className="rounded bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                        {area.utility}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {area.description}
                    </p>
                    <p className="text-sm font-medium text-foreground">{area.rebateProgram}: {area.rebateAmount}</p>
                    <Link
                      href={`/locations/${area.slug}`}
                      className="inline-flex text-sm font-medium text-primary hover:text-primary/80"
                    >
                      Explore {area.city}
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Info */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-16 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-primary" />
            <span>{siteConfig.socialProof.responseTime} response target</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="size-4 text-primary" />
            <span>{siteConfig.phoneDisplay}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
