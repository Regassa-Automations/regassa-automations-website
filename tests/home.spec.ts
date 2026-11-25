import { test, expect, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { load } from 'js-yaml';
import { onlyIn } from './only-in';
import * as home from '../src/data/home';
import { site } from '../src/config/site';

const norm = (s: string) => s.replace(/\s+/g, ' ').trim();
const mainText = async (page: Page) => norm(await page.locator('main').innerText());

interface YamlFile {
  projects: Array<{ slug: string; homeCard: number | null; cardSummary: string | null }>;
  reviews: { items: Array<{ id: string; excerpt: string }> };
}
const yaml = load(readFileSync('src/content/work/projects.yaml', 'utf8')) as YamlFile;

/** Desktop strings that must be visible at 1440 px. */
const desktopStrings = [
  home.hero.h1,
  home.hero.lede,
  home.hero.proof,
  ...home.hero.hexList,
  home.hero.figure.caption,
  home.selectedWork.h2,
  home.selectedWork.intro,
  ...Object.values(home.selectedWork.cards).map((c) => c.summary ?? ''),
  home.problems.intro,
  ...home.problems.items.flatMap((i) => [i.title, i.detail, ...i.links.map((l) => l.label)]),
  ...home.services.items.flatMap((s) => [s.tag, s.title, s.description, ...s.addresses]),
  'Examples: Quotes library, GridBloom',
  ...home.approach.steps.flatMap((s) => [s.title, s.text]),
  home.approach.note,
  home.pricing.h3,
  home.pricing.body,
  home.reviews.h2,
  'See all five projects →',
  ...home.founder.body,
  home.inquiry.h2,
  home.inquiry.intro,
  'Prefer to pick a time? Book a free consultation',
  ...home.inquiry.next,
  'I use these details only to reply to your inquiry. See the Privacy page for how submissions are handled and how to ask for one to be removed.',
];

/** Phone strings that must be visible at 390 px. */
const mobileStrings = [
  home.hero.ledeMobile,
  home.hero.proofMobile,
  home.hero.figure.captionMobile,
  ...Object.values(home.selectedWork.cards).map((c) => c.summaryMobile ?? ''),
  ...home.services.items.map((s) => s.descriptionMobile),
  ...home.approach.steps.map((s) => s.textMobile),
  home.approach.noteMobile,
  home.pricing.bodyMobile,
  home.founder.eyebrowMobile.toUpperCase(),
  home.founder.bodyMobile,
  home.founder.linkMobile,
  home.inquiry.introMobile,
  'Used only to reply to you. Privacy',
  'Client · Lead intake dashboards',
  'Client, verified Upwork review · Volunteer rosters',
  'Sync · PR pipeline example',
  'Documents · Rate-sheet example',
];

/** Desktop-only content that the phone design drops. */
const droppedOnMobile = [
  home.problems.intro,
  home.problems.items[0]!.detail,
  'Word reference example',
  home.hero.lede,
  home.selectedWork.intro,
  home.pricing.body,
  home.services.items[0]!.addresses[0]!,
  home.inquiry.next[0]!,
];

test.describe('Home copy, desktop', () => {
  onlyIn('desktop');

  test('renders the content file strings verbatim', async ({ page }) => {
    await page.goto('/');
    const text = await mainText(page);
    for (const s of desktopStrings) expect(text, s).toContain(norm(s));
    // Eyebrows render uppercase via CSS; check the DOM text instead.
    const dom = norm((await page.locator('main').textContent()) ?? '');
    for (const s of [
      home.selectedWork.eyebrow,
      home.problems.eyebrow,
      home.services.eyebrow,
      home.founder.eyebrow,
    ])
      expect(dom).toContain(s);
  });

  test('has one h1 and section headings for every anchor', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toHaveCount(1);
    for (const id of [
      'problems',
      'services',
      'work',
      'approach',
      'reviews',
      'founder',
      'inquiry',
    ]) {
      const section = page.locator(`section#${id}`);
      await expect(section).toHaveCount(1);
      const labelledby = await section.getAttribute('aria-labelledby');
      await expect(page.locator(`#${labelledby}`)).toHaveCount(1);
    }
  });

  test('sections run in the OI-22 order, with no featured section', async ({ page }) => {
    await page.goto('/');
    const ids = await page.locator('main section[id]').evaluateAll((els) => els.map((e) => e.id));
    expect(ids).toEqual([
      'problems',
      'services',
      'work',
      'approach',
      'reviews',
      'founder',
      'inquiry',
    ]);
    await expect(page.locator('#featured')).toHaveCount(0);
  });

  test('selected work cards: three, one link each, GridBloom tagged independent', async ({
    page,
  }) => {
    await page.goto('/');
    const cards = page.locator('#work article');
    await expect(cards).toHaveCount(3);
    for (let i = 0; i < 3; i++) await expect(cards.nth(i).locator('a')).toHaveCount(1);
    await expect(cards.nth(2)).toContainText('Independent project');
    await expect(cards.nth(0).getByRole('link')).toHaveAttribute(
      'href',
      '/work/freight-rate-sheet-generator/',
    );
  });
});

test.describe('Home copy, phone', () => {
  onlyIn('mobile');

  test('renders the phone strings and drops desktop-only content', async ({ page }) => {
    await page.goto('/');
    const text = await mainText(page);
    for (const s of mobileStrings) expect(text, s).toContain(norm(s));
    for (const s of droppedOnMobile) expect(text, `should be hidden: ${s}`).not.toContain(norm(s));
    await expect(page.locator('.hero__hexes')).toBeHidden();
  });

  test('only the first selected-work card shows media', async ({ page }) => {
    await page.goto('/');
    const media = page.locator('#work .pcard__media');
    await expect(media.nth(0)).toBeVisible();
    await expect(media.nth(1)).toBeHidden();
    await expect(media.nth(2)).toBeHidden();
  });
});

test.describe('reviews', () => {
  onlyIn('desktop');

  test('are quoted exactly as in projects.yaml with the star label', async ({ page }) => {
    await page.goto('/');
    const quotes = await page.locator('#reviews blockquote').allTextContents();
    const byId = new Map(yaml.reviews.items.map((r) => [r.id, r.excerpt]));
    const expected = [home.reviews.featuredId, ...home.reviews.cardIds].map(
      (id) => `“${byId.get(id)}”`,
    );
    expect(quotes.map((q) => q.trim())).toEqual(expected);
    await expect(page.locator('#reviews [role="img"][aria-label="Rated 5 out of 5"]')).toHaveCount(
      3,
    );
    const upwork = page.locator(`#reviews a[href="${site.upworkReviewsUrl}"]`).first();
    await expect(upwork).toHaveAttribute('target', '_blank');
  });

  test('no review or rating structured data', async ({ page }) => {
    await page.goto('/');
    const html = await page.content();
    expect(html).not.toMatch(/AggregateRating|"@type":\s*"Review"|itemprop="review/i);
  });
});

test.describe('in-page anchors', () => {
  for (const id of ['work', 'services', 'inquiry']) {
    test(`#${id} lands below the sticky header and moves focus`, async ({ page }) => {
      await page.goto('/');
      const header = await page.locator('.site-header').boundingBox();
      const link = page.locator(`a[href="#${id}"]:visible`).first();
      await link.click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect
        .poll(async () => (await page.locator(`#${id}`).boundingBox())?.y ?? -1)
        .toBeGreaterThanOrEqual((header?.height ?? 0) - 1);
      if (id === 'inquiry') await expect(page.locator('#f-name')).toBeFocused();
      else await expect(page.locator(`#${id}-h`)).toBeFocused();
    });
  }

  test('loading /#inquiry focuses the Name field', async ({ page }) => {
    await page.goto('/#inquiry');
    await expect(page.locator('#f-name')).toBeFocused();
  });
});

test.describe('inquiry form markup', () => {
  onlyIn('desktop');

  test('posts to Formspree without JS, with honeypot and subject, no _next', async ({ page }) => {
    await page.goto('/');
    const form = page.locator('#inquiry-form');
    await expect(form).toHaveAttribute('action', site.formEndpoint);
    await expect(form).toHaveAttribute('method', 'POST');
    // The static markup keeps native validation; the script sets noValidate at runtime.
    expect(readFileSync('dist/index.html', 'utf8')).not.toMatch(/<form[^>]*novalidate/i);
    await expect(form.locator('input[name="_next"]')).toHaveCount(0);
    await expect(form.locator('input[name="_subject"]')).toHaveValue(home.inquiry.subject);
    const hp = form.locator('input[name="_gotcha"]');
    await expect(hp).toHaveAttribute('tabindex', '-1');
    await expect(hp).toHaveAttribute('autocomplete', 'off');
    await expect(form.locator('.iform__hp')).toHaveAttribute('aria-hidden', 'true');
    for (const f of home.inquiry.fields) {
      const input = form.locator(`#${f.id}`);
      await expect(input).toHaveAttribute('name', f.name);
      await expect(form.locator(`label[for="${f.id}"]`)).toContainText(
        f.required ? '(required)' : '(optional)',
      );
      if (f.required) await expect(input).toHaveAttribute('required', '');
    }
    await expect(form.locator('#f-email')).toHaveAttribute('autocomplete', 'email');
    await expect(form.locator('#f-process')).toHaveAttribute('aria-describedby', 'f-process-hint');
  });
});
