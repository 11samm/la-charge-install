'use client'

import { useEffect, useRef } from 'react'
import { importLibrary, setOptions } from '@googlemaps/js-api-loader'

import type { WizardState } from '../types'

function extractFromComponents(
  place: google.maps.places.PlaceResult
): { address: string; city: string; zipCode: string } {
  const address = place.formatted_address ?? ''
  let city = ''
  let zipCode = ''
  for (const c of place.address_components ?? []) {
    if (c.types.includes('locality')) city = c.long_name
    if (c.types.includes('sublocality_level_1') && !city) city = c.long_name
    if (c.types.includes('postal_code')) zipCode = c.long_name
  }
  return { address, city, zipCode }
}

function pickZipFromText(value: string): string | null {
  const t = value.trim()
  if (/^\d{5}$/.test(t)) return t
  const m = /\b(\d{5})\b/.exec(t)
  return m ? m[1] : null
}

export function StepAddress({
  address,
  zipCode,
  onFieldUpdate,
  onNext,
  onBack,
}: {
  address: string
  zipCode: string
  onFieldUpdate: (p: Partial<WizardState>) => void
  onNext: (p: Partial<WizardState>) => void
  onBack: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const acRef = useRef<google.maps.places.Autocomplete | null>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const ready = /^\d{5}$/.test(zipCode)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  const onFieldUpdateRef = useRef(onFieldUpdate)
  onFieldUpdateRef.current = onFieldUpdate

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    if (!key || !inputRef.current) return

    let mounted = true

    const run = async () => {
      try {
        setOptions({ key, v: 'weekly' })
        await importLibrary('places')
        if (!mounted || !inputRef.current) return

        const ac = new google.maps.places.Autocomplete(inputRef.current, {
          fields: ['address_components', 'formatted_address'],
          componentRestrictions: { country: 'us' },
          types: ['address'],
        })
        acRef.current = ac
        ac.addListener('place_changed', () => {
          const p = ac.getPlace()
          const { address: a, city: c, zipCode: z } = extractFromComponents(p)
          const finalZip = z || pickZipFromText(a) || ''
          onFieldUpdateRef.current({ address: a, city: c, zipCode: finalZip })
        })
      } catch {
        // Plain text + ZIP only — no user-facing error
      }
    }

    void run()

    return () => {
      mounted = false
      if (acRef.current) {
        google.maps.event.clearInstanceListeners(acRef.current)
        acRef.current = null
      }
    }
  }, [])

  const onChange = (value: string) => {
    const z = pickZipFromText(value)
    const updates: Partial<WizardState> = { address: value }
    if (z) {
      updates.zipCode = z
      if (/^\d{5}$/.test(value.trim())) updates.city = ''
    } else {
      updates.zipCode = ''
    }
    onFieldUpdate(updates)
  }

  return (
    <div className="space-y-6 py-8 px-4 sm:py-12 sm:px-0">
      <fieldset>
        <legend className="sr-only">Where is the property located?</legend>
        <h2
          ref={headingRef}
          id="step-heading"
          tabIndex={-1}
          className="text-2xl font-bold text-gray-900 [font-family:var(--font-dm-sans),var(--font-heading),ui-sans-serif,system-ui,sans-serif]"
        >
          Where is the property located?
        </h2>
        <p className="mt-2 text-base text-gray-500">
          We use this to check local permits and utility rebates.
        </p>

        <div className="mt-8">
          <label htmlFor="quote-address" className="text-sm font-medium text-gray-700">
            Street address or ZIP
          </label>
          <input
            id="quote-address"
            ref={inputRef}
            type="text"
            autoComplete="street-address"
            value={address}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter your address or ZIP code"
            className="mt-2 h-14 w-full rounded-xl border border-gray-300 bg-white px-4 text-base text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
          />
          <p className="mt-2 text-sm text-gray-500">We serve the San Fernando Valley and surrounding areas</p>
        </div>
      </fieldset>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="min-h-12 w-auto self-start rounded-lg border-2 border-gray-200 bg-white px-4 font-medium text-gray-700 transition-colors hover:border-gray-300"
        >
          ← Back
        </button>
        <div className="flex flex-1 justify-end">
          <button
            type="button"
            disabled={!ready}
            onClick={() => onNext({})}
            className="h-14 w-full max-w-sm rounded-xl bg-green-500 text-base font-semibold text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:min-w-[200px]"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}
