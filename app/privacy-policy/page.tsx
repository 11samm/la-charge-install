import Link from 'next/link'

import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { generateMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

export const metadata = generateMetadata({
  title: 'Privacy Policy for California Homeowners',
  description:
    'Learn how LA Charge Install collects, uses, shares, and protects lead data, panel photos, analytics, and California privacy rights for local homeowners.',
  path: '/privacy-policy',
  keywords: ['privacy policy', 'CCPA', 'data protection', 'LA Charge Install'],
})

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-12">
        <BreadcrumbNav
          items={[
            { label: 'Home', href: '/' },
            { label: 'Privacy Policy', href: '/privacy-policy' },
          ]}
        />

        <article className="mx-auto max-w-3xl pb-16">
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-slate mt-10 max-w-none text-foreground prose-p:leading-relaxed prose-headings:font-display prose-a:text-primary">
            <p className="text-lg text-muted-foreground">
              This Privacy Policy describes how <strong>{siteConfig.shortName}</strong> (“we,” “us,” or “our”) collects,
              uses, discloses, and protects information when you use <a href={siteConfig.url}>{siteConfig.url}</a> and
              related lead request services. We operate a <strong>referral and lead-generation</strong> service: we are
              not a licensed contractor. We connect you with independent C-10 licensed contractors in our network.
            </p>

            <h2 className="mt-10 text-xl font-semibold">1. Information we collect</h2>
            <p>We may collect the following categories of information when you request an estimate or contact us:</p>
            <ul className="list-disc pl-5">
              <li>
                <strong>Identifiers and contact</strong> — name, phone number, email address (if provided)
              </li>
              <li>
                <strong>Location and project</strong> — street address, city, ZIP code, job type (e.g. charger, panel
                upgrade, or both), reported electrical service / panel size, and project timeline
              </li>
              <li>
                <strong>Photos and uploads</strong> — images of your electrical panel or related areas that you
                optionally upload
              </li>
              <li>
                <strong>Technical data</strong> — browser or device type, general region (e.g. from IP for fraud
                prevention), and pages visited on our site
              </li>
            </ul>

            <h2 className="mt-10 text-xl font-semibold">2. How we use your information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-5">
              <li>Provide and improve our estimate and contractor-matching service</li>
              <li>Route your request to a limited number of licensed contractor partners in our network</li>
              <li>Send SMS or email follow-up about your project, in line with your consent and applicable law</li>
              <li>Operate, secure, and analyze our website (including aggregated or de-identified analytics)</li>
              <li>Comply with law, respond to lawful requests, and protect our users and business</li>
            </ul>
            <p>
              We do <strong>not</strong> sell your personal information for money. We do not share your information with
              more than a small number of contractor partners to fulfill your request, as described at the time you
              submit the form.
            </p>

            <h2 className="mt-10 text-xl font-semibold" id="ml-training">
              3. Optional use of data for internal AI / machine learning
            </h2>
            <p>
              <strong>With your separate, optional consent</strong> (e.g. via an unchecked opt-in on our estimate
              request, where you must affirmatively check the box), we may use <strong>project details and panel
              images</strong> to develop and improve <strong>internal</strong> tools — for example, models or rules that
              help match homeowners to services, interpret panel photos, or improve estimate range guidance. This use is{' '}
              <strong>not required</strong> to receive an estimate. If you do not opt in, we will not use your information
              for this purpose, except as needed to provide the service you requested (e.g. sharing photos with
              contractors to respond to your lead).
            </p>
            <p>
              We may <strong>de-identify or aggregate</strong> data before using it in model development where
              practicable. If you have opted in and later withdraw consent or request deletion, we will stop future use
              for model training to the extent technically feasible, subject to the limitations described under “Model
              data and deletion” below.
            </p>

            <h2 className="mt-10 text-xl font-semibold">4. How we share information</h2>
            <p>We may share your information with:</p>
            <ul className="list-disc pl-5">
              <li>
                <strong>Contractor partners</strong> — to respond to your estimate request
              </li>
              <li>
                <strong>Service providers</strong> who assist our operations, such as email delivery (e.g. SendGrid), SMS
                (e.g. Twilio), lead logging or CRM (e.g. Airtable), and website hosting and analytics. These providers
                are contractually expected to use data only to provide services to us
              </li>
              <li>
                <strong>Authorities or others</strong> — when required by law or to protect rights and safety
              </li>
            </ul>
            <p>
              If we use a third-party API (for example, to process or route messages), that provider may process the
              content you submit <strong>in transit or as part of the service</strong>. We do not use Google Analytics;
              we use privacy-focused analytics (e.g. Plausible, Vercel Analytics) consistent with our configuration.
            </p>

            <h2 className="mt-10 text-xl font-semibold">5. Data retention</h2>
            <p>
              We retain lead and contact information for a limited period as needed to operate the service, fulfill
              requests, and meet legal obligations — typically on the order of <strong>up to 24 months</strong> for
              standard lead records unless a shorter or longer period is required by law or a specific business need.{' '}
              Uploaded photos may be retained for approximately <strong>up to 12 months</strong> or until deletion is
              requested, whichever comes first, unless we must retain them longer to resolve disputes or comply with law.
            </p>
            <p>Retention periods may be updated; we will post material changes to this policy.</p>

            <h2 className="mt-10 text-xl font-semibold">6. California privacy rights (CCPA / CPRA)</h2>
            <p>
              If you are a California resident, you may have the right to: <strong>know</strong> what personal
              information we collect, use, and disclose; <strong>delete</strong> personal information, subject to
              exceptions; <strong>correct</strong> inaccurate personal information; and{' '}
              <strong>opt out</strong> of certain “selling” or “sharing” of personal information. We do not sell your
              personal information. You may <strong>opt out of the use of your data for model training and similar
              internal research</strong> as described in Section 3, either by not opting in, by contacting us, or by
              withdrawing consent where we offer that mechanism.
            </p>
            <p>
              We will not discriminate against you for exercising your privacy rights. You may submit requests by
              emailing <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or calling{' '}
              <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>. We will respond within the time periods
              required by law, typically within <strong>45 days</strong> for access and deletion requests (with a
              possible extension as permitted by law).
            </p>

            <h2 className="mt-10 text-xl font-semibold">7. Model data and deletion requests</h2>
            <p>
              If you have opted in to use of your data for internal model improvement, and later request{' '}
              <strong>deletion</strong>, we will delete your personal information from our active systems to the extent
              feasible. <strong>Machine learning</strong> systems may already have incorporated de-identified or
              aggregated learnings; removing a single person’s data from a trained model is not always technically
              possible without retraining or rebuilding systems. In those cases we will (a) remove identifiable data
              from our training datasets going forward, (b) document your request, and (c) not use your identifiable data
              for further training. We will describe any limitations in our response to your request.
            </p>

            <h2 className="mt-10 text-xl font-semibold">8. Security</h2>
            <p>
              We use reasonable administrative, technical, and organizational measures to protect personal information.
              No method of transmission over the Internet is 100% secure.
            </p>

            <h2 className="mt-10 text-xl font-semibold">9. Children</h2>
            <p>Our service is not directed to children under 16. We do not knowingly collect personal information from children.</p>

            <h2 className="mt-10 text-xl font-semibold">10. Changes</h2>
            <p>We may update this Privacy Policy from time to time. We will post the updated policy on this page and update the “Last updated” date.</p>

            <h2 className="mt-10 text-xl font-semibold">11. Contact</h2>
            <p>
              For privacy questions or to exercise your rights, contact us at:{' '}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or{' '}
              <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>.
            </p>
            <p>
              You may also read our <Link href="/terms-of-service" className="text-primary">Terms of Service</Link>.
            </p>
          </div>
        </article>
      </div>
    </div>
  )
}
