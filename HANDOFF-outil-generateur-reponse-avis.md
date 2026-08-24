# SPEC — Outil #1 : Générateur de réponse aux avis Google

**Date:** 24 August 2026
**Repo:** `FahadKhalid1/StepUpAI` → `/Users/fahad/Projects/stepUpAI-new`
**Prod:** https://www.stepupai.fr (Vercel, auto-deploy on push to `main`)
**Status:** specced, not built
**Parent:** `HANDOFF-outils-2026-08.md` (this replaces "facturation électronique" as tool #1 — see Rationale)

---

## 1. What it is

A free, no-signup page where a French business owner pastes a Google review and gets a
ready-to-post reply in their own tone, in the review's language.

One screen. Paste → choose tone → get two sentences → copy. The offer for **Reviews Hub**
(€4.99/mo, the paid product that does this automatically for every incoming review) sits
*underneath* the result, never in front of it.

## 2. Rationale — why this over the e-invoicing checker

- **The demand is already served badly.** "répondre à un avis Google négatif exemple" is
  answered today by static listicles of canned phrases. A generator that takes *their*
  review beats a list of generic ones.
- **It needs no third-party data.** No API keys, no government endpoint, no dataset that
  can go stale. Contrast the e-invoicing tool, whose entire value decays on a legal
  calendar we do not control.
- **It is the paid product, sampled.** Reviews Hub already exists at
  `reviewshub.step-upai.com`. This page is its funnel: same reply engine, same rules, one
  review at a time, manual. The upgrade path is self-evident to the user.
- **It has a home already.** `/solutions/restaurants` names ANDAAZ, Kurry Up and Spicy
  Chick; the services grid has the Reviews Hub card. This page links both ways.
- **Nothing to maintain.** No dated claims on the page.

The e-invoicing tool stays worth building — it just is not the one that should go first,
because it cannot rank before its own deadline (see §14).

---

## 3. Route and structural prerequisite

| Item | Value |
|---|---|
| Route | `/outils/generateur-reponse-avis-google` |
| Hub | `/outils` — required, or the tool is orphaned |
| Nav | add **Outils** between *Services* and *Projets* |

Per `HANDOFF-outils-2026-08.md`, adding a route means editing **three** places that are
not derived from one another. Miss one and the page is either unprerendered or missing
from the sitemap:

| File | What to add |
|---|---|
| `src/App.tsx` | two `<Route>`s (lazy-import, follow the `SectorPage` pattern) |
| `scripts/prerender.mjs` | both paths in the `staticPages` array (line ~23) |
| `scripts/generate-sitemap.mjs` | both paths in its own `staticPages` array (line ~11) |

Also: `src/components/Navigation.tsx` (desktop + mobile menus), and a link in the footer
services list in `src/App.tsx`.

Route count goes 149 → 151. Sitemap 77 → 79.

---

## 4. The generation contract

**Mirror the paid product exactly.** These constraints are lifted from Reviews Hub's own
prompt (`REVIEWS_HUB.md` §3) so the free sample and the paid service produce the same
voice. Do not invent new ones.

- Reply in **the language of the review**, ignoring Google's auto-translation.
- **No emojis.**
- **Never mention the star rating** explicitly.
- **Never name individual staff members.**
- **Two sentences maximum.**
- **Never invent facts** — no promises of refunds, discounts, or specific corrective
  action the owner did not describe.

Behaviour by rating, again matching the product:

| Input | Reply |
|---|---|
| 4–5 stars | short warm thank-you |
| 1–3 stars | short respectful acknowledgement + "we hope to meet your expectations next time" |
| No comment, rating only | same tone, generic — nothing to echo |
| Abusive: profanity, personal attack, discrimination, threat, defamation | model returns the single token `SKIP` |

`SKIP` is **not an error.** The UI must handle it as a first-class result: explain that
this review looks abusive, that replying publicly can make it worse, and that Google's
own removal-request flow is the better route. That single behaviour is the most
trust-building thing on the page, and no competitor listicle does it.

---

## 5. UX

**Inputs**
1. Review text — textarea, required, max 1500 chars, live counter.
2. Star rating — 1–5 selector, required (drives tone).
3. Business type — select: restaurant · salon/coiffeur · commerce · hôtel · autre.
   Defaults to *autre*. Shapes vocabulary only.
4. Tone — segmented control: *chaleureux* (default) · *professionnel* · *concis*.
5. Business name — optional, single line. Empty is fine; never fabricate one.

**Output**
- The reply, in a bordered card, editable in place.
- **Copier** button (`navigator.clipboard`, with a fallback select-all for older browsers).
- **Régénérer** — one variation, then rate-limited (§7).
- Small print: *"Relisez avant de publier. Vous restez responsable de la réponse."*

**States:** idle · generating (skeleton, not a spinner-only screen) · result · `SKIP` ·
error · rate-limited. Every state must render something useful — never a dead box.

**Below the fold, on the same page** (this is what actually ranks — the widget alone is
~80 words and will not):
- *Comment répondre à un avis Google : 5 règles* — short, substantive.
- *Faut-il répondre aux avis négatifs ?* — yes, with the reasoning.
- *Peut-on faire supprimer un avis ?* — the honest answer and Google's process.
- 4–6 worked examples (review → reply) rendered as static HTML, so the page has real
  crawlable content even with JavaScript off.
- FAQ block, reusing the CSS-collapse pattern from `SectorPage.tsx` so answers stay in
  the DOM for crawlers and answer engines.

---

## 6. API endpoint

New file: `api/review-reply.ts` (Vercel serverless, same shape as `api/chat.ts`).

**Do not extend `api/chat.ts`.** It proxies a self-hosted LLM at `LLM_BASE_URL`;
`llm.step-upai.com` has never resolved and the live endpoint returns
`503 {"error":"unconfigured"}` today. This tool needs a model that actually answers.

```
POST /api/review-reply
{ review: string, rating: 1-5, businessType?: string, tone?: string,
  businessName?: string, language: 'fr' | 'en' }
→ 200 { reply: string }
→ 200 { skip: true, reason: 'abusive' }
→ 400 invalid_input | 429 rate_limited | 502 upstream_error | 503 unconfigured
```

Server-side rules:
- Origin allow-list, same as `api/chat.ts` (`stepupai.fr`, `step-upai.com`, localhost).
- Hard input caps: review ≤ 1500 chars, businessName ≤ 80. Reject, don't truncate.
- `export const config = { maxDuration: 30 }`.
- Never echo the input back in the error body.
- Model id in `REVIEW_MODEL` env var, so it can be changed without a deploy.

**Call it with the official SDK** (`@anthropic-ai/sdk`), not raw fetch — the repo is
TypeScript and the SDK is the supported path. Key in `ANTHROPIC_API_KEY` (Vercel env,
never committed).

### Model choice — decision needed

Per-call cost at ~500 input / ~150 output tokens:

| Model | Input $/1M | Output $/1M | ≈ per call | 1,000 calls/mo |
|---|---|---|---|---|
| `claude-opus-5` (default) | $5 | $25 | $0.0063 | **$6.25** |
| `claude-sonnet-5` | $3 | $15 | $0.0038 | **$3.75** |
| `claude-haiku-4-5` | $1 | $5 | $0.0013 | **$1.25** |

All three are pay-per-use with no monthly commitment, which fits the standing rule in
`CLAUDE.md` §3.4. At realistic traffic the difference is a few euros a month — the real
cost risk is abuse, not model tier (§7).

Two API details that affect the choice:
- **`temperature` is rejected (400) on Opus 5 and Sonnet 5** — sampling params were
  removed on those models. Only Haiku 4.5 accepts `temperature`. If you want a
  temperature knob for tone variation, that decision picks the model.
- On Opus 5, thinking is **on by default**. For a two-sentence reply, set
  `output_config: { effort: "low" }` rather than disabling thinking — disabling it has
  known failure modes.

Other params: `max_tokens: 256` (deliberately short output), rules in the `system` prompt,
review text in the user turn. No streaming — the response is two sentences.

---

## 7. Abuse and cost control — do not skip this

A free, unauthenticated, public LLM endpoint is a stranger's compute budget. Minimum:

1. **Per-IP rate limit** — 10 generations/hour, 30/day, keyed on
   `x-forwarded-for`. Vercel KV or Upstash Redis free tier; both are free-tier, no card.
   In-memory counters do **not** work across serverless instances.
2. **A global daily ceiling** in env (`REVIEW_DAILY_MAX`, default 500). On breach, return
   503 and show a polite "outil très demandé aujourd'hui" state with the Reviews Hub link
   still visible. A capped page beats a surprise invoice.
3. **Reject non-browser traffic** — require the `Origin` header; no origin, no reply.
4. **No streaming, no conversation state.** One request in, one reply out. Nothing that
   can be turned into a general-purpose chatbot proxy.
5. **Log token usage per call** (`response.usage`) so spend is observable from day one.

Optional later: a lightweight proof-of-work or hCaptcha only if abuse actually appears.
Do not gate the tool pre-emptively — `HANDOFF-outils-2026-08.md` is explicit that gating
destroys the point.

---

## 8. Privacy and honesty

- **Disclose the third-party call** in one line under the textarea: the review text is
  sent to an AI provider to draft the reply, and neither the review nor the reply is
  stored. Then actually don't store it.
- **Do not log review text.** Log counts, ratings, languages, token usage — never content.
- ⚠️ The site still has **no cookie/consent mechanism** (`CLAUDE.md` §12a) and GA4 runs
  unconditionally. That is pre-existing CNIL exposure and this page adds a form to it.
  Not a blocker for launch; worth a decision.
- **Never claim auto-publication.** Same rule as the Reviews Hub service card: the owner
  reviews before anything is published. Consistency with the product page is mandatory.

---

## 9. Files to touch

| File | Change |
|---|---|
| `api/review-reply.ts` | **new** — endpoint |
| `src/lib/reviewReply.ts` | **new** — typed client-side caller + error mapping |
| `src/pages/OutilsPage.tsx` | **new** — `/outils` hub (cards for current + planned tools) |
| `src/pages/outils/ReviewReplyPage.tsx` | **new** — the tool |
| `src/data/outilsData.ts` | **new** — hub metadata; single source for the hub cards |
| `src/App.tsx` | 2 routes + footer link |
| `src/components/Navigation.tsx` | nav entry, desktop + mobile |
| `src/contexts/LanguageContext.tsx` | ~45 keys, FR + EN |
| `scripts/prerender.mjs` | 2 paths in `staticPages` |
| `scripts/generate-sitemap.mjs` | 2 paths in `staticPages` + an llms.txt section |
| `package.json` | add `@anthropic-ai/sdk` |

No new UI dependency. Reuse existing Tailwind classes, `motion.div` patterns, and the
card styling already used by the sector pages.

---

## 10. SEO / AEO

- **Title (FR):** *Générateur de réponse aux avis Google — gratuit, sans inscription | Step UpAI*
- **Canonical:** `/outils/generateur-reponse-avis-google`, self-canonical.
- **JSON-LD:** `WebApplication` (`applicationCategory: BusinessApplication`,
  `offers.price: 0`), plus `FAQPage` from the FAQ block, plus `BreadcrumbList`
  (Accueil → Outils → this page). Follow the array pattern in `SEO.tsx`.
- **SSR-safe:** all state on mount, `fetch` only in event handlers. No `window` at module
  scope — the Puppeteer prerender will crash the build otherwise.
- The prerendered HTML must contain the full editorial content and worked examples, not
  just an empty widget shell.
- Add the tool to `llms.txt` in the sitemap script.
- Internal links: from `/solutions/restaurants`, `/solutions/commerce-local`, and the
  Reviews Hub card on `/services`. Those pages are already indexed and pass authority.

---

## 11. Analytics

`src/lib/analytics.ts` already exports `trackEvent`. Add, with **no PII and no review text**:

| Event | When |
|---|---|
| `tool_use` | a generation succeeds — params: `tool: 'review_reply'`, `rating`, `language` |
| `tool_skip` | `SKIP` returned |
| `tool_copy` | reply copied — the real intent signal |
| `select_item` | Reviews Hub CTA clicked — params: `item_id: 'reviews_hub'` |

`tool_copy` is the metric to watch. A generation is curiosity; a copy is usage.

---

## 12. Conversion hook

Directly under the result, after the copy button:

> **Vous avez répondu à un avis. Reviews Hub répond à tous les autres.**
> Reviews Hub surveille votre fiche Google et prépare une réponse pour chaque nouvel
> avis, dans votre ton — vous validez avant publication. 4,99 €/mois, 7 jours d'essai.
> → Découvrir Reviews Hub

Link: `https://reviewshub.step-upai.com`, `target="_blank"`, `rel="noopener noreferrer"`.
Keep the wording consistent with the service card; do not promise auto-publication.

---

## 13. Edge cases

| Case | Behaviour |
|---|---|
| Empty review, rating only | valid — generate a generic reply in the right tone |
| Review not in FR or EN | reply in the review's language; the UI stays in the site language |
| Very long review (>1500) | reject client-side with a counter, before the request |
| Model returns >2 sentences | accept it; do not truncate mid-sentence |
| Model returns `SKIP` | dedicated state (§4), not an error |
| Endpoint 503 (no key / cap hit) | friendly message + Reviews Hub CTA still visible |
| JavaScript disabled | editorial content + examples still render (prerendered) |
| Rapid repeat clicks | disable the button while in flight; debounce Régénérer |

---

## 14. Expectations — read before judging results

This will not rank quickly. `CLAUDE.md` records the real constraint: ~30 of 73 URLs
indexed, 32 clicks in three months, **authority is the bottleneck, not markup**. A new
page on this domain takes weeks to index and months to place.

What it can do sooner: convert traffic that already arrives, give the sector pages
something worth linking to, be shareable on LinkedIn and in client conversations, and act
as a live demo in sales calls. Judge it on `tool_copy` and Reviews Hub click-through
first, on organic sessions only after ~3 months.

---

## 15. Build order

1. `/outils` hub + nav + the three-file route wiring — verify a green build first
2. `api/review-reply.ts` with the system prompt and the SDK call
3. The tool UI, all six states
4. Editorial content, examples, FAQ, JSON-LD
5. Rate limiting + daily cap
6. Analytics
7. `npm run build` — must stay green (prerender + `validate-publish`) — then push

Steps 1–4 are one working session. Step 5 needs a KV store provisioned.

---

## 16. Open decisions

1. **Model** — Opus 5 (default), Sonnet 5, or Haiku 4.5? Cost is small either way; the
   `temperature` restriction (§6) is the real differentiator.
2. **Rate-limit store** — Vercel KV or Upstash? Both free-tier, both need provisioning by
   the account owner.
3. **Nav placement** — "Outils" in the main nav, or footer-only until there is more than
   one tool?
4. **`ANTHROPIC_API_KEY`** must be added to Vercel env by the account owner. Nothing can
   be tested in production until it exists.
