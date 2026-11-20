import { test, expect, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { onlyIn } from './only-in';
import { builtPages } from './pages';
import { site } from '../src/config/site';

/** The CSP from public/_headers, applied to every document response as Netlify would. */
const CSP = /Content-Security-Policy: (.+)/
  .exec(readFileSync('public/_headers', 'utf8'))![1]!
  .trim();

async function withCsp(page: Page): Promise<string[]> {
  const violations: string[] = [];
  await page.addInitScript(() => {
    document.addEventListener('securitypolicyviolation', (e) => {
      (window as unknown as { __csp: string[] }).__csp ??= [];
      (window as unknown as { __csp: string[] }).__csp.push(
        `${e.violatedDirective} ${e.blockedURI}`,
      );
    });
  });
  page.on('console', (m) => {
    if (/Content Security Policy|Refused to/i.test(m.text())) violations.push(m.text());
  });
  await page.route('**/*', async (route) => {
    const req = route.request();
    if (req.resourceType() !== 'document' || !req.url().startsWith('http://127.0.0.1')) {
      return route.fallback();
    }
    const response = await route.fetch();
    await route.fulfill({
      response,
      headers: { ...response.headers(), 'content-security-policy': CSP },
    });
  });
  return violations;
}

const collected = async (page: Page, console: string[]) => [
  ...console,
  ...((await page.evaluate(
    () => (window as unknown as { __csp?: string[] }).__csp ?? [],
  )) as string[]),
];

test.describe('content security policy', () => {
  onlyIn('desktop');

  test('the policy matches the spec', () => {
    expect(CSP).toContain("script-src 'self'");
    expect(CSP).toContain("style-src 'self'");
    expect(CSP).toContain("connect-src 'self' https://formspree.io");
    expect(CSP).toContain("form-action 'self' https://formspree.io");
    expect(CSP).not.toContain('unsafe-inline');
  });

  for (const path of builtPages()) {
    test(`no violations while the page loads and renders: ${path}`, async ({ page }) => {
      const log = await withCsp(page);
      await page.goto(path);
      await page.evaluate(async () => {
        document.querySelectorAll('img').forEach((i) => (i.loading = 'eager'));
        window.scrollTo(0, document.body.scrollHeight);
        await Promise.all([...document.images].map((i) => i.decode().catch(() => {})));
        await document.fonts.ready;
      });
      expect(await collected(page, log)).toEqual([]);
    });
  }

  test('no violations when the form submits, the gallery opens and the video seeks', async ({
    page,
  }) => {
    const log = await withCsp(page);
    await page.route(site.formEndpoint, (r) =>
      r.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }),
    );
    await page.goto('/');
    await page.fill('#f-name', 'Ada');
    await page.fill('#f-email', 'ada@example.com');
    await page.fill('#f-process', 'Weekly reports by hand.');
    await page.locator('#inquiry-form button[type="submit"]').click();
    await expect(page.locator('#inquiry-success')).toBeVisible();
    await page.goto('/work/gridbloom/');
    await page.getByRole('button', { name: 'View larger: Weekly report email' }).click();
    await expect(page.locator('dialog#gallery-dialog')).toBeVisible();
    await page.goto('/work/freight-rate-sheet-generator/');
    await page.getByRole('button', { name: /^Play from 0:57/ }).click();
    expect(await collected(page, log)).toEqual([]);
  });
});
