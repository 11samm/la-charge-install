/** Keep at most 10 US digits. */
export function phoneDigitsOnly(input: string): string {
  return input.replace(/\D/g, '').slice(0, 10)
}

/** Format as (###) ###-#### for display. */
export function formatPhoneUs(digits: string): string {
  const d = digits.slice(0, 10)
  if (d.length === 0) return ''
  if (d.length <= 3) return `(${d}`
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidOptionalEmail(value: string): boolean {
  if (value.trim() === '') return true
  return EMAIL_RE.test(value.trim())
}
