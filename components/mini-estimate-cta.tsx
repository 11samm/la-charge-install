import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/site'

export function MiniEstimateCta({
  city,
  id = 'estimate',
}: {
  city?: string
  id?: string
}) {
  const heading = city ? `Get Your Free Estimate in ${city}` : 'Get Your Free Estimate'

  return (
    <section id={id} className="py-20">
      <div className="container mx-auto px-4">
        <div className="rounded-3xl bg-primary px-8 py-10 text-primary-foreground shadow-lg md:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground/80">
            Instant Estimate
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{heading}</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/85 md:text-lg">
            Share your zip code, job type, and a panel photo. We use that to match you with a licensed electrician who
            knows your city&apos;s permit process and rebate programs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link href="/get-a-quote">
                Start the 60-Second Estimate
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
            >
              <Link href={siteConfig.phoneHref}>
                <Phone className="size-4" />
                {siteConfig.phoneDisplay}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
