'use client'

import { useEffect, useRef } from 'react'

import { cn } from '@/lib/utils'

import type { PanelCapacity, WizardState } from '../types'

const OPTIONS: Array<{
  value: NonNullable<Exclude<PanelCapacity, ''>>
  label: string
  hint: string
}> = [
  { value: '200a', label: '200 Amp', hint: "You're all set for Level 2 charging" },
  { value: '100a', label: '100 Amp', hint: 'May need an upgrade depending on your load' },
  { value: '60a', label: '60 Amp', hint: 'Likely requires a panel upgrade first' },
  { value: 'unknown', label: "I Don't Know", hint: "We'll assess during photo inspection" },
]

export function StepPanel({
  panelCapacity,
  onFieldUpdate,
  onNext,
  onBack,
}: {
  panelCapacity: WizardState['panelCapacity']
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
        <legend className="sr-only">What size is your electrical panel?</legend>
        <h2
          ref={headingRef}
          id="step-heading"
          tabIndex={-1}
          className="text-2xl font-bold text-gray-900 [font-family:var(--font-dm-sans),var(--font-heading),ui-sans-serif,system-ui,sans-serif]"
        >
          What size is your electrical panel?
        </h2>
        <p className="mt-2 text-base text-gray-500">
          Check the main breaker label on your electrical panel — it usually shows the amperage.
        </p>

        <div className="mt-8 space-y-3" role="group" aria-labelledby="step-heading">
          {OPTIONS.map(({ value, label, hint }) => {
            const selected = panelCapacity === value
            return (
              <button
                key={value}
                type="button"
                aria-pressed={selected}
                onClick={() => onFieldUpdate({ panelCapacity: value })}
                className={cn(
                  'flex min-h-16 w-full flex-col items-start justify-center rounded-xl border-2 px-4 py-3 text-left transition-colors',
                  selected
                    ? 'border-green-500 bg-green-50 ring-2 ring-green-500/20'
                    : 'border-gray-200 bg-white hover:border-green-300'
                )}
              >
                <span className="text-base font-medium text-gray-900">{label}</span>
                <span className="text-sm text-gray-500">{hint}</span>
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
          disabled={panelCapacity === ''}
          onClick={() => onNext({})}
          className="h-14 w-full max-w-sm self-end rounded-xl bg-green-500 text-base font-semibold text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-[200px]"
        >
          Next →
        </button>
      </div>
    </div>
  )
}
