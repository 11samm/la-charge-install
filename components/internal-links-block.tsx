import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

type InternalLink = {
  href: string
  label: string
  description?: string
}

const MAX_LINKS = 4

export function InternalLinksBlock({
  title = 'Explore Related Pages',
  links,
}: {
  title?: string
  links: InternalLink[]
}) {
  const displayLinks = links.slice(0, MAX_LINKS)

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Keep exploring the EV charger, panel upgrade, and city pages that matter most to this job.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {displayLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-2xl border bg-background p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{link.label}</h3>
                  {link.description ? (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{link.description}</p>
                  ) : null}
                </div>
                <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
