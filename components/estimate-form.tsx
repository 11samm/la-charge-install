'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, FieldLabel, FieldGroup } from '@/components/ui/field'
import { Upload, ArrowRight, ArrowLeft, Check, Zap, PanelTop, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

type JobType = 'charger' | 'panel' | 'both' | ''
type PanelCapacity = '200a' | '100a' | '60a' | 'unknown' | ''
type Timeline = 'asap' | 'within-month' | 'researching' | ''

interface FormData {
  zipCode: string
  jobType: JobType
  panelCapacity: PanelCapacity
  timeline: Timeline
  photos: File[]
  name: string
  phone: string
  email: string
}

const jobTypeOptions: Array<{ value: JobType; label: string; icon: typeof Zap }> = [
  { value: 'charger', label: 'EV Charger Installation', icon: Zap },
  { value: 'panel', label: 'Electrical Panel Upgrade', icon: PanelTop },
  { value: 'both', label: 'Both Services', icon: Settings },
]

const panelCapacityOptions: Array<{ value: PanelCapacity; label: string }> = [
  { value: '200a', label: '200 Amp' },
  { value: '100a', label: '100 Amp' },
  { value: '60a', label: '60 Amp' },
  { value: 'unknown', label: "I don't know" },
]

const timelineOptions: Array<{ value: Timeline; label: string }> = [
  { value: 'asap', label: 'ASAP' },
  { value: 'within-month', label: 'Within 1 month' },
  { value: 'researching', label: 'Just researching' },
]

export function EstimateForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    zipCode: '',
    jobType: '',
    panelCapacity: '',
    timeline: '',
    photos: [],
    name: '',
    phone: '',
    email: '',
  })
  const [isDragging, setIsDragging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<null | {
    estimateRange: string
    tier: string
    confirmationMessage: string
  }>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    )
    setFormData(prev => ({ ...prev, photos: [...prev.photos, ...files] }))
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).filter(file => 
        file.type.startsWith('image/')
      )
      setFormData(prev => ({ ...prev, photos: [...prev.photos, ...files] }))
    }
  }, [])

  const removePhoto = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }))
  }, [])

  const canProceedStep1 = formData.zipCode.length === 5 && formData.jobType !== ''
  const canProceedStep2 = formData.panelCapacity !== ''
  const canProceedStep3 = formData.timeline !== ''
  const canProceedStep4 = true
  const canSubmit =
    formData.name.trim().length >= 2 && formData.phone.replace(/\D/g, '').length >= 10

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/estimate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          zipCode: formData.zipCode,
          jobType: formData.jobType,
          panelCapacity: formData.panelCapacity,
          timeline: formData.timeline,
          name: formData.name.trim(),
          phone: formData.phone.replace(/\D/g, ''),
          email: formData.email.trim(),
          hasPhotos: formData.photos.length > 0,
        }),
      })

      if (!response.ok) {
        throw new Error('Unable to submit your estimate right now.')
      }

      const payload = await response.json()
      setResult(payload)
      setStep(6)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to submit your estimate right now.'
      window.alert(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-lg border-border/50 shadow-xl">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-xl font-semibold tracking-tight">
          Get Your Instant Estimate
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {step < 6 ? `Step ${step} of 5` : 'Confirmation'}
        </CardDescription>
        {/* Progress bar */}
        <div className="flex gap-2 pt-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={cn(
                'h-1 flex-1 rounded-full transition-colors duration-300',
                s <= step ? 'bg-primary' : 'bg-muted'
              )}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {/* Step 1: Zip Code + Job Type */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="zipCode">ZIP Code</FieldLabel>
                <Input
                  id="zipCode"
                  type="text"
                  placeholder="91206"
                  maxLength={5}
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value.replace(/\D/g, '') })}
                  className="h-12 text-base"
                />
              </Field>
              <Field>
                <FieldLabel>Job Type</FieldLabel>
                <div className="grid gap-3">
                  {jobTypeOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, jobType: option.value }))}
                      className={cn(
                        'flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors',
                        formData.jobType === option.value
                          ? 'border-primary bg-primary/5 text-foreground'
                          : 'border-border hover:border-primary/40 hover:bg-muted/50'
                      )}
                    >
                      <option.icon className="size-4 text-primary" />
                      <span className="text-sm font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              </Field>
            </FieldGroup>
            <Button 
              onClick={() => setStep(2)} 
              disabled={!canProceedStep1}
              className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90"
            >
              Continue
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        )}

        {/* Step 2: Panel Capacity */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <Field>
              <FieldLabel>What size is your electrical panel?</FieldLabel>
              <div className="grid gap-3">
                {panelCapacityOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, panelCapacity: option.value }))}
                    className={cn(
                      'rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors',
                      formData.panelCapacity === option.value
                        ? 'border-primary bg-primary/5 text-foreground'
                        : 'border-border hover:border-primary/40 hover:bg-muted/50'
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </Field>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setStep(1)}
                className="h-12"
              >
                <ArrowLeft className="mr-2 size-4" />
                Back
              </Button>
              <Button 
                onClick={() => setStep(3)}
                disabled={!canProceedStep2}
                className="flex-1 h-12 text-base font-medium bg-primary hover:bg-primary/90"
              >
                Continue
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Timeline */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <Field>
              <FieldLabel>When do you need this done?</FieldLabel>
              <div className="grid gap-3">
                {timelineOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, timeline: option.value }))}
                    className={cn(
                      'rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors',
                      formData.timeline === option.value
                        ? 'border-primary bg-primary/5 text-foreground'
                        : 'border-border hover:border-primary/40 hover:bg-muted/50'
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </Field>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setStep(2)}
                className="h-12"
              >
                <ArrowLeft className="mr-2 size-4" />
                Back
              </Button>
              <Button 
                onClick={() => setStep(4)}
                disabled={!canProceedStep3}
                className="flex-1 h-12 text-base font-medium bg-primary hover:bg-primary/90"
              >
                Continue
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Photo Upload */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Upload a panel photo <span className="text-muted-foreground">(Optional but recommended)</span>
              </label>
              <p className="text-sm text-muted-foreground">
              Got a quick photo of your panel? It helps us flag upgrade needs before anyone picks up the phone.
              </p>
            </div>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={cn(
                'relative cursor-pointer rounded-lg border-2 border-dashed p-8 transition-all duration-200',
                isDragging
                  ? 'scale-[1.02] border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
              )}
            >
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
              <div className="flex flex-col items-center justify-center text-center">
                <div className={cn('rounded-full p-3 transition-colors', isDragging ? 'bg-primary/10' : 'bg-muted')}>
                  <Upload className={cn('size-6 transition-colors', isDragging ? 'text-primary' : 'text-muted-foreground')} />
                </div>
                <p className="mt-3 text-sm font-medium">
                  {isDragging ? 'Drop files here' : 'Drag and drop or click to upload'}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">PNG and JPG files, up to 10MB each</p>
              </div>
            </div>

            {formData.photos.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Selected files</p>
                <div className="space-y-2">
                  {formData.photos.map((file, index) => (
                    <div key={`${file.name}-${index}`} className="flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2">
                      <span className="truncate text-sm text-foreground">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="text-xs font-medium text-primary"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setStep(3)}
                className="h-12"
              >
                <ArrowLeft className="mr-2 size-4" />
                Back
              </Button>
              <Button 
                onClick={() => setStep(5)}
                disabled={!canProceedStep4}
                className="flex-1 h-12 text-base font-medium bg-primary hover:bg-primary/90"
              >
                Continue
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: Contact Info */}
        {step === 5 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Smith"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-12 text-base"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(818) 555-0123"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="h-12 text-base"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email Address</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@email.com (optional)"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12 text-base"
                />
              </Field>
            </FieldGroup>

            <p className="text-xs leading-relaxed text-muted-foreground">
              By submitting, you agree to be contacted by our licensed contractor network about your EV charger or panel
              upgrade project.
            </p>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setStep(4)}
                className="h-12"
              >
                <ArrowLeft className="mr-2 size-4" />
                Back
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={!canSubmit || isSubmitting}
                className="flex-1 h-12 text-base font-medium bg-primary hover:bg-primary/90"
              >
                <Check className="mr-2 size-4" />
                {isSubmitting ? 'Submitting...' : 'Get Estimate'}
              </Button>
            </div>
          </div>
        )}

        {step === 6 && result && (
          <div className="space-y-6 rounded-2xl border border-primary/20 bg-primary/5 p-6 animate-in fade-in duration-300">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="size-6" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold tracking-tight">You&apos;re in the queue</h3>
              <p className="mt-2 text-muted-foreground">{result.confirmationMessage}</p>
            </div>
            <div className="rounded-xl border bg-background p-4">
              <p className="text-sm font-medium text-muted-foreground">Estimated range</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight">{result.estimateRange}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              While you wait, explore local pricing guides and city pages to understand how rebates and panel
              capacity can affect your final install.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
