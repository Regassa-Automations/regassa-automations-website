// Generates the raster favicons from the supplied mark (_handoff Phase 1, task 4).
// Run: node tools/make-favicons.mjs   Output is committed in public/.
import { copyFileSync, readFileSync } from 'node:fs';
import sharp from 'sharp';

const src = 'src/assets/brand/regassa-mark.svg';
const svg = readFileSync(src);

copyFileSync(src, 'public/favicon.svg');

// 32 px, transparent background.
await sharp(svg, { density: 300 })
  .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile('public/favicon-32.png');

// 180 px apple-touch-icon: iOS fills transparency with black, so use a white ground with padding.
const inner = await sharp(svg, { density: 600 })
  .resize(144, 144, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
  .png()
  .toBuffer();
await sharp({ create: { width: 180, height: 180, channels: 4, background: '#ffffff' } })
  .composite([{ input: inner, gravity: 'center' }])
  .flatten({ background: '#ffffff' })
  .png()
  .toFile('public/apple-touch-icon.png');

console.log('favicons written');
