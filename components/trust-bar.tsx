export function TrustBar() {
  return (
    <section className="border-y border-border/50 bg-slate-50 py-16">
      <div className="container mx-auto px-4">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-slate-500">
          Utility-aware coverage across the Valley
        </p>
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
          {/* LADWP Logo */}
          <div className="flex items-center gap-3 text-foreground/70 hover:text-foreground transition-colors">
            <div className="flex items-center justify-center size-10 rounded-lg bg-foreground/5">
              <svg
                viewBox="0 0 24 24"
                className="size-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-lg font-semibold tracking-tight">LADWP</span>
          </div>

          {/* GWP */}
          <div className="flex items-center gap-3 text-foreground/70 hover:text-foreground transition-colors">
            <div className="flex items-center justify-center size-10 rounded-lg bg-foreground/5">
              <svg
                viewBox="0 0 24 24"
                className="size-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M5 12h14" />
                <path d="M8 7h8" />
                <path d="M8 17h8" />
              </svg>
            </div>
            <span className="text-lg font-semibold tracking-tight">GWP</span>
          </div>

          {/* BWP (Burbank Water and Power) Logo */}
          <div className="flex items-center gap-3 text-foreground/70 hover:text-foreground transition-colors">
            <div className="flex items-center justify-center size-10 rounded-lg bg-foreground/5">
              <svg
                viewBox="0 0 24 24"
                className="size-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0L12 2.69z" />
                <path d="M12 2.69v8.31" />
                <circle cx="12" cy="15" r="2" />
              </svg>
            </div>
            <span className="text-lg font-semibold tracking-tight">BWP</span>
          </div>

          {/* PWP */}
          <div className="flex items-center gap-3 text-foreground/70 hover:text-foreground transition-colors">
            <div className="flex items-center justify-center size-10 rounded-lg bg-foreground/5">
              <svg
                viewBox="0 0 24 24"
                className="size-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="6" />
                <path d="M12 3v18" />
              </svg>
            </div>
            <span className="text-lg font-semibold tracking-tight">PWP</span>
          </div>

          {/* SCE */}
          <div className="flex items-center gap-3 text-foreground/70 hover:text-foreground transition-colors">
            <div className="flex items-center justify-center size-10 rounded-lg bg-foreground/5">
              <svg
                viewBox="0 0 24 24"
                className="size-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M7 4h10l-2 6h3l-9 10 2-6H8z" />
              </svg>
            </div>
            <span className="text-lg font-semibold tracking-tight">SCE</span>
          </div>
        </div>
      </div>
    </section>
  )
}
