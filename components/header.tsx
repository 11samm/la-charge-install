'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

import { MobileNav } from '@/components/mobile-nav'
import { ScrollAwareHeaderBranding } from '@/components/scroll-aware-header-branding'
import { Button } from '@/components/ui/button'
import { evServiceLinks, hubPages, locationLinks, panelServiceLinks } from '@/lib/routes'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-[100] w-full max-w-full border-b border-border bg-background pt-[env(safe-area-inset-top,0px)] pr-[var(--layout-scrollbar-pad)] shadow-sm [transform:translateZ(0)]">
      <div className="container mx-auto flex min-h-16 max-w-full items-stretch justify-between gap-3 px-4 py-2 sm:gap-4 sm:py-3">
        <ScrollAwareHeaderBranding priority freezeScrollCtaObserver={mobileMenuOpen} />

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {hubPages.slice(1).map((page) => (
            <Link key={page.href} href={page.href} className="text-sm font-medium text-muted-foreground hover:text-foreground">
              {page.label}
            </Link>
          ))}
          <NavMenu title="EV Charger Services" links={evServiceLinks} />
          <NavMenu title="Panel Services" links={panelServiceLinks} />
          <NavMenu title="Service Areas" links={locationLinks} />
        </nav>

        <div className="flex shrink-0 items-center self-stretch justify-end gap-2 sm:gap-3">
          <Button variant="outline" asChild className="hidden lg:inline-flex">
            <Link href="/get-a-quote">Get Estimate</Link>
          </Button>
          <MobileNav onOpenChange={setMobileMenuOpen} />
        </div>
      </div>
    </header>
  )
}

function NavMenu({
  title,
  links,
}: {
  title: string
  links: Array<{ href: string; label: string }>
}) {
  return (
    <div className="group relative">
      <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
        {title}
        <ChevronDown className="size-4" />
      </button>
      <div className="invisible absolute left-1/2 top-full z-50 mt-4 w-[320px] -translate-x-1/2 rounded-2xl border bg-background p-4 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100">
        <div className="grid gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
