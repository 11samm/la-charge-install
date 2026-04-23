# Feature Spec: Instant Estimate — `/get-a-quote/`

**Version:** 1.0  
**Date:** 2026-04-22  
**Status:** Ready for implementation  
**Owner:** LA Charge Install

---

## 1. Overview

A standalone, full-page, multi-step quote wizard that lives at `/get-a-quote/`. This is a conversion-isolated environment: no site header, no site footer, no navigation away from the flow. The page replaces the homepage-embedded `EstimateForm` card for high-intent traffic and ad landing pages.

### Goals
- Maximize lead capture on mobile devices with large tap targets and a focused, single-question-per-screen UI
- Collect richer panel data (4 capacity tiers vs. the current 3) to improve price accuracy
- Fire a conversion event on submit for ad attribution (placeholder → real GA4/Meta Pixel later)
- Surface a dynamic price range immediately on confirmation without a page reload

### Out of Scope
- The existing `components/estimate-form.tsx` (embedded card) is **not modified** — it remains in use elsewhere
- No contractor-facing features
- No Sanity CMS integration on this page

---

## 2. Route & Isolated Layout

### Route
```
/get-a-quote/
```
Implemented as `app/get-a-quote/page.tsx` (Server Component, static page).

### Why a Custom Layout
The root `app/layout.tsx` always renders `<Header />` and `<Footer />`. To hide them for the isolated flow, a **nested layout** at `app/get-a-quote/layout.tsx` is required. Next.js App Router nested layouts override the wrapping; the nested layout should render `{children}` directly — no header, no footer.

### Minimal Page Shell
The isolated layout renders:
1. A minimal top bar: LA Charge Install wordmark (text or SVG logo, links back to `/`) + trust micro-copy: "Licensed · Verified · 4-Hour Response" aligned right
2. `{children}` — the wizard
3. A bottom footnote: "By submitting, you agree to be contacted by our licensed contractor network. We never share your info with more than 3 contractors." — small gray text, no links

The full viewport background is white (`#FFFFFF`). No dark mode variant is required for this page.

---

## 3. File / Folder Structure

```
app/
  get-a-quote/
    layout.tsx                  ← isolated layout (no Header/Footer)
    page.tsx                    ← Server Component; sets metadata, renders <QuoteWizard />

components/
  quote/
    QuoteWizard.tsx             ← 'use client'; main state container
    ProgressBar.tsx             ← step indicator strip
    StepWrapper.tsx             ← animation wrapper (slide left/right)
    ConfirmationScreen.tsx      ← post-submit result view
    steps/
      StepJobType.tsx           ← Step 1
      StepAddress.tsx           ← Step 2
      StepPanel.tsx             ← Step 3
      StepTimeline.tsx          ← Step 4
      StepContact.tsx           ← Step 5
      StepPhoto.tsx             ← Step 6

app/api/
  estimate/
    route.ts                    ← UPDATE: expand Zod schema for new panel values

lib/
  quote-logic.ts                ← NEW: pure functions for price range + lead tier (shared by API and optional client preview)
```

### Why `lib/quote-logic.ts` is separate
The price range and lead tier functions live in `lib/quote-logic.ts` as pure functions. The API route imports them. This keeps the route handler thin and makes the logic independently testable.

---

## 4. Component Architecture

### `QuoteWizard.tsx`
- `'use client'` directive
- Owns **all form state** via a single `useState<WizardState>` object
- Owns `step` (number, 1–6) and `direction` (`'forward' | 'backward'`) state
- Owns `isSubmitting` (boolean) and `result` (null | ConfirmationPayload) state
- Passes only the slice of state each step needs as props; steps call `onNext(partial)` or `onBack()`
- Renders `<ProgressBar step={step} total={6} />` (hidden on confirmation)
- Renders `<StepWrapper step={step} direction={direction}>` wrapping the active step
- On `step === 7`: renders `<ConfirmationScreen result={result} />`

### `ProgressBar.tsx`
- Props: `step: number`, `total: number`
- Renders a row of `total` pill segments; segments `<= step` are filled green (`bg-green-500`), the rest are `bg-gray-200`
- Below the pills: text label `"Step {step} of {total}"` in `text-sm text-gray-500`
- Full-width, sticky to the top of the content area on mobile

### `StepWrapper.tsx`
- Props: `step: number`, `direction: 'forward' | 'backward'`, `children: ReactNode`
- Uses a `key={step}` on the inner container so React fully unmounts/remounts each step change, triggering the CSS animation
- When `direction === 'forward'`: applies `animate-in slide-in-from-right-8 duration-300`
- When `direction === 'backward'`: applies `animate-in slide-in-from-left-8 duration-300`
- Uses `tw-animate-css` utilities already installed in the project

### Step Components (StepJobType, StepAddress, etc.)
Each step component:
- Props: relevant slice of `WizardState` + `onNext(partial: Partial<WizardState>)` + `onBack()`
- Self-contained: renders its question, answer options, and navigation buttons
- The "Continue" / "Next" button is disabled until the step's required field is filled
- No step has a loading state except `StepContact` (which triggers the API call)

### `ConfirmationScreen.tsx`
- Props: `result: ConfirmationPayload`
- Renders: success icon, headline, price range card, callback expectation, and optional "Learn more" links
- No navigation back into the wizard from here

---

## 5. Step-by-Step UI Description

### Layout Constraint (all steps)
- Max content width: `max-w-lg` (512px), centered horizontally
- Vertical padding: `py-8 px-4` on mobile, `py-12 px-0` on `sm:` and above
- Each step's heading is `text-2xl font-bold` (DM Sans), followed by optional sub-copy `text-base text-gray-500`

---

### Step 1 — Job Type

**Heading:** "What can we help you with?"

**UI:** Three stacked card-style buttons, full-width. Each card:
- Min height: `h-20` (80px) — large tap target
- Left icon (Lucide): `Zap` for EV Charger, `PanelTop` for Panel Upgrade, `Settings` for Both
- Title in `text-lg font-semibold`
- One-line descriptor in `text-sm text-gray-500` below the title
- Selected state: `border-green-500 bg-green-50 ring-2 ring-green-500/20`
- Unselected state: `border-gray-200 bg-white hover:border-green-300`

**Card labels and descriptors:**

| Value | Label | Descriptor |
|---|---|---|
| `charger` | EV Charger Install | Level 2 home charging station |
| `panel` | Panel Upgrade | Upgrade or modernize your electrical panel |
| `both` | Both Services | EV charger + panel upgrade together |

**Navigation:** No Back button on Step 1. "Next →" button enabled immediately after a card is tapped (auto-advance optional: advance automatically 300ms after selection to reduce tap count).

---

### Step 2 — Address / ZIP

**Heading:** "Where is the property located?"

**Sub-copy:** "We use this to check local permits and utility rebates."

**UI:**
- Single text input, `h-14` (56px), `text-base`
- Placeholder: "Enter your address or ZIP code"
- Google Places Autocomplete attached, restricted to US, type `address`
- On place selection: extract `locality` (city) and `postal_code` from `address_components` and store both in state
- If the user types only a 5-digit number and does not select from the dropdown, treat as a manual ZIP entry (store as `zipCode`, leave `city` empty)
- Below the input: small note "We serve the San Fernando Valley and surrounding areas"

**Validation:** Required. Must have at least a 5-digit ZIP before "Next" is enabled. Full address is preferred but not enforced — if the Places API is unavailable, fall back to ZIP-only.

**Navigation:** Back goes to Step 1, Next goes to Step 3.

---

### Step 3 — Panel Capacity

**Heading:** "What size is your electrical panel?"

**Sub-copy:** "Check the main breaker label on your electrical panel — it usually shows the amperage."

**UI:** Four stacked option cards (same card style as Step 1 but without icons):

| Value | Label | Hint text (small, gray) |
|---|---|---|
| `200a` | 200 Amp | You're all set for Level 2 charging |
| `100a` | 100 Amp | May need an upgrade depending on your load |
| `60a` | 60 Amp | Likely requires a panel upgrade first |
| `unknown` | I Don't Know | We'll assess during the free site visit |

Each card is min `h-16` (64px). Selected state same green highlight as Step 1.

**Navigation:** Back → Step 2, Next → Step 4. Enabled only after a selection.

---

### Step 4 — Timeline

**Heading:** "When do you need this done?"

**UI:** Three stacked option cards:

| Value | Label | Descriptor |
|---|---|---|
| `asap` | ASAP | I'm ready to book now |
| `within-month` | Within 1 Month | Planning ahead |
| `researching` | Just Researching | Getting price ballparks |

Auto-advance behavior: advance to Step 5 automatically 250ms after the user taps a card (no explicit "Next" tap required). Still render a "Next →" button for accessibility.

**Navigation:** Back → Step 3. Enabled only after a selection.

---

### Step 5 — Contact Capture

**Heading:** "Who should we contact?"

**UI:** Three stacked inputs in a `FieldGroup`:
1. Full Name — `type="text"`, placeholder "Jane Smith", `h-14`, **required**
2. Phone Number — `type="tel"`, placeholder "(818) 555-0123", `h-14`, **required**
3. Email Address — `type="email"`, placeholder "jane@email.com", `h-14`, **optional** — label reads "Email (optional)"

Below inputs: the consent disclaimer text in `text-xs text-gray-400`:
> "By submitting, you agree to be contacted by our licensed contractor network about your project. We never share your info with more than 3 contractors."

**Navigation:** Back → Step 4. "Get My Estimate →" button triggers submission. Button shows spinner + "Submitting…" while `isSubmitting` is true. Disabled if name or phone is empty or if `isSubmitting`.

**This step triggers the API call** — see Section 8.

---

### Step 6 — Photo Intake

**Note on step ordering:** The user requested Photo as the final step before confirmation. However, placing Photo (Step 6) _after_ Contact (Step 5) creates a UX problem: the form submission happens at the end of Step 5 (contact capture), after which there is no Step 6 to navigate to. The spec resolves this by reordering:

**Revised order: Job Type → Address → Panel → Timeline → Photo → Contact**

This means Photo is Step 5 and Contact is Step 6, matching the cursor rules' original 5-step flow. The user's request mentioned 6 steps with Contact as Step 5 and Photo as Step 6. To honor this without changing submission logic, the recommended approach is:

- Steps 1–5 collect data
- Step 6 (Photo) is a "bonus" step shown after contact info is captured but **before** the API call fires
- The API call fires when the user clicks "Submit" on Step 6

**This is the implementation the developer should follow.** Reconfirm with stakeholder if Contact must come last.

---

**Heading:** "Add a photo of your panel (optional)"

**Sub-copy:** "A panel photo speeds up your quote and helps flag upgrade needs before the callback."

**UI:**
- Drag-and-drop zone, `min-h-40`, dashed border `border-2 border-dashed border-gray-300`
- Center-aligned: Upload icon (`lucide-react Upload`), label "Tap to upload or drag a photo", sub-label "JPG or PNG, up to 10MB each"
- `<input type="file" accept="image/*" multiple>` hidden under the zone (full-overlay absolute positioning, opacity-0)
- On drag over: border turns green, background `bg-green-50`
- Selected files shown below the zone as a list with filename + "Remove" button
- Max 3 files

**Navigation:** Back → Step 5. "Submit My Request →" fires the API call. Skip option: "Skip photo — submit anyway" as a secondary text link below the button.

---

### Step 7 (Confirmation Screen)

Replaces the wizard entirely. Renders `<ConfirmationScreen />`.

**Layout:**
- Large green checkmark icon in a circle (`size-16`, `bg-green-500`, white check inside)
- H2: "You're in the queue, [First Name]!" — use the first token of `name` state
- Sub-copy: "A licensed electrician will be in touch with you soon."

**Price Range Card:**
- Rounded card `bg-green-50 border border-green-200 p-6`
- Small label: "Estimated project range"
- Large price string: e.g., `$750 – $1,200 installed` — `text-3xl font-bold text-green-700`
- Disclaimer below in `text-xs text-gray-500`: "Final price depends on site conditions. Your contractor will confirm before any work begins."

**Callback Expectation:**
- Icon: Clock (Lucide)
- Text: "A licensed electrician will review your request and contact you within 4 business hours."

**"What's next" bullet list (3 items):**
1. We review your request and assign a vetted C-10 licensed electrician
2. They call you to confirm scope and schedule a free site assessment
3. You receive a firm written quote before any work begins

**Exit links (below the main content):**
- "Explore EV charger pricing →" → `/ev-charger-installation/`
- "See panel upgrade costs →" → `/electrical-panel-services/panel-upgrade-cost/`
- "Back to home →" → `/`

---

## 6. State Management

All state lives in `QuoteWizard.tsx` using React `useState`. No external state library is needed.

### `WizardState` Type

```typescript
type JobType = 'charger' | 'panel' | 'both' | ''
type PanelCapacity = '200a' | '100a' | '60a' | 'unknown' | ''
type Timeline = 'asap' | 'within-month' | 'researching' | ''

interface WizardState {
  jobType: JobType
  address: string       // full address string from Places or manual entry
  city: string          // extracted from Places address_components
  zipCode: string       // extracted from Places or manual ZIP
  panelCapacity: PanelCapacity
  timeline: Timeline
  photos: File[]
  name: string
  phone: string
  email: string
}
```

### Supporting State (not in `WizardState`)

| State var | Type | Purpose |
|---|---|---|
| `step` | `number` (1–7) | Active step; 7 = confirmation |
| `direction` | `'forward' \| 'backward'` | Drives `StepWrapper` animation |
| `isSubmitting` | `boolean` | Disables submit button, shows spinner |
| `result` | `ConfirmationPayload \| null` | API response stored for `ConfirmationScreen` |

### `ConfirmationPayload` Type

```typescript
interface ConfirmationPayload {
  estimateRange: string   // e.g. "$750 – $1,200 installed"
  tier: string            // "Platinum" | "Gold" | "Silver"
  confirmationMessage: string
}
```

### State Update Pattern

Each step component receives:
- The specific slice of `WizardState` it needs (not the full object)
- `onNext: (partial: Partial<WizardState>) => void` — merges partial into state, increments `step`, sets `direction = 'forward'`
- `onBack: () => void` — decrements `step`, sets `direction = 'backward'`

This keeps step components stateless and pure — they only call `onNext`/`onBack`.

### `onNext` Implementation Sketch (for developer reference)

```
function handleNext(partial: Partial<WizardState>) {
  setWizardState(prev => ({ ...prev, ...partial }))
  setDirection('forward')
  setStep(prev => prev + 1)
}
```

---

## 7. Animation System

### Library
Use `tw-animate-css` (already in `devDependencies`) which provides `animate-in`, `slide-in-from-right-*`, and `slide-in-from-left-*` Tailwind utility classes.

### Mechanism

`StepWrapper.tsx` renders a `<div key={step}>`. When `step` changes, React destroys the old element and mounts a new one, triggering the `animate-in` class fresh each time.

```
direction === 'forward':  className="animate-in slide-in-from-right-8 duration-300 ease-out"
direction === 'backward': className="animate-in slide-in-from-left-8 duration-300 ease-out"
```

### No exit animation required
Because each step re-renders with a fresh key, there is no need for an exit animation library. The entering step slides in while the previous step is simply unmounted. This approach avoids any dependency on Framer Motion and keeps the JS bundle minimal.

### Progress Bar Transition
The filled segments in `ProgressBar` use `transition-all duration-300` so the green fill expands smoothly when `step` increments.

---

## 8. Form Validation Rules

| Step | Field | Rule | Error State |
|---|---|---|---|
| 1 | jobType | Required; must be one of `charger`, `panel`, `both` | "Next" button disabled |
| 2 | zipCode | Required; must match `/^\d{5}$/` | "Next" button disabled |
| 2 | address | Optional but preferred via Places autocomplete | No hard error |
| 3 | panelCapacity | Required; must be one of `200a`, `100a`, `60a`, `unknown` | "Next" button disabled |
| 4 | timeline | Required; must be one of `asap`, `within-month`, `researching` | "Next" button disabled |
| 5 | photos | Optional | No validation |
| 6 | name | Required; `name.trim().length >= 2` | "Submit" button disabled; inline message "Name is required" on blur |
| 6 | phone | Required; strip non-digits, must have `>= 10` digits | "Submit" button disabled; inline message "Enter a valid phone number" on blur |
| 6 | email | Optional; if non-empty, must match email regex | Inline message "Enter a valid email" on blur; does not block submit |

### Phone Formatting
Apply an input mask as the user types: `(###) ###-####`. Store the raw digits only in state. Send raw digits to the API.

### Client-side vs. Server-side Validation
- Client-side: disable/enable buttons as described above
- Server-side (in `route.ts`): Zod schema validates all fields independently. API returns HTTP 400 with a human-readable `message` on validation failure. The client should display this message in an alert below the submit button (not `window.alert`).

---

## 9. Price Range Branching Logic

The `getEstimateRange` function in `lib/quote-logic.ts` implements this table. The API route and (optionally) a client-side preview use this function.

### Price Range Table

| Job Type | Panel Capacity | Estimate Range | Notes |
|---|---|---|---|
| `charger` | `200a` | $750 – $1,200 | Panel ready; install only |
| `charger` | `100a` | $1,800 – $2,800 | Charger + probable panel upgrade |
| `charger` | `60a` | $2,400 – $3,800 | Charger + definite panel upgrade |
| `charger` | `unknown` | $750 – $2,800 | Range covers best and worst case |
| `panel` | `200a` | $1,200 – $3,000 | Modernization or service upgrade |
| `panel` | `100a` | $2,000 – $4,500 | Full 200A upgrade |
| `panel` | `60a` | $2,400 – $5,500 | Full 200A upgrade, older service |
| `panel` | `unknown` | $2,000 – $5,500 | Wide range pending assessment |
| `both` | `200a` | $2,000 – $3,200 | Panel work minimal; charger add-on |
| `both` | `100a` | $2,800 – $4,800 | Full combo |
| `both` | `60a` | $3,200 – $5,500 | Maximum scope |
| `both` | `unknown` | $2,400 – $4,800 | Estimated combo |

All prices are displayed as: `"$X,XXX – $X,XXX installed"` (including labor and permit, pre-rebate).

### Display Note
The confirmation screen adds a disclaimer: "Prices shown are pre-rebate estimates. Ask your contractor about LADWP, BWP, or SCE rebates that may apply to your address."

---

## 10. Lead Tier Logic

The `getLeadTier` function in `lib/quote-logic.ts`:

| Condition | Tier |
|---|---|
| `timeline === 'asap'` AND `hasPhotos === true` AND `panelCapacity` is `100a` or `60a` | Platinum |
| `timeline === 'asap'` OR `timeline === 'within-month'` | Gold |
| `timeline === 'researching'` | Silver |

The tier is logged server-side and stored in Airtable (Phase 1 stub). It is **not displayed to the user** — it is an internal routing signal only.

---

## 11. Submission Flow

### Trigger
The API call fires when the user clicks "Submit My Request" on Step 6 (or "Skip photo — submit anyway").

### Request Body (`POST /api/estimate`)

```typescript
{
  jobType: WizardState['jobType']       // required
  address: WizardState['address']       // optional
  city: WizardState['city']             // optional
  zipCode: WizardState['zipCode']       // required
  panelCapacity: WizardState['panelCapacity']  // required
  timeline: WizardState['timeline']     // required
  name: WizardState['name']             // required
  phone: WizardState['phone']           // required (raw digits)
  email: WizardState['email']           // optional
  hasPhotos: boolean                    // derived from photos.length > 0
}
```

Photos are **not** uploaded via the JSON body. In Phase 1, `hasPhotos: true` is sent as a flag. Actual file upload (to Vercel Blob or Cloudinary) is a Phase 2 task. The file objects in `WizardState.photos` are held in client memory but not transmitted.

### Success Path
1. Set `isSubmitting = false`
2. Store `result` from API response
3. Fire conversion event (see Section 12)
4. Set `step = 7` → renders `<ConfirmationScreen result={result} />`

### Error Path
1. Set `isSubmitting = false`
2. Display inline error below the submit button: `"Something went wrong — please try again or call us at (818) XXX-XXXX"`
3. Do not advance `step`

### API Route Changes Required (`app/api/estimate/route.ts`)
The Zod schema must be updated to accept the new `panelCapacity` values:

**Current:**
```typescript
panelCapacity: z.enum(['yes-200a', 'no', 'not-sure'])
```

**New:**
```typescript
panelCapacity: z.enum(['200a', '100a', '60a', 'unknown'])
```

The `getEstimateRange` and `getLeadTier` function bodies must also be updated per Sections 9 and 10 above (move to `lib/quote-logic.ts`). The existing `estimate-form.tsx` also uses `PanelCapacity` — if the old component is still in use, it must either retain the old enum or be migrated. **Do not break the existing embedded form until it is confirmed unused.**

---

## 12. Conversion Event (Placeholder)

Fire immediately after a successful API response, before transitioning to Step 7.

```typescript
// Placeholder — replace with GA4 / Meta Pixel in production
console.log('[conversion] instant_estimate_submitted', {
  jobType: wizardState.jobType,
  panelCapacity: wizardState.panelCapacity,
  timeline: wizardState.timeline,
  zipCode: wizardState.zipCode,
  hasPhotos: wizardState.photos.length > 0,
  tier: result.tier,
})
```

The event name `instant_estimate_submitted` is the canonical name that will be used when real analytics are wired up. Do not rename it.

---

## 13. Google Places Autocomplete Integration

### Package
Install `@googlemaps/js-api-loader` (official, typed):
```
pnpm add @googlemaps/js-api-loader
```

### Environment Variable
Add to `.env.local` (and Vercel project settings):
```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
```

Enable the following APIs in Google Cloud Console:
- Maps JavaScript API
- Places API

### Implementation Notes for `StepAddress.tsx`
- Load the Places library lazily inside a `useEffect` only when Step 2 mounts — do not load it on page load
- Use `google.maps.places.Autocomplete` attached to the address `<input>` ref
- Restrict to US: `componentRestrictions: { country: 'us' }`
- Fields to request: `['address_components', 'formatted_address']`
- On `place_changed`: iterate `address_components` to extract:
  - `postal_code` → store as `zipCode`
  - `locality` or `sublocality_level_1` → store as `city`
  - `formatted_address` → store as `address`
- If the user clears the input and types a raw 5-digit number, extract it with `/^\d{5}$/` and store only `zipCode`

### Performance Consideration
The Google Maps JS API loader must be initialized with `{ defer: true }` and loaded only on `/get-a-quote/`. It must NOT be added to the root layout or any other page. This keeps PageSpeed scores intact on all other pages.

### Fallback Behavior
If the API key is missing or the script fails to load, the input degrades gracefully to a plain text field. The page still functions; the user can type their ZIP manually. No error is shown to the user — the input simply has no autocomplete dropdown.

---

## 14. Page Metadata (`app/get-a-quote/page.tsx`)

```typescript
export const metadata: Metadata = {
  title: 'Get Your Free Estimate | LA Charge Install',
  description: 'Get an instant price estimate for EV charger installation or electrical panel upgrade in the San Fernando Valley. Takes 60 seconds.',
  robots: { index: false, follow: false },  // no-index: conversion page, not SEO target
}
```

The page is `noindex` to prevent it from competing with service pages in search.

---

## 15. Design Tokens & Accessibility

### Colors (Tailwind classes — do not use raw hex in JSX)
| Use | Tailwind Class |
|---|---|
| Primary CTA buttons | `bg-green-500 hover:bg-green-600` |
| Selected card highlight | `border-green-500 bg-green-50 ring-2 ring-green-500/20` |
| Progress bar fill | `bg-green-500` |
| Progress bar empty | `bg-gray-200` |
| Heading text | `text-gray-900` |
| Body / sub-copy | `text-gray-500` |
| Disclaimer text | `text-gray-400` |
| Input border | `border-gray-300 focus:border-green-500 focus:ring-green-500/20` |

### Typography
- Headings (step questions): `font-sans` (DM Sans via CSS variable `--font-dm-sans`), `font-bold`, `text-2xl`
- Body / option labels: `font-sans`, `font-medium`, `text-base`
- Disclaimers: `font-sans`, `text-xs`, `text-gray-400`

### Tap Targets
- All interactive cards: minimum `h-16` (64px), `w-full`
- CTA buttons: minimum `h-14` (56px), `w-full`
- "Back" button: minimum `h-12` (48px), `w-auto`

### Accessibility
- Each step question renders as a semantic `<fieldset>` with `<legend>` containing the step heading
- Card-style options are `<button type="button">` with `aria-pressed={selected}` — not radio inputs (visual style requirement)
- `aria-live="polite"` region wrapping the active step so screen readers announce step changes
- Focus is programmatically moved to the step heading on step transition via `useEffect` + `ref.focus()`
- `ProgressBar` has `role="progressbar"`, `aria-valuenow={step}`, `aria-valuemax={total}`

---

## 16. Performance Notes

- `app/get-a-quote/page.tsx` is a static Server Component — rendered at build time, served from Vercel edge CDN
- `QuoteWizard.tsx` is the only `'use client'` boundary; all step sub-components are Client Components imported inside it
- Google Maps loader is deferred and scoped to this route only — zero impact on other pages
- No `next/image` needed on this page (no hero image in the isolated flow)
- The page does not load the root layout's `<Header />` or `<Footer />` — saves ~15kb JS
- CSS animations use `transform` only — no layout-triggering properties, zero CLS impact

---

## 17. Open Questions / Decisions for Stakeholder

1. **Step order:** Should Photo (Step 6) come _before_ or _after_ Contact (Step 5)? The current spec places Photo before Contact so the API call fires at the very end. If Contact must come last for privacy optics, photo upload should become a separate async upload after form submission (Phase 2 approach).

2. **Auto-advance:** Steps 1 (Job Type) and 4 (Timeline) specify optional auto-advance 250–300ms after card tap. Confirm this is desired — it can feel rushed on first use.

3. **Google Maps key:** Confirm key is provisioned and restricted to the production domain before deploy. Without it, Step 2 degrades to ZIP-only.

4. **Existing `estimate-form.tsx`:** The old embedded form uses `panelCapacity: 'yes-200a' | 'no' | 'not-sure'`. The API route update will break that form unless it's migrated simultaneously or the API is versioned. Recommend migrating the embedded form to the new enum values in the same PR.

5. **Phone masking library:** Confirm whether to implement a lightweight custom mask or add a dependency like `react-imask`. The latter is ~10kb gzipped.
