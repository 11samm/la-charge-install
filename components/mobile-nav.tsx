"use client"

import { useCallback, useEffect, useLayoutEffect, useState } from "react"

import { createPortal } from "react-dom"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight, ChevronRight, Menu, X } from "lucide-react"

import { SiteHeaderBranding } from "@/components/site-header-branding"
import { evServiceLinks, hubPages, locationLinks, panelServiceLinks } from "@/lib/routes"
import { cn } from "@/lib/utils"

const navLinkClass =
  "block w-full min-w-0 break-words rounded-md px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted"

/** Main hub links only — tappable row with chevron, aligned to accordion label inset (border-l-4 + pl-2.5). */
const hubLinkRowClass =
  "flex min-h-12 w-full min-w-0 max-w-full items-center justify-between gap-2 pl-3.5 pr-1.5 text-left text-sm font-medium text-foreground transition-colors rounded-md outline-none hover:bg-primary/10 active:bg-primary/10 focus-visible:bg-primary/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

type AccordionId = "ev" | "panel" | "service-areas"

function NavDrawerAccordionSection({
  id,
  title,
  links,
  isOpen,
  onToggle,
}: {
  id: AccordionId
  title: string
  links: Array<{ href: string; label: string }>
  isOpen: boolean
  onToggle: () => void
}) {
  const panelId = `nav-drawer-accordion-${id}`
  const labelId = `${panelId}-label`

  return (
    <div className="min-w-0 max-w-full">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        id={labelId}
        className="flex w-full max-w-full min-w-0 items-center justify-between gap-2 rounded-r-md border-l-4 border-green-600/30 bg-primary/5 py-1.5 pl-2.5 pr-1.5 text-left"
      >
        <span className="min-w-0 flex-1 text-[0.6875rem] font-extrabold uppercase leading-tight tracking-wider text-foreground">
          {title}
        </span>
        <ChevronRight
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-out",
            isOpen && "rotate-90",
          )}
          aria-hidden
        />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={labelId}
        aria-hidden={!isOpen}
        className="overflow-hidden transition-[max-height] duration-200 ease-out"
        style={{ maxHeight: isOpen ? 2000 : 0 }}
        {...(!isOpen ? ({ inert: true } as const) : {})}
      >
        <ul className="grid gap-0.5 pt-0.5 pr-0">
          {links.map((link) => (
            <li key={link.href} className="min-w-0 max-w-full">
              <Link href={link.href} className={navLinkClass}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** Hub links in the drawer, excluding Home (logo is the home affordance). */
const drawerTopHubLinks = hubPages.filter((p) => p.href !== "/")

export type MobileNavProps = {
  /** Notifies parent when the drawer opens/closes (e.g. pause header scroll observers). */
  onOpenChange?: (open: boolean) => void
}

export function MobileNav({ onOpenChange }: MobileNavProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [openAccordion, setOpenAccordion] = useState<AccordionId | null>(null)
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (open) {
      setOpenAccordion(null)
    }
  }, [open])

  const toggleAccordion = useCallback((id: AccordionId) => {
    setOpenAccordion((prev) => (prev === id ? null : id))
  }, [])

  useEffect(() => {
    onOpenChange?.(open)
  }, [open, onOpenChange])

  useLayoutEffect(() => {
    if (!open) return
    const html = document.documentElement
    const body = document.body
    // Measure *before* vertical scroll is locked, while the main scrollbar is still present.
    const scrollBarW = window.innerWidth - document.documentElement.clientWidth
    html.style.setProperty("--layout-scrollbar-pad", scrollBarW > 0 ? `${scrollBarW}px` : "0px")
    // Do not set `overflow` shorthand on html/body — it clears `overflow-x` and can re-enable
    // horizontal panning and layout drift when styles are removed on close.
    const prevYHtml = html.style.overflowY
    const prevYBody = body.style.overflowY
    html.style.overflowY = "hidden"
    body.style.overflowY = "hidden"

    return () => {
      html.style.setProperty("--layout-scrollbar-pad", "0px")
      html.style.overflowY = prevYHtml
      body.style.overflowY = prevYBody
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="-mr-1 inline-flex size-10 items-center justify-center rounded-md text-foreground ring-offset-background hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:hidden"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
      >
        <Menu className="size-6 shrink-0" aria-hidden />
      </button>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            id="mobile-nav-panel"
            className="fixed inset-0 z-[200] flex h-[100dvh] max-h-[100dvh] min-h-0 min-w-0 w-full max-w-full flex-col overflow-hidden overflow-x-hidden bg-background font-sans antialiased text-foreground"
            style={{ top: 0, left: 0, right: 0, bottom: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <div className="flex min-h-0 min-w-0 w-full max-w-full flex-1 flex-col overflow-hidden pt-[env(safe-area-inset-top,0px)]">
              {/* Top bar: match header (including --layout-scrollbar-pad) so the close control lines up with the hamburger. */}
              <div className="w-full max-w-full shrink-0 pr-[var(--layout-scrollbar-pad)]">
                <div className="container mx-auto flex min-h-16 items-stretch justify-between gap-3 border-b border-border/50 bg-background px-4 py-2 sm:gap-4 sm:py-3">
                <SiteHeaderBranding linkClassName="min-w-0 flex-1 select-text" />
                <div className="flex shrink-0 items-center self-stretch justify-end">
                  <button
                    type="button"
                    onClick={close}
                    className="-mr-1 inline-flex size-10 items-center justify-center rounded-md text-foreground ring-offset-background hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label="Close menu"
                  >
                    <X className="size-6" aria-hidden />
                  </button>
                </div>
                </div>
              </div>

              <div
                className="min-h-0 w-full min-w-0 max-w-full flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain px-4 pt-3 [padding-bottom:env(safe-area-inset-bottom,20px)]"
              >
                <ul className="w-full min-w-0 max-w-full divide-y divide-border">
                  {drawerTopHubLinks.map((page) => (
                    <li key={page.href} className="min-w-0 max-w-full">
                      <Link href={page.href} className={cn(hubLinkRowClass, "min-w-0")}>
                        <span className="min-w-0 flex-1 break-words pr-1 leading-snug">{page.label}</span>
                        <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-3 flex w-full min-w-0 max-w-full flex-col gap-2">
                  <NavDrawerAccordionSection
                    id="ev"
                    title="EV Charger Services"
                    links={evServiceLinks}
                    isOpen={openAccordion === "ev"}
                    onToggle={() => toggleAccordion("ev")}
                  />
                  <NavDrawerAccordionSection
                    id="panel"
                    title="Panel Services"
                    links={panelServiceLinks}
                    isOpen={openAccordion === "panel"}
                    onToggle={() => toggleAccordion("panel")}
                  />
                  <NavDrawerAccordionSection
                    id="service-areas"
                    title="Service Areas"
                    links={locationLinks}
                    isOpen={openAccordion === "service-areas"}
                    onToggle={() => toggleAccordion("service-areas")}
                  />
                </div>

                <div className="mt-4 w-full min-w-0 max-w-full shrink-0">
                  <Link
                    href="/get-a-quote"
                    className="inline-flex h-12 w-full min-w-0 max-w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-4 text-center text-base font-extrabold text-white transition-colors hover:bg-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/50 focus-visible:ring-offset-2"
                  >
                    Get My Free Estimate
                    <ArrowRight className="size-5 shrink-0" strokeWidth={2.5} aria-hidden />
                  </Link>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
