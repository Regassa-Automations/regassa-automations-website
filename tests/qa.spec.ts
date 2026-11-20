import { test, expect } from '@playwright/test';
import { onlyIn } from './only-in';

test.describe('motion preferences', () => {
  onlyIn('mobile');

  test('reduced motion: no smooth scrolling, transitions effectively off', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    expect(
      await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior),
    ).toBe('auto');
    const duration = await page
      .locator('[data-mobile-cta]')
      .evaluate((el) => parseFloat(getComputedStyle(el).transitionDuration) * 1000);
    expect(duration).toBeLessThan(1);
  });

  test('no preference: smooth scrolling is on', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/');
    expect(
      await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior),
    ).toBe('smooth');
  });

  test('video never autoplays', async ({ page }) => {
    await page.goto('/work/freight-rate-sheet-generator/');
    expect(await page.locator('video').evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
  });
});

test.describe('forced colors', () => {
  onlyIn('desktop');

  test('focused controls get a real outline, buttons keep a border', async ({ page }) => {
    await page.emulateMedia({ forcedColors: 'active' });
    await page.goto('/');
    const cta = page.locator('.nav-desktop .btn').first();
    await cta.focus();
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Tab');
    const styles = await cta.evaluate((el) => {
      const cs = getComputedStyle(el);
      return { outline: cs.outlineStyle, border: cs.borderTopStyle };
    });
    expect(styles.outline).toBe('solid');
    expect(styles.border).toBe('solid');
  });
});

test.describe('zoom and text size', () => {
  onlyIn('mobile');

  test('320 px (400% zoom) keeps the form and nav usable', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    await page.goto('/');
    await page.locator('details[data-menu] > summary').click();
    await expect(
      page.locator('.menu__panel').getByRole('link', { name: 'Portfolio' }),
    ).toBeVisible();
    await page.keyboard.press('Escape');
    const submit = page.locator('#inquiry-form button[type="submit"]');
    await submit.scrollIntoViewIfNeeded();
    const box = await submit.boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(320);
  });

  // Browser zoom at 200% on a 1280 px window gives a 640 CSS px viewport (media queries apply).
  for (const path of ['/', '/work/', '/work/gridbloom/', '/work/pr-pipeline-sync/', '/about/']) {
    test(`200% zoom (640 CSS px): no horizontal scroll or clipped headings: ${path}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 640, height: 800 });
      await page.goto(path);
      const result = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        clipped: [...document.querySelectorAll('h1, h2, h3')]
          // Visually hidden headings are 1 px wide by design.
          .filter(
            (h) =>
              (h as HTMLElement).offsetParent !== null &&
              h.clientWidth > 1 &&
              h.scrollWidth > h.clientWidth + 1,
          )
          .map((h) => h.textContent?.trim().slice(0, 40)),
      }));
      expect(result).toEqual({ overflow: 0, clipped: [] });
    });
  }
});

test.describe('touch targets', () => {
  onlyIn('mobile');

  for (const path of ['/', '/work/', '/work/freight-rate-sheet-generator/', '/about/']) {
    test(`buttons and standalone links are at least 44 px tall: ${path}`, async ({ page }) => {
      await page.goto(path);
      const small = await page.evaluate(() =>
        [
          ...document.querySelectorAll<HTMLElement>(
            'main .btn, main summary, footer a, header a, header summary',
          ),
        ]
          .filter((el) => el.offsetParent !== null)
          .map((el) => ({
            h: el.getBoundingClientRect().height,
            t: el.textContent?.trim().slice(0, 30),
          }))
          .filter((r) => r.h > 0 && r.h < 44),
      );
      expect(small).toEqual([]);
    });
  }
});
