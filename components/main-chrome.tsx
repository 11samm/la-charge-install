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
    <div className="flex min-h-screen flex-col">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
