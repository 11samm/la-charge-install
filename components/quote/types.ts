export type JobType = 'charger' | 'panel' | 'both' | ''
export type PanelCapacity = '200a' | '100a' | '60a' | 'unknown' | ''
export type Timeline = 'asap' | 'within-month' | 'researching' | ''
export type PropertyType = 'single-family' | 'townhouse-condo' | 'multi-unit-adu' | ''
export type PanelLocation = 'garage' | 'exterior' | 'interior' | ''
export type GarageSituation = 'attached' | 'detached' | 'carport' | 'no-garage' | ''
export type ChargerLocation = 'garage-wall' | 'outside-driveway' | 'same-wall-panel' | ''

export interface WizardState {
  jobType: JobType
  propertyType: PropertyType
  address: string
  city: string
  zipCode: string
  panelCapacity: PanelCapacity
  panelLocation: PanelLocation
  garageSituation: GarageSituation
  chargerLocation: ChargerLocation
  timeline: Timeline
  photos: File[]
  /** Optional CCPA opt-in: use project details/photos to improve internal recommendation models. Never pre-checked. */
  mlTrainingConsent: boolean
  name: string
  phone: string
  email: string
}

export interface ConfirmationPayload {
  estimateRange: string
  tier: string
  confirmationMessage: string
}

export const initialWizardState: WizardState = {
  jobType: '',
  propertyType: '',
  address: '',
  city: '',
  zipCode: '',
  panelCapacity: '',
  panelLocation: '',
  garageSituation: '',
  chargerLocation: '',
  timeline: '',
  photos: [],
  mlTrainingConsent: false,
  name: '',
  phone: '',
  email: '',
}
