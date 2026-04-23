'use client'

import Link from 'next/link'
import { Check, Clock } from 'lucide-react'

import type { ConfirmationPayload } from './types'

function firstName(full: string) {
  const t = full.trim()
  if (!t) return 'there'
  return t.split(/\s+/)[0] ?? 'there'
}

export function ConfirmationScreen({ result, name }: { result: ConfirmationPayload; name: string }) {
  return (
    <div className="mx-auto w-full max-w-lg space-y-8 py-10 px-4 sm:py-14">
      <div className="flex flex-col items-center text-center">
        <div
          className="flex size-16 items-center justify-center rounded-full bg-green-500 text-white"
          aria-hidden
        >
          <Check className="size-9" strokeWidth={2.5} />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-gray-900 [font-family:var(--font-dm-sans),var(--font-heading),ui-sans-serif,system-ui,sans-serif]">
          You&apos;re in the queue, {firstName(name)}!
        </h1>
        <p className="mt-2 text-base text-gray-500">A licensed electrician will be in touch with you soon.</p>
      </div>

      <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Estimated project range</p>
        <p className="mt-1 text-3xl font-bold text-green-700">{result.estimateRange}</p>
        <p className="mt-2 text-xs text-gray-500">
          Final price depends on site conditions. Your contractor will confirm before any work begins. Prices
          shown are pre-rebate estimates. Ask your contractor about LADWP, BWP, or SCE rebates that may apply to
          your address.
        </p>
      </div>

      <div className="flex gap-3 text-left">
        <Clock className="mt-0.5 size-5 shrink-0 text-green-600" aria-hidden />
        <p className="text-sm text-gray-600">
          A licensed electrician will review your request and contact you within 4 business hours.
        </p>
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-900">What&apos;s next</p>
        <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-gray-600">
          <li>We review your request and assign a vetted C-10 licensed electrician</li>
          <li>They call you to confirm scope and schedule a site assessment</li>
          <li>You receive a quote</li>
        </ol>
      </div>

      <div className="space-y-2 border-t border-gray-100 pt-6 text-sm">
        <Link href="/ev-charger-installation" className="block font-medium text-green-600 hover:underline">
          Explore EV charger pricing →
        </Link>
        <Link
          href="/electrical-panel-services/panel-upgrade-cost"
          className="block font-medium text-green-600 hover:underline"
        >
          See panel upgrade costs →
        </Link>
        <Link href="/" className="block font-medium text-gray-600 hover:underline">
          Back to home →
        </Link>
      </div>
    </div>
  )
}
