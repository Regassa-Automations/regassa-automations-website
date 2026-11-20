import { tabKey } from './keys';
import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { builtPages } from './pages';
import { onlyIn } from './only-in';

const pages = builtPages();

test.describe('layout', () => {
  onlyIn('mobile');

  for (const path of pages) {
    for (const width of [320, 390, 768, 1024, 1440]) {
      test(`no horizontal scroll at ${width}px: ${path}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(path);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow).toBeLessThanOrEqual(0);
      });
    }
  }
});

test.describe('focus', () => {
  for (const path of pages) {
    test(`every tab stop shows a focus ring: ${path}`, async ({ page, browserName }) => {
      await page.goto(path);
      const seen = new Set<string>();
      for (let i = 0; i < 120; i++) {
        await page.keyboard.press(tabKey(browserName));
        const info = await page.evaluate(() => {
          const el = document.activeElement as HTMLElement | null;
          if (!el || el === document.body) return null;
          const hasRing = (node: Element) => {
            const cs = getComputedStyle(node);
            return (
              cs.boxShadow !== 'none' || (cs.outlineStyle !== 'none' && cs.outlineWidth !== '0px')
            );
          };
          // Whole-card links show the ring on the card (:focus-within), up to 3 levels up.
          let ring = false;
          for (let n: Element | null = el, d = 0; n && d < 4 && !ring; n = n.parentElement, d++) {
            ring = hasRing(n);
          }
          return { key: el.outerHTML.slice(0, 120), ring };
        });
        if (!info || seen.has(info.key)) break;
        seen.add(info.key);
        expect(info.ring, `no visible focus on ${info.key}`).toBe(true);
      }
      expect(seen.size).toBeGreaterThan(2);
    });
  }

  test('skip link is first and moves focus to main', async ({ page, browserName }) => {
    await page.goto('/');
    await page.keyboard.press(tabKey(browserName));
    const skip = page.getByRole('link', { name: 'Skip to content' });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
    await page.keyboard.press('Enter');
    await expect(page.locator('#main')).toBeFocused();
  });
});

test.describe('markup rules', () => {
  onlyIn('desktop');

  for (const path of pages) {
    test(`external links open in a new tab and announce it: ${path}`, async ({ page }) => {
      await page.goto(path);
      const links = page.locator('a[href^="http"]');
      for (let i = 0; i < (await links.count()); i++) {
        const link = links.nth(i);
        await expect(link).toHaveAttribute('target', '_blank');
        await expect(link).toHaveAttribute('rel', /noopener/);
        await expect(link.locator('.visually-hidden')).toHaveText(/\(opens in a new tab\)/);
      }
    });

    test(`one h1, logo link named once: ${path}`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('h1')).toHaveCount(1);
      const logo = page.getByRole('link', { name: 'Regassa Automations, home' });
      await expect(logo).toHaveCount(1);
      await expect(logo.locator('img')).toHaveAttribute('alt', '');
    });
  }

  test('built HTML has no inline scripts, styles or style attributes (CSP is self-only)', () => {
    for (const path of pages) {
      const file = path.endsWith('/') ? `dist${path}index.html` : `dist${path}`;
      const html = readFileSync(file, 'utf8');
      expect(html, file).not.toMatch(/<script(?![^>]*\bsrc=)(?![^>]*application\/ld\+json)[^>]*>/);
      expect(html, file).not.toMatch(/<style[\s>]/);
      expect(html, file).not.toMatch(/\sstyle="/);
    }
  });

  test('built HTML has no em dashes', () => {
    for (const path of pages) {
      const file = path.endsWith('/') ? `dist${path}index.html` : `dist${path}`;
      expect(readFileSync(file, 'utf8'), file).not.toContain('\u2014');
    }
  });
});
