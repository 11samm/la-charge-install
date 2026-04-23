export function AudiLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <circle cx="6" cy="16" r="4.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12.7" cy="16" r="4.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="19.3" cy="16" r="4.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="26" cy="16" r="4.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}
