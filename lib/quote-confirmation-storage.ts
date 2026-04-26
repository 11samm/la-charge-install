import type { ConfirmationPayload } from '@/components/quote/types'

const STORAGE_KEY = 'lci:quote-confirmation-v1' as const

export type StoredQuoteConfirmation = {
  v: 1
  result: ConfirmationPayload
  name: string
}

export function setStoredQuoteConfirmation(data: { result: ConfirmationPayload; name: string }) {
  if (typeof window === 'undefined') return
  const payload: StoredQuoteConfirmation = { v: 1, result: data.result, name: data.name }
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    // Private mode or quota: redirect still lands on thank-you; page shows fallback.
  }
}

export function getStoredQuoteConfirmation(): StoredQuoteConfirmation | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as unknown
    if (
      parsed !== null
      && typeof parsed === 'object'
      && (parsed as { v?: unknown }).v === 1
      && 'result' in (parsed as object)
      && 'name' in (parsed as object)
    ) {
      return parsed as StoredQuoteConfirmation
    }
  } catch {
    // ignore
  }
  return null
}
