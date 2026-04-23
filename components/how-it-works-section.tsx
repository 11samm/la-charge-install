import { Fragment } from 'react'
import { Camera, ChevronRight, ClipboardCheck, PhoneCall } from 'lucide-react'

const steps = [
  {
    title: 'Share the project details',
    description:
      'Choose EV charger installation, panel upgrade, or both, then add your zip code, timing, and any panel details you already know.',
    icon: ClipboardCheck,
  },
  {
    title: 'Upload a panel photo',
    description:
      'A panel photo helps the electrician identify likely scope and pricing before calling — so the first conversation is already informed.',
    icon: Camera,
  },
  {
    title: 'Get matched with the right electrician',
    description:
      'A licensed electrician in your area calls with a pricing range and a clear next step — usually within a few hours.',
    icon: PhoneCall,
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-accent text-sm uppercase tracking-[0.2em] text-primary">How It Works</p>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            How the Estimate Process Works
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Understand the real cost, verify your panel is ready, and connect with a licensed electrician before
            spending anything.
          </p>
        </div>
        <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-stretch">
          {steps.map((step, index) => (
            <Fragment key={step.title}>
              <div className="flex-1 rounded-3xl border bg-background p-8 shadow-sm">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <step.icon className="size-6" />
                </div>
                <p className="font-accent mt-6 text-sm uppercase tracking-[0.2em] text-primary">Step {index + 1}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden self-center px-1 md:flex md:items-center md:justify-center">
                  <ChevronRight className="size-6 text-green-400/50" strokeWidth={1.5} />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
