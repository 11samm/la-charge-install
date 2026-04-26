'use client'

import { usePathname } from 'next/navigation'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export function MainChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isQuote = pathname === '/get-a-quote' || pathname?.startsWith('/get-a-quote/')

  if (isQuote) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen min-w-0 w-full max-w-full flex-col overflow-x-hidden">
      <Header />
      {/* Reserve space for fixed header + notch (sticky was unreliable inside this flex stack on mobile) */}
      <div
        aria-hidden
        className="shrink-0"
        style={{ height: 'calc(env(safe-area-inset-top, 0px) + 4rem)' }}
      />
      {children}
      <Footer />
    </div>
  )
}
