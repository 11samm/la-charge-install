import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { SocialProofBar } from './social-proof-bar'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted/50 to-background" />

      <div className="container relative mx-auto px-4">
        {/* MOBILE HERO — single column, CTA above the fold (hidden at lg+) */}
        <div className="space-y-5 py-8 lg:hidden">
          <SocialProofBar />

          <div className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-semibold text-slate-700">
            ⭐ 4.9 · Verified Reviews
          </div>

          <h1 className="font-display text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-foreground">
            EV Charger Installation, Done Right the First Time.
          </h1>

          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-900 shadow-sm">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-green-500" />
            </span>
            <span>Now booking for Spring 2026 installs</span>
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">
            Skip the guesswork — licensed installs with permits and rebates handled.
          </p>

          <Link
            id="hero-cta"
            href="/get-a-quote"
            className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-4 text-base font-extrabold text-white transition-colors hover:bg-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/50 focus-visible:ring-offset-2"
          >
            Get My Free Estimate
            <ArrowRight className="size-5 shrink-0" strokeWidth={2.5} aria-hidden />
          </Link>

          <p className="text-center text-xs text-slate-500">No commitment. Licensed contractors only.</p>
        </div>

        {/* DESKTOP HERO — unchanged two-column layout (lg+ only) */}
        <div className="hidden items-center gap-12 py-16 md:py-24 lg:grid lg:grid-cols-2 lg:gap-16">
          {/* Left: Content (no primary green on decorative elements) */}
          <div className="space-y-8">
            <SocialProofBar />

            <h1 className="font-display text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl">
              EV Charger Installation, Done Right the First Time.
            </h1>

            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-900 shadow-sm">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-green-500" />
              </span>
              <span>Now booking for Spring 2026 installs</span>
            </div>

            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Skip the guesswork. Get a licensed EV charger install with permits pulled, panel capacity verified, and
              local utility rebates handled for San Fernando Valley homeowners.
            </p>
          </div>

          {/* Right: Estimate CTA — single green element: primary button */}
          <div id="estimate" className="flex w-full justify-center lg:justify-end">
            <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.10)]">
              <div className="px-6 py-7 md:px-10 md:py-9">
                <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-semibold text-slate-700">
                  ⭐ 4.9 · Verified Reviews
                </div>

                <h3 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 [font-family:var(--font-dm-sans,ui-sans-serif)] md:text-3xl">
                  See Your Price Range in 60 Seconds
                </h3>
                <p className="mt-2 text-base text-slate-600">
                  Answer a few quick questions and we&apos;ll match you with licensed EV charger installers for your
                  home and panel setup.
                </p>

                <div className="mt-6">
                  <Link
                    href="/get-a-quote"
                    className="inline-flex h-16 w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-4 text-center text-base font-extrabold text-white transition-colors hover:bg-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white md:text-lg"
                  >
                    Get My Free Estimate
                    <ArrowRight className="size-5 shrink-0" strokeWidth={2.5} aria-hidden />
                  </Link>
                </div>

                <p className="mt-4 text-center text-xs leading-relaxed text-slate-500">
                  No commitment. Licensed contractors only. 4-hour response target.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
