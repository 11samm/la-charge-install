'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { phoneDigitsOnly } from '@/lib/phone-format'
import { setStoredQuoteConfirmation } from '@/lib/quote-confirmation-storage'
import { siteConfig } from '@/lib/site'

import { ProgressBar } from './ProgressBar'
import { StepWrapper } from './StepWrapper'
import { StepChargerPlacement } from './steps/StepChargerPlacement'
import { StepContact } from './steps/StepContact'
import { StepElectricalPanel } from './steps/StepElectricalPanel'
import { StepInfo } from './steps/StepInfo'
import { StepJobType } from './steps/StepJobType'
import { StepProperty } from './steps/StepProperty'
import type { ConfirmationPayload, JobType, WizardState } from './types'
import { initialWizardState } from './types'

type StepId = 'service' | 'property' | 'panel' | 'placement' | 'info' | 'contact'

const defaultErr = `Something went wrong — please try again or call us at ${siteConfig.phoneDisplay}`

function needsChargerPath(jobType: JobType): boolean {
  return jobType === 'charger' || jobType === 'both'
}

function getSteps(jobType: JobType): StepId[] {
  if (needsChargerPath(jobType)) {
    return ['service', 'property', 'panel', 'placement', 'info', 'contact']
  }
  return ['service', 'property', 'panel', 'info', 'contact']
}

/** Segments before thank-you: 5 if EV/charger+both, 4 if panel-only; default 5 before a service is chosen. */
function getProgressTotal(jobType: JobType): number {
  if (jobType === '') return 5
  return needsChargerPath(jobType) ? 5 : 4
}

function getProgressDisplayStep(step: StepId, steps: StepId[]): number {
  const effective: StepId = step === 'contact' ? 'info' : step
  const idx = steps.indexOf(effective)
  return idx >= 0 ? idx + 1 : 1
}

export function QuoteWizard() {
  const router = useRouter()
  const [wizardState, setWizardState] = useState<WizardState>(initialWizardState)
  const [step, setStep] = useState<StepId>('service')
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const stepRef = useRef(step)
  stepRef.current = step

  const steps = useMemo(() => getSteps(wizardState.jobType), [wizardState.jobType])
  const totalSteps = useMemo(() => getProgressTotal(wizardState.jobType), [wizardState.jobType])
  const currentStepNumber = useMemo(() => getProgressDisplayStep(step, steps), [step, steps])

  useEffect(() => {
    const route = getSteps(wizardState.jobType)
    setStep((current) => (route.includes(current) ? current : 'panel'))
  }, [wizardState.jobType])

  const onFieldUpdate = useCallback((partial: Partial<WizardState>) => {
    setWizardState((prev) => ({ ...prev, ...partial }))
  }, [])

  const handleNext = useCallback((partial: Partial<WizardState> = {}) => {
    setWizardState((prev) => {
      const merged = { ...prev, ...partial }
      const route = getSteps(merged.jobType)
      const idx = route.indexOf(stepRef.current)
      const nextStep = route[idx + 1]
      if (nextStep) {
        queueMicrotask(() => {
          setDirection('forward')
          setStep(nextStep)
        })
      }
      return merged
    })
  }, [])

  const handleBack = useCallback(() => {
    setSubmitError(null)
    setDirection('backward')
    setStep((currentStep) => {
      const route = getSteps(wizardState.jobType)
      const idx = route.indexOf(currentStep)
      return route[Math.max(0, idx - 1)] ?? 'service'
    })
  }, [wizardState.jobType])

  const handleSubmit = useCallback(async () => {
    setSubmitError(null)
    setIsSubmitting(true)
    try {
      const requiresChargerDetails = wizardState.jobType === 'charger' || wizardState.jobType === 'both'
      const res = await fetch('/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobType: wizardState.jobType,
          propertyType: wizardState.propertyType,
          address: wizardState.address || undefined,
          city: wizardState.city || undefined,
          zipCode: wizardState.zipCode,
          panelCapacity: wizardState.panelCapacity,
          panelLocation: wizardState.panelLocation,
          garageSituation: requiresChargerDetails ? wizardState.garageSituation : undefined,
          chargerLocation: requiresChargerDetails ? wizardState.chargerLocation : undefined,
          timeline: wizardState.timeline,
          name: wizardState.name.trim(),
          phone: phoneDigitsOnly(wizardState.phone),
          email: wizardState.email.trim(),
          hasPhotos: wizardState.photos.length > 0,
          mlTrainingConsent: wizardState.mlTrainingConsent,
        }),
      })
      const data: unknown = await res.json().catch(() => ({}))
      if (!res.ok) {
        const message =
          typeof data === 'object' && data !== null && 'message' in data && typeof (data as { message: unknown }).message === 'string'
            ? (data as { message: string }).message
            : defaultErr
        setSubmitError(message)
        return
      }
      const payload = data as ConfirmationPayload
      setStoredQuoteConfirmation({ result: payload, name: wizardState.name.trim() })
      console.log('[conversion] instant_estimate_submitted', {
        jobType: wizardState.jobType,
        propertyType: wizardState.propertyType,
        panelCapacity: wizardState.panelCapacity,
        panelLocation: wizardState.panelLocation,
        garageSituation: requiresChargerDetails ? wizardState.garageSituation : '',
        chargerLocation: requiresChargerDetails ? wizardState.chargerLocation : '',
        timeline: wizardState.timeline,
        zipCode: wizardState.zipCode,
        hasPhotos: wizardState.photos.length > 0,
        mlTrainingConsent: wizardState.mlTrainingConsent,
        tier: payload.tier,
      })
      router.push('/get-a-quote/thank-you')
    } catch {
      setSubmitError(defaultErr)
    } finally {
      setIsSubmitting(false)
    }
  }, [router, wizardState])

  return (
    <div className="mx-auto w-full max-w-lg">
      <h1 className="sr-only">Get Your Free EV Charger Installation Estimate</h1>
      <ProgressBar step={currentStepNumber} total={totalSteps} />

      <p className="sr-only" role="status" aria-live="polite" aria-atomic>
        {`Step ${currentStepNumber} of ${totalSteps}`}
      </p>

      <StepWrapper step={step} direction={direction}>
        {step === 'service' && (
          <StepJobType jobType={wizardState.jobType} onFieldUpdate={onFieldUpdate} onNext={handleNext} />
        )}

        {step === 'property' && (
          <StepProperty
            propertyType={wizardState.propertyType}
            address={wizardState.address}
            zipCode={wizardState.zipCode}
            onFieldUpdate={onFieldUpdate}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {step === 'panel' && (
          <StepElectricalPanel
            panelCapacity={wizardState.panelCapacity}
            panelLocation={wizardState.panelLocation}
            onFieldUpdate={onFieldUpdate}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {step === 'placement' && (
          <StepChargerPlacement
            garageSituation={wizardState.garageSituation}
            chargerLocation={wizardState.chargerLocation}
            onFieldUpdate={onFieldUpdate}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {step === 'info' && (
          <StepInfo
            timeline={wizardState.timeline}
            photos={wizardState.photos}
            mlTrainingConsent={wizardState.mlTrainingConsent}
            onFieldUpdate={onFieldUpdate}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {step === 'contact' && (
          <StepContact
            name={wizardState.name}
            phone={wizardState.phone}
            email={wizardState.email}
            isSubmitting={isSubmitting}
            errorMessage={submitError}
            onFieldUpdate={onFieldUpdate}
            onBack={handleBack}
            onSubmit={handleSubmit}
          />
        )}
      </StepWrapper>
    </div>
  )
}
