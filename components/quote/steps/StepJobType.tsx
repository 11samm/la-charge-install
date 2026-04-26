'use client'

import { useEffect, useRef } from 'react'
import { CheckCircle2, PanelTop, Settings, Zap } from 'lucide-react'

import { StickyCtaBar } from '@/components/quote/StickyCtaBar'
import { cn } from '@/lib/utils'

import type { JobType, WizardState } from '../types'

const OPTIONS: Array<{
  value: NonNullable<WizardState['jobType']>
  label: string
  hint: string
  Icon: typeof Zap
}> = [
  { value: 'charger', label: 'EV Charger Install', hint: 'Level 2 home charging station', Icon: Zap },
  { value: 'panel', label: 'Panel Upgrade', hint: 'Upgrade or replace your electrical panel', Icon: PanelTop },
  { value: 'both', label: 'Both Services', hint: 'EV charger install + panel upgrade', Icon: Settings },
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
  const canProceed = jobType !== ''

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <div className="flex min-h-[min(100dvh,720px)] flex-col px-4 py-8 sm:min-h-0 sm:px-0 sm:py-12">
      <div className="flex-1 space-y-6">
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
                    <div className="min-w-0">
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
      </div>

      <StickyCtaBar
        canProceed={canProceed}
        helperText="Select a service above"
        onNext={() => onNext({})}
      />
    </div>
  )
}
