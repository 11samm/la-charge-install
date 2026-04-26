import Link from 'next/link'

import { BrandLogo } from '@/components/brand-logo'
import { siteConfig } from '@/lib/site'
import { cn } from '@/lib/utils'

/** Shared lockup for the sticky header and mobile menu so typography matches exactly (weight, family, smoothing). */
const siteNameClasses =
  'block min-w-0 text-balance font-sans text-lg font-semibold leading-tight tracking-tight text-foreground [font-kerning:normal]'

type SiteHeaderBrandingProps = {
  linkClassName?: string
  logoClassName?: string
  onNavigate?: () => void
  /** Pass through to next/image in BrandLogo (LCP) */
  priority?: boolean
}

export function SiteHeaderBranding({ linkClassName, logoClassName, onNavigate, priority }: SiteHeaderBrandingProps) {
  return (
    <Link href="/" className={cn('flex min-w-0 items-center gap-2 py-1', linkClassName)} onClick={onNavigate}>
      <BrandLogo className={cn('h-9 w-auto shrink-0', logoClassName)} priority={priority} />
      <div className="min-w-0">
        <span className={siteNameClasses}>{siteConfig.name}</span>
        <span className="hidden text-xs text-muted-foreground md:block">{siteConfig.tagline}</span>
      </div>
    </Link>
  )
}
