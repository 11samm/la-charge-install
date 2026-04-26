"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { BrandLogo } from "@/components/brand-logo"
import { siteConfig } from "@/lib/site"
import { cn } from "@/lib/utils"

const siteNameClasses =
  "block min-w-0 truncate font-sans text-base font-semibold leading-tight tracking-tight text-foreground [font-kerning:normal]"

type ScrollAwareHeaderBrandingProps = {
  linkClassName?: string
  logoClassName?: string
  onNavigate?: () => void
  priority?: boolean
  /** While true, ignore IntersectionObserver updates (e.g. mobile menu open) to avoid layout thrash. */
  freezeScrollCtaObserver?: boolean
}

function syncHeroCtaVisibilityFromDom(setHidden: (hidden: boolean) => void) {
  const el = document.getElementById("hero-cta")
  if (!el) {
    setHidden(false)
    return
  }
  const r = el.getBoundingClientRect()
  const vh = window.innerHeight
  const vw = window.innerWidth
  const visible = r.bottom > 0 && r.top < vh && r.right > 0 && r.left < vw
  setHidden(!visible)
}

export function ScrollAwareHeaderBranding({
  linkClassName,
  logoClassName,
  onNavigate,
  priority,
  freezeScrollCtaObserver = false,
}: ScrollAwareHeaderBrandingProps) {
  const [heroCtaHidden, setHeroCtaHidden] = useState(false)
  const freezeRef = useRef(freezeScrollCtaObserver)
  freezeRef.current = freezeScrollCtaObserver

  useEffect(() => {
    const el = document.getElementById("hero-cta")
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (freezeRef.current) return
        setHeroCtaHidden(!entry.isIntersecting)
      },
      { threshold: 0 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (freezeScrollCtaObserver) return
    syncHeroCtaVisibilityFromDom(setHeroCtaHidden)
  }, [freezeScrollCtaObserver])

  return (
    <>
      {/* Mobile: logo + title; CTA is absolutely centered in the middle band (stable vs flex/grid + scrollbar shifts) */}
      <div className={cn("flex min-w-0 flex-1 items-center gap-2 py-1 lg:hidden", linkClassName)}>
        <Link href="/" className="shrink-0" onClick={onNavigate} aria-label="Home">
          <BrandLogo className={cn("h-9 w-auto shrink-0", logoClassName)} priority={priority} />
        </Link>

        <div className="relative min-h-10 min-w-0 flex-1">
          <Link
            href="/"
            onClick={onNavigate}
            className={cn(
              siteNameClasses,
              "block w-full min-w-0 truncate text-left transition-opacity duration-300 ease-out",
              heroCtaHidden ? "pointer-events-none opacity-0" : "opacity-100",
            )}
            tabIndex={heroCtaHidden ? -1 : 0}
            aria-hidden={heroCtaHidden}
          >
            {siteConfig.name}
          </Link>

          <div
            className={cn(
              "pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-out",
              heroCtaHidden ? "opacity-100" : "opacity-0",
            )}
            aria-hidden={!heroCtaHidden}
          >
            <Link
              href="/get-a-quote"
              className="pointer-events-auto inline-flex max-w-[min(100%,18rem)] items-center justify-center gap-1 rounded-lg bg-green-500 px-3 py-1.5 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/50 focus-visible:ring-offset-2"
              tabIndex={heroCtaHidden ? 0 : -1}
              aria-hidden={!heroCtaHidden}
            >
              <span className="min-w-0 truncate">Get My Free Estimate</span>
              <ArrowRight className="size-4 shrink-0" strokeWidth={2.5} aria-hidden />
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop: same lockup as SiteHeaderBranding */}
      <Link
        href="/"
        className={cn("hidden min-w-0 items-center gap-2 py-1 lg:flex", linkClassName)}
        onClick={onNavigate}
      >
        <BrandLogo className={cn("h-9 w-auto shrink-0", logoClassName)} priority={priority} />
        <div className="min-w-0">
          <span className={siteNameClasses}>{siteConfig.name}</span>
          <span className="hidden text-xs text-muted-foreground md:block">{siteConfig.tagline}</span>
        </div>
      </Link>
    </>
  )
}
