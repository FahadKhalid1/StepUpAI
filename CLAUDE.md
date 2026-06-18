# CLAUDE.md — Step Up AI Website & Automation System

> **Purpose:** This file is the single source of truth for everything built on the Step Up AI website + its email/automation backend. Read it first when resuming work. It covers the React site, the n8n workflows (cloud + local), credentials, storage, key decisions + *why*, and the open TODOs.
> **Last updated:** 2026-06-02.

---

## 1. What this project is
The **Step Up AI** marketing website (an AI‑automation agency, Paris / Île‑de‑France, French‑first) plus a **blog‑subscription email system** powered by n8n.

- **Live site:** https://www.step-upai.com
- **Local repo:** `/Users/fahad/Projects/stepUpAI-new`
- **Git:** `origin` → `github.com/FahadKhalid1/StepUpAI` (also a secondary remote `techasad` → `github.com/TechAsad/StepUpAI`, the original author — do **not** push there)
- **Hosting/deploy:** **Vercel**, auto‑deploys on every push to `main` (~3–4 min; runs a Puppeteer prerender of 131 routes). Domain DNS is on **Squarespace**.

---

## 2. Tech stack & conventions
- **Vite + React + TypeScript + Tailwind + framer-motion + react-router + react-helmet-async.**
- **Bilingual**, French is the default. All UI text goes through `useLanguage()` → `t('key')` (keys in `src/contexts/LanguageContext.tsx`) **or** inline `language === 'fr' ? '…' : '…'`. Keep both languages whenever you add copy.
- **SSR-safe / prerendered:** the build prerenders every route with Puppeteer, so **no `window`/`document` access during render**. Canonical host is `https://www.step-upai.com`.
- **Build chain:** `npm run build` = `vite build && node scripts/generate-sitemap.mjs && node scripts/prerender.mjs`.
  - `generate-sitemap.mjs` parses `src/data/blog.ts` and writes `dist/sitemap.xml`, `dist/llms.txt`, **and `dist/rss.xml`**.
  - `prerender.mjs` (Puppeteer locally, @sparticuz/chromium on Vercel) renders routes to static HTML. Non‑fatal: failures fall back to the SPA.
- **`vercel.json`** rewrites everything to `/index.html` **except** `assets`, `sitemap.xml`, `robots.txt`, `rss.xml`, `llms.txt` (those serve as real files). If you add another root static file, add it to that negative‑lookahead or it'll serve the app HTML.
- **To deploy:** commit + `git push origin main`. Don't commit the local `.claude/` dir.

---

## 3. Standing user preferences (IMPORTANT — honor these)
1. **Storage lives in the Step Up AI Google Drive** — use the `Google Drive StepUpAI` credential for Sheets/Drive.
2. **Prioritize the LOCAL n8n.** Only use **cloud** when something *must* be publicly reachable (e.g. a website webhook). 
3. **Minimize cloud executions.** Target **≤ 1 execution/day** for anything scheduled; webhooks should fire only on real user events — never polling/timers that burn the quota.
4. **No monthly subscriptions** for new services. Free first; pay‑per‑use (no monthly commit) is acceptable only when explicitly chosen.
5. **Emails should come from a Step Up AI branded address** (migrating sender to `dailydigest@step-upai.com` via Brevo — see §8).

---

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
        ├── Fetch https://www.step-upai.com/rss.xml
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
- **Step-up Contact Form** (`8PglFIW45SFFgOAr`, active): webhook `/step-up-contact` → Google Sheets (contact spreadsheet `1B0m3HOei13sAknOMWDKGBIbf6I4SPO5rNaIvTzSVil0`, Sheets cred *Asad*). The site's Contact page posts here.
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
- *Send Digest* = Gmail, `To: contact@step-upai.com`, **subscribers in BCC** (privacy).

---

## 7. Storage
- **Subscribers:** Google Sheet `1Aj7xNqqBO6QESQeG1GRs8H4dXlXmhQPxuFkz6xBiiYI`, tab **`Subscribers`**, headers: `Email | Language | Source | SubscribedAt | Status`. (Tab was created via the Sheets API `addSheet`. This is the same spreadsheet the Form‑Submissions workflow uses; access is via the Drive cred, which is user‑level OAuth so it can reach the owner's sheets.)

---

## 8. Email sending (sender identity) — IN PROGRESS
- **Now:** Welcome + Digest send **from `catchfahad92@gmail.com`** via Gmail credential **`Gmail account catchfahad` (`lqOeapjfSKhSRO74`)**.
  - *History:* originally used **`Gmail account beelingue` (`dAdpqUSzUcSGesjF`)** purely because it was the only connected Gmail. It turned out to be **expired/revoked** (recurring `invalid_grant` — likely the Google OAuth consent screen is in "Testing" mode, which kills refresh tokens every 7 days). Switched all three email nodes to the freshly‑connected `catchfahad` Gmail.
- **Target (being set up): send from `dailydigest@step-upai.com` via Brevo SMTP** — branded, no OAuth‑expiry, free (Brevo free tier 300/day), no monthly.
  - Plan: create Brevo account → authenticate `step-upai.com` (add DKIM/SPF/DMARC + `brevo-code` records in **Squarespace DNS** → Settings → Domains → DNS Settings → Custom Records) → add sender `dailydigest@step-upai.com` → generate SMTP key → **user** creates an n8n SMTP credential (host `smtp-relay.brevo.com`, port `587`) named e.g. *"Brevo SMTP – Step Up AI"* → then swap the Welcome + Digest Gmail nodes to an **SMTP/emailSend node**, `From: dailydigest@step-upai.com`.
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
1. **Finish Brevo** → switch sender to `dailydigest@step-upai.com` (see §8). DNS records go in **Squarespace**.
2. **Activate the Daily Digest** (`v9D7wfMrcsfvACdt`) once the sender is finalized and reviewed.
3. ~~Delete temp test workflow~~ — ✅ done (both temporary workflows removed).
4. **Fix Form Submissions email** — repoint its Gmail node off the dead `beelingue` cred (to `catchfahad` or a reconnected/Brevo sender) so contact alerts work again.
5. **Replace placeholder images** `service-ecommerce.jpg` / `service-seo.jpg` with real artwork.
6. **Optional:** one‑click **unsubscribe** flow (GDPR) — small webhook + footer link in emails.
7. **Optional:** for an animated digest image, set a post's `image` to a GIF in `src/data/blog.ts` (RSS + email use whatever the post image is).
8. **Push commit `e5ea9e3`** (SEO/AEO/GEO hardening + missing blog images) — committed locally, awaiting deploy approval.
9. After that deploy: in **Google Search Console → Indexing → Pages**, open the two duplicate reports and click **"Validate fix"**; expect re-crawl over 1–3 weeks.

---

## 11. How to make changes safely
- **Website copy/features:** edit under `src/`, keep FR+EN, stay SSR‑safe, run `npm run build` (must stay green + prerender 131 routes), then `git push origin main` to deploy.
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
- Non-www → www: Vercel 307 redirect (domain-level). Canonicals always `https://www.step-upai.com`.
- GSC email reasons explained: "Alternate page with proper canonical tag" = benign (canonicals doing their job). "Duplicate without user-selected canonical" = trailing-slash dupes + pre-noindex geo crawls; fixed/expiring. **After deploys, use GSC → Pages report → "Validate fix".**

**AEO/GEO layer:**
- `dist/llms.txt` (generated in `generate-sitemap.mjs`): key-facts block, services, all 48 indexed city pages, articles, feeds, contact. Cited by AI answer engines.
- `public/robots.txt`: explicitly allows GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, PerplexityBot, Google-Extended, CCBot; links sitemap + llms.txt + rss.xml.
- FAQPage schema on geo pages + blog posts with `faq`; BreadcrumbList on geo + blog posts; global WebSite + Organization schema (`@id`-linked) in `SEO.tsx`.
- IndexNow ping on Vercel production builds (added by parallel session; skipped locally).

**Performance:** `vite.config.ts` `manualChunks` splits `react-vendor` / `motion` / `icons` from the main bundle (Core Web Vitals). Don't remove without reason.

**Bilingual note:** FR/EN toggle on the SAME URL (client-side) → **hreflang is intentionally absent** (no separate language URLs). `<html lang>` + `og:locale` switch with the toggle; prerendered HTML is French-first.

---

## 13. Related project (separate repo, NOT this one)
**Jarvis** — a voice‑agent build spec lives at `/Users/fahad/Projects/jarvis/HANDOFF.md` (Claude Agent SDK brain + Whisper + Kokoro TTS + openWakeWord + a Telegram phone bridge). Free/no‑monthly. Independent of this website repo; mentioned here only so you know it exists.
