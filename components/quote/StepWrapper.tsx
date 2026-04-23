'use client'

import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type Direction = 'forward' | 'backward'

export function StepWrapper({
  step,
  direction,
  children,
}: {
  step: string | number
  direction: Direction
  children: ReactNode
}) {
  return (
    <div
      key={step}
      className={cn(
        'max-w-lg mx-auto w-full',
        direction === 'forward' &&
          'animate-in slide-in-from-right-8 duration-300 ease-out',
        direction === 'backward' && 'animate-in slide-in-from-left-8 duration-300 ease-out'
      )}
    >
      {children}
    </div>
  )
}
