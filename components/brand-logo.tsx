import Image from 'next/image'

import { cn } from '@/lib/utils'

export function BrandLogo({
  className,
  priority = false,
  variant = 'default',
}: {
  className?: string
  priority?: boolean
  /** `inverted` asset for dark / green badge contexts (e.g. orbital center). */
  variant?: 'default' | 'inverted'
}) {
  const src =
    variant === 'inverted'
      ? '/logos/main/main-logo-inverted.svg'
      : '/logos/main/main-logo.svg'

  return (
    <Image
      src={src}
      alt="LA Charge Install logo"
      width={1748}
      height={1294}
      priority={priority}
      unoptimized
      className={cn('h-auto w-auto', className)}
    />
  )
}
