/**
 * Generates the default social-share card -> public/og-image.jpg (1200x630).
 * Used by any page that doesn't pass its own ogImage (home, services, geo…)
 * and as the fallback in BlogPostPage. Run: `node scripts/make-og-image.mjs`.
 * Rendered with Puppeteer so the text is crisp (not AI-generated).
 */
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));

const html = `<!doctype html><html><head><meta charset="utf-8">
<style>*{margin:0;padding:0;box-sizing:border-box;font-family:Inter,'Helvetica Neue',Arial,sans-serif}</style>
</head><body>
<div style="width:1200px;height:630px;padding:96px;display:flex;flex-direction:column;justify-content:center;
            background:linear-gradient(135deg,#4F46E5 0%,#7C3AED 55%,#9333EA 100%);color:#fff;position:relative;overflow:hidden;">
  <div style="position:absolute;top:-130px;right:-90px;width:440px;height:440px;border-radius:50%;background:rgba(255,255,255,.08)"></div>
  <div style="position:absolute;bottom:-170px;left:-110px;width:400px;height:400px;border-radius:50%;background:rgba(255,255,255,.06)"></div>
  <div style="display:flex;align-items:center;gap:22px;margin-bottom:36px">
    <div style="width:88px;height:88px;border-radius:22px;background:rgba(255,255,255,.18);
                display:flex;align-items:center;justify-content:center;font-size:52px;font-weight:800">S</div>
    <div style="font-size:46px;font-weight:800;letter-spacing:-1px">Step UpAI</div>
  </div>
  <div style="font-size:64px;font-weight:800;line-height:1.08;max-width:940px;letter-spacing:-1.5px">Automatisation IA pour les PME</div>
  <div style="font-size:30px;font-weight:500;opacity:.92;margin-top:26px">Workflows &middot; Chatbots &middot; Applications sur mesure &mdash; Paris &amp; Île-de-France</div>
  <div style="position:absolute;bottom:66px;right:96px;font-size:26px;font-weight:600;opacity:.9">step-upai.com</div>
</div>
</body></html>`;

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'networkidle0' });
const buf = await page.screenshot({ type: 'jpeg', quality: 90, clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();
const out = resolve(__dirname, '..', 'public', 'og-image.jpg');
writeFileSync(out, buf);
console.log(`✅ wrote ${out} (${Math.round(buf.length / 1024)} KB)`);
