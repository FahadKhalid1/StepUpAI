# CLAUDE.md — Step Up AI Website & Automation System

> **Purpose:** This file is the single source of truth for everything built on the Step Up AI website + its email/automation backend. Read it first when resuming work. It covers the React site, the n8n workflows (cloud + local), credentials, storage, key decisions + *why*, and the open TODOs.
> **Last updated:** 2026-08-24 (free tools at /outils shipped; security review + CSP; Reviews Hub on /services).

---

## 1. What this project is
The **Step Up AI** marketing website (an AI‑automation agency, Paris / Île‑de‑France, French‑first) plus a **blog‑subscription email system** powered by n8n.

- **Live site:** https://www.stepupai.fr
- **Local repo:** `/Users/fahad/Projects/stepUpAI-new`
- **Git:** `origin` → `github.com/FahadKhalid1/StepUpAI` (also a secondary remote `techasad` → `github.com/TechAsad/StepUpAI`, the original author — do **not** push there)
- **Hosting/deploy:** **Vercel**, auto‑deploys on every push to `main` (~3–4 min; runs a Puppeteer prerender of 145 routes). Domain DNS for `stepupai.fr` is on **OVHcloud**; the legacy `step-upai.com` remains on **Squarespace**.

---

## 2. Tech stack & conventions
- **Vite + React + TypeScript + Tailwind + framer-motion + react-router + react-helmet-async.**
- **Bilingual**, French is the default. All UI text goes through `useLanguage()` → `t('key')` (keys in `src/contexts/LanguageContext.tsx`) **or** inline `language === 'fr' ? '…' : '…'`. Keep both languages whenever you add copy.
- **SSR-safe / prerendered:** the build prerenders every route with Puppeteer, so **no `window`/`document` access during render**. Canonical host is `https://www.stepupai.fr`.
- **Build chain (FIVE steps):** `npm run build` = `vite build && generate-sitemap.mjs && prerender.mjs && validate-publish.mjs && ping-indexnow.mjs`.
  - `generate-sitemap.mjs` parses `src/data/blog.ts` and writes `dist/sitemap.xml`, `dist/llms.txt`, **and `dist/rss.xml`**. **79 URLs** as of 2026-08-24.
  - `prerender.mjs` (Puppeteer locally, @sparticuz/chromium on Vercel) renders routes to static HTML. Non‑fatal: failures fall back to the SPA. **151 routes.**
  - `validate-publish.mjs` is a **hard gate** — exit 1 fails the Vercel build and nothing deploys. Checks every prerendered blog post for unrendered markdown, generic titles, bad canonicals, missing og:image/`<img>` files, invalid BlogPosting JSON-LD, thin shells, **hostile markup (see §14)**, and **CSP hash drift (see §14)**.
  - `ping-indexnow.mjs` runs on Vercel production only.
- **`vercel.json`** rewrites everything to `/index.html` **except** `assets`, `sitemap.xml`, `robots.txt`, `rss.xml`, `llms.txt` (those serve as real files). If you add another root static file, add it to that negative‑lookahead or it'll serve the app HTML.
- **Serverless API (`api/*.ts`, Vercel functions, excluded from the SPA rewrite):**
  - `api/review-reply.ts` — powers the free review-reply tool (§14). Anthropic SDK, `claude-sonnet-5` by default.
  - `api/chat.ts` — hero "describe what you want to automate" box (`AIPromptBox` on the homepage). Proxies a self-hosted OpenAI-compatible model at `LLM_BASE_URL`. **`llm.step-upai.com` has never resolved, so this answers `503 unconfigured` in production** and the box falls back to routing the prompt into the contact form. Working as designed; do not "fix" it by pointing it somewhere paid without deciding to.
- **Vercel env vars:** `ANTHROPIC_API_KEY` (set, Production+Preview), `REVIEW_MODEL` (optional, default `claude-sonnet-5`), `REVIEW_DAILY_MAX` (optional, default 500, `0` = kill switch), `UPSTASH_REDIS_REST_URL`/`_TOKEN` (optional, durable rate limiting — **not set**, so per-IP limits are per-instance).
- **To deploy:** commit + `git push origin main`. Don't commit the local `.claude/` dir.

### Known drift / dead code (verified 2026-08-24)
- `src/pages/BlogWriter.tsx` (308 lines) is **dead** — no route, no import, referenced nowhere. The real blog pipeline is n8n appending to `blog.ts`.
- `public/images/blog/` holds **31 folders for 17 posts** — 15 are orphans from renamed/abandoned slugs, shipping in every deploy.
- The services grid has **12** services (`ServicesPage.tsx`), not the 9 described in §4.

---

## 3. Standing user preferences (IMPORTANT — honor these)
1. **Storage lives in the Step Up AI Google Drive** — use the `Google Drive StepUpAI` credential for Sheets/Drive.
2. **Prioritize the LOCAL n8n.** Only use **cloud** when something *must* be publicly reachable (e.g. a website webhook). 
3. **Minimize cloud executions.** Target **≤ 1 execution/day** for anything scheduled; webhooks should fire only on real user events — never polling/timers that burn the quota.
4. **No monthly subscriptions** for new services. Free first; pay‑per‑use (no monthly commit) is acceptable only when explicitly chosen.
5. **Emails should come from a Step Up AI branded address** (migrating sender to `dailydigest@stepupai.fr` via Brevo — see §8).

---

---

## 3b. DOMAIN MIGRATION — stepupai.fr (2026-08-19) ⚠️ READ BEFORE TOUCHING DOMAINS

**The canonical host is now `https://www.stepupai.fr`.** The old `step-upai.com` was replaced because the hyphen split awkwardly ("step" + "upai"); `stepupai.com` was unavailable (registered to a third party since 2023-01-29), and `.fr` fits a French-first Paris/IDF agency better than any alternative .com variant.

- **Registrar:** OVHcloud. Registered 2026-08-18, **3-year term, expires 2029-08-18**, auto-renew ON, DNSSEC enabled.
- **DNS (OVH zone):** apex `A → 76.76.21.21`, `www CNAME → cname.vercel-dns.com.` Vercel project `step-up-ai`; apex 308-redirects to www.
- **`.fr` renewal risk:** AFNIC allows only **15 days** after a failed renewal charge before the domain is lost — far tighter than .com. Keep the card on file valid.

### Status — completed 2026-08-19

| Piece | State |
|---|---|
| Domain | OVHcloud, expires **2029-08-18**, auto-renew ON, DNSSEC on |
| Website | live at `https://www.stepupai.fr`, build green, 145/145 routes prerendered |
| Redirects | `step-upai.com` **and** `www.step-upai.com` → **308** → `www.stepupai.fr` — single hop, path-for-path (verified on blog + geo deep paths) |
| Code | 92 refs swapped, commit `c2b44ac`; `legal@`/`privacy@` swapped, commit `a132530` |
| Email | `contact@` / `legal@` / `privacy@` aliases live on **both** domains, all delivery-tested. MX `1 smtp.google.com.`, SPF, DKIM (2048-bit, selector `google`), DMARC `p=none` |
| Search Console | `sc-domain:stepupai.fr` verified via TXT, sitemap submitted (73 URLs), **Change of Address ACTIVE** on the old property — expect 2–8 weeks for the index to move |
| OVH zone | 10 records, steady state. Two `google-site-verification` TXTs are NOT duplicates: one anchors Workspace, one anchors GSC — deleting either breaks that service |
| Subdomains | all six re-verified 200 with **0 redirects** after cutover |

⚠️ Do not touch the redirects while Change of Address is running (180 days from 2026-08-19). The whole transfer rests on them.

### Rules that must not be broken
1. **`step-upai.com` already 308-redirects to `stepupai.fr` — keep it that way, permanently.** Never remove the redirect and never let the domain lapse (renewal is at Squarespace): it carries the existing rankings and backlinks.
2. **NEVER wildcard-redirect `*.step-upai.com`.** At least eight live hostnames depend on it (below — and the list is not proven exhaustive). Redirect `www.step-upai.com` and the apex ONLY.

### Subdomains DELIBERATELY left on step-upai.com
Not a TODO — a decision. Admin panels have no brand value; client-facing apps would break client bookmarks for no gain.

| Hostname | Host |
|---|---|
| `sjacademy.admin.step-upai.com` | Vercel (admin panel) |
| `beelingue-admin.step-upai.com` | Vercel (admin panel) |
| `andaazreviews.step-upai.com` | Vercel (client app) |
| `beautychic.step-upai.com` | Vercel (client app) |
| `menuboards.step-upai.com` | Fly.io (`stepupai-website.fly.dev`) |
| `reviewshub.step-upai.com` | Fly.io — **referenced in this repo, do NOT swap** |
| `spicychicken.step-upai.com` | Fly.io (`spicychicken.fly.dev`) — Spicy Chick, Bagnolet (Click & Collect) |

⚠️ **This table was built by guessing hostnames and has already proved incomplete** — `spicychicken` was missed on the first pass and found only because the user mentioned it. Before ever touching `step-upai.com` DNS, enumerate the real list from the Squarespace DNS zone, the Vercel dashboard and Fly.io. Do not trust this table as exhaustive.

`reviewshub` refs live at `src/App.tsx:72`, `src/pages/ServicesPage.tsx:129` & `:302`, `scripts/generate-sitemap.mjs:146`. `llm.step-upai.com` (`api/chat.ts:13`) is documentation only and has never resolved.

### Email — Google Workspace ⚠️ READ THE TRAPS

**`stepupai.fr` is the PRIMARY Workspace domain** (changed 2026-08-20). `step-upai.com` was automatically demoted to a secondary domain and still receives mail. Both domains carry full auth: MX → Google, SPF, DKIM (2048-bit, selector `google`), DMARC `p=none`.

Working addresses, verified by real delivery: `contact@` · `legal@` · `privacy@` on **both** domains.

⚠️ **TRAP 1 — secondary domain vs domain alias. This cost an afternoon.**
`stepupai.fr` was first added as a **secondary domain**, not a **domain alias**. On a secondary domain Google implicitly reserves `<primary-username>@<secondary-domain>`, so `contact@stepupai.fr` counted as already taken and **every attempt to add it as an alias was silently discarded** — no error message, the row simply vanished on save. `legal@` and `privacy@` saved fine because those local parts do not collide with the username `contact`. Symptom: mail to `contact@stepupai.fr` hard-bounced "Address not found" while every page on the live site published that address.
**Fix:** Account → Domains → Manage domains → **Change primary domain** → `stepupai.fr`. The collision dissolves and the alias sticks immediately.

⚠️ **TRAP 2 — the alias editor saves only the rows it has loaded.**
Adding aliases without first clicking **"Show all alternate emails"** silently DROPS any alias not currently displayed. That is how `contact@stepupai.fr` disappeared moments after `legal@`/`privacy@` were added and tested. Always expand the full list before editing.

⚠️ **TRAP 3 — the per-row Domain dropdown defaults to `step-upai.com` every time.** It produced `contact@stepupai.fr@step-upai.com`, then a duplicate `privacy@step-upai.com`, then a useless `contact@step-upai.com`. Set it deliberately on every row.

⚠️ **Lesson that generalises:** all three failures were SILENT. After touching this form, re-test addresses that already worked — `contact@` broke while `legal@`/`privacy@` were being verified and nobody rechecked it.

**STILL OPEN:** the account's sign-in address is still `contact@step-upai.com`. To finish the move: Directory → Users → Step Up → **UPDATE USER** → Primary email → `contact@stepupai.fr`. Same password, signs you out, old address auto-retained as an alias. The Workspace **billing email** also still points at the old domain.

### `api/chat.ts` CORS
`ALLOWED_ORIGINS` intentionally holds **both** domains (new + old). Do not prune the old entries while `step-upai.com` still serves.

## 4. What was built (this session)
1. **Services page** — added two services: **E‑commerce Store Management** and **SEO / AEO / GEO Optimization** (EN+FR copy, features, tech tags, JSON‑LD `ItemList`, expanded SEO keywords). Files: `src/pages/ServicesPage.tsx`, `src/contexts/LanguageContext.tsx`. Placeholder images `public/images/service-ecommerce.jpg`, `service-seo.jpg` (⚠️ currently reuse existing visuals — replace with real art).
2. **Brand logo** — replaced the generic `Bot` icon with a gradient **"S"** mark.
   - `public/logo-mark.svg` (S on dark‑navy rounded tile) → nav + favicon.
   - `public/logo.svg` (full lockup: S + "STEP UP") → used by structured data.
   - Updated `Navigation.tsx`, `App.tsx` (footer), `index.html` (favicon was `vite.svg`), and fixed broken `logo.png` → `logo.svg` refs in `SEO.tsx`, `BlogPage.tsx`, `BlogPostPage.tsx`.
   - *Why SVG:* the source art was pasted (not on disk) and SVG is sharper/lighter for web; recreated faithfully.
3. **Blog index redesign** (`src/pages/BlogPage.tsx`) — removed the `lg:col-span-2` featured‑card hack (caused "one giant card + empty cells"). Now: full‑width **featured hero** + **uniform card grid** + **category pills** + search. Webflow/Stripe‑style.
4. **Blog subscription system** — the big one. See §5–§8.
6. **Dense landing page** (2026-06-19) — `HomePage.tsx` is now chameleon.io-dense. Section order: **Hero → Stats → Dashboard reveal → Benefits → Services → Use Cases → How It Works → Technologies → Case Studies → Testimonials → FAQ → Video → CTA**. New sections + keys: Use Cases grid (`home.uc1-6.*`, `home.usecases.*`), How It Works (reuses `services.process.*`), Case Studies preview (reuses `projects.p1/p2/p7.*` → /projects), FAQ accordion (`home.faq.q1-6/a1-6`). FAQ answers stay in the DOM via CSS collapse (not conditional render) + a **FAQPage JSON-LD** is in the home `<SEO>` structuredData array (AEO/rich results). The "Dashboard reveal" is high up (right after Stats) as the flagship product feature.
5. **Dashboard Creation service** (2026-06-19) — added a 9th service: **Custom Dashboard Creation** (custom analytics/admin dashboards), inspired by chameleon.io + grounded in the real **Beelingue admin dashboard** at `/Users/fahad/Projects/beelingue-admin`. Wired into: `ServicesPage.tsx` (service card #9 + a chameleon‑style **showcase section** + JSON‑LD position 9), `HomePage.tsx` (showcase band), `ProjectsPage.tsx` (Beelingue admin = project #7 / new `projects.cat.dashboard` category), footer (`footer.service5`), contact dropdown (`contact.service.dashboard`), SEO keywords/desc, and `llms.txt`. Translation keys: `services.item.dashboard_*`, `services.feat.dashboard1-4`, `services.dashboard.*` (showcase), `projects.p7.*`. **Two hand‑crafted SVG dashboard mockups** (generated via a multi‑agent workflow, picked from 3 candidates): `public/images/dashboard-showcase.svg` (showcase/home, labeled‑sidebar analytics look) + `public/images/service-dashboard.svg` (service card + project, admin‑table look). NOT a geo service (no city pages). Build verified 137/137 prerender.

---

## 5. Subscription system — architecture
```
Website footer form (NewsletterSignup.tsx, site-wide)
        │  POST {email, language, source, consent, subscribed_at}
        ▼
n8n CLOUD webhook  /webhook/step-up-subscribe   ── "Blog Subscribe" workflow
        ├── Append row → Google Sheet "Subscribers" tab   (Drive cred)
        ├── Welcome email → subscriber                     (Gmail cred)
        └── Respond 200 (CORS)

Daily 08:00 (Europe/Paris)  ── "Daily Blog Digest" workflow (currently OFF)
        ├── Fetch https://www.stepupai.fr/rss.xml
        ├── Find posts published in last ~26h (Code node) → build HTML (clickable image + title)
        ├── Read "Subscribers" sheet
        └── Email all subscribers via BCC                  (Gmail cred)
```
- **Frontend:** `src/components/NewsletterSignup.tsx` (email + 1 button + fine‑print consent; `panel` and `compact` variants). Mounted **once, site‑wide in the footer** (`src/App.tsx`). *Decision: a single footer form, not a per‑page panel — visible everywhere, less clutter.* Posts to the hardcoded webhook URL (same pattern as the contact form).
- **RSS feed** (`/rss.xml`, generated in `generate-sitemap.mjs`): includes each post's cover image as `<enclosure>` (absolute URL) so the digest email can show a clickable image. This feed is the digest's data source.

---

## 6. n8n environment
- **Cloud:** `https://fk92.app.n8n.cloud` (API `/api/v1`). Personal project *"Fahad Khalid <catchfahad92@gmail.com>"* (`dxEUonGCd3019cur`). **This is where the website's public webhooks live** (the contact form uses it too).
- **Local:** `http://localhost:5678` — exists but is **not publicly reachable** AND **the n8n MCP cannot reach it** ("SSRF protection: localhost blocked"). So workflows that need a public webhook (subscribe) **must** be on cloud. Scheduled‑only jobs *could* live on local (import the JSON manually) to save cloud executions.
- **Execution discipline:** Subscribe = 1 execution per real signup. Digest = exactly 1 execution/day (one BCC email = one run, regardless of recipient count).

### Workflows owned by THIS project
| Name | ID | State | Trigger |
|---|---|---|---|
| **StepUpAI — Blog Subscribe** | `XX9BcgL4zmY2GDRr` | **ACTIVE** | webhook `POST /step-up-subscribe` |
| **StepUpAI — Daily Blog Digest** | `v9D7wfMrcsfvACdt` | **OFF** (awaiting review/activation) | schedule, daily 08:00 Europe/Paris |
| *(temp)* StepUpAI — Setup Subscribers Tab | `NFyO9IuydyUL4pos` | **DELETED** | — |
| *(temp)* StepUpAI — Digest TEST | `gdQFcWttqWdlRQ1t` | **DELETED** | — |

### Pre-existing workflows (NOT built here — context only)
- **Step-up Contact Form** (`8PglFIW45SFFgOAr`, active): webhook `/step-up-contact` → Google Sheets (contact spreadsheet `1B0m3HOei13sAknOMWDKGBIbf6I4SPO5rNaIvTzSVil0`, Sheets cred *Asad*). The site's Contact page posts here. ⚠️ **Cell Format = RAW since 2026-08-24** — do not revert it to `USER_ENTERED`; see §15 finding #2.
- **StepUpAI — Form Submissions** (`1rHBRJmtWuZNkrOd`, active): webhook `/client-form-submission` → Sheets (`1Aj7xNqqBO6QESQeG1GRs8H4dXlXmhQPxuFkz6xBiiYI` via Drive cred) + Gmail notification. ⚠️ Its Gmail node uses the **dead beelingue credential**, so those "New Client Form" alert emails are currently failing.

### Workflow node details
**Blog Subscribe** (`Webhook → [Respond OK, Append Subscriber, Welcome Email]`, parallel):
- *Append Subscriber* = HTTP node calling the Google **Sheets API** (`…/values/Subscribers!A:E:append`) with the **Drive cred** (chosen over the Sheets node because it targets a tab by **name**, no gid needed). Has `onError: continueRegularOutput` + `retryOnFail` so a storage hiccup never blocks the welcome email.
- *Welcome Email* = Gmail node, bilingual via `{{ $json.body.language }}`.
- *Respond OK* = 200 with `Access-Control-Allow-Origin: *` (CORS for the browser form).

**Daily Blog Digest** (`Schedule → Fetch RSS → Find new posts → Get Subscribers → Build Recipients → Send Digest`):
- *Find new posts* (Code): parses RSS, keeps items < ~26h old, builds per‑post HTML = clickable cover image (`<enclosure>`) + linked title + excerpt. Returns `[]` if nothing new ⇒ no email that day.
- *Get Subscribers* = HTTP read of `Subscribers!A:E` (Drive cred).
- *Build Recipients* (Code): dedupes emails, skips `unsubscribed`, joins into a BCC list.
- *Send Digest* = Gmail, `To: contact@stepupai.fr`, **subscribers in BCC** (privacy).

---

## 7. Storage
- **Subscribers:** Google Sheet `1Aj7xNqqBO6QESQeG1GRs8H4dXlXmhQPxuFkz6xBiiYI`, tab **`Subscribers`**, headers: `Email | Language | Source | SubscribedAt | Status`. (Tab was created via the Sheets API `addSheet`. This is the same spreadsheet the Form‑Submissions workflow uses; access is via the Drive cred, which is user‑level OAuth so it can reach the owner's sheets.)

---

## 8. Email sending (sender identity) — IN PROGRESS
- **Now:** Welcome + Digest send **from `catchfahad92@gmail.com`** via Gmail credential **`Gmail account catchfahad` (`lqOeapjfSKhSRO74`)**.
  - *History:* originally used **`Gmail account beelingue` (`dAdpqUSzUcSGesjF`)** purely because it was the only connected Gmail. It turned out to be **expired/revoked** (recurring `invalid_grant` — likely the Google OAuth consent screen is in "Testing" mode, which kills refresh tokens every 7 days). Switched all three email nodes to the freshly‑connected `catchfahad` Gmail.
- **Target (being set up): send from `dailydigest@stepupai.fr` via Brevo SMTP** — branded, no OAuth‑expiry, free (Brevo free tier 300/day), no monthly.
  - Plan: create Brevo account → authenticate `stepupai.fr` (add DKIM/SPF/DMARC + `brevo-code` records in **OVHcloud** → Web Cloud → Domain names → stepupai.fr → DNS zone) → add sender `dailydigest@stepupai.fr` → generate SMTP key → **user** creates an n8n SMTP credential (host `smtp-relay.brevo.com`, port `587`) named e.g. *"Brevo SMTP – Step Up AI"* → then swap the Welcome + Digest Gmail nodes to an **SMTP/emailSend node**, `From: dailydigest@stepupai.fr`.
  - *Note on secrets:* the user enters the SMTP key into n8n themselves; Claude only references the credential by name/ID, never handles the key.

---

## 9. Key credentials (n8n cloud)
| Name | ID | Type | Use |
|---|---|---|---|
| Gmail account catchfahad | `lqOeapjfSKhSRO74` | gmailOAuth2 | **current sender** (welcome/digest) |
| Gmail account beelingue | `dAdpqUSzUcSGesjF` | gmailOAuth2 | EXPIRED; still wired into Form Submissions |
| Google Drive StepUpAI | `boI5HpG7JTJFotp2` | googleDriveOAuth2Api | Sheets API read/write for subscribers |
| Google Sheets account- Asad | `805oQj3qfMNFGoJz` | googleSheetsOAuth2Api | contact-form sheet |
| SMTP account | `D6ZVHV6WTy3XUoek` | smtp | generic (from-address unknown) |
| *(to create)* Brevo SMTP – Step Up AI | — | smtp | future branded sender |

---

## 10. Open TODOs / next steps

### Migration follow-ups (see §3b)
- ~~**A. Deploy**~~ — ✅ done 2026-08-19 (merged + pushed, `c2b44ac`; deploy landed in ~90s).
- ~~**B. Vercel** redirects~~ — ✅ done 2026-08-19. Both old hostnames set to **308 Permanent** → `www.stepupai.fr`. NOTE: Vercel refuses to redirect a domain that is itself a redirect target, so `step-upai.com` had to be repointed BEFORE `www.step-upai.com` could be converted. ⚠️ www + apex ONLY — never a wildcard.
- ~~**C. Search Console**~~ — ✅ done 2026-08-19. Domain property `stepupai.fr` verified (2nd TXT token added alongside the Workspace one), sitemap submitted, Change of Address active. Owned by the personal Google account, not `contact@`.
- ~~**D. Workspace:** add `legal@`/`privacy@` aliases + swap refs~~ — ✅ done 2026-08-19 (aliases added on both domains; refs now `@stepupai.fr`).
- **E. Gmail — STILL OPEN:** set `contact@stepupai.fr` as default "Send mail as" + enable "reply from the same address the message was sent to". If it is not listed, use "Add another email address" with **"Treat as an alias" checked** — the verification code lands in the same inbox.
- **G. Workspace — STILL OPEN:** change the account's primary email / sign-in from `contact@step-upai.com` to `contact@stepupai.fr` (Directory → Users → Step Up → **UPDATE USER**, NOT the "Contact information" panel, which only accepts addresses outside the managed domains). Same password; signs you out; old address auto-retained as an alias. See §3b.
- **H. Workspace — STILL OPEN:** update the **billing email**, still on the old domain.
- ~~**F. OVH** cleanup~~ — ✅ done 2026-08-19 (`ftp` CNAME deleted; zone re-verified, nothing collateral).
### Shipped 2026-08-24 (this session)
- ~~Reviews Hub service card on `/services`~~ — ✅ live (12th card, links to `reviewshub.step-upai.com`; also in the footer, contact dropdown, llms.txt and JSON-LD position 12).
- ~~`/outils` hub + review reply generator~~ — ✅ live (§14).
- ~~Security review + fixes~~ — ✅ XSS sanitiser, build gate, Sheets formula injection, origin bypass, CSP (§15).
- ~~Anthropic spend limit~~ — ✅ **$15/month** set in the Claude Console. ⚠️ It is **org-wide**: if Reviews Hub bills to the same organisation, that $15 is shared with it. ~$5 of it was already used by other work when it was set.

### Now open
- **Upstash (or Vercel KV) for the review tool's rate limiting.** Without it the 3/24h cap is per serverless instance, so the real allowance is looser than advertised. `UPSTASH_REDIS_REST_URL` + `_TOKEN` in Vercel is all the code needs — it already falls back gracefully.
- **Spend notification** — Claude Console → Billing → *Add notification* at ~$12, so the $15 ceiling is not discovered by something breaking.
- **Consent/cookie mechanism** — still absent, GA4 still runs unconditionally (§12a). The tools add form interactions to that exposure. CNIL risk, predates this work, needs a decision.
- **Delete `src/pages/BlogWriter.tsx`** (dead) and the **15 orphaned `public/images/blog/` folders** (§2 drift note).
- **Request indexing on `/outils/generateur-reponse-avis-google`** in GSC, and watch whether a tool page indexes faster than the geo pages did — same experiment as `/solutions/restaurants`.
1. **Finish Brevo** → switch sender to `dailydigest@stepupai.fr` (see §8). DNS records go in **OVHcloud**.
2. **Activate the Daily Digest** (`v9D7wfMrcsfvACdt`) once the sender is finalized and reviewed.
3. ~~Delete temp test workflow~~ — ✅ done (both temporary workflows removed).
4. **Fix Form Submissions email** — repoint its Gmail node off the dead `beelingue` cred (to `catchfahad` or a reconnected/Brevo sender) so contact alerts work again.
5. **Replace placeholder images** `service-ecommerce.jpg` / `service-seo.jpg` with real artwork.
6. **Optional:** one‑click **unsubscribe** flow (GDPR) — small webhook + footer link in emails.
7. **Optional:** for an animated digest image, set a post's `image` to a GIF in `src/data/blog.ts` (RSS + email use whatever the post image is).
8. ~~Push commit `e5ea9e3`~~ — ✅ done (already on `origin/main`).
9. ~~GSC "Validate fix" on the two duplicate reports~~ — largely **superseded by the domain migration** (§3b). The old property is now under Change of Address, so its duplicate reports will drain as the index moves. Watch the NEW `stepupai.fr` property instead; re-check coverage there once Change of Address settles (2–8 weeks from 2026-08-19).

---

## 11. How to make changes safely
- **Website copy/features:** edit under `src/`, keep FR+EN, stay SSR‑safe, run `npm run build` (must stay green + prerender 145 routes), then `git push origin main` to deploy.
- **n8n changes:** prefer the n8n MCP. Keep the **execution discipline** (§3). For scheduled jobs consider whether they belong on **local** n8n instead of cloud.
- **Test emails:** create a small temporary webhook workflow, fire it with `curl`, check the execution via the executions API, then **delete the temp workflow**.
- **Common gotcha:** browser/caches were sticky during dev — use incognito/hard‑refresh when verifying live changes. Vercel deploy takes a few minutes; poll the live URL for the change before assuming it failed.

---

## 12. SEO / AEO / GEO architecture (hardening pass, 2026-06-12)
**Geo-page indexing strategy** (already in place, built by a parallel session; verified airtight):
- 120 geo pages (6 services × 20 cities) exist for users, but **only 8 PRIMARY cities are indexed** (`PRIMARY_CITY_SLUGS` in `src/data/geoData.ts`): paris, boulogne-billancourt, neuilly-sur-seine, levallois-perret, nanterre, issy-les-moulineaux, courbevoie, saint-germain-en-laye.
- Secondary cities render **`noindex,follow`** and are **kept out of the sitemap** (sitemap = 8 cities × 6 services = 48 geo URLs). To promote a city: add unique content in `src/data/geoLocalContent.ts` (key `service__city`, all 6 services), add the slug to `PRIMARY_CITY_SLUGS`, AND to `citySlugs` in `scripts/generate-sitemap.mjs`.
- All 48 primary combos have unique `localAngle` + `extraFaq` in `geoLocalContent.ts` (sector-grounded, per-city). This is what de-doorways the pages.
- Geo pages emit LocalBusiness (+geo coords), Service, FAQPage (incl. local FAQs), BreadcrumbList JSON-LD; self-canonical; prerendered (so noindex/canonical are in static HTML).

**Host-level duplicate prevention (the GSC "duplicate/alternate canonical" email):**
- `vercel.json`: `"trailingSlash": false` → `/page/` 308s to `/page` (was: both 200 = every URL duplicated).
- `vercel.json` rewrite excludes `assets|images|sitemap.xml|robots.txt|rss.xml|llms.txt|<gsc-verification>.txt` — anything else falls through to the SPA. **If you add a root static file, add it to this regex** or it soft-404s as HTML.
- Non-www → www: Vercel **308** redirect (domain-level), as are both `step-upai.com` hostnames. Canonicals always `https://www.stepupai.fr`. See §3b.
- GSC email reasons explained: "Alternate page with proper canonical tag" = benign (canonicals doing their job). "Duplicate without user-selected canonical" = trailing-slash dupes + pre-noindex geo crawls; fixed/expiring. **After deploys, use GSC → Pages report → "Validate fix".**

**AEO/GEO layer:**
- `dist/llms.txt` (generated in `generate-sitemap.mjs`): key-facts block, services, all 48 indexed city pages, articles, feeds, contact. Cited by AI answer engines.
- `public/robots.txt`: explicitly allows GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, PerplexityBot, Google-Extended, CCBot; links sitemap + llms.txt + rss.xml.
- FAQPage schema on geo pages + blog posts with `faq`; BreadcrumbList on geo + blog posts; global WebSite + Organization schema (`@id`-linked) in `SEO.tsx`.
- IndexNow ping on Vercel production builds (added by parallel session; skipped locally).

**Performance:** `vite.config.ts` `manualChunks` splits `react-vendor` / `motion` / `icons` from the main bundle (Core Web Vitals). Don't remove without reason.

**Bilingual note:** FR/EN toggle on the SAME URL (client-side) → **hreflang is intentionally absent** (no separate language URLs). `<html lang>` + `og:locale` switch with the toggle; prerendered HTML is French-first.

---

## 12a. Analytics & conversion tracking (2026-08-20)

GA4 property **Step-UpAi `530052823`** (account *SIV Automation* `387328588`), measurement ID `G-6FEDKY6N43`, tag in `index.html`.

`src/lib/analytics.ts` fires two GA4 **recommended** events so they can be marked as key events and imported into Google Ads without remapping:

| Event | Fires on | Verified |
|---|---|---|
| `generate_lead` | contact form success (`ContactPage.tsx`) | untested — no submission yet |
| `sign_up` | newsletter success (`NewsletterSignup.tsx`) | ✅ seen in Realtime 2026-08-20 |

Rules baked into that file: **no PII** (never email/name/message — Google policy + GDPR), SSR-safe (`typeof window` guard, so the 149-route prerender is unaffected), and errors swallowed so a tracking failure can never break a submission mid-conversion.

**STILL OPEN:**
- Star `generate_lead` + `sign_up` in GA4 → Admin → Data display → Events → **Recent events** (this UI has no create-by-name; the event must fire first, and that list lags hours). Only then can they import into Google Ads.
- Three dead key events (`close_convert_lead`, `purchase`, `qualify_lead`) show "No stream data detected" — nothing fires them. Delete.
- **No environment guard on GA4** — localhost dev traffic counts in the production property. Explains the +4,800% spike on 2026-08-20.
- GA4 recommends linking a Search Console property — **link `stepupai.fr`, NOT the old `step-upai.com`** it suggests.
- ⚠️ GA4 runs with **no consent mechanism**. For a French company that is CNIL exposure. Predates this work; needs a decision.

**Before spending the €400 Google Ads credit:** conversion tracking live and key events marked, a few Google reviews, GBP pointing at the new domain, sector pages indexed. Ads amplify a conversion rate; they do not create one. Check the credit's expiry conditions — these offers usually require matched spend inside a window.

---

## 12b. Sector pages `/solutions/*` (shipped 2026-08-20)

Trade-specific landing pages, because SMEs search by their trade rather than their postcode: a Nice restaurateur searches "répondre aux avis Google restaurant", never "automatisation IA Nice".

| Page | Named clients |
|---|---|
| `/solutions/restaurants` | ANDAAZ Desi Brasserie, Kurry Up, Spicy Chick |
| `/solutions/ecoles-formation` | Beelingue Academy, SJ Academy |
| `/solutions/ecommerce` | Magic Afro, Kurry Up |
| `/solutions/commerce-local` | Beauty Chic |

Files: `src/data/sectorData.ts` (bilingual content), `src/pages/SectorPage.tsx` (Service + FAQPage + BreadcrumbList schema; FAQ uses CSS collapse so answers stay crawlable). Wired into `App.tsx`, `generate-sitemap.mjs` (77 URLs + an llms.txt section) and `prerender.mjs` (149 routes). **The slug list is hardcoded in both .mjs scripts — keep in sync with `sectorData.ts`.**

**RULE FOR ADDING A SECTOR — do not break this.** A sector only earns a page if you can NAME the client and describe real delivered work. Documented at the top of `sectorData.ts`. The reasoning is measured, not aesthetic:

- The 48 geo pages run **65–70% mutual vocabulary overlap** (measured pairwise across all 48). Every city sits in a 65.4–68.3% band — they are uniformly templated, not selectively thin. That is why only ~30 of 73 submitted URLs were indexed.
- The four sector pages measure **38.4% mutual overlap** — the residue is nav/footer/CTA.
- Sector pages are ~733–866 words vs ~1,450 for a geo page, but ~62% unique vs ~32%. **More unique substance in half the length.** The geo pages were padded.

A sector page with invented proof is the geo-page mistake in a new shape. Immobilier/santé/hôtellerie were deliberately NOT created — no clients to name.

**Open experiment:** request indexing on `/solutions/restaurants` in GSC. If a sector page indexes while 43 geo URLs sit rejected, the approach is validated and the geo cull (48 → 12–18) is worth doing. If it is also rejected, the constraint is domain authority, not page quality — and the priority becomes reviews, citations and GBP instead. **Do not start the geo cull before that answer.**


### Authority / backlinks — the actual bottleneck (assessed 2026-08-20)

Technical SEO is **done and is not the constraint**. 32 clicks in ~3 months with 30 of 73 URLs indexed is an authority problem, not a markup problem. Adding more schema to a site nobody links to is busywork.

⚠️ **NEVER buy automated backlinks.** Paid packages, PBNs, directory blasts, comment spam all violate Google's link spam policy. On a one-year-old domain mid-migration the downside is a manual action, not "no benefit". Automate monitoring, never placement.

**1. Client credit links — biggest untapped source.** Measured 2026-08-20: **zero of the five client sites we built link back**, none even mention "Step Up".

| Site | State |
|---|---|
| `andaaz.fr` | no link, no mention |
| `kurryup.fr` | no link, no mention |
| `spicychicken.fr` | no link, no mention |
| `magicafro.fr` | no link, no mention |
| `beelingueacademy.com` | no link, no mention |

Fix: a footer credit — "Site réalisé par Step UpAI" → `https://www.stepupai.fr`. Legitimate (we built them), contextually relevant (a restaurant site → a restaurant-automation agency). **Vary the anchor text across the five** — five byte-identical footers reads as manufactured. (Check was on raw HTML; a JS-injected footer would not show.)

**2. France Num Activateur** (`francenum.gouv.fr`) — government directory of advisors helping PME digitalise. A `.gouv.fr` link, a real credential, and it puts us in front of the exact buyer. Best single item on this list after the client links.

**3. Tool partner directories** — n8n (expert listing **and** the template library: publish a workflow, it links back), Make Partner Program, Shopify Partners (two Shopify stores delivered). High relevance, already qualified.

**4. French citations** — Pages Jaunes, Societe.com, Kompass, CCI Paris Île-de-France. Individually weak; collectively they establish the entity consistency that also feeds AEO/GEO.

**5. Digital PR (Q4)** — Sourcee.fr for journalist sourcing, pitched off an original data asset (survey of IDF SMEs on AI adoption, or an automation ROI calculator). Earns citations rather than requesting links.

**Reviews — the highest-return item overall.** GBP shows **zero reviews** against 213 customer interactions (Google itself prompts "Get your first reviews"). Seven named clients could each write one. Ask individually, never incentivise, spread over weeks not one afternoon, and reply to each — response rate is itself a ranking signal.

⚠️ **Do NOT add `Review`/`AggregateRating` schema about ourselves.** Verified clean 2026-08-20: homepage testimonials carry no review markup, which is correct. Self-serving review markup produces no rich result (Google removed that in 2019) and violates structured-data policy. Website testimonials convert; Google reviews rank. Different jobs.

**Entity consistency (AEO/GEO):** LinkedIn currently surfaces as "Step-up.ai — transform career aspirations into reality", which describes a different business. Answer engines resolve identity by corroborating across sources; contradictory profiles make us harder to cite. Worth auditing.

**Measure:** referring domains monthly. Should climb slowly and steadily — a burst is the signature of the thing in the "never" paragraph above.

**Full SEO/AEO/GEO plan** (diagnosis, backlink guidance, phased priorities): https://claude.ai/code/artifact/10eb939f-40d9-46b9-9000-374862daed6d

⚠️ **On "auto backlinks":** automated link building (paid packages, PBNs, directory blasts, comment spam) violates Google's link spam policy and risks a manual action — especially dangerous on a young domain mid-migration. Legitimate scalable options: Google Business Profile, French citations (Pages Jaunes, Societe.com, Kompass, CCI), tool partner directories, client case studies, journalist sourcing. Automate the monitoring, never the placement.

**Google Business Profile exists** and is managed. Needs: website field → `https://www.stepupai.fr` (still on the old domain), primary category off "Software company" (wrong for an automation agency), real opening hours (currently "Open 24 hours", a trust signal problem), and reviews — the biggest unused lever, with six named clients who could write one. NAP to match: `Step UpAI` · `+33 6 98 22 95 33` · Paris, FR (schema declares no street address).

## 13. Related project (separate repo, NOT this one)
**Jarvis** — a voice‑agent build spec lives at `/Users/fahad/Projects/jarvis/HANDOFF.md` (Claude Agent SDK brain + Whisper + Kokoro TTS + openWakeWord + a Telegram phone bridge). Free/no‑monthly. Independent of this website repo; mentioned here only so you know it exists.

---

## 14. Free tools `/outils` (shipped 2026-08-24)

Lead-generation tools aimed at people who are **not** searching for an AI agency — they
search for something they need anyway and arrive here. Full rationale and the backlog of
further tools: `HANDOFF-outils-2026-08.md`; the spec for tool #1: `HANDOFF-outil-generateur-reponse-avis.md`.

| Route | What | State |
|---|---|---|
| `/outils` | hub, cards from `src/data/outilsData.ts` | live |
| `/outils/generateur-reponse-avis-google` | Google review reply generator | live |
| facturation électronique · calculateur ROI | listed as "bientôt", no route | not built |

**Adding a route means editing THREE places** — they are not derived from one another:
`src/App.tsx` (the `<Route>`), `scripts/prerender.mjs` (`staticPages`), and
`scripts/generate-sitemap.mjs` (its own `staticPages`). Miss one and the page is either
unprerendered or missing from the sitemap.

### Tool #1 — review reply generator
- **Copy lives in `src/data/outilsData.ts`** (fr/en pairs), following the `sectorData.ts`
  convention, NOT `LanguageContext`. Page: `src/pages/outils/ReviewReplyPage.tsx`.
- **The reply rules mirror the Reviews Hub product prompt** (`REVIEWS_HUB.md` §3) so the
  free sample and the paid product speak with one voice: reply in the language of the
  review, no emojis, never mention the star rating, never name staff, **two sentences
  max**, and the single token `SKIP` on genuine abuse. Change them in both places or not
  at all. The UI renders `SKIP` as a first-class state (explains why replying publicly
  makes it worse, points at Google's removal flow) — not as an error.
- **Free and ungated by design** — no account, no email. `HANDOFF-outils-2026-08.md` is
  explicit: gating destroys the point. An email gate was built on 2026-08-24 and then
  **reverted the same day** in favour of the fair-use cap below.
- **Fair-use cap: 3 generations per visitor per rolling 24h.** Keyed `rr:ip:<ip>` with a
  24h TTL and deliberately NOT on the calendar day, so the window starts at the visitor's
  first use. It is a user-facing promise, stated in the hero subheadline, the limit state
  and the FAQ — if you change the number, change all three.
- **Cost controls, in layers:** the 3/24h cap → `REVIEW_DAILY_MAX` (500/day global) →
  the Anthropic org spend limit (**$15/month**, set 2026-08-24). At ~$0.0025 per
  generation on Sonnet 5, 500/day is about $1.25/day.
- **Nothing is stored.** No review text, no reply, no email — the page says so and it must
  stay true. Only counters and token usage are logged (`console.log`, no PII).
- GA4 events: `tool_use`, `tool_skip`, `tool_copy`, `select_item`. **`tool_copy` is the
  metric that matters** — a generation is curiosity, a copy is usage.

---

## 15. Security posture (review + fixes, 2026-08-24)

Three real findings, all fixed and verified in production.

1. **Stored XSS via the blog pipeline.** `BlogPostPage.tsx` injects raw HTML blocks with
   `dangerouslySetInnerHTML`, and `blog.ts` is appended to by the n8n Publishing Agent and
   pushed with no human review. Fixed in two layers: `src/lib/sanitizeHtml.ts`
   (DOM-based **allowlist**, no dependency — unknown elements are unwrapped, every `on*`
   handler and unsafe URL scheme stripped) plus a **build gate** in `validate-publish.mjs`
   that fails the build on `<script`, `<iframe|object|embed|form`, inline `on*=`,
   `javascript:` and `data:text/html` inside `<article>`.
2. **Google Sheets formula injection.** The pre-existing `Step-up Contact Form` workflow
   appended anonymous free text with n8n's default `USER_ENTERED` cell format, so
   `=IMPORTXML(...)` in a contact message would execute when the sheet was opened and
   could exfiltrate other leads' rows. **Cell Format is now `RAW`** on the live workflow
   (`8PglFIW45SFFgOAr`). ⚠️ Any new Sheets-writing node must do the same — the Blog
   Subscribe workflow already did (`valueInputOption=RAW`).
3. **Origin allow-list bypass.** `api/chat.ts` only checked the Origin header *when
   present*, so any script without one skipped it. Now required, matching
   `api/review-reply.ts`.

### CSP — read before touching `index.html`
`vercel.json` sets a **Content-Security-Policy** plus `X-Content-Type-Options`,
`Referrer-Policy`, `X-Frame-Options` and `Permissions-Policy` (HSTS comes from Vercel).

⚠️ The inline gtag snippet in `index.html` is allowed **by hash, not `'unsafe-inline'`** —
that is the entire point, because `'unsafe-inline'` would still permit the injected
`onerror=` handlers that finding #1 is about. **Editing that snippet changes its hash and
would silently kill analytics**, so `validate-publish.mjs` recomputes the hash of every
inline classic script and fails the build if it is not allow-listed in `vercel.json`.
Verified: `application/ld+json` is unaffected (it is data, never executed) — all JSON-LD
still parses in production.

`style-src` keeps `'unsafe-inline'` (framer-motion writes style attributes; not a script
vector). `connect-src` allows the n8n webhooks + GA4 + same-origin `/api`. There are no
iframes or external fonts anywhere, so `default-src 'self'` is safe — **check that again
before adding a YouTube embed or a Google Font**, or it will be blocked.

