# LA Charge Install

**A clear path from electrical project questions to an installation estimate.**

LA Charge Install is a responsive website for EV charger installation and electrical panel services in the San Fernando Valley. It combines service and location pages with a guided quote form that collects project details and returns an estimated price range.

## Highlights

- **Service-specific pages** — dedicated content for EV charger installations, panel services, and individual service types.
- **Local discovery** — city pages, metadata, structured data, and internal links tailored to the service area.
- **Guided estimates** — a multi-step form for address, property, electrical panel, installation needs, timing, and contact details.
- **Address assistance** — optional Google Maps integration, with a plain-text address and ZIP-code fallback.
- **Estimate logic** — a validated API request calculates a price range and lead tier from project inputs.
- **Responsive interface** — reusable components, animated transitions, and a dedicated confirmation page.

## Built with

**Next.js 16 App Router · React 19 · TypeScript · Tailwind CSS 4**

The UI uses Radix-based components, Framer Motion, and Lucide icons. Zod validates estimate submissions, and the Google Maps JavaScript loader supports address and property UI features.

## Getting started

Install Node.js compatible with Next.js 16 and npm, then run:

```sh
git clone https://github.com/11samm/la-charge-install.git
cd la-charge-install
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000).

### Optional Google Maps configuration

Create `.env.local` at the project root to enable the Google Maps features:

```dotenv
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

Enable the Maps/Places services used by your Google Cloud project and restrict this browser-visible key to your development and production sites. Restart the development server after changing the environment file. Without a key, the address step falls back to plain-text entry and ZIP-code validation.

### Production build

```sh
npm run build
npm start
```

Use a host that supports Next.js server routes, since the quote flow calls `POST /api/estimate`.

## Project structure

```text
app/
├── api/estimate/              # Submission validation and estimate response
├── ev-charger-installation/  # Charger service pages
├── electrical-panel-services/ # Panel service pages
├── locations/                # City-specific pages
└── get-a-quote/               # Quote wizard and confirmation page
components/quote/             # Wizard steps and form components
lib/
├── data/                     # Service and location content
├── quote-logic.ts            # Price ranges and lead classification
├── site.ts                   # Branding and site information
├── seo.ts                    # SEO helpers
└── schema.ts                 # Structured data helpers
```

## Customization

- Edit [lib/site.ts](lib/site.ts) for the site identity, domain, contact information, and service area.
- Update [lib/data/services.ts](lib/data/services.ts) and [lib/data/locations.ts](lib/data/locations.ts) for service and city content.
- Adjust [lib/quote-logic.ts](lib/quote-logic.ts) for estimate ranges and lead tiers.
- Extend [app/api/estimate/route.ts](app/api/estimate/route.ts) to connect a CRM, database, or notification service.

## Current scope

The estimate endpoint validates submissions, calculates a range and lead tier, and logs selected project details. It **does not currently save leads to a database or send them to an electrician, CRM, or email service**. The confirmation copy describes a follow-up workflow that requires a separate integration.

The form is an estimate and intake experience; contractor dispatch and operational follow-up need to be connected before relying on it for live lead handling.
