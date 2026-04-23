import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { HowItWorksSection } from '@/components/how-it-works-section'
import { InternalLinksBlock } from '@/components/internal-links-block'
import { MiniEstimateCta } from '@/components/mini-estimate-cta'
import { PageHero } from '@/components/page-hero'
import { generateMetadata } from '@/lib/seo'

export const metadata = generateMetadata({
  title: 'How Our EV Estimate Process Works',
  description:
    'See how LA Charge Install turns a 60-second intake into a matched EV charger or panel upgrade estimate using your zip code, utility, and home details.',
  path: '/how-it-works',
  keywords: ['how ev charger estimates work', 'panel upgrade estimate'],
})

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How It Works"
        title="How LA Charge Install Works"
        description="Request a free estimate in under 60 seconds. We match you with a licensed electrician who knows your city's utility programs and permit process."
      />
      <div className="container mx-auto px-4 py-12">
        <BreadcrumbNav
          items={[
            { label: 'Home', href: '/' },
            { label: 'How It Works', href: '/how-it-works' },
          ]}
        />
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            A simpler path to your EV charger estimate
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Most homeowners want a price range before calling anyone. We start there: answer a few questions, share
            a panel photo, and get a range estimate back fast — without committing to a contractor.
          </p>
        </div>
      </div>
      <HowItWorksSection />
      <div className="container mx-auto px-4 py-4">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border bg-background p-8 shadow-sm">
            <h3 className="text-2xl font-semibold tracking-tight">Tell us your project</h3>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Choose EV charger installation, panel upgrade, or both. Add zip code, timing, and a photo of your
              electrical panel.
            </p>
          </div>
          <div className="rounded-3xl border bg-background p-8 shadow-sm">
            <h3 className="text-2xl font-semibold tracking-tight">Get matched locally</h3>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Your zip code and utility area determine which licensed electrician in our network handles your
              project — someone who already knows your permitting process.
            </p>
          </div>
          <div className="rounded-3xl border bg-background p-8 shadow-sm">
            <h3 className="text-2xl font-semibold tracking-tight">Know if panel work is needed</h3>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              EV charger quotes often reveal whether the panel needs work first. We explain that clearly before any
              contractor visits, so you are not surprised by scope on install day.
            </p>
          </div>
        </div>
      </div>
      <MiniEstimateCta />
      <InternalLinksBlock
        title="Explore your options"
        links={[
          {
            href: '/ev-charger-installation',
            label: 'EV Charger Installation Hub',
            description: 'Compare charger types, brands, and installation layouts.',
          },
          {
            href: '/electrical-panel-services',
            label: 'Electrical Panel Services Hub',
            description: 'Panel capacity options for homeowners planning to add EV charging.',
          },
          {
            href: '/locations/ev-charger-installation-glendale',
            label: 'Glendale City Page',
            description: 'Utility rebates, permit contacts, and local install context for Glendale.',
          },
          {
            href: '/locations/ev-charger-installation-pasadena',
            label: 'Pasadena City Page',
            description: 'Pasadena Water & Power rebates, permit contacts, and older-home guidance.',
          },
        ]}
      />
    </>
  )
}
