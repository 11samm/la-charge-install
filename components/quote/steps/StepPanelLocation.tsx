'use client'

import { useEffect, useRef } from 'react'

import { cn } from '@/lib/utils'

import type { WizardState } from '../types'

const OPTIONS: Array<{
  value: Exclude<WizardState['panelLocation'], ''>
  label: string
}> = [
  { value: 'garage', label: 'Inside the garage' },
  { value: 'exterior', label: 'Outside / on exterior wall' },
  { value: 'interior', label: 'Inside the house / utility room' },
]

export function StepPanelLocation({
  panelLocation,
  onFieldUpdate,
  onNext,
  onBack,
}: {
  panelLocation: WizardState['panelLocation']
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
        <legend className="sr-only">Where is your electrical panel located?</legend>
        <h2
          ref={headingRef}
          id="step-heading"
          tabIndex={-1}
          className="text-2xl font-bold text-gray-900 [font-family:var(--font-dm-sans),var(--font-heading),ui-sans-serif,system-ui,sans-serif]"
        >
          Where is your electrical panel located?
        </h2>
        <p className="mt-2 text-base text-gray-500">
          This helps estimate access, routing, and the likely amount of electrical work required.
        </p>

        <div className="mt-8 space-y-3" role="group" aria-labelledby="step-heading">
          {OPTIONS.map(({ value, label }) => {
            const selected = panelLocation === value
            return (
              <button
                key={value}
                type="button"
                aria-pressed={selected}
                onClick={() => onFieldUpdate({ panelLocation: value })}
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
          disabled={panelLocation === ''}
          onClick={() => onNext({})}
          className="h-14 w-full max-w-sm self-end rounded-xl bg-green-500 text-base font-semibold text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-[200px]"
        >
          Next →
        </button>
      </div>
    </div>
  )
}
