import { test, expect } from '@playwright/test';
import { readFileSync, existsSync } from 'node:fs';
import sharp from 'sharp';
import { onlyIn } from './only-in';
import { builtPages } from './pages';

const SITE = 'https://regassaautomations.com';
const INDEXABLE = [
  '/',
  '/work/',
  '/about/',
  '/services/',
  '/privacy/',
  '/work/freight-rate-sheet-generator/',
  '/work/gridbloom/',
  '/work/pr-pipeline-sync/',
  '/work/quotes-library/',
  '/work/volunteer-rosters/',
];
const NOINDEX = ['/thanks/', '/404.html'];
const CASES = INDEXABLE.filter((p) => p.startsWith('/work/') && p !== '/work/');

test.describe('metadata', () => {
  onlyIn('desktop');

  for (const path of INDEXABLE) {
    test(`title, description, canonical, OG and Twitter: ${path}`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveTitle(/ \| Regassa Automations$|^Regassa Automations \| /);
      const meta = (sel: string) => page.locator(sel).getAttribute('content');
      expect((await meta('meta[name="description"]'))?.length).toBeGreaterThan(50);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${SITE}${path}`);
      await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
      expect(await meta('meta[property="og:url"]')).toBe(`${SITE}${path}`);
      const og = await meta('meta[property="og:image"]');
      expect(og).toMatch(new RegExp(`^${SITE}/og/og-(default|freight|gridbloom)\\.png$`));
      expect(existsSync(`dist${new URL(og!).pathname}`)).toBe(true);
      expect(await meta('meta[property="og:image:alt"]')).toBeTruthy();
      expect(await meta('meta[name="twitter:card"]')).toBe('summary_large_image');
      expect(await meta('meta[property="og:title"]')).toBeTruthy();
    });
  }

  for (const path of NOINDEX) {
    test(`noindex and no canonical: ${path}`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
    });
  }

  test('titles and descriptions are unique', async ({ page }) => {
    const titles = new Set<string>();
    const descs = new Set<string>();
    for (const path of INDEXABLE) {
      await page.goto(path);
      titles.add(await page.title());
      descs.add((await page.locator('meta[name="description"]').getAttribute('content')) ?? '');
    }
    expect(titles.size).toBe(INDEXABLE.length);
    expect(descs.size).toBe(INDEXABLE.length);
  });
});

test.describe('structured data', () => {
  onlyIn('desktop');

  const ld = async (page: import('@playwright/test').Page) =>
    (await page.locator('script[type="application/ld+json"]').allTextContents()).map(
      (t) => JSON.parse(t) as Record<string, unknown>,
    );

  test('Home has ProfessionalService with the specified fields', async ({ page }) => {
    await page.goto('/');
    const [svc] = await ld(page);
    expect(svc).toMatchObject({
      '@type': 'ProfessionalService',
      name: 'Regassa Automations',
      url: `${SITE}/`,
      logo: `${SITE}/og/logo-mark.png`,
      description: 'Practical automation for small teams.',
      founder: { name: 'Ayantu Regassa' },
      address: { addressLocality: 'Portland', addressRegion: 'ME', addressCountry: 'US' },
    });
  });

  for (const path of CASES) {
    test(`CreativeWork and BreadcrumbList: ${path}`, async ({ page }) => {
      await page.goto(path);
      const [work, crumbs] = await ld(page);
      const h1 = (await page.locator('h1').textContent())?.trim();
      const lede = (await page.locator('.cshero__lede.bp-desktop').textContent())?.trim();
      expect(work).toMatchObject({
        '@type': 'CreativeWork',
        name: h1,
        description: lede,
        url: `${SITE}${path}`,
      });
      expect(work!.creator).toMatchObject({ name: 'Regassa Automations' });
      expect(work).not.toHaveProperty('dateCreated');
      expect(work).not.toHaveProperty('datePublished');
      expect(crumbs).toMatchObject({ '@type': 'BreadcrumbList' });
      const items = crumbs!.itemListElement as Array<{ item: string }>;
      expect(items.map((i) => i.item)).toEqual([`${SITE}/work/`, `${SITE}${path}`]);
    });
  }

  test('no review, rating or client data anywhere', () => {
    for (const path of builtPages()) {
      const file = path.endsWith('/') ? `dist${path}index.html` : `dist${path}`;
      const blocks =
        readFileSync(file, 'utf8').match(
          /<script type="application\/ld\+json">[\s\S]*?<\/script>/g,
        ) ?? [];
      for (const b of blocks) {
        expect(b, file).not.toMatch(/"@type":"(Review|AggregateRating|Rating)"/);
        expect(b, file).not.toMatch(/"(review|reviews|aggregateRating|reviewRating)":/);
        expect(b, file).not.toMatch(/Upwork/i);
      }
    }
  });
});

test.describe('crawl files', () => {
  onlyIn('desktop');

  test('robots.txt allows indexing and points at the sitemap', () => {
    const robots = readFileSync('dist/robots.txt', 'utf8');
    expect(robots).toMatch(/User-agent: \*/);
    expect(robots).not.toMatch(/Disallow: \//);
    expect(robots).toContain('Sitemap: https://regassaautomations.com/sitemap-index.xml');
  });

  test('sitemap lists exactly the indexable pages', () => {
    const xml = readFileSync('dist/sitemap-0.xml', 'utf8');
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map((m) => m[1]!.replace(SITE, ''))
      .sort();
    expect(locs).toEqual([...INDEXABLE].sort());
  });

  test('redirect targets exist', () => {
    const lines = readFileSync('dist/_redirects', 'utf8')
      .split('\n')
      .filter((l) => l.trim() && !l.startsWith('#'));
    expect(lines.length).toBeGreaterThan(0);
    for (const line of lines) {
      const [, to, status] = line.trim().split(/\s+/);
      expect(status).toBe('301');
      expect(existsSync(`dist${to}index.html`), to).toBe(true);
    }
  });

  test('unknown routes have a 404 page', async ({ page }) => {
    await page.goto('/404.html');
    await expect(page.locator('h1')).toHaveText("That page isn't here.");
    await expect(page.getByRole('link', { name: 'Go to the home page' })).toHaveAttribute(
      'href',
      '/',
    );
  });

  test('social images are 1200x630', async () => {
    for (const f of ['og-default', 'og-freight', 'og-gridbloom']) {
      const meta = await sharp(`dist/og/${f}.png`).metadata();
      expect([meta.width, meta.height], f).toEqual([1200, 630]);
    }
  });
});
