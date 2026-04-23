import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'

import { BrandLogo } from '@/components/brand-logo'
import { evServiceLinks, hubPages, locationLinks, panelServiceLinks } from '@/lib/routes'
import { siteConfig } from '@/lib/site'

export function Footer() {
  return (
    <footer className="bg-foreground py-16 text-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_0.8fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BrandLogo className="h-8 w-auto shrink-0" />
              <span className="text-xl font-semibold tracking-tight">{siteConfig.name}</span>
            </div>
            <p className="max-w-sm leading-relaxed text-background/70">
              Licensed EV charger installation and panel upgrade services across the San Fernando Valley — utility-aware
              estimates and permit-ready installs.
            </p>
            <div className="mt-6 flex flex-col gap-3 text-sm text-background/80">
              <span>Licensed C-10 contractors</span>
              <span>4-hour response target</span>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-background/50">Contact</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href={siteConfig.phoneHref}
                  className="group flex items-center gap-3 text-background/80 hover:text-primary"
                >
                  <Phone className="size-4 text-primary" />
                  <span>{siteConfig.phoneDisplay}</span>
                </Link>
              </li>
              <li>
                <Link
                  href={`mailto:${siteConfig.email}`}
                  className="group flex items-center gap-3 text-background/80 hover:text-primary"
                >
                  <Mail className="size-4 text-primary" />
                  <span>{siteConfig.email}</span>
                </Link>
              </li>
              <li>
                <div className="flex items-start gap-3 text-background/80">
                  <MapPin className="size-4 text-primary mt-0.5 shrink-0" />
                  <address className="not-italic" itemScope itemType="https://schema.org/PostalAddress">
                    <span itemProp="addressLocality">{siteConfig.address.addressLocality}</span>,{' '}
                    <span itemProp="addressRegion">{siteConfig.address.addressRegion}</span>{' '}
                    <span itemProp="addressCountry">{siteConfig.address.addressCountry}</span>
                  </address>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-background/50">Core Pages</h3>
            <ul className="space-y-2 text-sm text-background/80">
              {hubPages.map((page) => (
                <li key={page.href}>
                  <Link href={page.href} className="hover:text-primary">
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-background/50">EV Services</h3>
            <ul className="space-y-2 text-sm text-background/80">
              {evServiceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-background/50">Panel & Areas</h3>
            <ul className="space-y-2 text-sm text-background/80">
              {panelServiceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-3 text-xs font-semibold uppercase tracking-[0.2em] text-background/50">
                Service Areas
              </li>
              {locationLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-background/10 pt-8 text-sm text-background/50 md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:justify-end">
            <Link href="/privacy-policy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-primary">
              Terms of Service
            </Link>
            <span className="hidden md:inline">|</span>
            <span>EV charger installation · Panel upgrades</span>
            <span className="hidden md:inline">|</span>
            <span>San Fernando Valley</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
