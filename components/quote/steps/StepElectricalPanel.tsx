'use client'

import { useEffect, useRef } from 'react'
import { Car, CheckCircle2, CircleHelp, LayoutGrid, Sun, Zap } from 'lucide-react'

import { StickyCtaBar } from '@/components/quote/StickyCtaBar'
import { cn } from '@/lib/utils'

import type { PanelCapacity, PanelLocation, WizardState } from '../types'

const PANEL_OPTIONS: Array<{
  value: NonNullable<Exclude<PanelCapacity, ''>>
  label: string
  hint: string
  Icon: typeof Zap
  iconClassName: string
}> = [
  {
    value: '200a',
    label: '200 Amp',
    hint: "You're all set for Level 2 charging",
    Icon: Zap,
    iconClassName: 'size-6',
  },
  {
    value: '100a',
    label: '100 Amp',
    hint: 'May need an upgrade depending on your load',
    Icon: Zap,
    iconClassName: 'size-5 opacity-75',
  },
  {
    value: '60a',
    label: '60 Amp',
    hint: 'Likely requires a panel upgrade first',
    Icon: Zap,
    iconClassName: 'size-4 opacity-45',
  },
  {
    value: 'unknown',
    label: "I Don't Know",
    hint: "We'll assess during photo inspection",
    Icon: CircleHelp,
    iconClassName: 'size-6',
  },
]

const PANEL_LOC_OPTIONS: Array<{
  value: Exclude<PanelLocation, ''>
  label: string
  Icon: typeof Car
}> = [
  { value: 'garage', label: 'Inside the garage', Icon: Car },
  { value: 'exterior', label: 'Outside / on exterior wall', Icon: Sun },
  { value: 'interior', label: 'Inside the house / utility room', Icon: LayoutGrid },
]

function panelHelperText(panelCapacity: WizardState['panelCapacity'], panelLocation: WizardState['panelLocation']) {
  if (panelCapacity === '' && panelLocation === '') {
    return 'Select your panel size and location above'
  }
  if (panelCapacity === '') {
    return 'Select your panel size above'
  }
  return 'Select your panel location above'
}

export function StepElectricalPanel({
  panelCapacity,
  panelLocation,
  onFieldUpdate,
  onNext,
  onBack,
}: {
  panelCapacity: WizardState['panelCapacity']
  panelLocation: WizardState['panelLocation']
  onFieldUpdate: (p: Partial<WizardState>) => void
  onNext: (p: Partial<WizardState>) => void
  onBack: () => void
}) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  const canProceed = panelCapacity !== '' && panelLocation !== ''

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <div className="flex min-h-[min(100dvh,720px)] flex-col px-4 py-8 sm:min-h-0 sm:px-0 sm:py-12">
      <div className="flex-1 space-y-8">
        <div>
          <h2
            ref={headingRef}
            id="step-heading"
            tabIndex={-1}
            className="text-2xl font-bold text-gray-900 [font-family:var(--font-dm-sans),var(--font-heading),ui-sans-serif,system-ui,sans-serif]"
          >
            Your electrical panel
          </h2>
          <p className="mt-2 text-base text-gray-500">This tells us what you&apos;re working with and what may be needed.</p>
        </div>

        <fieldset>
          <legend className="mb-3 text-sm font-semibold text-gray-800">What size is your electrical panel?</legend>
          <p className="mb-3 text-sm text-gray-500">
            Check the main breaker label on your electrical panel — it usually shows the amperage.
          </p>
          <div className="space-y-3" role="group" aria-label="Panel size">
            {PANEL_OPTIONS.map(({ value, label, hint, Icon, iconClassName }) => {
              const selected = panelCapacity === value
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onFieldUpdate({ panelCapacity: value })}
                  className={cn(
                    'flex min-h-20 w-full items-center justify-between gap-4 rounded-xl border-2 px-4 py-3 text-left transition-colors',
                    selected
                      ? 'border-green-500 bg-green-50 ring-2 ring-green-500/20'
                      : 'border-gray-200 bg-white hover:border-green-300'
                  )}
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center text-green-700">
                      <Icon className={iconClassName} strokeWidth={2} />
                    </div>
                    <span className="min-w-0">
                      <span className="block text-base font-medium text-gray-900">{label}</span>
                      <span className="block text-sm text-gray-500">{hint}</span>
                    </span>
                  </div>
                  {selected && <CheckCircle2 className="size-5 shrink-0 text-green-600" aria-hidden />}
                </button>
              )
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 text-sm font-semibold text-gray-800">Where is your electrical panel located?</legend>
          <p className="mb-3 text-sm text-gray-500">
            This helps estimate access, routing, and the likely amount of electrical work required.
          </p>
          <div className="space-y-3" role="group" aria-label="Panel location">
            {PANEL_LOC_OPTIONS.map(({ value, label, Icon }) => {
              const selected = panelLocation === value
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onFieldUpdate({ panelLocation: value })}
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
                    <span className="text-base font-medium text-gray-900">{label}</span>
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
        onBack={onBack}
        helperText={panelHelperText(panelCapacity, panelLocation)}
        onNext={() => onNext({})}
      />
    </div>
  )
}
