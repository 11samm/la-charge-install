'use client'

import { useEffect, useRef } from 'react'
import { Building2, Home, HousePlus } from 'lucide-react'

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
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <div className="space-y-6 py-8 px-4 sm:py-12 sm:px-0">
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
                  'flex min-h-20 w-full items-center gap-4 rounded-xl border-2 px-4 py-3 text-left transition-colors',
                  selected
                    ? 'border-green-500 bg-green-50 ring-2 ring-green-500/20'
                    : 'border-gray-200 bg-white hover:border-green-300'
                )}
              >
                <div className="flex size-10 shrink-0 items-center justify-center text-green-700">
                  <Icon className="size-6" strokeWidth={2} />
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900">{label}</div>
                  <div className="text-sm text-gray-500">{hint}</div>
                </div>
              </button>
            )
          })}
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
        <button
          type="button"
          disabled={propertyType === ''}
          onClick={() => onNext({})}
          className="h-14 w-full max-w-sm self-end rounded-xl bg-green-500 text-base font-semibold text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-[200px]"
        >
          Next →
        </button>
      </div>
    </div>
  )
}
