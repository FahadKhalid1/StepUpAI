import { writeFileSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const siteUrl = 'https://www.step-upai.com';
const today = new Date().toISOString().split('T')[0];

// Static pages
const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/projects', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog', priority: '0.7', changefreq: 'weekly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
];

// City slugs (must match geoData.ts)
const citySlugs = [
  'paris', 'boulogne-billancourt', 'neuilly-sur-seine', 'levallois-perret',
  'nanterre', 'saint-denis', 'montreuil', 'versailles', 'saint-germain-en-laye',
  'creteil', 'vincennes', 'argenteuil', 'cergy', 'issy-les-moulineaux',
  'courbevoie', 'rueil-malmaison', 'colombes', 'asnieres-sur-seine',
  'vitry-sur-seine', 'evry-courcouronnes'
];

// Service slugs (must match geoData.ts)
const serviceSlugs = [
  'automatisation-ia', 'appels-ia', 'email-marketing-ia',
  'developpement-web', 'chatbot-ia', 'agents-ia'
];

// Generate geo page URLs
const geoPages = [];
for (const service of serviceSlugs) {
  for (const city of citySlugs) {
    geoPages.push({
      path: `/${service}-${city}`,
      priority: city === 'paris' ? '0.9' : '0.8',
      changefreq: 'monthly'
    });
  }
}

// ── Blog posts (parsed from src/data/blog.ts so new pipeline posts flow in) ──
function fieldFr(entry, key) {
  const km = new RegExp(`(?:"${key}"|${key})\\s*:\\s*\\{`).exec(entry);
  if (!km) return '';
  const rest = entry.slice(km.index + km[0].length);
  const fm = /\s*,?\s*(?:"fr"|fr)\s*:\s*/.exec(rest);
  if (!fm) return '';
  let j = fm.index + fm[0].length;
  const delim = rest[j];
  if (!`"'\``.includes(delim)) return '';
  let k = j + 1, out = '';
  while (k < rest.length) {
    if (rest[k] === '\\') { out += rest[k + 1] === 'n' ? ' ' : rest[k + 1]; k += 2; continue; }
    if (rest[k] === delim) break;
    out += rest[k]; k++;
  }
  return out.trim();
}

let blogPages = [];
let blogPosts = [];
try {
  const file = readFileSync(resolve(__dirname, '..', 'src', 'data', 'blog.ts'), 'utf-8');
  // Bound parsing to the `posts` array so helper maps (categoryToService etc.) aren't matched.
  const startIdx = file.indexOf('export const posts');
  const arrEnd = file.indexOf('\n];', startIdx);
  const src = file.slice(startIdx, arrEnd > 0 ? arrEnd : file.length);
  const slugRe = /(?:"slug"|slug)\s*:\s*['"`]([^'"`]+)['"`]/g;
  const marks = [];
  let m;
  while ((m = slugRe.exec(src)) !== null) marks.push({ slug: m[1], start: m.index });
  for (let i = 0; i < marks.length; i++) {
    const entry = src.slice(marks[i].start, i + 1 < marks.length ? marks[i + 1].start : src.length);
    const dm = /(?:"date"|date)\s*:\s*['"`]([^'"`]+)['"`]/.exec(entry);
    const lastmod = dm ? dm[1] : today;
    blogPages.push({ path: `/blog/${marks[i].slug}`, priority: '0.7', changefreq: 'monthly', lastmod });
    blogPosts.push({
      slug: marks[i].slug,
      title: fieldFr(entry, 'title') || marks[i].slug,
      excerpt: fieldFr(entry, 'excerpt'),
      date: lastmod,
    });
  }
} catch (e) {
  console.warn('⚠️  Could not parse blog.ts for sitemap/llms.txt:', e.message);
}

const allPages = [...staticPages, ...geoPages, ...blogPages];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${siteUrl}${page.path}</loc>
    <lastmod>${page.lastmod || today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

writeFileSync(resolve(__dirname, '..', 'dist', 'sitemap.xml'), sitemap, 'utf-8');
console.log(`✅ Sitemap generated with ${allPages.length} URLs (${blogPages.length} blog posts)`);

// ── llms.txt (GEO: helps AI answer engines discover & cite the site) ──
const serviceLabels = {
  'automatisation-ia': 'Automatisation de processus IA',
  'appels-ia': "Agents d'appels IA",
  'email-marketing-ia': 'Email marketing piloté par IA',
  'developpement-web': 'Développement web sur mesure',
  'chatbot-ia': 'Chatbots IA',
  'agents-ia': 'Agents IA autonomes',
};
const llms = `# Step UpAI

> Agence d'automatisation IA basée à Paris (Île-de-France). Nous aidons les PME à automatiser leurs processus avec des workflows, des chatbots IA, des agents d'appels et du développement web sur mesure. Premier audit gratuit.

## Services
${serviceSlugs.map(s => `- [${serviceLabels[s] || s}](${siteUrl}/${s}-paris)`).join('\n')}

## Articles
${blogPosts.map(p => `- [${p.title}](${siteUrl}/blog/${p.slug})${p.excerpt ? `: ${p.excerpt}` : ''}`).join('\n')}

## Pages
- [Services](${siteUrl}/services)
- [Réalisations](${siteUrl}/projects)
- [À propos](${siteUrl}/about)
- [Blog](${siteUrl}/blog)
- [Contact](${siteUrl}/contact)

## Contact
- Email: contact@step-upai.com
- Zone desservie: Paris et Île-de-France
`;
writeFileSync(resolve(__dirname, '..', 'dist', 'llms.txt'), llms, 'utf-8');
console.log(`✅ llms.txt generated (${blogPosts.length} articles, ${serviceSlugs.length} services)`);

// ── RSS feed (powers the "subscribe to daily blogs" email digest + feed readers) ──
const rssEscape = (s = '') =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const rssItems = [...blogPosts]
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .map((p) => `    <item>
      <title>${rssEscape(p.title)}</title>
      <link>${siteUrl}/blog/${p.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${rssEscape(p.excerpt)}</description>
    </item>`)
  .join('\n');

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Step UpAI — Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Automatisation IA, workflows, chatbots et conseils pratiques pour les entreprises — par Step UpAI.</description>
    <language>fr-FR</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${rssItems}
  </channel>
</rss>`;
writeFileSync(resolve(__dirname, '..', 'dist', 'rss.xml'), rss, 'utf-8');
console.log(`✅ RSS feed generated (${blogPosts.length} posts) at /rss.xml`);
