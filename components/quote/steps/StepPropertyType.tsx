'use client'

import { useEffect, useRef, useState } from 'react'
import { Building2, CheckCircle2, Home, HousePlus } from 'lucide-react'

import { FormTrustCta } from '@/components/quote/FormTrustCta'
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

export function StepPropertyType({
  propertyType,
  onFieldUpdate,
  onNext,
  onBack,
}: {
  propertyType: WizardState['propertyType']
  onFieldUpdate: (p: Partial<WizardState>) => void
  onNext: (p: Partial<WizardState>) => void
  onBack: () => void
}) {
  const [attempted, setAttempted] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const canProceed = propertyType !== ''

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <div className="space-y-6 px-4 py-8 sm:px-0 sm:py-12">
      <fieldset>
        <legend className="sr-only">What type of property?</legend>
        <h2
          ref={headingRef}
          id="step-heading"
          tabIndex={-1}
          className="text-2xl font-bold text-gray-900 [font-family:var(--font-dm-sans),var(--font-heading),ui-sans-serif,system-ui,sans-serif]"
        >
          What type of property?
        </h2>
        <p className="mt-2 text-base text-gray-500">
          This helps us flag access and permitting details before we match your request.
        </p>

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
      </fieldset>

      {attempted && !canProceed && (
        <p className="text-sm font-medium text-red-600" role="alert">
          Please select an option to continue.
        </p>
      )}

      <FormTrustCta />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="min-h-12 w-auto self-start rounded-lg border-2 border-gray-200 bg-white px-4 font-medium text-gray-700 transition-colors hover:border-gray-300"
        >
          ← Back
        </button>
        <button
          type="button"
          aria-disabled={!canProceed}
          onClick={() => {
            if (!canProceed) {
              setAttempted(true)
              return
            }
            onNext({})
          }}
          className={cn(
            'h-14 w-full self-end rounded-xl text-base font-semibold transition-colors sm:min-w-[200px] sm:max-w-sm',
            canProceed ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-200 text-gray-400'
          )}
        >
          Next →
        </button>
      </div>
    </div>
  )
}
