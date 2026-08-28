---
target: stratalabai.com (Strata OS marketing site)
total_score: 25
max_score: 40
na_heuristics: 
p0_count: 2
p1_count: 2
timestamp: 2026-08-28T08-42-58Z
slug: stratalabai-com
---
Method: dual-agent (A: design review · B: detector + browser evidence — both isolated, run in parallel)

⚠️ Disclosure: the parent synthesis context received Assessment B before Assessment A finished, so the
synthesis (not Assessment A itself) was anchored by detector output. A ran isolated and unanchored.

## Design Health Score — 25/40 (Acceptable)

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Unlabeled teal bars under the 9 department cards imply a status that does not exist; a tier CTA gives no signal the choice was carried |
| 2 | Match system / real world | 3 | Native validation fires in ENGLISH on the Spanish site; "Business OS", "Jarvis", "Loop evolutivo" never glossed on first use |
| 3 | User control and freedom | 3 | /para-quien hover REPLACES card content with no way to hold both states; mobile drawer has no scrim, hero CTAs stay tappable underneath |
| 4 | Consistency and standards | 2 | Gold means three unrelated things; FAQ collapses with × and expands with +; all three pricing CTAs are ghost; three founder photos in three registers |
| 5 | Error prevention | 2 | Only native required + type=email. At the one moment that matters the site relies entirely on the browser |
| 6 | Recognition over recall | 2 | Hover-flip deletes the company name while you read its description; total cost split across two pages |
| 7 | Flexibility and efficiency | 3 | Real shortcut layer exists (deep-linkable /precios, canned prompts, language switch preserves page). No way to reach the form with the chosen tier attached |
| 8 | Aesthetic and minimalist | 2 | Home asks for three different things; /el-os stacks 9 cards + 4 screenshots + 2 offers + 2 forms; closing headline repeats verbatim 5× |
| 9 | Error recovery | 2 | English bubbles on a Spanish page. Partially redeemed: the failure path surfaces a mailto |
| 10 | Help and documentation | 3 | 6-item FAQ, billing note, guided chat, legal pages — but the FAQ exists only on /precios and the contact email renders only inside an error |
| **Total** | | **25/40** | **Acceptable — significant improvements needed** |

Both optional heuristics were scored rather than marked n/a: both have real substance here.

## Design Specificity Verdict

**Grounded in this product — but the grounding is concentrated in four moves, and everything between
them is stock B2B-AI.** Roughly a fifth of the surface could only exist for Strata. Worse: the two
places where the design must be most specific — the pricing decision and the email commitment — are
the two places it is most generic.

Authored, unliftable: the hero Business OS panel (DOM, not a PNG, and its interior re-renders in
English on /en) · Space Mono as a system voice rather than decoration · /control as a whole page about
restraint, quoting the customer's actual fear as each card subtitle · pricing that sells departments,
not seats · the honesty apparatus (amber availability band, the asterisk on the impact ranges, "five
of these six companies are ours and it is marked on each card").

Category-interchangeable: the palette and atmosphere (ink + single teal + 84px grid + blurred radial
orbs + teal→mint gradient CTA — the 2024–26 AI default) · the section machine (mono eyebrow → two-line
headline with the second clause in the accent → lead → 3/4-up rounded cards with an icon in a tinted
square) running unmodified ~11 times across five pages · the component shelf (reveal-on-scroll,
marquee, counting stats, accordion, round chat FAB with an orange dot) · the closing block, byte-
identical on five pages · the 8-card results wall, whose layout says "here are eight equally
important numbers", which is what a persuasion surface must never say.

**Deterministic scan.** Source markup (`src/pages`, `src/components`, 35 .astro files): exit 0, ZERO
findings — verified with a control file that did fire two rules, so the zero is real. Rendered pages:
1,219 findings across 11 scans (867 desktop, 352 mobile), 1,210 warning / 9 advisory / 0 error.
14 of 15 rules fire ONLY on the rendered page: they need computed styles, layout geometry and paint
order. A source-only gate on this repo passes clean and detects nothing.

Union by rule: ai-color-palette 769 · all-caps-body 109 · undersized-ui-text 107 · wide-tracking 51 ·
line-length 37 · clipped-overflow-container 34 · dark-glow 29 · low-contrast 23 · kicker-above-heading
21 · tiny-text 10 · cramped-padding 10 · hero-eyebrow-chip 9 · gpt-thin-border-wide-shadow 9
(advisory) · edge-flush-cards 1.

**The 769 is one decision, not 769 defects.** All of it reduces to two unique snippets ("Cyan gradient
background", "Cyan neon text on dark background"), counted per element and re-counted on 11 scans. It
is 63% of the union and will dominate any naive ranking. The rule is correctly triggered; the count is
not a priority signal.

**False positives.** `text-occlusion` (5) is the detector detecting its own overlay — the snippets
quote `span "✦ ai color palette"`, its own badge format; proven with a two-pass test (0 before paint,
5 after). One `cramped-padding` instance on the homepage is likely the same contamination. The
`hero-eyebrow-chip` snippet reads `h1 "La IA que operatu negocio."` — a snippet artifact from
concatenating across a `<br>`, not a missing space on the site.

**Where the detector caught what the review missed:** the 10px/11px functional text (~20 hard-coded
declarations in sections.css and widgets.css), the WCAG failures on /precios (#0e9b8e teal on light =
3.2:1, #b5810f = 3.1:1), and — outside every rule engine, from the browser's network log — a 404 on
`/fonts/space-grotesk-400-latin.woff2` on every page load.

**No user-visible overlay exists.** The browser was headless and agent-controlled; the overlay is real
machine evidence (181 DOM nodes, console output) but nothing was presented in a human tab.

## Overall Impression

The site has a real voice and one genuinely unrepeatable asset, and it spends the visitor's attention
on neither. What works is the honesty (disclosing against itself), the live DOM product panel, and the
reassurance at the commitment point. What does not is that the two decisive surfaces — the pricing
page and the form — are the weakest craft on the site, and one of them has no primary button at all
because of a ternary evaluation order.

Single biggest opportunity: the hero panel is a live, localized replica of the real product. It appears
once, cropped, sliding under the nav, and never again. Everything else is card grids describing a panel
you already own.

## Priority Issues

**[P0] /precios has no primary action, and it is a code-level accident.**
`Pricing.astro:68` → `tier.comingSoon ? 'btn-ghost' : tier.highlight ? 'btn-teal' : 'btn-ghost'`. The
highlighted tier ("Tres departamentos") carries BOTH `highlight: true` and `comingSoon: true`, so the
ternary short-circuits and the `btn-teal` branch is unreachable. Verified in the source. Someone
deliberately designed the recommended plan as a primary button and the condition order silently deletes
it. Both waitlist CTAs also point at the same `#lanzamiento` anchor and the form never mentions the
tier, so the choice the visitor just made is discarded.
Fix: reorder to `tier.highlight ? 'btn-teal' : 'btn-ghost'` and let `comingSoon` change the LABEL, not
the weight. Carry the tier into the form and echo it in the heading.
Command: /impeccable polish

**[P0] "EL MÁS ELEGIDO" on a product that is explicitly not for sale.**
`content/es.ts:658` (EN `en.ts:647`, "Most popular") on the middle tier, which also carries
`PRÓXIMAMENTE`, ~200px under a band reading "STRATA OS todavía no está a la venta". Verified. It is the
one unsupportable claim on a site whose entire voice is built on disclosing against itself, and the
co-founder demos this live.
Fix: replace with a claim that stands ("El punto de partida que recomendamos"). Reserve gold
exclusively for the availability caveat; give the recommendation its own visual language.
Command: /impeccable clarify

**[P1] Validation speaks English on the Spanish site, at the money moment.**
Empty email → "Please fill out this field." Malformed → "Please include an '@' in the email address."
Verified on / at 1440px and on the diagnostic form. This is the precise instant the visitor commits.
Fix: the styling already exists (`.cform-status.ok/.err` with role=status/alert). Intercept `invalid`
and `submit`, `setCustomValidity()` from `content`, render inline under the field.
Command: /impeccable harden

**[P1] The form fields do not read as fields.**
`border: rgba(244,247,248,0.22)` over `background: rgba(255,255,255,0.05)` on `--ink-deep` ≈ 1.9:1,
below the 3:1 minimum for a UI boundary. At 1440px the NOMBRE / EMAIL / EMPRESA boxes read as negative
space in the grid pattern. Every conversion passes through these four rectangles.
Fix: resting border to ~3.5:1, 2px mint focus border, slightly lighter filled state, keep 52px height.
Command: /impeccable polish

**[P2] The nav is 78% opaque and the page collides with it.**
`.nav { background: rgba(10,22,32,0.78) }` with links at 0.66 alpha. Over light sections the page's own
headline shows through and overlaps the link row — on / "Una plataforma. Ventas, operacio…zas." runs
through "Para quién es / Precios"; on /control the third-party logo row is clipped mid-icon. Present on
every page at every scroll position, and it lands on the persistent CTA.
Fix: opaque `--ink-deep` with a hairline once scrollY > 0; keep translucency only at rest.
Command: /impeccable layout

## Cognitive Load — CRITICAL (6 of 8 failing)

FAIL single focus (home asks for waitlist email, diagnostic form, Lab visit, "Hablemos" and a chat) ·
FAIL chunking (8 result cards, 9 department cards, 9 panel cards, 6 rollout steps) · PASS grouping ·
FAIL visual hierarchy (/precios has no primary button; "Los resultados que perseguimos" is an h3
governing a grid whose 8 card titles are not headings) · FAIL one-thing-at-a-time · FAIL minimal
choices · FAIL working memory · PASS progressive disclosure (the 26,967px landing split into five
pages was the right call, and it worked).

Decision points over 4 options: home above the fold has 11 interactive targets, 14 on a cold first
visit · /para-quien has 5 filter pills that wrap into a staggered 3-row stack at 390px whose first row
sits under the nav, with the ACTIVE pill partially hidden · /precios shows 3 tier CTAs of which two
resolve to the same destination.

## Emotional Journey

Entry is a genuine peak. Valley one immediately: on a cold visit the cookie card lands directly on top
of the product panel and holds the frame until answered — the first emotion the site produces is
administrative. Peak two at "La IA que se paga sola" (light section after four dark screens, eight
numbers). Valley two immediately after: the asterisk retracts the eight numbers the reader just banked
— the honesty is right, the PLACEMENT is wrong; framing them before they are read costs nothing.

The high-stakes moment — giving the email — is the best-handled thing on the site: "sin compromiso y
sin tarjeta", "ni spam, ni cesión a terceros", and "0 €" set as a display statistic beside "Acceso"
and "Precio". Objections answered in the visual register of benefits. Then it breaks at the pixel: the
field border is 1.9:1 and the error is in English.

Peak-end is spent on a form. The last thing on all five pages is the same 4-line all-caps question and
the same 4-field form; nothing sends the visitor away holding a proof, and the footer offers no human
contact at all.

Sharpest valley: /precios, where "EL MÁS ELEGIDO" sits ~200px below a band saying the product is not
on sale.

## Persona Red Flags

**Jordan (first-timer):** the first required interaction is the cookie card, which covers the product
panel that would have explained what Strata is · "Ver STRATA Lab" sits beside "Apúntate al lanzamiento"
at near-equal prominence with no explanation; he learns the difference only from an amber band four
clicks away · "Business OS", "Jarvis", "Loop evolutivo", "service-as-a-software" are never defined on
the homepage · the unlabeled teal bars of different lengths under the nine department cards read as a
maturity score and mean nothing · nothing tells him which three facts to take away.

**Riley (stress tester):** "EL MÁS ELEGIDO" directly under "no está a la venta" · /agentes "EJEMPLO DE
ACTIVIDAD DE UNA JORNADA" stamps five different events all at 10:19 — a day's activity in one minute ·
the chat says it only answers the four buttons yet still offers a free-text field labelled "Escribe tu
pregunta…" · mistypes his email and gets an English bubble on a Spanish page · clicks the 2.900 €/mes
CTA and lands in a waitlist that never mentions which plan he chose · wants to email a human and finds
no address anywhere (gpalma@stratalabai.com renders only when the POST fails) · reads the eight impact
figures, finds the asterisk saying they are not measured client results, and reasonably asks which
other numbers are aspirational.

**Casey (mobile):** hero H1 at 390px breaks as "LA IA QUE / OPERA / TU / NEGOCIO." with "TU" alone on
its own line in the largest type on the site · the eyebrow's "//" is left-aligned at the far edge while
its text is centred · the chat FAB covers body copy mid-page and the COOKIES footer link · "Acceso /
Precio / 0 €" stays a 3-column grid at 390px so the most persuasive line is set 1–2 words per line
across five lines · /control is 12,587px tall with no anchor nav. Credit: the company carousel swaps
its copy to "Toca para ver más" and adds arrows on touch — a real responsive decision.

## Minor Observations

The mask fade is on the wrong band: the decorative `.liveticker` has a proper `mask-image` edge fade
while the hero sectors marquee — which answers "is this for me?" — hard-clips at the viewport edge ·
FAQ toggles + ↔ × (× reads as dismiss) · the three founder photos are three photographic registers, in
the one module whose job is trust · the /control logo row mixes full-colour brand icons with plain grey
words and gets clipped mid-icon under the translucent nav · the /el-os product screenshots are cropped
so the sidebar is cut mid-panel with a large blank area beside it, undercutting the caption "capturas
reales del sistema, no maquetas" · /control's step grid is 4-up then 2-up leaving two empty cells, and
step 01 has a teal top rule while 02–06 have grey ones, implying an active state that does not exist ·
`Flow.astro` is built, content-complete and rendered nowhere, so /#como dead-ends · `Reviews.astro`
exists and there are zero testimonials on the site · heading hierarchy is flattened where it matters
most · focus rings are genuinely well made (mint outline with offset) — do not lose them ·
prefers-reduced-motion is handled in five places.

## Questions to Consider

1. What if the panel WERE the page? The strongest asset is a live, localized, DOM-built replica of the
   real product, shown once, cropped, then never again. What if it were pinned — one product surface
   held in place while the argument scrolls past it, each claim lighting up the part it refers to —
   instead of six card grids describing a panel you already own?
2. Why is the unrepeatable proof the fourth nav item? Five of the six companies on /para-quien are your
   own, running on this system today. No competitor can copy that, and the page that says so is buried
   — with cards that hide their own names on hover.
3. Nobody can transact on /precios. So why does it look like a pricing page? Two of three tiers cannot
   be bought; the third is quoted after a diagnosis. The only real conversion is the diagnostic.
