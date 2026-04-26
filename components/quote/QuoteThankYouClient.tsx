'use client'

import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

import { getStoredQuoteConfirmation, type StoredQuoteConfirmation } from '@/lib/quote-confirmation-storage'

import { ConfirmationScreen } from './ConfirmationScreen'

export function QuoteThankYouClient() {
  const [data, setData] = useState<StoredQuoteConfirmation | null | 'loading'>('loading')

  useEffect(() => {
    setData(getStoredQuoteConfirmation())
  }, [])

  useEffect(() => {
    if (data && data !== 'loading') {
      console.log('[conversion] quote_thank_you_page', {
        tier: data.result.tier,
      })
    }
  }, [data])

  if (data === 'loading') {
    return (
      <div className="mx-auto flex w-full max-w-lg flex-col items-center justify-center gap-3 py-24 px-4">
        <Loader2 className="size-8 animate-spin text-green-600" aria-hidden />
        <p className="text-sm text-gray-500">Loading your confirmation…</p>
        <p className="sr-only" role="status">
          Loading
        </p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="mx-auto w-full max-w-lg space-y-6 py-10 px-4 sm:py-14">
        <h1 className="text-center text-2xl font-bold text-gray-900 [font-family:var(--font-dm-sans),var(--font-heading),ui-sans-serif,system-ui,sans-serif]">
          No estimate to show
        </h1>
        <p className="text-center text-base text-gray-500">
          This page is shown after you complete the estimate form. If you used a new tab, private browsing, or cleared
          site data, your confirmation could not be restored.
        </p>
        <div className="flex flex-col items-center gap-2">
          <Link
            href="/get-a-quote"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-green-500 px-6 text-base font-semibold text-white transition-colors hover:bg-green-600"
          >
            Get a free estimate
          </Link>
          <Link href="/" className="text-sm font-medium text-gray-600 hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    )
  }

  return <ConfirmationScreen result={data.result} name={data.name} />
}
