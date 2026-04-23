'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ComponentType } from 'react'

import { BrandLogo } from '@/components/brand-logo'
import { AudiLogo } from '@/components/logos/AudiLogo'
import { BmwLogo } from '@/components/logos/BmwLogo'
import { BwpLogo } from '@/components/logos/BwpLogo'
import { ChevroletLogo } from '@/components/logos/ChevroletLogo'
import { FordLogo } from '@/components/logos/FordLogo'
import { GwpLogo } from '@/components/logos/GwpLogo'
import { HyundaiLogo } from '@/components/logos/HyundaiLogo'
import { KiaLogo } from '@/components/logos/KiaLogo'
import { LadwpLogo } from '@/components/logos/LadwpLogo'
import { NissanLogo } from '@/components/logos/NissanLogo'
import { PwpLogo } from '@/components/logos/PwpLogo'
import { RivianLogo } from '@/components/logos/RivianLogo'
import { SceLogo } from '@/components/logos/SceLogo'
import { TeslaLogo } from '@/components/logos/TeslaLogo'
import { cn } from '@/lib/utils'

type LogoItem = {
  name: string
  Logo: ComponentType<{ className?: string }>
  sphereClassName: string
  logoClassName?: string
}

const utilityLogos: LogoItem[] = [
  {
    name: 'LADWP',
    Logo: LadwpLogo,
    sphereClassName: 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-sky-950/30 dark:text-sky-300',
    logoClassName: 'w-10 sm:w-11',
  },
  {
    name: 'SCE',
    Logo: SceLogo,
    sphereClassName: 'border-[#006a53]/30 bg-white shadow-sm',
    logoClassName: 'w-8 sm:w-9',
  },
  {
    name: 'GWP',
    Logo: GwpLogo,
    sphereClassName: 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-300',
    logoClassName: 'w-8 sm:w-9',
  },
  {
    name: 'BWP',
    Logo: BwpLogo,
    sphereClassName:
      'border-sky-200/90 bg-gradient-to-br from-sky-100 via-sky-50 to-[#2c4a6e]/25 shadow-sm ring-1 ring-sky-100/80',
    logoClassName: 'w-7 sm:w-8',
  },
  {
    name: 'PWP',
    Logo: PwpLogo,
    sphereClassName: 'border-[#DF352F]/25 bg-[#FCFCFC] shadow-sm',
    logoClassName: 'w-8 sm:w-9',
  },
]

const evLogos: LogoItem[] = [
  {
    name: 'Tesla',
    Logo: TeslaLogo,
    sphereClassName: 'border-red-600 bg-red-600 text-white shadow-md',
    logoClassName: 'w-8 text-white sm:w-9',
  },
  {
    name: 'BMW',
    Logo: BmwLogo,
    sphereClassName: 'border-slate-200 bg-white shadow-sm',
    logoClassName: '!h-10 !w-10 !max-h-none sm:!h-11 sm:!w-11',
  },
  {
    name: 'Rivian',
    Logo: RivianLogo,
    sphereClassName: 'border-slate-200 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-900/40',
    logoClassName: 'h-auto w-auto !max-w-none !max-h-10 sm:!max-h-11',
  },
  {
    name: 'Ford',
    Logo: FordLogo,
    sphereClassName: 'border-[#0A3180] bg-[#0A3180] text-white shadow-md',
    logoClassName: 'h-5 w-full max-w-[4.5rem] text-white sm:h-5 sm:max-w-[5rem]',
  },
  {
    name: 'Chevrolet',
    Logo: ChevroletLogo,
    sphereClassName: 'border-yellow-300/90 bg-gradient-to-b from-yellow-100 to-amber-100 shadow-sm',
    logoClassName: 'w-9 text-slate-900 sm:w-10',
  },
  {
    name: 'Hyundai',
    Logo: HyundaiLogo,
    sphereClassName:
      'border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200',
    logoClassName: 'w-8 sm:w-9',
  },
  {
    name: 'Kia',
    Logo: KiaLogo,
    sphereClassName: 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300',
    logoClassName: 'w-8 sm:w-9',
  },
  {
    name: 'Nissan',
    Logo: NissanLogo,
    sphereClassName: 'border-red-200 bg-red-50 text-red-500 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300',
    logoClassName: 'w-8 sm:w-9',
  },
  {
    name: 'Audi',
    Logo: AudiLogo,
    sphereClassName:
      'border-zinc-300 bg-zinc-100 text-slate-900 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-white',
    logoClassName: 'w-9 sm:w-10',
  },
]

function OrbitNode({ item, x, y, counterRotate, duration, reducedMotion }: {
  item: LogoItem
  x: number
  y: number
  counterRotate: number
  duration: number
  reducedMotion: boolean
}) {
  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{ transform: `translate(-50%, -50%) translate(${x}px, ${y}px)` }}
    >
      <motion.div
        animate={{ rotate: reducedMotion ? 0 : counterRotate }}
        transition={
          reducedMotion
            ? undefined
            : { duration, ease: 'linear', repeat: Infinity, repeatType: 'loop' }
        }
        className={cn(
          'relative flex size-14 items-center justify-center rounded-full border shadow-md sm:size-16',
          item.sphereClassName
        )}
      >
        <item.Logo className={cn('h-auto max-h-8 w-auto max-w-9 sm:max-h-9 sm:max-w-10', item.logoClassName)} />
      </motion.div>
    </div>
  )
}

function OrbitRing({
  items,
  radius,
  duration,
  direction,
  reducedMotion,
}: {
  items: LogoItem[]
  radius: number
  duration: number
  direction: 1 | -1
  reducedMotion: boolean
}) {
  return (
    <motion.div
      className="absolute inset-0"
      animate={{ rotate: reducedMotion ? 0 : direction * 360 }}
      transition={
        reducedMotion
          ? undefined
          : { duration, ease: 'linear', repeat: Infinity, repeatType: 'loop' }
      }
    >
      {items.map((item, index) => {
        const angle = (index / items.length) * Math.PI * 2 - Math.PI / 2
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius

        return (
          <OrbitNode
            key={item.name}
            item={item}
            x={x}
            y={y}
            counterRotate={direction === 1 ? -360 : 360}
            duration={duration}
            reducedMotion={reducedMotion}
          />
        )
      })}
    </motion.div>
  )
}

function StaticLogoGrid() {
  const allLogos = [...utilityLogos, ...evLogos]

  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
      {allLogos.map((item) => (
        <div
          key={item.name}
          className={cn(
            'flex aspect-square items-center justify-center rounded-2xl border shadow-sm',
            item.sphereClassName
          )}
        >
          <item.Logo className={cn('h-auto max-h-10 w-auto max-w-12', item.logoClassName)} />
        </div>
      ))}
    </div>
  )
}

export function OrbitalBrands() {
  const reducedMotion = useReducedMotion()

  /** Tighter than original 130/210 so the inner ring sits closer to the center mark. */
  const rInner = 100
  const rOuter = 180

  return (
    <section className="border-y border-slate-200/70 bg-slate-50/60 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-10 lg:gap-12 lg:flex-row lg:items-center">
          <div className="min-w-0 text-center max-lg:mx-auto max-lg:max-w-3xl lg:max-w-xl lg:flex-1 lg:text-left">
            <p className="font-accent text-sm uppercase tracking-[0.2em] text-primary">Brand & Utility Coverage</p>
            <h2 className="font-display mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Serving Every Major EV Brand, Approved by Every Valley Utility
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              From Tesla and Rivian to LADWP and SCE, we help Valley homeowners navigate charger installs, panel
              readiness, and utility rebate requirements with the right licensed contractor.
            </p>
          </div>

          <div className="mx-auto w-full min-w-0 max-w-full shrink-0 self-center max-lg:max-w-md lg:mx-0 lg:w-auto lg:self-center">
            <div className="max-[480px]:hidden">
              <div className="mx-auto flex aspect-square w-full max-w-[440px] items-center justify-center sm:max-w-none sm:size-[440px]">
                <div className="relative h-full w-full">
                  <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-slate-400/10"
                    style={{ width: rInner * 2, height: rInner * 2 }}
                  />
                  <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-slate-400/10"
                    style={{ width: rOuter * 2, height: rOuter * 2 }}
                  />

                  <OrbitRing
                    items={utilityLogos}
                    radius={rInner}
                    duration={30}
                    direction={1}
                    reducedMotion={!!reducedMotion}
                  />
                  <OrbitRing
                    items={evLogos}
                    radius={rOuter}
                    duration={45}
                    direction={-1}
                    reducedMotion={!!reducedMotion}
                  />

                  <div className="absolute left-1/2 top-1/2 flex size-[92px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#22C55E] bg-[#22C55E] p-2 shadow-[0_10px_25px_-5px_rgba(34,197,94,0.45)]">
                    <span className="inline-flex h-full w-full min-h-0 min-w-0 items-center justify-center overflow-hidden rounded-full bg-[#22C55E] p-0">
                      <BrandLogo
                        variant="inverted"
                        className="h-10 w-auto max-w-[4.5rem] object-contain"
                        priority
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="min-[481px]:hidden">
              <StaticLogoGrid />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
