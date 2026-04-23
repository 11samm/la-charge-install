'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader2 } from 'lucide-react'

import { formatPhoneUs, isValidOptionalEmail, phoneDigitsOnly } from '@/lib/phone-format'
import type { WizardState } from '../types'

function isRequiredEmail(value: string): boolean {
  return value.trim() !== '' && isValidOptionalEmail(value)
}

export function StepContact({
  name,
  phone,
  email,
  isSubmitting,
  errorMessage,
  onFieldUpdate,
  onBack,
  onSubmit,
}: {
  name: string
  phone: string
  email: string
  isSubmitting: boolean
  errorMessage: string | null
  onFieldUpdate: (p: Partial<WizardState>) => void
  onBack: () => void
  onSubmit: () => void
}) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [touched, setTouched] = useState({ name: false, phone: false, email: false })

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  const nameOk = name.trim().length >= 2
  const phoneOk = phoneDigitsOnly(phone).length >= 10
  const emailOk = isRequiredEmail(email)
  const canSubmit = nameOk && phoneOk && emailOk && !isSubmitting

  return (
    <div className="space-y-6 py-8 px-4 sm:py-12 sm:px-0">
      <fieldset>
        <legend className="sr-only">Who should we contact?</legend>
        <h2
          ref={headingRef}
          id="step-heading"
          tabIndex={-1}
          className="text-2xl font-bold text-gray-900 [font-family:var(--font-dm-sans),var(--font-heading),ui-sans-serif,system-ui,sans-serif]"
        >
          Who should we contact?
        </h2>
        <p className="mt-2 text-base text-gray-500">A licensed electrician from your area will call soon</p>

        <div className="mt-8 space-y-4">
          <div>
            <label htmlFor="q-name" className="text-sm font-medium text-gray-700">
              Full name
            </label>
            <input
              id="q-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => onFieldUpdate({ name: e.target.value })}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              placeholder="Jane Smith"
              className="mt-1 h-14 w-full rounded-xl border border-gray-300 bg-white px-4 text-base text-gray-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
            {touched.name && !nameOk && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                Name is required
              </p>
            )}
          </div>
          <div>
            <label htmlFor="q-phone" className="text-sm font-medium text-gray-700">
              Phone number
            </label>
            <input
              id="q-phone"
              type="tel"
              autoComplete="tel"
              inputMode="numeric"
              value={formatPhoneUs(phone)}
              onChange={(e) => onFieldUpdate({ phone: phoneDigitsOnly(e.target.value) })}
              onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
              placeholder="(818) 555-0123"
              className="mt-1 h-14 w-full rounded-xl border border-gray-300 bg-white px-4 text-base text-gray-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
            {touched.phone && !phoneOk && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                Enter a valid phone number
              </p>
            )}
          </div>
          <div>
            <label htmlFor="q-email" className="text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              id="q-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => onFieldUpdate({ email: e.target.value })}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              placeholder="jane@email.com"
              className="mt-1 h-14 w-full rounded-xl border border-gray-300 bg-white px-4 text-base text-gray-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
            {touched.email && !emailOk && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                Enter a valid email address
              </p>
            )}
          </div>
        </div>

        <p className="mt-4 text-xs text-gray-400">
          By submitting, you agree to be contacted by our licensed contractor network about your project. We
          never share your info with more than 3 contractors.
        </p>
      </fieldset>

      {errorMessage && (
        <p className="text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="min-h-12 w-auto self-start rounded-lg border-2 border-gray-200 bg-white px-4 font-medium text-gray-700 transition-colors hover:border-gray-300"
        >
          ← Back
        </button>
        <button
          type="button"
          disabled={!canSubmit}
          onClick={onSubmit}
          className="flex h-14 w-full min-w-[200px] items-center justify-center gap-2 rounded-xl bg-green-500 text-base font-semibold text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting && <Loader2 className="size-5 animate-spin" aria-hidden />}
          {isSubmitting ? 'Submitting…' : 'Get My Estimate →'}
        </button>
      </div>
    </div>
  )
}
