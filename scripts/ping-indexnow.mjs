// =============================================================================
// IndexNow ping — submits the site's indexed URLs to IndexNow on each production
// deploy so Bing (and the engines that use its index: ChatGPT Search, Copilot)
// pick up new/changed pages within minutes instead of waiting for a crawl.
//
// - URL list is read from the freshly generated dist/sitemap.xml, so it pings
//   EXACTLY the indexed pages (noindexed secondary cities are already excluded).
// - Only runs on Vercel production builds (VERCEL_ENV === 'production'); skips
//   local builds and preview deploys so we never spam the endpoint.
// - Never fails the build: any error is logged and swallowed.
//
// Google is intentionally NOT pinged here: its Indexing API only supports
// JobPosting/BroadcastEvent pages. Google discovery relies on the sitemap
// (submitted in Search Console) + manual "Request indexing" for priority URLs.
// =============================================================================
import { readFileSync, readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const HOST = 'www.step-upai.com';
const SITE = `https://${HOST}`;

function findKey() {
  // The IndexNow key file lives at public/<32-hex>.txt (copied to dist root).
  const pub = resolve(__dirname, '..', 'public');
  const f = readdirSync(pub).find((n) => /^[a-f0-9]{32}\.txt$/.test(n));
  return f ? f.replace(/\.txt$/, '') : null;
}

async function main() {
  if (process.env.VERCEL_ENV !== 'production') {
    console.log('ℹ️  IndexNow: skipped (not a Vercel production build)');
    return;
  }
  const key = findKey();
  if (!key) {
    console.warn('⚠️  IndexNow: no key file found in public/, skipping');
    return;
  }

  let urls = [];
  try {
    const xml = readFileSync(resolve(__dirname, '..', 'dist', 'sitemap.xml'), 'utf-8');
    urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  } catch (e) {
    console.warn('⚠️  IndexNow: could not read dist/sitemap.xml:', e.message);
    return;
  }
  if (!urls.length) {
    console.warn('⚠️  IndexNow: sitemap had 0 URLs, skipping');
    return;
  }

  const body = {
    host: HOST,
    key,
    keyLocation: `${SITE}/${key}.txt`,
    urlList: urls,
  };

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });
    // IndexNow returns 200 or 202 on success.
    console.log(`✅ IndexNow: submitted ${urls.length} URLs → HTTP ${res.status}`);
  } catch (e) {
    console.warn('⚠️  IndexNow: ping failed (non-fatal):', e.message);
  }
}

main();
