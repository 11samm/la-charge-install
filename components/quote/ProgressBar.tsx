'use client'

export function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="sticky top-0 z-10 w-full max-w-lg mx-auto bg-white/95 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div
        className="flex w-full gap-1.5"
        role="progressbar"
        aria-valuenow={step}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`Step ${step} of ${total}`}
      >
        {Array.from({ length: total }, (_, i) => {
          const n = i + 1
          return (
            <div
              key={n}
              className={[
                'h-2 flex-1 rounded-full transition-all duration-300',
                n <= step ? 'bg-green-500' : 'bg-gray-200',
              ].join(' ')}
            />
          )
        })}
      </div>
      <div className="mt-2 flex flex-col gap-0.5 px-0.5 min-[400px]:flex-row min-[400px]:items-center min-[400px]:justify-between">
        <p className="text-xs text-gray-400">Step {step} of {total}</p>
        <p className="text-xs font-medium text-gray-500 min-[400px]:text-right">
          Takes 60 seconds · Get your free estimate instantly
        </p>
      </div>
    </div>
  )
}
