import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { JsonLd } from '@/components/json-ld'
import { faqSchema } from '@/lib/schema'

type FaqItem = {
  question: string
  answer: string
}

export function FaqSection({
  title,
  description,
  items,
}: {
  title: string
  description?: string
  items: FaqItem[]
}) {
  const scriptId = `faq-${title.toLowerCase().replace(/[^a-z0-9-]+/g, '-')}`

  return (
    <section className="py-20">
      <JsonLd id={scriptId} data={faqSchema(items)} />
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">{title}</h2>
            {description ? (
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{description}</p>
            ) : null}
          </div>
          <Accordion type="single" collapsible className="rounded-2xl border bg-background px-6">
            {items.map((item, index) => (
              <AccordionItem key={item.question} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
