import { tabKey } from './keys';
import { test, expect, type Page } from '@playwright/test';
import { onlyIn } from './only-in';

// Viewport-specific suites run once, in the project whose viewport they need.

const summary = (page: Page) => page.locator('details[data-menu] > summary');
const details = (page: Page) => page.locator('details[data-menu]');

test.describe('desktop nav', () => {
  onlyIn('desktop');

  test('shows desktop nav at 1024 px and hides the menu', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 800 });
    await page.goto('/');
    const nav = page.locator('.nav-desktop');
    await expect(nav).toBeVisible();
    await expect(details(page)).toBeHidden();
    await expect(nav.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
    await expect(nav.getByRole('link', { name: 'Services' })).toHaveAttribute('href', '#services');
    await expect(nav.getByRole('link', { name: 'Discuss your workflow' })).toHaveAttribute(
      'href',
      '#inquiry',
    );
    // Only one primary nav is exposed.
    await expect(page.getByRole('navigation', { name: 'Primary' })).toHaveCount(1);
  });

  test('uses root-relative hash links off Home', async ({ page }) => {
    await page.goto('/about/');
    const nav = page.locator('.nav-desktop');
    await expect(nav.getByRole('link', { name: 'Services' })).toHaveAttribute('href', '/#services');
    await expect(nav.getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'page');
  });
});

test.describe('mobile menu', () => {
  onlyIn('mobile');

  test('opens and closes by click, syncing label and aria-expanded', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.nav-desktop')).toBeHidden();
    await expect.poll(() => summary(page).innerText()).toBe('Menu');
    await expect(summary(page)).toHaveAttribute('aria-expanded', 'false');
    await summary(page).click();
    await expect(details(page)).toHaveAttribute('open', '');
    await expect.poll(() => summary(page).innerText()).toBe('Close');
    await expect(summary(page)).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('navigation', { name: 'Primary' })).toHaveCount(1);
    await summary(page).click();
    await expect(details(page)).not.toHaveAttribute('open', '');
    await expect.poll(() => summary(page).innerText()).toBe('Menu');
  });

  test('Escape closes and returns focus to the summary', async ({ page, browserName }) => {
    await page.goto('/');
    await summary(page).focus();
    await page.keyboard.press('Enter');
    await expect(details(page)).toHaveAttribute('open', '');
    await page.keyboard.press(tabKey(browserName));
    await page.keyboard.press('Escape');
    await expect(details(page)).not.toHaveAttribute('open', '');
    await expect(summary(page)).toBeFocused();
  });

  test('activating a link closes the menu (same-page hash link)', async ({ page }) => {
    await page.goto('/');
    await summary(page).click();
    await page.locator('.menu__panel').getByRole('link', { name: 'Services' }).click();
    await expect(details(page)).not.toHaveAttribute('open', '');
    await expect(page).toHaveURL(/#services$/);
  });

  test('a click outside the header closes the menu', async ({ page }) => {
    await page.goto('/');
    await summary(page).click();
    await expect(details(page)).toHaveAttribute('open', '');
    await page.mouse.click(200, 700);
    await expect(details(page)).not.toHaveAttribute('open', '');
  });

  test('menu rows are at least 44 px tall', async ({ page }) => {
    await page.goto('/');
    await summary(page).click();
    const boxes = await page
      .locator('.menu__panel a')
      .evaluateAll((els) => els.map((e) => e.getBoundingClientRect().height));
    for (const h of boxes) expect(h).toBeGreaterThanOrEqual(44);
  });
});

test.describe('without JavaScript', () => {
  onlyIn('mobile');
  test.use({ javaScriptEnabled: false });

  test('the menu still opens and shows its links', async ({ page }) => {
    await page.goto('/');
    await summary(page).click();
    await expect(details(page)).toHaveAttribute('open', '');
    await expect.poll(() => summary(page).innerText()).toBe('Close');
    await expect(
      page.locator('.menu__panel').getByRole('link', { name: 'Portfolio' }),
    ).toBeVisible();
  });
});

test.describe('sticky mobile CTA bar', () => {
  onlyIn('mobile');

  test('stays hidden while the hero CTAs are on screen (OI-21)', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.hero__ctas')).toBeInViewport();
    await expect(page.locator('[data-mobile-cta]')).toBeHidden();
  });

  test('shows once past the hero and hides while #inquiry is in view', async ({ page }) => {
    await page.goto('/');
    const bar = page.locator('[data-mobile-cta]');
    await page.locator('#services').scrollIntoViewIfNeeded();
    await expect(page.locator('.hero__ctas')).not.toBeInViewport();
    await expect(bar).toBeVisible();
    await page.locator('#inquiry').scrollIntoViewIfNeeded();
    await expect(bar).toBeHidden();
    await page.locator('#services').scrollIntoViewIfNeeded();
    await expect(bar).toBeVisible();
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(bar).toBeHidden();
  });

  test('is not rendered on other pages', async ({ page }) => {
    for (const path of ['/about/', '/work/', '/privacy/', '/work/gridbloom/']) {
      await page.goto(path);
      await expect(page.locator('[data-mobile-cta]')).toHaveCount(0);
    }
  });
});
