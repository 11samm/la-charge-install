'use client'

import { useEffect, useRef } from 'react'
import {
  CheckCircle2,
  CloudSun,
  Home,
  LayoutGrid,
  MapPin,
  Plug,
  Tent,
  Warehouse,
} from 'lucide-react'

import { StickyCtaBar } from '@/components/quote/StickyCtaBar'
import { cn } from '@/lib/utils'

import type { ChargerLocation, WizardState } from '../types'

const GARAGE_OPTIONS: Array<{
  value: Exclude<WizardState['garageSituation'], ''>
  label: string
  Icon: typeof Home
}> = [
  { value: 'attached', label: 'Attached garage', Icon: Home },
  { value: 'detached', label: 'Detached garage', Icon: Warehouse },
  { value: 'carport', label: 'Carport', Icon: Tent },
  { value: 'no-garage', label: 'No garage — outdoor install', Icon: CloudSun },
]

const CHARGER_LOC_OPTIONS: Array<{
  value: Exclude<ChargerLocation, ''>
  label: string
  Icon: typeof Plug
}> = [
  { value: 'garage-wall', label: 'Inside the garage wall', Icon: Plug },
  { value: 'outside-driveway', label: 'Outside / driveway', Icon: MapPin },
  { value: 'same-wall-panel', label: 'Same wall as panel', Icon: LayoutGrid },
]

function placementHelperText(
  garageSituation: WizardState['garageSituation'],
  chargerLocation: WizardState['chargerLocation']
) {
  if (garageSituation === '' && chargerLocation === '') {
    return 'Select your garage type and charger location above'
  }
  if (garageSituation === '') {
    return 'Select your garage type above'
  }
  return 'Select your charger location above'
}

export function StepChargerPlacement({
  garageSituation,
  chargerLocation,
  onFieldUpdate,
  onNext,
  onBack,
}: {
  garageSituation: WizardState['garageSituation']
  chargerLocation: WizardState['chargerLocation']
  onFieldUpdate: (p: Partial<WizardState>) => void
  onNext: (p: Partial<WizardState>) => void
  onBack: () => void
}) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  const canProceed = garageSituation !== '' && chargerLocation !== ''

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
            Charger placement
          </h2>
          <p className="mt-2 text-base text-gray-500">
            This helps us plan conduit routing, wire run length, and install cost.
          </p>
        </div>

        <fieldset>
          <legend className="mb-3 text-sm font-semibold text-gray-800">What is your garage situation?</legend>
          <p className="mb-3 text-sm text-gray-500">
            Garage access changes trenching, conduit routing, and charger placement options.
          </p>
          <div className="space-y-3" role="group" aria-label="Garage situation">
            {GARAGE_OPTIONS.map(({ value, label, Icon }) => {
              const selected = garageSituation === value
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onFieldUpdate({ garageSituation: value })}
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

        <fieldset>
          <legend className="mb-3 text-sm font-semibold text-gray-800">Where do you want the charger installed?</legend>
          <p className="mb-3 text-sm text-gray-500">
            Charger placement is one of the biggest inputs for wire run length and total install cost.
          </p>
          <div className="space-y-3" role="group" aria-label="Charger location">
            {CHARGER_LOC_OPTIONS.map(({ value, label, Icon }) => {
              const selected = chargerLocation === value
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onFieldUpdate({ chargerLocation: value })}
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
        helperText={placementHelperText(garageSituation, chargerLocation)}
        onNext={() => onNext({})}
      />
    </div>
  )
}
