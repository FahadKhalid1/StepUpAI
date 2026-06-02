/**
 * Post-build prerenderer: renders every known route to static HTML so crawlers
 * and AI answer engines (which often don't run JS) get fully-formed pages with
 * their own <title>, meta, canonical and JSON-LD — instead of an empty SPA shell.
 *
 * - Route list is explicit (static + 6×20 geo + blog slugs) — no crawl-coverage gaps.
 * - Captures the REAL rendered DOM (Helmet head + body + JSON-LD) — zero duplication.
 * - NON-FATAL: any failure logs a warning and exits 0, so the deploy never breaks
 *   (worst case = current SPA behavior). Static files take precedence over the
 *   vercel.json SPA rewrite, so prerendered pages are served as-is.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'fs';
import { resolve, dirname, join, extname } from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, '..', 'dist');
const PORT = 41973;
const CONCURRENCY = 5;

function buildRoutes() {
  const staticPages = ['/', '/about', '/services', '/projects', '/contact', '/blog', '/privacy', '/terms'];
  const citySlugs = [
    'paris', 'boulogne-billancourt', 'neuilly-sur-seine', 'levallois-perret', 'nanterre',
    'saint-denis', 'montreuil', 'versailles', 'saint-germain-en-laye', 'creteil', 'vincennes',
    'argenteuil', 'cergy', 'issy-les-moulineaux', 'courbevoie', 'rueil-malmaison', 'colombes',
    'asnieres-sur-seine', 'vitry-sur-seine', 'evry-courcouronnes',
  ];
  const serviceSlugs = ['automatisation-ia', 'appels-ia', 'email-marketing-ia', 'developpement-web', 'chatbot-ia', 'agents-ia'];
  const geo = [];
  for (const s of serviceSlugs) for (const c of citySlugs) geo.push(`/${s}-${c}`);
  const blog = [];
  try {
    const file = readFileSync(resolve(__dirname, '..', 'src', 'data', 'blog.ts'), 'utf-8');
    // Bound to the `posts` array so helper maps (categoryToService etc.) aren't matched.
    const startIdx = file.indexOf('export const posts');
    const arrEnd = file.indexOf('\n];', startIdx);
    const src = file.slice(startIdx, arrEnd > 0 ? arrEnd : file.length);
    const re = /(?:"slug"|slug)\s*:\s*['"`]([^'"`]+)['"`]/g;
    let m;
    while ((m = re.exec(src)) !== null) blog.push(`/blog/${m[1]}`);
  } catch { /* ignore */ }
  return [...staticPages, ...geo, ...blog];
}

const MIME = {
  '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.html': 'text/html',
  '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.webp': 'image/webp', '.ico': 'image/x-icon', '.json': 'application/json', '.txt': 'text/plain',
  '.xml': 'application/xml', '.woff2': 'font/woff2', '.woff': 'font/woff',
};

async function main() {
  if (!existsSync(join(DIST, 'index.html'))) {
    console.warn('⚠️  prerender skipped: dist/index.html not found');
    return;
  }
  let puppeteer;
  try {
    puppeteer = (await import('puppeteer')).default;
  } catch (e) {
    console.warn('⚠️  prerender skipped: puppeteer not available —', e.message);
    return;
  }

  // Clean SPA shell kept in memory so it stays the fallback even as we write route files.
  const shell = readFileSync(join(DIST, 'index.html'), 'utf-8');

  const server = createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    const filePath = join(DIST, urlPath);
    if (urlPath !== '/' && existsSync(filePath) && statSync(filePath).isFile()) {
      res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' });
      res.end(readFileSync(filePath));
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(shell); // SPA fallback — app boots and renders the requested route
    }
  });
  await new Promise((r) => server.listen(PORT, r));

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const routes = buildRoutes();
  let ok = 0, fail = 0;

  async function renderOne(route) {
    const page = await browser.newPage();
    try {
      await page.goto(`http://127.0.0.1:${PORT}${route}`, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.waitForSelector('h1', { timeout: 8000 }).catch(() => {});
      // Deterministic readiness: every page's <SEO> emits a canonical via react-helmet-async.
      // Waiting for it guarantees the managed <head> batch (title/desc/canonical/OG/JSON-LD) flushed.
      await page.waitForSelector('link[rel="canonical"][data-rh="true"]', { timeout: 8000 }).catch(() => {});
      await new Promise((r) => setTimeout(r, 250));
      const html = await page.content();
      const outDir = route === '/' ? DIST : join(DIST, route);
      mkdirSync(outDir, { recursive: true });
      writeFileSync(join(outDir, 'index.html'), html, 'utf-8');
      ok++;
    } catch (e) {
      fail++;
      console.warn(`   ⚠️  ${route}: ${e.message}`);
    } finally {
      await page.close();
    }
  }

  for (let i = 0; i < routes.length; i += CONCURRENCY) {
    await Promise.all(routes.slice(i, i + CONCURRENCY).map(renderOne));
  }

  await browser.close();
  await new Promise((r) => server.close(r));
  console.log(`✅ Prerendered ${ok}/${routes.length} routes${fail ? ` (${fail} fell back to SPA)` : ''}`);
}

main().catch((e) => {
  console.warn('⚠️  prerender skipped (non-fatal):', e.message);
  process.exit(0);
});
