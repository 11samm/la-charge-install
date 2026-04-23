'use client'

import { useEffect, useRef } from 'react'

import { cn } from '@/lib/utils'

import type { WizardState } from '../types'

const OPTIONS: Array<{
  value: Exclude<WizardState['chargerLocation'], ''>
  label: string
}> = [
  { value: 'garage-wall', label: 'Inside the garage wall' },
  { value: 'outside-driveway', label: 'Outside / driveway' },
  { value: 'same-wall-panel', label: 'Same wall as panel' },
]

export function StepChargerLocation({
  chargerLocation,
  onFieldUpdate,
  onNext,
  onBack,
}: {
  chargerLocation: WizardState['chargerLocation']
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
        <legend className="sr-only">Where do you want the charger installed?</legend>
        <h2
          ref={headingRef}
          id="step-heading"
          tabIndex={-1}
          className="text-2xl font-bold text-gray-900 [font-family:var(--font-dm-sans),var(--font-heading),ui-sans-serif,system-ui,sans-serif]"
        >
          Where do you want the charger installed?
        </h2>
        <p className="mt-2 text-base text-gray-500">
          Charger placement is one of the biggest inputs for wire run length and total install cost.
        </p>

        <div className="mt-8 space-y-3" role="group" aria-labelledby="step-heading">
          {OPTIONS.map(({ value, label }) => {
            const selected = chargerLocation === value
            return (
              <button
                key={value}
                type="button"
                aria-pressed={selected}
                onClick={() => onFieldUpdate({ chargerLocation: value })}
                className={cn(
                  'flex min-h-16 w-full items-center rounded-xl border-2 px-4 py-3 text-left text-base font-medium transition-colors',
                  selected
                    ? 'border-green-500 bg-green-50 ring-2 ring-green-500/20 text-gray-900'
                    : 'border-gray-200 bg-white text-gray-900 hover:border-green-300'
                )}
              >
                {label}
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
          disabled={chargerLocation === ''}
          onClick={() => onNext({})}
          className="h-14 w-full max-w-sm self-end rounded-xl bg-green-500 text-base font-semibold text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-[200px]"
        >
          Next →
        </button>
      </div>
    </div>
  )
}
