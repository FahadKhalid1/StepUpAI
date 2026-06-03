/**
 * STRICT PRE-PUBLISH GATE — runs in the build chain AFTER prerender.
 * Inspects the actually-rendered HTML of every blog post and FAILS the build
 * (exit 1) on any defect, so nothing broken can go live.
 *
 * Catches: unrendered markdown (**bold**, *italic*, ![img], ](link), ## ), image
 * alt rendered as a caption, generic/missing <title> (prerender/meta failure),
 * missing/mismatched canonical, missing/broken og:image, invalid BlogPosting JSON-LD,
 * missing <img> files, thin shells, and prompt/placeholder leakage.
 * Content checks are scoped to <article>…</article> so nav/footer never false-positive.
 */
import { readFileSync, existsSync, readdirSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, '..', 'dist');
const HOST = 'https://www.step-upai.com';
const GENERIC_TITLE = 'Step UpAI - Automatisation IA à Paris'; // index.html shell fallback
const MIN_BYTES = 15000;

const errors = [];
const warns = [];
const fail = (slug, msg) => errors.push(`[${slug}] ${msg}`);
const warn = (slug, msg) => warns.push(`[${slug}] ${msg}`);

const blogDir = join(DIST, 'blog');
if (!existsSync(blogDir)) {
  console.warn('validate-publish: no dist/blog directory — skipped');
  process.exit(0);
}
const posts = readdirSync(blogDir).filter((d) => existsSync(join(blogDir, d, 'index.html')));

for (const slug of posts) {
  const html = readFileSync(join(blogDir, slug, 'index.html'), 'utf-8');
  const size = Buffer.byteLength(html);

  if (size < MIN_BYTES) fail(slug, `output only ${size}B (< ${MIN_BYTES}) — looks like an un-prerendered shell`);

  const title = (html.match(/<title>([^<]*)<\/title>/) || [, ''])[1].trim();
  if (!title) fail(slug, 'missing <title>');
  else if (title === GENERIC_TITLE) fail(slug, `generic title "${title}" — per-post title not rendered (prerender/meta failed)`);

  const can = (html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/) || [, ''])[1];
  if (!can) fail(slug, 'missing canonical link');
  else if (!can.includes(`/blog/${slug}`)) fail(slug, `canonical "${can}" does not match /blog/${slug}`);

  const og = (html.match(/property="og:image"[^>]*content="([^"]+)"/) || [, ''])[1];
  if (!og) fail(slug, 'missing og:image');
  else {
    const p = og.replace(HOST, '');
    if (!/\.(jpe?g|png|webp)$/i.test(p)) fail(slug, `og:image is not an image URL: ${og}`);
    else if (p.startsWith('/') && !existsSync(join(DIST, p))) fail(slug, `og:image file missing in build: ${p}`);
  }

  const ld = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .map((m) => { try { return JSON.parse(m[1]); } catch { return null; } })
    .filter(Boolean)
    .flatMap((d) => (Array.isArray(d) ? d : [d]));
  const bp = ld.find((d) => d && d['@type'] === 'BlogPosting');
  if (!bp) fail(slug, 'missing BlogPosting JSON-LD');
  else ['headline', 'image', 'datePublished'].forEach((f) => { if (!bp[f]) fail(slug, `BlogPosting JSON-LD missing "${f}"`); });

  const art = (html.match(/<article[\s\S]*?<\/article>/) || [html])[0]
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ');

  const artifacts = [
    [/\*\*/g, "literal '**' (unrendered bold)"],
    [/\*/g, "literal '*' (unrendered italic/bold)"],
    [/!\[/g, "literal '![' (unrendered image markdown)"],
    [/\]\(/g, "literal '](' (unrendered link markdown)"],
    [/(^|>)\s*#{2,3}\s/g, "literal '##' heading markdown"],
  ];
  for (const [re, label] of artifacts) {
    const n = (art.match(re) || []).length;
    if (n > 0) fail(slug, `${n} × ${label}`);
  }
  for (const ph of ['PASTE INTO fal.ai', '{CHART}', 'image_size:', 'IMAGE 0', '](http', 'undefined', 'NaN']) {
    if (art.includes(ph)) fail(slug, `placeholder/leak "${ph}" in rendered content`);
  }

  const alts = new Set([...html.matchAll(/<img[^>]*\balt="([^"]+)"/g)].map((m) => m[1].trim()).filter(Boolean));
  for (const m of art.matchAll(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/g)) {
    const txt = m[1].replace(/<[^>]+>/g, '').trim();
    if (alts.has(txt)) fail(slug, `image alt rendered as a visible caption: "${txt.slice(0, 50)}…"`);
  }

  for (const m of art.matchAll(/<img[^>]*\bsrc="(\/images\/[^"]+)"/g)) {
    if (!existsSync(join(DIST, m[1]))) fail(slug, `<img> file missing in build: ${m[1]}`);
  }
  const noAlt = (art.match(/<img(?![^>]*\balt=)[^>]*>/g) || []).length;
  if (noAlt > 0) warn(slug, `${noAlt} <img> without alt text`);

  // --- editor-level content-quality checks (advisory warnings, do not block) ---
  const words = art.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).length;
  if (words < 400) warn(slug, `thin content (~${words} words)`);
  if ((art.match(/<h[23]\b/g) || []).length < 2) warn(slug, 'fewer than 2 section headings (structure/AEO)');
  if (!ld.find((d) => d && d['@type'] === 'FAQPage')) warn(slug, 'no FAQPage JSON-LD (consider an FAQ for AEO)');
  if ((art.match(/<a[^>]*href="\/[^"]/g) || []).length < 1) warn(slug, 'no internal links (add a related-post/CTA link)');
}

console.log(`🔎 validate-publish: inspected ${posts.length} blog post(s)`);
if (warns.length) {
  console.warn(`⚠️  ${warns.length} warning(s):`);
  warns.forEach((w) => console.warn('   - ' + w));
}
if (errors.length) {
  console.error(`\n❌ PUBLISH BLOCKED — ${errors.length} critical issue(s):`);
  errors.forEach((e) => console.error('   ✗ ' + e));
  console.error('\nNothing was deployed. Fix the above and rebuild.');
  process.exit(1);
}
console.log('✅ validate-publish: all blog posts passed — safe to publish.');
