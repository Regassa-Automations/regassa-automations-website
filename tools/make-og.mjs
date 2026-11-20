// Generates the 1200x630 social images and the JSON-LD logo PNG (Phase 6, task 2).
// Spec: _handoff/docs/03-design-system.md, "Social image". Run: node tools/make-og.mjs
// Output is committed in public/og/. Fonts are the self-hosted Fontsource files.
import { chromium } from '@playwright/test';
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';

const font = (pkg) =>
  pathToFileURL(`node_modules/@fontsource-variable/${pkg}/files/${pkg}-latin-wght-normal.woff2`)
    .href;
const mark = readFileSync('src/assets/brand/regassa-mark-dark.svg', 'utf8');
const shot = (p) => pathToFileURL(p).href;

const outline = `<svg viewBox="0 0 120 110" fill="none" stroke-width="0.6"><polygon stroke="#4361EE" points="34.02,40 60,55 60,85 34.02,100 8.04,85 8.04,55"/><polygon stroke="#E6266F" points="85.98,40 111.96,55 111.96,85 85.98,100 60,85 60,55"/><polygon stroke="#98A8F4" points="60,10 85.98,25 85.98,55 60,70 34.02,55 34.02,25"/></svg>`;

const page = ({
  headline,
  image,
  imagePos = 'left top',
}) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: Montserrat; font-weight: 700; src: url(${font('montserrat')}); }
@font-face { font-family: Inter; font-weight: 500; src: url(${font('inter')}); }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; overflow: hidden; background: #1E3A8A; position: relative; font-family: Inter, sans-serif; }
.mark { position: absolute; top: 64px; left: 72px; width: 120px; }
.mark svg { width: 120px; height: auto; display: block; }
.outline { position: absolute; right: -150px; bottom: -190px; width: 620px; }
.headline { position: absolute; left: 72px; top: 236px; width: ${image ? 560 : 900}px; font: 700 60px/68px Montserrat, sans-serif; color: #FFFFFF; }
.foot { position: absolute; left: 72px; bottom: 56px; font: 500 22px/28px Inter, sans-serif; color: #C9D2F4; }
.inset { position: absolute; right: 64px; top: 120px; width: 470px; height: 390px; border-radius: 10px; overflow: hidden; background: #fff; box-shadow: 0 12px 32px rgba(0,0,0,.25); }
.inset img { width: 100%; height: 100%; object-fit: cover; object-position: ${imagePos}; display: block; }
</style></head><body>
<div class="outline">${outline}</div>
<div class="mark">${mark}</div>
<p class="headline">${headline}</p>
${image ? `<div class="inset"><img src="${shot(image)}" alt=""></div>` : ''}
<p class="foot">regassaautomations.com</p>
</body></html>`;

const images = [
  {
    out: 'public/og/og-default.png',
    headline: 'Workflow automation for complex, everyday operations.',
  },
  {
    out: 'public/og/og-freight.png',
    headline: 'Automated Freight Rate Sheet Generator',
    image: 'src/assets/work/freight/freight-generator.jpg',
  },
  {
    out: 'public/og/og-gridbloom.png',
    headline: 'GridBloom: electricity data you can check',
    image: 'src/assets/work/gridbloom/gridbloom-dashboard-pjm.jpg',
  },
];

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
const tab = await ctx.newPage();
for (const img of images) {
  const html = `tools/.og-${img.out.split('/').pop()}.html`;
  writeFileSync(html, page(img));
  await tab.goto(pathToFileURL(html).href);
  await tab.evaluate(() => document.fonts.ready);
  await tab.waitForLoadState('networkidle');
  const buf = await tab.screenshot({ type: 'png' });
  await sharp(buf).png({ compressionLevel: 9 }).toFile(img.out);
  console.log('wrote', img.out);
}
await browser.close();

// 512 px logo mark for JSON-LD (white ground, as supplied colors).
await sharp(readFileSync('src/assets/brand/regassa-mark.svg'), { density: 600 })
  .resize(512, 512, { fit: 'contain', background: '#ffffff' })
  .flatten({ background: '#ffffff' })
  .png()
  .toFile('public/og/logo-mark.png');
console.log('wrote public/og/logo-mark.png');
