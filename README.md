# STRATA — web

Production implementation of `project/STRATA - Web.html` from the Claude Design
handoff bundle in this repo.

Astro + TypeScript, static output, no runtime framework. The visual design is a
faithful port of the approved prototype; the departures from it are all listed
under [What changed from the prototype](#what-changed-from-the-prototype).

**Launch status.** STRATA OS is presented as *coming soon* with a launch
waitlist — nothing on the page reads as buyable. STRATA Lab is presented as
*available today*, because it is. Both are driven by `osAvailable` /
`labAvailable` in `src/data/site.ts`; see LAUNCH-CHECKLIST.md for the switch-on
steps.

**Domain:** stratalabai.com (GoDaddy). Connection steps in `DEPLOY.md`.

## Getting started

```bash
npm install
cp .env.example .env     # optional — see "The two forms"
npm run dev              # http://localhost:4321
```

| Script | Does |
| --- | --- |
| `npm run dev` | Dev server with HMR |
| `npm run build` | Static build to `dist/` |
| `npm run preview` | Serve the built output |
| `npm run check` | `astro check` — types across `.astro` and `.ts` |

`dist/` is plain static files — see `DEPLOY.md` for hosting and for connecting
the GoDaddy domain.

No adapter, no server runtime, no secrets in the bundle.

## Layout

```
src/
  data/
    site.ts             Business config: launch status, emails, form
                        endpoints, testimonials, partner logos. Everything a
                        non-developer edits.
    content/
      types.ts          The shape of every string on the page
      es.ts / en.ts     The copy, one file per locale
  components/           One component per section, plus Nav/Footer/Chat/Icon
  layouts/Base.astro    <head>, SEO, hreflang, JSON-LD
  styles/               tokens → base → nav → hero → sections → widgets
  pages/
    index.astro         /      (Spanish)
    en/index.astro      /en    (English)
```

Both routes render the same `components/Page.astro`; only the `locale` prop
differs.

### Editing copy

All of it lives in `src/data/content/es.ts` and `en.ts`, typed by
`types.ts`. Adding a string to one locale without the other is a **type error**,
so the two cannot silently drift — run `npm run check`.

### Editing offers, prices, contacts

`src/data/site.ts` for launch status, addresses and the form endpoints; the
`pricing`, `pillars` and `lab` sections of the content files for anything with a
number on it.

## The two forms

Both POST `FormData` and treat any 2xx as success — the contract Formspree,
Basin, Web3Forms, Netlify Forms, Mailchimp and Beehiiv all satisfy, so the site
stays static with no secrets in it. Both carry a hidden `_gotcha` honeypot.

| Form | Where | Collects | Env var |
| --- | --- | --- | --- |
| Launch waitlist | `#lanzamiento` | Email only | `PUBLIC_WAITLIST_ENDPOINT` |
| Diagnosis enquiry | `#contacto` | Name, email, company, message | `PUBLIC_CONTACT_ENDPOINT` |

Separate endpoints so launch-list signups and real sales leads don't land in one
pile.

**With a variable unset, that form degrades to a `mailto:` link** rather than
rendering and quietly dropping submissions. An unconfigured deploy loses
nothing.

## What changed from the prototype

Visually this is the same page. Three groups of substantive changes:

### 1. Claims that were not true

The prototype presented invented figures as fact. Each is now either removed or
reframed:

| Prototype | Here | Why |
| --- | --- | --- |
| Three customer testimonials with 5-star ratings | Section renders only once `site.testimonials` has real entries (empty today) | Its own author flagged them as written "by archetype". Publishing invented endorsements is a fabricated testimonial — and an unfair commercial practice under EU Directive 2005/29/EC Annex I |
| The "/live" band: "Empieza tu empresa esta noche · Sin tarjeta · En minutos", over a counter reading "2.369 empresas activadas en las últimas 24 h" | The launch waitlist, in the same place and the same design | Every part of it was untrue at once: the OS is not purchasable, there is no signup to self-serve in minutes, and the counter had nothing behind it |
| A ticker of invented client sign-ups | A capability ticker: what each agent does | It read as social proof that does not exist |
| `−30%`, `×2`, `96%`, `+300 h` as measured results | Ranges (`−20–30%`, `hasta ×2`, …) framed as targets, under a visible disclaimer | They are goals, not measurements. The disclaimer is part of the design, not buried in a legal page |
| Agent feed labelled "● En vivo" | Labelled "● Demo" | It is a scripted loop, not live data |
| Chat widget presented as an assistant | Labelled "Respuestas guiadas", with a fallback that hands off to a human | It is a keyword matcher over four canned answers, not a model |
| Five empty partner-logo drop targets | Strip renders only once `site.partnerLogos` has entries | Empty targets read as a broken page |
| Pricing tiers with "Empezar" / "Probar Growth" checkout CTAs | Same figures as launch pricing, with a "Próximamente" chip, a waitlist CTA and a band stating plainly it is not on sale yet | Nothing should read as buyable before it is |

Restore any of them the moment there is something real behind them — the
components are all built and waiting on data.

### 2. Things the prototype could not do

- **Real i18n.** The prototype swapped `textContent` against a dictionary keyed
  on rendered text — fragile on whitespace, invisible to search engines, and it
  left long paragraphs in Spanish when a key was missed. Now: two pre-rendered
  routes, `hreflang` alternates, and a type-checked dictionary.
- **Mobile navigation.** The prototype did `.nav-links { display: none }` below
  640px with nothing in its place. There is now a drawer.
- **Use-case tabs.** All five panels are server-rendered with real
  `tablist`/`tab`/`tabpanel` semantics and arrow-key support; the prototype
  built them in JS, so four of five existed nowhere in the HTML.
- **Accessibility.** Skip link, visible focus rings on the dark surfaces,
  labelled form controls, `aria-expanded` on the FAQ and nav, and
  `aria-hidden` on the decorative dashboard so screen readers don't read a
  hundred meaningless numbers before the copy.
- **SEO.** Canonical, OG/Twitter tags, generated OG image, sitemap,
  `Organization` and `FAQPage` JSON-LD.
- **Images.** 2.7 MB of PNGs are now build-time WebP at multiple widths.

### 3. Bugs carried over from the prototype

- The hero had `overflow` intent but no `position: relative`, so a 640px
  decorative orb at `right:-120px` resolved against the initial containing
  block and gave every phone a sideways scroll.
- The FAQ accordion's CSS matched `.qq[aria-expanded] + .qc`, but the button is
  wrapped in a heading, so no panel ever opened.
- ~200 lines of dead CSS (`.wos*`, `.shotframe`, `.osm*`, `.hook`/`.benefit`)
  for elements that no longer existed, including one rule depending on an
  undefined `--lime`.
- The particle canvas never accounted for `devicePixelRatio` and re-seeded
  every particle on any resize.

## Before launch

See `LAUNCH-CHECKLIST.md`.
