import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { onlyIn } from './only-in';
import { builtPages } from './pages';
import { intro, sections } from '../src/data/privacy';
import { thanks } from '../src/data/system';
import { site, privacyLastUpdated } from '../src/config/site';

const norm = (s: string) => s.replace(/\s+/g, ' ').trim();

test.describe('privacy page', () => {
  onlyIn('desktop');

  test('renders the content file verbatim', async ({ page }) => {
    await page.goto('/privacy/');
    // Visually hidden new-tab notices are announced, not shown; drop them for the visual text.
    const text = norm(await page.locator('main').innerText()).replace(
      / \(opens in a new tab\) ?/g,
      '',
    );
    await expect(page.locator('h1')).toHaveText(intro.h1);
    expect(text).toContain(intro.lede);
    for (const s of sections) {
      await expect(page.getByRole('heading', { level: 2, name: s.h2 })).toBeVisible();
      for (const p of [...(s.paragraphs ?? []), ...(s.after ?? [])]) {
        const plain = p.map((seg) => (typeof seg === 'string' ? seg : seg.text)).join('');
        expect(text).toContain(norm(plain));
      }
      for (const li of s.list ?? []) expect(text).toContain(li);
    }
    await expect(page.getByRole('link', { name: 'Return to the inquiry form' })).toHaveAttribute(
      'href',
      '/#inquiry',
    );
    await expect(page.locator('footer a[aria-current="page"]:visible')).toHaveText('Privacy');
  });

  test('shows the launch date, never the placeholder (OI-05)', async ({ page }) => {
    expect(privacyLastUpdated).toBe('November 20, 2026');
    await page.goto('/privacy/');
    await expect(page.locator('.privacy__meta')).toHaveText(
      `${intro.updatedPrefix} ${privacyLastUpdated}`,
    );
    await expect(page.locator('main')).not.toContainText(intro.launchPlaceholder);
  });
});

test.describe('thanks page', () => {
  onlyIn('desktop');

  test('has the system copy, booking line and noindex', async ({ page }) => {
    await page.goto('/thanks/');
    await expect(page.locator('h1')).toHaveText(thanks.h1);
    await expect(page.locator('main')).toContainText(thanks.body);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
    const booking = page.getByRole('link', { name: /Pick a time for a free consultation/ });
    await expect(booking).toHaveAttribute('href', site.bookingUrl);
    await expect(booking).toHaveAttribute('target', '_blank');
    await expect(page.locator('[data-mobile-cta]')).toHaveCount(0);
  });

  test('is excluded from the sitemap and linked from nowhere', () => {
    expect(readFileSync('dist/sitemap-0.xml', 'utf8')).not.toContain('/thanks/');
    for (const path of builtPages()) {
      if (path === '/thanks/') continue;
      const file = path.endsWith('/') ? `dist${path}index.html` : `dist${path}`;
      expect(readFileSync(file, 'utf8'), file).not.toMatch(/href="\/thanks\/?"/);
    }
  });
});

test.describe('booking links', () => {
  onlyIn('desktop');

  for (const path of ['/', '/thanks/']) {
    test(`open the Google booking page in a new tab: ${path}`, async ({ page }) => {
      await page.goto(path);
      const links = page.locator(`a[href="${site.bookingUrl}"]`);
      expect(await links.count()).toBeGreaterThan(0);
      for (let i = 0; i < (await links.count()); i++) {
        await expect(links.nth(i)).toHaveAttribute('target', '_blank');
        await expect(links.nth(i)).toHaveAttribute('rel', /noopener/);
        await expect(links.nth(i).locator('.visually-hidden')).toHaveText(/\(opens in a new tab\)/);
      }
    });
  }
});
