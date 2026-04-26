'use client'

import { useEffect, useRef } from 'react'
import { CheckCircle2 } from 'lucide-react'

import { StickyCtaBar } from '@/components/quote/StickyCtaBar'
import { cn } from '@/lib/utils'

import { StepPhoto } from './StepPhoto'
import type { WizardState } from '../types'

const TIMELINE_OPTIONS: Array<{
  value: NonNullable<WizardState['timeline']>
  label: string
  hint: string
}> = [
  { value: 'asap', label: 'ASAP', hint: "I'm ready to book now" },
  { value: 'within-month', label: 'Within 1 Month', hint: 'Planning ahead' },
  { value: 'researching', label: 'Just Researching', hint: 'No pressure' },
]

const noop = () => {}

function infoHelperText(timelineOk: boolean, hasPhotos: boolean, mlTrainingConsent: boolean) {
  if (!timelineOk) {
    return 'Select when you need this done above'
  }
  if (hasPhotos && !mlTrainingConsent) {
    return 'Check "Allow anonymized project data…" below to continue with your photos'
  }
  return 'Answer all questions above to continue'
}

export function StepInfo({
  timeline,
  photos,
  mlTrainingConsent,
  onFieldUpdate,
  onNext,
  onBack,
}: {
  timeline: WizardState['timeline']
  photos: File[]
  mlTrainingConsent: boolean
  onFieldUpdate: (p: Partial<WizardState>) => void
  onNext: (p: Partial<WizardState>) => void
  onBack: () => void
}) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const timelineOk = timeline !== ''
  const hasPhotos = photos.length > 0
  const consentOkIfPhotos = !hasPhotos || mlTrainingConsent
  const canProceed = timelineOk && consentOkIfPhotos

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <div className="flex min-h-[min(100dvh,720px)] flex-col px-4 py-8 sm:min-h-0 sm:px-0 sm:py-12">
      <div className="flex-1 space-y-8">
        <h2
          ref={headingRef}
          id="step-heading"
          tabIndex={-1}
          className="text-2xl font-bold text-gray-900 [font-family:var(--font-dm-sans),var(--font-heading),ui-sans-serif,system-ui,sans-serif]"
        >
          Finish your request
        </h2>
        <p className="text-base text-gray-500">Pick a timeline and add optional panel photos (recommended).</p>

        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-gray-800">When do you need this done?</legend>
          <p className="mb-3 text-sm text-gray-500">This helps us prioritize your project.</p>
          <div
            className="grid grid-cols-1 gap-3 sm:grid-cols-3"
            role="group"
            aria-label="Project timeline"
          >
            {TIMELINE_OPTIONS.map(({ value, label, hint }) => {
              const selected = timeline === value
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onFieldUpdate({ timeline: value })}
                  className={cn(
                    'flex min-h-24 flex-col items-stretch justify-between gap-1 rounded-xl border-2 p-3 text-left transition-colors',
                    selected
                      ? 'border-green-500 bg-green-50 ring-2 ring-green-500/20'
                      : 'border-gray-200 bg-white hover:border-green-300'
                  )}
                >
                  <span className="flex items-start justify-between gap-2">
                    <span className="text-sm font-semibold text-gray-900">{label}</span>
                    {selected && <CheckCircle2 className="size-4 shrink-0 text-green-600" aria-hidden />}
                  </span>
                  <span className="text-xs text-gray-500">{hint}</span>
                </button>
              )
            })}
          </div>
        </fieldset>

        <hr className="border-gray-100" aria-hidden />

        <StepPhoto
          photos={photos}
          mlTrainingConsent={mlTrainingConsent}
          onFieldUpdate={onFieldUpdate}
          onNext={noop}
          onBack={noop}
          variant="embedded"
        />
      </div>

      <StickyCtaBar
        canProceed={canProceed}
        onBack={onBack}
        helperText={infoHelperText(timelineOk, hasPhotos, mlTrainingConsent)}
        onNext={() => onNext({})}
      />
    </div>
  )
}
