import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

import { JsonLd } from '@/components/json-ld'
import { breadcrumbSchema } from '@/lib/schema'

type Crumb = {
  label: string
  href: string
}

export function BreadcrumbNav({ items }: { items: Crumb[] }) {
  const scriptId = `breadcrumb-${items.map((item) => item.href).join('-').replace(/[^a-z0-9-]/gi, '')}`

  return (
    <>
      <JsonLd id={scriptId} data={breadcrumbSchema(items.map((item) => ({ name: item.label, path: item.href })))} />
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            return (
              <li key={item.href} className="flex items-center gap-2">
                {index > 0 ? <ChevronRight className="size-4" /> : null}
                {isLast ? (
                  <span className="font-medium text-foreground">{item.label}</span>
                ) : (
                  <Link href={item.href} className="hover:text-primary">
                    {item.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
