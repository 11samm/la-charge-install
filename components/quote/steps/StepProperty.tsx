'use client'

import { useEffect, useRef } from 'react'
import { Building2, CheckCircle2, Home, HousePlus } from 'lucide-react'
import { importLibrary, setOptions } from '@googlemaps/js-api-loader'

import { StickyCtaBar } from '@/components/quote/StickyCtaBar'
import { cn } from '@/lib/utils'

import type { PropertyType, WizardState } from '../types'

const OPTIONS: Array<{
  value: Exclude<PropertyType, ''>
  label: string
  hint: string
  Icon: typeof Home
}> = [
  { value: 'single-family', label: 'Single family home', hint: 'Standalone house', Icon: Home },
  { value: 'townhouse-condo', label: 'Townhouse / Condo', hint: 'Shared walls or HOA-managed property', Icon: Building2 },
  { value: 'multi-unit-adu', label: 'Multi-unit / ADU', hint: 'Accessory dwelling unit or multi-unit property', Icon: HousePlus },
]

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

function propertyHelperText(propertyType: WizardState['propertyType'], zipOk: boolean) {
  if (propertyType === '' && !zipOk) {
    return 'Select a property type and enter a valid 5-digit ZIP or address above'
  }
  if (propertyType === '') {
    return 'Select a property type above'
  }
  return 'Enter a valid 5-digit ZIP or full address above'
}

export function StepProperty({
  propertyType,
  address,
  zipCode,
  onFieldUpdate,
  onNext,
  onBack,
}: {
  propertyType: WizardState['propertyType']
  address: string
  zipCode: string
  onFieldUpdate: (p: Partial<WizardState>) => void
  onNext: (p: Partial<WizardState>) => void
  onBack: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const acRef = useRef<google.maps.places.Autocomplete | null>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  const zipOk = /^\d{5}$/.test(zipCode)
  const canProceed = propertyType !== '' && zipOk

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

  const onAddressChange = (value: string) => {
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
    <div className="flex min-h-[min(100dvh,720px)] flex-col px-4 py-8 sm:min-h-0 sm:px-0 sm:py-12">
      <div className="flex-1 space-y-6">
      <fieldset>
        <legend className="sr-only">Property type and address</legend>
        <h2
          ref={headingRef}
          id="step-heading"
          tabIndex={-1}
          className="text-2xl font-bold text-gray-900 [font-family:var(--font-dm-sans),var(--font-heading),ui-sans-serif,system-ui,sans-serif]"
        >
          Your property
        </h2>
        <p className="mt-2 text-base text-gray-500">Tell us the property type and where it&apos;s located.</p>

        <div className="mt-8 space-y-3" role="group" aria-labelledby="step-heading">
          {OPTIONS.map(({ value, label, hint, Icon }) => {
            const selected = propertyType === value
            return (
              <button
                key={value}
                type="button"
                aria-pressed={selected}
                onClick={() => onFieldUpdate({ propertyType: value })}
                className={cn(
                  'flex min-h-20 w-full items-center justify-between gap-4 rounded-xl border-2 px-4 py-3 text-left transition-colors',
                  selected
                    ? 'border-green-500 bg-green-50 ring-2 ring-green-500/20'
                    : 'border-gray-200 bg-white hover:border-green-300'
                )}
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center text-green-700">
                    <Icon className="size-6" strokeWidth={2} />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900">{label}</div>
                    <div className="text-sm text-gray-500">{hint}</div>
                  </div>
                </div>
                {selected && <CheckCircle2 className="size-5 shrink-0 text-green-600" aria-hidden />}
              </button>
            )
          })}
        </div>

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
            onChange={(e) => onAddressChange(e.target.value)}
            placeholder="Enter your address or ZIP code"
            className="mt-2 h-14 w-full rounded-xl border border-gray-300 bg-white px-4 text-base text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
          />
          <p className="mt-2 text-sm text-gray-500">We serve the San Fernando Valley and surrounding areas</p>
        </div>
      </fieldset>
      </div>

      <StickyCtaBar
        canProceed={canProceed}
        onBack={onBack}
        helperText={propertyHelperText(propertyType, zipOk)}
        onNext={() => onNext({})}
      />
    </div>
  )
}
