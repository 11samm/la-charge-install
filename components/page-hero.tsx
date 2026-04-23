import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { siteConfig, trustSignals } from '@/lib/site'

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <section className="border-b bg-gradient-to-b from-green-50 to-background">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {trustSignals.map((signal) => (
              <span
                key={signal}
                className="rounded-full border border-green-200 bg-white px-4 py-2 text-sm text-foreground"
              >
                {signal}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/get-a-quote">
                Get Your Free Estimate
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={siteConfig.phoneHref}>
                <Phone className="size-4" />
                Call Now
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
