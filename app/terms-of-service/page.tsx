import Link from 'next/link'

import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { generateMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

export const metadata = generateMetadata({
  title: 'Terms of Service for Homeowners',
  description:
    'Read the LA Charge Install terms for referral matching, non-binding EV charger and panel upgrade estimates, rebate disclaimers, photo use, and contact rules.',
  path: '/terms-of-service',
  keywords: ['terms of service', 'LA Charge Install', 'referral', 'estimates'],
})

export default function TermsOfServicePage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-12">
        <BreadcrumbNav
          items={[
            { label: 'Home', href: '/' },
            { label: 'Terms of Service', href: '/terms-of-service' },
          ]}
        />

        <article className="mx-auto max-w-3xl pb-16">
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-slate mt-10 max-w-none text-foreground prose-p:leading-relaxed prose-headings:font-display prose-a:text-primary">
            <p className="text-lg text-muted-foreground">
              These Terms of Service (“Terms”) govern your use of the website and lead request services operated by{' '}
              <strong>{siteConfig.shortName}</strong> (“we,” “us,” or “our”) at <a href={siteConfig.url}>{siteConfig.url}</a>
              . By using our service or submitting a request, you agree to these Terms. If you do not agree, do not use
              the service.
            </p>

            <h2 className="mt-10 text-xl font-semibold">1. What we are (and are not)</h2>
            <p>
              <strong>{siteConfig.shortName}</strong> is a <strong>matching and referral / lead generation</strong> service. We
              are <strong>not</strong> a licensed electrical contractor. Work is performed by independent licensed C-10
              contractors in our network, not by us. Your contract for installation or electrical work, if any, is
              between you and the contractor you choose.
            </p>

            <h2 className="mt-10 text-xl font-semibold">2. Estimates and price ranges</h2>
            <p>
              Any <strong>estimate range, tier, or instant quote guidance</strong> we display is for informational
              purposes only. It is <strong>not a binding quote or guarantee</strong> of cost, scope, or timeline. Final
              pricing, permits, and conditions are determined by the licensed contractor who evaluates your home and
              project in person or through their own process.
            </p>

            <h2 className="mt-10 text-xl font-semibold">3. Utility rebates, permits, and programs</h2>
            <p>
              Information we or contractors provide about <strong>utility rebates</strong> (for example, programs offered by
              LADWP, SCE, Glendale Water & Power, Burbank Water & Power, Pasadena Water & Power, or others) and
              <strong> permits</strong> is general in nature. Programs, amounts, and eligibility <strong>change
              without notice</strong>. We do <strong>not</strong> warrant that you will qualify for any rebate or
              program. Always confirm with your utility, jurisdiction, and contractor before relying on any rebate or
              permit information.
            </p>

            <h2 className="mt-10 text-xl font-semibold">4. Your submissions and license for photos</h2>
            <p>
              When you upload images of your panel, charger location, or related areas, you represent that you have the
              right to share those images. You grant {siteConfig.shortName} a <strong>non-exclusive, worldwide,
              royalty-free license</strong> to use, store, and transmit those images (and related project information)
              to:
            </p>
            <ul className="list-disc pl-5">
              <li>operate the service, including sharing with contractor partners to respond to your request; and</li>
              <li>
                if you <strong>separately opt in</strong>, to improve internal recommendation tools and service
                matching as described in our <Link href="/privacy-policy" className="text-primary">Privacy Policy</Link>
                .
              </li>
            </ul>
            <p>
              If you do not opt in, we will not use your content for the second purpose, except as otherwise described in
              the Privacy Policy.
            </p>

            <h2 className="mt-10 text-xl font-semibold">5. Contractors</h2>
            <p>
              We aim to work with vetted, licensed professionals, but <strong>we do not control</strong> the quality,
              schedule, or legality of work performed by third-party contractors. Any dispute as to workmanship,
              warranty, or payment is primarily between you and the contractor, subject to applicable consumer protection
              law.
            </p>

            <h2 className="mt-10 text-xl font-semibold">6. Disclaimers</h2>
            <p>
              THE SERVICE AND ALL CONTENT ARE PROVIDED <strong>“AS IS”</strong> AND <strong>“AS AVAILABLE.”</strong> TO
              THE MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>

            <h2 className="mt-10 text-xl font-semibold">7. Limitation of liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, {siteConfig.shortName} AND ITS OPERATORS, AFFILIATES,
              AND SUPPLIERS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
              DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR GOODWILL, ARISING FROM YOUR USE OF THE SERVICE.
            </p>
            <p>
              IN NO EVENT SHALL OUR <strong>AGGREGATE</strong> LIABILITY FOR ALL CLAIMS RELATING TO THE SERVICE OR THESE
              TERMS EXCEED <strong>ZERO DOLLARS ($0)</strong>, EXCEPT WHERE PROHIBITED BY LAW (SUCH AS LIABILITY FOR
              GROSS NEGLIGENCE OR WILFUL MISCONDUCT, IF APPLICABLE), BECAUSE THE SERVICE IS A FREE LEAD AND REFERRAL
              LAYER. SOME JURISDICTIONS DO NOT ALLOW CERTAIN LIMITATIONS; IN THOSE JURISDICTIONS, OUR LIABILITY IS
              LIMITED TO THE MAXIMUM PERMITTED BY LAW.
            </p>

            <h2 className="mt-10 text-xl font-semibold">8. Indemnity</h2>
            <p>
              You agree to defend and indemnify {siteConfig.shortName} and its operators against claims, damages, and
              expenses (including reasonable attorneys’ fees) arising from your use of the service, your submissions, or
              your violation of these Terms, to the extent permitted by law.
            </p>

            <h2 className="mt-10 text-xl font-semibold">9. Governing law and venue</h2>
            <p>
              These Terms are governed by the laws of the <strong>State of California</strong>, without regard to
              conflict-of-law rules. You agree that courts in California shall have exclusive jurisdiction for disputes
              arising from these Terms or the service, subject to any mandatory consumer protections in your jurisdiction.
            </p>

            <h2 className="mt-10 text-xl font-semibold">10. Changes</h2>
            <p>
              We may modify these Terms at any time. We will post the updated Terms on this page. Continued use of the
              service after changes constitutes your acceptance of the revised Terms, except where a stricter process is
              required by law. Material changes may be announced on the site; check this page periodically.
            </p>

            <h2 className="mt-10 text-xl font-semibold">11. Contact</h2>
            <p>
              Questions? Contact <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or{' '}
              <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>.
            </p>
            <p>
              See our <Link href="/privacy-policy" className="text-primary">Privacy Policy</Link> for how we handle
              personal information.
            </p>
          </div>
        </article>
      </div>
    </div>
  )
}
