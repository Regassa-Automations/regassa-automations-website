import { test, expect } from '@playwright/test';
import { onlyIn } from './only-in';
import { intro, pricing, faq, howItWorks } from '../src/data/services';
import { services } from '../src/data/home';
import { site } from '../src/config/site';

const norm = (s: string) => s.replace(/\s+/g, ' ').trim();

test.describe('Services page, desktop', () => {
  onlyIn('desktop');

  test('renders services, steps, pricing, support plans and FAQ', async ({ page }) => {
    await page.goto('/services/');
    await expect(page.locator('h1')).toHaveText(intro.h1);
    await expect(page.locator('.nav-desktop a[aria-current="page"]')).toHaveText('Services');
    const text = norm(await page.locator('main').innerText());
    const expected = [
      intro.lede,
      ...services.items.flatMap((s) => [s.title, s.description]),
      ...howItWorks.steps.flatMap((s) => [s.title, s.text]),
      pricing.intro,
      pricing.discovery.note,
      ...pricing.discovery.tiers.flatMap((t) => [t.name, t.price, t.bestFor, t.includes]),
      ...pricing.builds.rows.flatMap((r) => [r.label, r.price, r.detail]),
      ...pricing.factors.items,
      pricing.support.text,
      pricing.support.fairUse,
      ...pricing.support.plans.flatMap((p) => [p.name, p.price, p.includes]),
      ...faq.items.flatMap((i) => [i.q, i.a]),
    ];
    for (const s of expected) expect(text, s).toContain(norm(s));
    await expect(page.locator('#pricing .sv-tiers:not(.sv-plans) > li')).toHaveCount(3);
    await expect(page.locator('#pricing .sv-plans > li')).toHaveCount(3);
  });

  test('jump links land on their sections; CTAs go to the form and booking page', async ({
    page,
  }) => {
    await page.goto('/services/');
    for (const j of intro.jump) {
      await expect(page.locator(j.href)).toHaveCount(1);
    }
    await expect(page.locator('.sv-intro a[href="/#inquiry"]')).toHaveCount(1);
    const booking = page.locator(`a[href="${site.bookingUrl}"]`);
    await expect(booking).toHaveCount(1);
    await expect(booking).toHaveAttribute('target', '_blank');
  });

  test('Home links to the Services page and its pricing section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#services a[href="/services/"]')).toHaveCount(1);
    await expect(page.locator('#pricing a[href="/services/#pricing"]')).toHaveCount(1);
    expect(await page.locator('footer a[href="/services/"]').count()).toBeGreaterThan(0);
  });
});

test.describe('Services page, phone', () => {
  onlyIn('mobile');

  test('uses the short lede and stacks the cards in one column', async ({ page }) => {
    await page.goto('/services/');
    await expect(page.locator('.sv-intro__lede:visible')).toHaveText(intro.ledeMobile);
    const boxes = await page
      .locator('#pricing .sv-tier')
      .evaluateAll((els) => els.map((e) => e.getBoundingClientRect().x));
    expect(new Set(boxes.map((x) => Math.round(x))).size).toBe(1);
    const width = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(width).toBeLessThanOrEqual(390);
  });
});
