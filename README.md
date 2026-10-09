# WHY Venture Studio website

Next.js 15 · TypeScript · Tailwind CSS 3 · Framer Motion · Lucide.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint && npm run typecheck
```

## How the page is organised

`src/app/page.tsx` renders the 19 sections in the order of the experience formula:
TALK → UNDERSTAND → EXPLORE → MEET → BELIEVE → APPLY.

| # | Section | Component |
|---|---|---|
| 01 | Conversational hero | `sections/Hero.tsx` |
| 02 | India startup clock | `sections/StartupClock.tsx` |
| 03 | Founder journey (sticky scroll on desktop) | `sections/Journey.tsx` |
| 04 | Stage selector | `sections/StageSelector.tsx` |
| 05 | WHY operating system | `sections/OperatingSystem.tsx` |
| 06 | Ecosystem proof | `sections/EcosystemProof.tsx` |
| 07 | People | `sections/People.tsx` |
| 08 | Network graph | `sections/Network.tsx` |
| 09 | India map | `sections/IndiaMap.tsx` |
| 10 | Community wall | `sections/CommunityWall.tsx` |
| 11 | Portfolio + case-study modal | `sections/Portfolio.tsx` |
| 12 | Real-world gallery | `sections/Gallery.tsx` |
| 13, 15 | Technology partners, investor network | `sections/LogoWall.tsx` |
| 14 | Mentors | `sections/Mentors.tsx` |
| 16 | Flywheel | `sections/Flywheel.tsx` |
| 17 | Vision | `sections/Vision.tsx` |
| 18 | Application | `sections/Apply.tsx` + `app/api/apply/route.ts` |
| 19 | Interactive footer | `sections/Footer.tsx` |

Context carries forward: what a visitor types in the hero pre-fills the application, the detected
stage pre-selects the stage selector, and capability buttons open the matching OS module (`src/lib/store.tsx`).

## Content: edit `src/content`, not components

| File | What it holds |
|---|---|
| `config.ts` | Site URL, email, socials, nav, `SHOW_PLACEHOLDER_SLOTS` |
| `stats.ts` | India startup clock numbers, each with source and date |
| `capabilities.ts` | The six OS modules |
| `journey.ts`, `stages.ts`, `network.ts`, `flywheel.ts`, `intents.ts` | Positioning copy and the hero's keyword interpreter |
| `ecosystem.ts` | **Everything that needs verification**: metrics, people, mentors, portfolio, partners, investors, universities, gallery photos, city activity |

### Content integrity

Every factual record has `verified: boolean` and `source`. Unverified records render as clearly marked
dashed slots labelled "Placeholder", never as fake content. Before launch, either verify every record or set
`SHOW_PLACEHOLDER_SLOTS = false` in `config.ts`: unverified records are then hidden, and any section with no
verified records disappears from the page.

Relationship wording is fixed by `Organisation.kind` (Partner / Technology partner / Investor network / Mentors from).
The investor section carries a disclaimer that listing is a network relationship, not an investment.

India statistics currently shown (static, sourced):
- 2,12,283 DPIIT-recognised startups as of 31 Jan 2026 (PIB, 17 Mar 2026)
- "Over 120" unicorns (PIB, "A Decade of Startup India", 15 Jan 2026)
- 1,02,054 startups with at least one woman director/partner (PIB, 17 Mar 2026)
- Startup closures: no single official figure found, shown as "Data pending verification"

## Applications

Set `APPLY_WEBHOOK_URL` (Google Apps Script, Zapier/Make, Slack workflow or CRM endpoint) and each valid
submission is POSTed there as JSON. Without it, development logs submissions to the console; production
refuses with a 503 and shows the visitor an error, so nothing is silently lost.

## Hero intelligence

`src/lib/interpret.ts` is a deterministic keyword matcher (no backend). To use an AI endpoint later,
replace `interpret()` and keep the `Interpretation` return shape.

## Accessibility and motion

Semantic sections with labels, skip link, visible focus rings, radio-group keyboard navigation in the stage
selector, native `<dialog>` for case studies, labelled form fields with inline errors, and
`prefers-reduced-motion` respected globally (Framer `MotionConfig` + CSS). Hover interactions all have
tap equivalents on touch.

## Merging into the existing codebase

This was built standalone because the existing project folder was not accessible during the build. To merge:
copy `src/content`, `src/lib`, `src/components`, the tokens in `tailwind.config.ts` and `src/app/globals.css`,
then reconcile `layout.tsx` metadata/fonts and `page.tsx` with the existing routes, SEO config and any
verified content already in the old site.
# WHY Venture Studio

Next.js website for WHY Venture Studio.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production

```bash
npm run lint
npm run build
npm run start
```

## Vercel deployment

Import this repository into Vercel with the following defaults:

- Framework preset: Next.js
- Build command: `npm run build`
- Install command: `npm install`
- Output directory: leave blank
- Node.js version: 20 or newer

Add `public/why-video.mp4` before deployment if the hero video should play. The current content uses illustrative stock images and sample metrics; replace them with verified company content before launch.

## Legal

The site includes `/privacy`, `/terms`, `/accessibility`, and `/cookies` pages. Have the policy text reviewed and adapted by qualified counsel before collecting production data.
