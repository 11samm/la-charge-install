import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

import { BrandLogo } from '@/components/brand-logo'
import { Button } from '@/components/ui/button'
import { evServiceLinks, hubPages, locationLinks, panelServiceLinks } from '@/lib/routes'
import { siteConfig } from '@/lib/site'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex min-h-16 items-center justify-between gap-6 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <BrandLogo className="h-9 w-auto shrink-0" priority />
          <div>
            <span className="block text-lg font-semibold tracking-tight">{siteConfig.name}</span>
            <span className="hidden text-xs text-muted-foreground md:block">{siteConfig.tagline}</span>
          </div>
        </Link>

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

        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link href="/get-a-quote">Get Estimate</Link>
          </Button>
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
