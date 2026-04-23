export type JobType = 'charger' | 'panel' | 'both'
export type PanelCapacity = '200a' | '100a' | '60a' | 'unknown'
export type Timeline = 'asap' | 'within-month' | 'researching'

export interface EstimateInput {
  jobType: JobType
  panelCapacity: PanelCapacity
  timeline: Timeline
  hasPhotos: boolean
}

/**
 * 12-row matrix: jobType × panelCapacity. Labor + permit, pre-rebate.
 */
export function getEstimateRange(input: Pick<EstimateInput, 'jobType' | 'panelCapacity'>): string {
  const { jobType, panelCapacity } = input

  if (jobType === 'charger') {
    if (panelCapacity === '200a') return '$750 – $1,200 installed'
    if (panelCapacity === '100a') return '$1,800 – $2,800 installed'
    if (panelCapacity === '60a') return '$2,400 – $3,800 installed'
    return '$750 – $2,800 installed'
  }

  if (jobType === 'panel') {
    if (panelCapacity === '200a') return '$1,200 – $3,000 installed'
    if (panelCapacity === '100a') return '$2,000 – $4,500 installed'
    if (panelCapacity === '60a') return '$2,400 – $5,500 installed'
    return '$2,000 – $5,500 installed'
  }

  if (jobType === 'both') {
    if (panelCapacity === '200a') return '$2,000 – $3,200 installed'
    if (panelCapacity === '100a') return '$2,800 – $4,800 installed'
    if (panelCapacity === '60a') return '$3,200 – $5,500 installed'
    return '$2,400 – $4,800 installed'
  }

  return '$750 – $2,800 installed'
}

export function getLeadTier(input: EstimateInput): 'Platinum' | 'Gold' | 'Silver' {
  if (
    input.timeline === 'asap' &&
    input.hasPhotos &&
    (input.panelCapacity === '100a' || input.panelCapacity === '60a')
  ) {
    return 'Platinum'
  }
  if (input.timeline === 'asap' || input.timeline === 'within-month') {
    return 'Gold'
  }
  return 'Silver'
}
