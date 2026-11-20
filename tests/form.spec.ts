import { test, expect, type Page, type Route } from '@playwright/test';
import { site } from '../src/config/site';
import { inquiry } from '../src/data/home';

const st = inquiry.states;
const ENDPOINT = site.formEndpoint;

// Never let a test reach the real Formspree endpoint.
test.beforeEach(async ({ context }) => {
  await context.route('https://formspree.io/**', (route) =>
    route.fulfill({ status: 599, body: 'blocked in tests' }),
  );
});

async function mockEndpoint(page: Page, handler: (route: Route) => Promise<void> | void) {
  await page.route(ENDPOINT, handler);
}

async function fillValid(page: Page) {
  await page.fill('#f-name', 'Ada Lovelace');
  await page.fill('#f-email', 'ada@example.com');
  await page.fill('#f-process', 'Weekly rate sheets are built by hand.');
  await page.fill('#f-tools', 'Google Sheets');
}

const submit = (page: Page) => page.locator('#inquiry-form button[type="submit"]');

test.describe('validation', () => {
  test('empty submit shows the error summary, inline errors and focuses the summary', async ({
    page,
  }) => {
    await page.goto('/');
    await submit(page).click();
    const summary = page.locator('#form-errors');
    await expect(summary).toBeVisible();
    await expect(summary).toHaveAttribute('role', 'alert');
    await expect(summary).toBeFocused();
    // Focused messages are never hidden under the sticky header (poll: smooth scroll animates).
    const headerBottom = await page
      .locator('.site-header')
      .evaluate((h) => h.getBoundingClientRect().bottom);
    await expect
      .poll(() => summary.evaluate((el) => el.getBoundingClientRect().top))
      .toBeGreaterThanOrEqual(headerBottom);
    await expect(summary.locator('h4')).toHaveText(st.errorSummaryMany.replace('{n}', '3'));
    await expect(summary.locator('a')).toHaveText([
      `${st.summaryLabels.name}: ${st.errors.name}`,
      `${st.summaryLabels.email}: ${st.errors.emailEmpty}`,
      `${st.summaryLabels.process}: ${st.errors.process}`,
    ]);
    for (const id of ['f-name', 'f-email', 'f-process']) {
      await expect(page.locator(`#${id}`)).toHaveAttribute('aria-invalid', 'true');
      await expect(page.locator(`#${id}-err`)).toBeVisible();
      await expect(page.locator(`#${id}`)).toHaveAttribute(
        'aria-describedby',
        new RegExp(`${id}-err`),
      );
    }
    await expect(page.locator('#f-process')).toHaveAttribute(
      'aria-describedby',
      'f-process-hint f-process-err',
    );
    // Summary links move focus to the field.
    await summary.getByRole('link', { name: /^Email:/ }).click();
    await expect(page.locator('#f-email')).toBeFocused();
  });

  test('invalid email gives the format message; fields re-validate live after the first attempt', async ({
    page,
  }) => {
    await page.goto('/');
    await page.fill('#f-name', 'Ada');
    await page.fill('#f-email', 'not-an-email');
    await page.fill('#f-process', 'Something by hand.');
    await submit(page).click();
    await expect(page.locator('#form-errors h4')).toHaveText(st.errorSummaryOne);
    await expect(page.locator('#f-email-err')).toHaveText(st.errors.emailFormat);
    await page.fill('#f-email', 'ada@example.com');
    await expect(page.locator('#f-email')).not.toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#f-email-err')).toBeHidden();
    await expect(page.locator('#form-errors')).toBeHidden();
  });

  test('no errors appear while typing before the first submit', async ({ page }) => {
    await page.goto('/');
    await page.fill('#f-email', 'x');
    await expect(page.locator('#f-email-err')).toBeHidden();
    await expect(page.locator('#form-errors')).toBeHidden();
  });
});

test.describe('submitting', () => {
  test('sending state: disabled button, busy form, polite status, repeat clicks ignored', async ({
    page,
  }) => {
    let calls = 0;
    let release!: () => void;
    const gate = new Promise<void>((r) => (release = r));
    await mockEndpoint(page, async (route) => {
      calls++;
      await gate;
      await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
    });
    await page.goto('/');
    await fillValid(page);
    await submit(page).click();
    await expect(submit(page)).toBeDisabled();
    await expect(submit(page)).toHaveText(st.sending);
    await expect(page.locator('#inquiry-form')).toHaveAttribute('aria-busy', 'true');
    await expect(page.locator('#form-status')).toHaveText(st.sendingStatus);
    await page.locator('#inquiry-form').dispatchEvent('submit');
    release();
    await expect(page.locator('#inquiry-success')).toBeVisible();
    expect(calls).toBe(1);
  });

  test('posts FormData to the Formspree endpoint with Accept: application/json', async ({
    page,
  }) => {
    let seen: { method: string; accept?: string; body: string } | null = null;
    await mockEndpoint(page, (route) => {
      const req = route.request();
      seen = { method: req.method(), accept: req.headers()['accept'], body: req.postData() ?? '' };
      return route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
    });
    await page.goto('/');
    await fillValid(page);
    await submit(page).click();
    await expect(page.locator('#inquiry-success')).toBeVisible();
    expect(seen).not.toBeNull();
    expect(seen!.method).toBe('POST');
    expect(seen!.accept).toBe('application/json');
    for (const part of ['name="name"', 'Ada Lovelace', 'name="_subject"', 'name="_gotcha"'])
      expect(seen!.body).toContain(part);
  });

  test('success replaces the form with the status panel and focuses its heading', async ({
    page,
  }) => {
    await mockEndpoint(page, (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }),
    );
    await page.goto('/');
    await fillValid(page);
    await submit(page).click();
    const panel = page.locator('#inquiry-success');
    await expect(panel).toBeVisible();
    await expect(panel).toHaveAttribute('role', 'status');
    await expect(page.locator('#inquiry-form')).toBeHidden();
    const heading = page.locator('#inquiry-success-h');
    await expect(heading).toHaveText(st.successHeading.replace('{name}', 'Ada'));
    await expect(heading).toBeFocused();
    await expect(page.locator('#inquiry-success-email')).toHaveText('ada@example.com');
    const booking = panel.getByRole('link', { name: /Pick a time for a free consultation/ });
    await expect(booking).toHaveAttribute('href', site.bookingUrl);
    await expect(booking).toHaveAttribute('target', '_blank');
    await expect(booking).toContainText('(opens in a new tab)');
    expect(await page.evaluate(() => sessionStorage.getItem('inquiry-draft'))).toBeNull();

    await panel.getByRole('button', { name: st.another }).click();
    await expect(page.locator('#inquiry-form')).toBeVisible();
    await expect(page.locator('#f-name')).toHaveValue('');
    await expect(page.locator('#f-name')).toBeFocused();
  });

  test('a 500 shows the failure banner, keeps values and saves a session draft that restores', async ({
    page,
  }) => {
    await mockEndpoint(page, (route) =>
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: '{"errors":[{"message":"boom"}]}',
      }),
    );
    await page.goto('/');
    await fillValid(page);
    await submit(page).click();
    const failure = page.locator('#form-failure');
    await expect(failure).toBeVisible();
    await expect(failure).toHaveAttribute('role', 'alert');
    await expect(failure).toBeFocused();
    await expect(failure).toContainText(st.failureTitle);
    await expect(failure).toContainText(st.failureBody);
    await expect(submit(page)).toHaveText(st.retry);
    await expect(submit(page)).toBeEnabled();
    await expect(page.locator('#f-name')).toHaveValue('Ada Lovelace');
    const draft = await page.evaluate(() => sessionStorage.getItem('inquiry-draft'));
    expect(JSON.parse(draft ?? '{}')).toMatchObject({
      name: 'Ada Lovelace',
      tools: 'Google Sheets',
    });
    expect(await page.evaluate(() => localStorage.length)).toBe(0);

    await page.reload();
    await expect(page.locator('#f-name')).toHaveValue('Ada Lovelace');
    await expect(page.locator('#f-process')).toHaveValue('Weekly rate sheets are built by hand.');
  });

  test('a network error is treated as a failure', async ({ page }) => {
    await mockEndpoint(page, (route) => route.abort('failed'));
    await page.goto('/');
    await fillValid(page);
    await submit(page).click();
    await expect(page.locator('#form-failure')).toBeVisible();
  });
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('the form posts natively to Formspree', async ({ page }) => {
    let posted: string | null = null;
    await mockEndpoint(page, (route) => {
      posted = route.request().method();
      return route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: '<!doctype html><title>Formspree</title><h1>Thanks</h1>',
      });
    });
    await page.goto('/');
    await fillValid(page);
    await submit(page).click();
    await page.waitForURL(ENDPOINT);
    expect(posted).toBe('POST');
  });

  test('native validation blocks an empty required field', async ({ page }) => {
    let calls = 0;
    await mockEndpoint(page, (route) => {
      calls++;
      return route.fulfill({ status: 200, body: '' });
    });
    await page.goto('/');
    await submit(page).click();
    await expect(page).toHaveURL(/\/$/);
    expect(calls).toBe(0);
    expect(
      await page.locator('#f-name').evaluate((el: HTMLInputElement) => el.validity.valid),
    ).toBe(false);
  });
});

test.describe('review fixes', () => {
  test('fields are read-only while sending and the confirmation shows what was sent', async ({
    page,
  }) => {
    let release!: () => void;
    const gate = new Promise<void>((r) => (release = r));
    let sentBody = '';
    await mockEndpoint(page, async (route) => {
      sentBody = route.request().postData() ?? '';
      await gate;
      await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
    });
    await page.goto('/');
    await page.fill('#f-name', 'Ada Lovelace');
    await page.fill('#f-email', 'original@example.com');
    await page.fill('#f-process', 'Original description.');
    await submit(page).click();
    await expect(page.locator('#f-email')).toHaveJSProperty('readOnly', true);
    await expect(page.locator('#f-process')).toHaveJSProperty('readOnly', true);
    // Typing into a read-only field changes nothing.
    await page.locator('#f-email').press('End');
    await page.keyboard.type('x');
    await expect(page.locator('#f-email')).toHaveValue('original@example.com');
    // Even a script change after the snapshot cannot alter the confirmation.
    await page.evaluate(() => {
      (document.getElementById('f-email') as HTMLInputElement).value = 'corrected@example.com';
      (document.getElementById('f-name') as HTMLInputElement).value = 'Grace';
    });
    release();
    await expect(page.locator('#inquiry-success')).toBeVisible();
    await expect(page.locator('#inquiry-success-email')).toHaveText('original@example.com');
    await expect(page.locator('#inquiry-success-h')).toContainText('Thank you, Ada.');
    expect(sentBody).toContain('original@example.com');
    expect(sentBody).not.toContain('corrected@example.com');
  });

  test('fields are editable again after a failed send', async ({ page }) => {
    await mockEndpoint(page, (route) => route.fulfill({ status: 500, body: '{}' }));
    await page.goto('/');
    await fillValid(page);
    await submit(page).click();
    await expect(page.locator('#form-failure')).toBeVisible();
    await expect(page.locator('#f-email')).toHaveJSProperty('readOnly', false);
  });

  test('legacy #book links reach the inquiry form and focus Name', async ({ page }) => {
    await page.goto('/#book');
    await expect(page.locator('#f-name')).toBeFocused();
    const header = await page
      .locator('.site-header')
      .evaluate((h) => h.getBoundingClientRect().bottom);
    await expect
      .poll(() => page.locator('#inquiry').evaluate((el) => el.getBoundingClientRect().top))
      .toBeGreaterThanOrEqual(header - 1);
    await expect
      .poll(() => page.locator('#inquiry').evaluate((el) => el.getBoundingClientRect().top))
      .toBeLessThan(300);
  });

  test.describe('without JavaScript', () => {
    test.use({ javaScriptEnabled: false });
    test('legacy #book links still scroll to the inquiry section', async ({ page }) => {
      await page.goto('/#book');
      // Smooth scrolling animates the jump, so wait for it to settle.
      await expect
        .poll(() => page.locator('#inquiry').evaluate((el) => el.getBoundingClientRect().top), {
          timeout: 5000,
        })
        .toBeLessThan(300);
      const top = await page.locator('#inquiry').evaluate((el) => el.getBoundingClientRect().top);
      expect(top).toBeGreaterThanOrEqual(0);
    });
  });
});
