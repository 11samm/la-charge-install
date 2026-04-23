import { siteConfig } from '@/lib/site'

/** Homepage hero: capacity + response (installs line moved to estimate card). */
export function SocialProofBar() {
  return (
    <div className="inline-flex max-w-full flex-wrap items-center gap-x-5 gap-y-2 rounded-full border border-green-200 bg-green-50/70 px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm sm:gap-x-6 sm:px-5 sm:py-3">
      <span>Licensed contractor network</span>
      <span className="h-1 w-1 shrink-0 rounded-full bg-slate-300" aria-hidden />
      <span>Response target: {siteConfig.socialProof.responseTime}</span>
    </div>
  )
}
