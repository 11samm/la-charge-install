'use client'

import { useEffect, useRef } from 'react'
import { PanelTop, Settings, Zap } from 'lucide-react'

import { cn } from '@/lib/utils'

import type { JobType, WizardState } from '../types'

const OPTIONS: Array<{
  value: NonNullable<WizardState['jobType']>
  label: string
  hint: string
  Icon: typeof Zap
}> = [
  { value: 'charger', label: 'EV Charger Install', hint: 'Level 2 home charging station', Icon: Zap },
  { value: 'panel', label: 'Panel Upgrade', hint: 'Upgrade or modernize your electrical panel', Icon: PanelTop },
  { value: 'both', label: 'Both Services', hint: 'EV charger + panel upgrade together', Icon: Settings },
]

export function StepJobType({
  jobType,
  onFieldUpdate,
  onNext,
}: {
  jobType: WizardState['jobType']
  onFieldUpdate: (p: Partial<WizardState>) => void
  onNext: (p: Partial<WizardState>) => void
}) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <div className="space-y-6 py-8 px-4 sm:py-12 sm:px-0">
      <fieldset>
        <legend className="sr-only">What can we help you with?</legend>
        <h2
          ref={headingRef}
          id="step-heading"
          tabIndex={-1}
          className="text-2xl font-bold text-gray-900 [font-family:var(--font-dm-sans),var(--font-heading),ui-sans-serif,system-ui,sans-serif]"
        >
          What can we help you with?
        </h2>
        <p className="mt-2 text-base text-gray-500">Select the service you need.</p>

        <div className="mt-8 space-y-3" role="group" aria-labelledby="step-heading">
          {OPTIONS.map(({ value, label, hint, Icon }) => {
            const selected = jobType === value
            return (
              <button
                key={value}
                type="button"
                aria-pressed={selected}
                onClick={() => onFieldUpdate({ jobType: value as JobType })}
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

      <button
        type="button"
        onClick={() => onNext({})}
        disabled={jobType === ''}
        className="flex h-14 w-full items-center justify-center rounded-xl bg-green-500 text-base font-semibold text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next →
      </button>
    </div>
  )
}
