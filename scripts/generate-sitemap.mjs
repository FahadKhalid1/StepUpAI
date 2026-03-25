import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const siteUrl = 'https://step-upai.com';
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

const allPages = [...staticPages, ...geoPages];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${siteUrl}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

const outputPath = resolve(__dirname, '..', 'dist', 'sitemap.xml');
writeFileSync(outputPath, sitemap, 'utf-8');

console.log(`✅ Sitemap generated with ${allPages.length} URLs at ${outputPath}`);
