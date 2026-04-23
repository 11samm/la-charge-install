import { NextResponse } from 'next/server'
import { z } from 'zod'

import { getEstimateRange, getLeadTier } from '@/lib/quote-logic'

const phoneDigits = z
  .string()
  .transform((s) => s.replace(/\D/g, ''))
  .refine((d) => d.length >= 10, { message: 'Phone must have at least 10 digits' })

const estimateSchema = z.object({
  zipCode: z.string().regex(/^\d{5}$/),
  address: z.string().optional(),
  city: z.string().optional(),
  jobType: z.enum(['charger', 'panel', 'both']),
  propertyType: z.string().optional(),
  panelCapacity: z.enum(['200a', '100a', '60a', 'unknown']),
  panelLocation: z.string().optional(),
  garageSituation: z.string().optional(),
  chargerLocation: z.string().optional(),
  timeline: z.enum(['asap', 'within-month', 'researching']),
  name: z.string().min(2),
  phone: phoneDigits,
  email: z.string().email(),
  hasPhotos: z.boolean(),
  mlTrainingConsent: z.boolean().optional(),
})

export async function POST(request: Request) {
  const body = await request.json()
  const parsed = estimateSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: 'Please complete the required estimate fields before submitting.',
      },
      { status: 400 }
    )
  }

  const data = parsed.data
  const estimateInput = {
    jobType: data.jobType,
    panelCapacity: data.panelCapacity,
    timeline: data.timeline,
    hasPhotos: data.hasPhotos,
  }

  const estimateRange = getEstimateRange(estimateInput)
  const tier = getLeadTier(estimateInput)

  console.log('Estimate lead received', {
    zipCode: data.zipCode,
    city: data.city ?? '',
    address: data.address ?? '',
    jobType: data.jobType,
    propertyType: data.propertyType ?? '',
    panelCapacity: data.panelCapacity,
    panelLocation: data.panelLocation ?? '',
    garageSituation: data.garageSituation ?? '',
    chargerLocation: data.chargerLocation ?? '',
    tier,
    hasPhotos: data.hasPhotos,
    mlTrainingConsent: data.mlTrainingConsent ?? false,
  })

  return NextResponse.json({
    estimateRange,
    tier,
    confirmationMessage:
      'A licensed electrician from our network will review your request and contact you with next steps within 4 business hours.',
  })
}
