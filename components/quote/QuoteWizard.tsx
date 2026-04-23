'use client'

import { useCallback, useMemo, useState } from 'react'

import { phoneDigitsOnly } from '@/lib/phone-format'
import { siteConfig } from '@/lib/site'

import { ConfirmationScreen } from './ConfirmationScreen'
import { ProgressBar } from './ProgressBar'
import { StepWrapper } from './StepWrapper'
import { StepAddress } from './steps/StepAddress'
import { StepChargerLocation } from './steps/StepChargerLocation'
import { StepContact } from './steps/StepContact'
import { StepGarageSituation } from './steps/StepGarageSituation'
import { StepJobType } from './steps/StepJobType'
import { StepPanel } from './steps/StepPanel'
import { StepPanelLocation } from './steps/StepPanelLocation'
import { StepPhoto } from './steps/StepPhoto'
import { StepPropertyType } from './steps/StepPropertyType'
import { StepTimeline } from './steps/StepTimeline'
import type { ConfirmationPayload, WizardState } from './types'
import { initialWizardState } from './types'

type VisibleStepId =
  | 'jobType'
  | 'propertyType'
  | 'address'
  | 'panel'
  | 'panelLocation'
  | 'garageSituation'
  | 'chargerLocation'
  | 'timeline'
  | 'photo'
  | 'contact'

type StepId = VisibleStepId | 'confirmation'

const defaultErr = `Something went wrong — please try again or call us at ${siteConfig.phoneDisplay}`

export function QuoteWizard() {
  const [wizardState, setWizardState] = useState<WizardState>(initialWizardState)
  const [step, setStep] = useState<StepId>('jobType')
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [result, setResult] = useState<ConfirmationPayload | null>(null)

  const visibleSteps = useMemo<VisibleStepId[]>(() => {
    const requiresChargerDetails = wizardState.jobType === 'charger' || wizardState.jobType === 'both'

    return [
      'jobType',
      'propertyType',
      'address',
      'panel',
      'panelLocation',
      ...(requiresChargerDetails ? (['garageSituation', 'chargerLocation'] as const) : []),
      'timeline',
      'photo',
      'contact',
    ]
  }, [wizardState.jobType])

  const currentStepNumber = step === 'confirmation' ? 0 : visibleSteps.indexOf(step) + 1
  const totalSteps = visibleSteps.length

  const onFieldUpdate = useCallback((partial: Partial<WizardState>) => {
    setWizardState((prev) => ({ ...prev, ...partial }))
  }, [])

  const handleNext = useCallback((partial: Partial<WizardState> = {}) => {
    setWizardState((prev) => ({ ...prev, ...partial }))
    setDirection('forward')
    setStep((currentStep) => {
      if (currentStep === 'confirmation') return currentStep

      const currentIndex = visibleSteps.indexOf(currentStep)
      return visibleSteps[currentIndex + 1] ?? currentStep
    })
  }, [visibleSteps])

  const handleBack = useCallback(() => {
    setSubmitError(null)
    setDirection('backward')
    setStep((currentStep) => {
      if (currentStep === 'confirmation') return currentStep

      const currentIndex = visibleSteps.indexOf(currentStep)
      return visibleSteps[Math.max(0, currentIndex - 1)] ?? 'jobType'
    })
  }, [visibleSteps])

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
      setResult(payload)
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
      setStep('confirmation')
    } catch {
      setSubmitError(defaultErr)
    } finally {
      setIsSubmitting(false)
    }
  }, [wizardState])

  if (step === 'confirmation' && result) {
    return <ConfirmationScreen result={result} name={wizardState.name} />
  }

  return (
    <div className="mx-auto w-full max-w-lg">
      <h1 className="sr-only">Get Your Free EV Charger Installation Estimate</h1>
      {step !== 'confirmation' && <ProgressBar step={currentStepNumber} total={totalSteps} />}

      <p className="sr-only" role="status" aria-live="polite" aria-atomic>
        {step === 'confirmation' ? 'Confirmation screen' : `Step ${currentStepNumber} of ${totalSteps}`}
      </p>

      <StepWrapper step={step} direction={direction}>
        {step === 'jobType' && (
          <StepJobType
            jobType={wizardState.jobType}
            onFieldUpdate={onFieldUpdate}
            onNext={handleNext}
          />
        )}

        {step === 'propertyType' && (
          <StepPropertyType
            propertyType={wizardState.propertyType}
            onFieldUpdate={onFieldUpdate}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {step === 'address' && (
          <StepAddress
            address={wizardState.address}
            zipCode={wizardState.zipCode}
            onFieldUpdate={onFieldUpdate}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {step === 'panel' && (
          <StepPanel
            panelCapacity={wizardState.panelCapacity}
            onFieldUpdate={onFieldUpdate}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {step === 'panelLocation' && (
          <StepPanelLocation
            panelLocation={wizardState.panelLocation}
            onFieldUpdate={onFieldUpdate}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {step === 'garageSituation' && (
          <StepGarageSituation
            garageSituation={wizardState.garageSituation}
            onFieldUpdate={onFieldUpdate}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {step === 'chargerLocation' && (
          <StepChargerLocation
            chargerLocation={wizardState.chargerLocation}
            onFieldUpdate={onFieldUpdate}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {step === 'timeline' && (
          <StepTimeline
            timeline={wizardState.timeline}
            onFieldUpdate={onFieldUpdate}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {step === 'photo' && (
          <StepPhoto
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
