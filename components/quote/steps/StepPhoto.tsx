'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Upload } from 'lucide-react'

import { cn } from '@/lib/utils'

import type { WizardState } from '../types'

const MAX_FILES = 4
const MAX_BYTES = 10 * 1024 * 1024

export function StepPhoto({
  photos,
  mlTrainingConsent,
  onFieldUpdate,
  onNext,
  onBack,
}: {
  photos: File[]
  mlTrainingConsent: boolean
  onFieldUpdate: (p: Partial<WizardState>) => void
  onNext: (p: Partial<WizardState>) => void
  onBack: () => void
}) {
  const [drag, setDrag] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  const addFiles = useCallback(
    (list: File[]) => {
      const imageFiles = list.filter((f) => f.type.startsWith('image/'))
      const underSize = imageFiles.filter((f) => f.size <= MAX_BYTES)
      onFieldUpdate({
        photos: [...photos, ...underSize].slice(0, MAX_FILES),
      })
    },
    [onFieldUpdate, photos]
  )

  const removeAt = (index: number) => {
    onFieldUpdate({ photos: photos.filter((_, i) => i !== index) })
  }

  return (
    <div className="space-y-6 py-8 px-4 sm:py-12 sm:px-0">
      <fieldset>
        <legend className="sr-only">Add photos of your panel area</legend>
        <h2
          ref={headingRef}
          id="step-heading"
          tabIndex={-1}
          className="text-2xl font-bold text-gray-900 [font-family:var(--font-dm-sans),var(--font-heading),ui-sans-serif,system-ui,sans-serif]"
        >
          Add photos of your panel area
        </h2>
        <p className="mt-2 text-base text-gray-500">
          Add one photo from about 10 feet away showing the general area and one close-up of the panel so we can
          read the label and breaker text.
        </p>

        <div
          onDragOver={(e) => {
            e.preventDefault()
            setDrag(true)
          }}
          onDragLeave={(e) => {
            e.preventDefault()
            setDrag(false)
          }}
          onDrop={(e) => {
            e.preventDefault()
            setDrag(false)
            addFiles(Array.from(e.dataTransfer.files))
          }}
          className={cn(
            'relative mt-8 flex min-h-40 items-center justify-center rounded-xl border-2 border-dashed transition-colors',
            drag ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white'
          )}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
            onChange={(e) => {
              if (e.target.files) addFiles(Array.from(e.target.files))
            }}
            aria-label="Upload panel photos"
          />
          <div className="pointer-events-none flex flex-col items-center px-4 py-6 text-center">
            <Upload className="size-8 text-green-600" />
            <p className="mt-2 text-sm font-medium text-gray-900">Tap to upload or drag a photo</p>
            <p className="mt-1 text-xs text-gray-500">JPG or PNG, up to 10MB each</p>
            <p className="mt-1 text-xs text-gray-400">Up to {MAX_FILES} files</p>
          </div>
        </div>

        {photos.length > 0 && (
          <ul className="mt-4 space-y-2">
            {photos.map((f, i) => (
              <li
                key={`${f.name}-${i}`}
                className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2"
              >
                <span className="truncate text-sm text-gray-800">{f.name}</span>
                <button
                  type="button"
                  onClick={() => removeAt(i)}
                  className="shrink-0 text-sm font-medium text-green-700 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={mlTrainingConsent}
            onChange={(e) => onFieldUpdate({ mlTrainingConsent: e.target.checked })}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-green-600"
            aria-describedby="ml-training-hint"
          />
          <span className="leading-relaxed" id="ml-training-hint">
            <span className="font-semibold text-slate-900"></span> Allow anonymized project data to train our matching recommendations.{' '}
          </span>
        </label>
      </fieldset>

      <div className="space-y-3">
        <button
          type="button"
          onClick={() => onNext({})}
          className="flex h-14 w-full items-center justify-center rounded-xl bg-green-500 text-base font-semibold text-white transition-colors hover:bg-green-600"
        >
          Continue →
        </button>
        <button
          type="button"
          onClick={() => onNext({})}
          className="w-full text-center text-sm font-medium text-gray-600 underline-offset-2 hover:underline"
        >
          Skip for now — the electrician can assess on the call.
        </button>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={onBack}
          className="min-h-12 text-sm font-medium text-gray-600 underline-offset-2 hover:underline"
        >
          ← Back
        </button>
      </div>
    </div>
  )
}
