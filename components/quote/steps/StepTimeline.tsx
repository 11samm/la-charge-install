'use client'

import { useEffect, useRef } from 'react'

import { cn } from '@/lib/utils'

import type { WizardState } from '../types'

const OPTIONS: Array<{
  value: NonNullable<WizardState['timeline']>
  label: string
  hint: string
}> = [
  { value: 'asap', label: 'ASAP', hint: "I'm ready to book now" },
  { value: 'within-month', label: 'Within 1 Month', hint: 'Planning ahead' },
  { value: 'researching', label: 'Just Researching', hint: 'No pressure' },
]

export function StepTimeline({
  timeline,
  onFieldUpdate,
  onNext,
  onBack,
}: {
  timeline: WizardState['timeline']
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
        <legend className="sr-only">When do you need this done?</legend>
        <h2
          ref={headingRef}
          id="step-heading"
          tabIndex={-1}
          className="text-2xl font-bold text-gray-900 [font-family:var(--font-dm-sans),var(--font-heading),ui-sans-serif,system-ui,sans-serif]"
        >
          When do you need this done?
        </h2>
        <p className="mt-2 text-base text-gray-500">This helps us prioritize your project.</p>

        <div className="mt-8 space-y-3" role="group" aria-labelledby="step-heading">
          {OPTIONS.map(({ value, label, hint }) => {
            const selected = timeline === value
            return (
              <button
                key={value}
                type="button"
                aria-pressed={selected}
                onClick={() => onFieldUpdate({ timeline: value })}
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

      <button
        type="button"
        disabled={timeline === ''}
        onClick={() => onNext({})}
        className="h-14 w-full rounded-xl border-2 border-gray-200 bg-white text-base font-semibold text-gray-800 transition-colors hover:border-green-300 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next →
      </button>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="min-h-12 w-auto self-start rounded-lg border-2 border-gray-200 bg-white px-4 font-medium text-gray-700 transition-colors hover:border-gray-300"
        >
          ← Back
        </button>
      </div>
    </div>
  )
}
