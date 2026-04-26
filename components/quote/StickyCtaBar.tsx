'use client'

import { FormTrustCta } from '@/components/quote/FormTrustCta'
import { cn } from '@/lib/utils'

export function StickyCtaBar({
  canProceed,
  onNext,
  onBack,
  helperText,
  nextLabel = 'Next →',
}: {
  canProceed: boolean
  onNext: () => void
  onBack?: () => void
  /** Shown above Next when `canProceed` is false. Defaults to generic copy. */
  helperText?: string
  nextLabel?: string
}) {
  const showHelper = !canProceed

  return (
    <div
      className={cn(
        'sticky bottom-0 z-20 -mx-4 shrink-0 border-t border-gray-100 bg-white/95 px-4 pt-3 backdrop-blur supports-[backdrop-filter]:bg-white/80 sm:mx-0',
        'pb-4 pb-[calc(1rem+env(safe-area-inset-bottom))]'
      )}
    >
      <FormTrustCta />

      {showHelper && (
        <p className="mb-2 text-center text-xs text-gray-500">
          {helperText ?? 'Answer all questions above to continue'}
        </p>
      )}

      <div
        className={cn(
          'flex gap-3',
          onBack ? 'flex-row items-stretch sm:items-end' : 'flex-col'
        )}
      >
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="min-h-12 shrink-0 self-start rounded-lg border-2 border-gray-200 bg-white px-4 font-medium text-gray-700 transition-colors hover:border-gray-300"
          >
            ← Back
          </button>
        )}
        <button
          type="button"
          aria-disabled={!canProceed}
          onClick={() => {
            if (!canProceed) return
            onNext()
          }}
          className={cn(
            'h-14 rounded-xl text-base font-semibold transition-colors',
            onBack ? 'min-w-0 flex-1 sm:max-w-sm sm:self-end' : 'w-full',
            canProceed
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'cursor-not-allowed bg-gray-200 text-gray-400 opacity-40 pointer-events-none'
          )}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  )
}
