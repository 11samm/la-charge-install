type PriceTableItem = {
  label: string
  range: string
  note: string
}

export function PriceTable({
  title,
  items,
}: {
  title: string
  items: PriceTableItem[]
}) {
  return (
    <section className="py-16">
      <div className="rounded-3xl border bg-muted/30 p-8 md:p-10">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.label} className="rounded-2xl bg-background p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{item.label}</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight">{item.range}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
