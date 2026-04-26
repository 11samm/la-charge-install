'use client'

import { useEffect, useRef, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

import { FormTrustCta } from '@/components/quote/FormTrustCta'
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
  const [attempted, setAttempted] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const canProceed = timeline !== ''

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <div className="space-y-6 px-4 py-8 sm:px-0 sm:py-12">
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
                  'flex min-h-16 w-full items-center justify-between gap-2 rounded-xl border-2 px-4 py-3 text-left transition-colors',
                  selected
                    ? 'border-green-500 bg-green-50 ring-2 ring-green-500/20'
                    : 'border-gray-200 bg-white hover:border-green-300'
                )}
              >
                <span>
                  <span className="block text-base font-medium text-gray-900">{label}</span>
                  <span className="block text-sm text-gray-500">{hint}</span>
                </span>
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
