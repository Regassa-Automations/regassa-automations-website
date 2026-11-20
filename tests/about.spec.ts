import { test, expect } from '@playwright/test';
import { onlyIn } from './only-in';
import { tools, intro } from '../src/data/about';

test.describe('About, desktop', () => {
  onlyIn('desktop');

  test('tools list is the confirmed 11 items, in order, with no review note', async ({ page }) => {
    await page.goto('/about/');
    await expect(page.locator('.ab-tool')).toHaveText(tools.used.tags);
    expect(tools.used.tags).toHaveLength(11);
    await expect(page.locator('main')).not.toContainText('Confirm this list');
    await expect(page.locator('.nav-desktop a[aria-current="page"]')).toHaveText('About');
    await expect(page.locator('h1')).toHaveText(intro.h1);
    await expect(page.getByRole('link', { name: 'See the work' })).toBeVisible();
  });
});

test.describe('About, phone', () => {
  onlyIn('mobile');

  test('portrait sits between the H1 and the paragraph; one intro button', async ({ page }) => {
    await page.goto('/about/');
    const h1 = await page.locator('h1').boundingBox();
    const img = await page.locator('.ab-portrait').boundingBox();
    const lede = await page.locator('.ab-intro__lede:visible').boundingBox();
    expect(img!.y).toBeGreaterThan(h1!.y + h1!.height - 1);
    expect(lede!.y).toBeGreaterThan(img!.y + img!.height - 1);
    await expect(page.locator('.ab-intro__ctas a:visible')).toHaveCount(1);
    await expect(page.locator('.ab-intro__lede:visible')).toHaveText(intro.ledeMobile);
    await expect(page.locator('.ab-cta a:visible')).toHaveCount(2);
  });
});
