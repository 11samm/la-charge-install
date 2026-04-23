import Link from 'next/link'

import { BrandLogo } from '@/components/brand-logo'
import { siteConfig } from '@/lib/site'

export default function GetAQuoteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-4 px-4 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold tracking-tight text-gray-900 [font-family:var(--font-dm-sans),var(--font-heading),ui-sans-serif,system-ui,sans-serif]"
          >
            <BrandLogo className="h-9 w-auto shrink-0" priority />
            {siteConfig.shortName}
          </Link>
          <p className="text-right text-xs text-gray-500 sm:text-sm">Licensed · Verified · 4-Hour Response</p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-0">{children}</main>

      <footer className="border-t border-gray-100 py-6">
        <p className="mx-auto max-w-2xl px-4 text-center text-xs leading-relaxed text-gray-400">
          By submitting, you agree to our{' '}
          <Link href="/terms-of-service" className="text-gray-600 underline underline-offset-2 hover:text-gray-900">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy-policy" className="text-gray-600 underline underline-offset-2 hover:text-gray-900">
            Privacy Policy
          </Link>{' '}
          and consent to be contacted by our licensed contractor network. We never share your info with more than 3
          contractors.
        </p>
      </footer>
    </div>
  )
}
