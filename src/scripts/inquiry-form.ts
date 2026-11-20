/**
 * Inquiry form enhancement (04-interactions-and-responsive.md, Inquiry form).
 * States: idle, validation errors, submitting, failed, succeeded.
 * Without this script the form posts to Formspree normally (OI-01).
 * Values are only ever inserted with textContent.
 */

interface Strings {
  sending: string;
  sendingStatus: string;
  retry: string;
  submit: string;
  summaryOne: string;
  summaryMany: string;
  errors: { name: string; emailEmpty: string; emailFormat: string; process: string };
  labels: { name: string; email: string; process: string };
  heading: string;
  nameFallback: string;
}

type FieldKey = 'name' | 'email' | 'process';

const DRAFT_KEY = 'inquiry-draft';
const TIMEOUT_MS = 15_000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DRAFT_FIELDS = ['name', 'email', 'process', 'tools', 'frequency'] as const;

const form = document.querySelector<HTMLFormElement>('#inquiry-form');
const success = document.querySelector<HTMLElement>('#inquiry-success');

if (form && success) enhance(form, success);

function enhance(form: HTMLFormElement, success: HTMLElement): void {
  const strings = JSON.parse(form.dataset.strings ?? '{}') as Strings;
  const summary = form.querySelector<HTMLElement>('#form-errors')!;
  const summaryHeading = summary.querySelector<HTMLElement>('#form-errors-h')!;
  const summaryList = summary.querySelector<HTMLUListElement>('ul')!;
  const failure = form.querySelector<HTMLElement>('#form-failure')!;
  const status = form.querySelector<HTMLElement>('#form-status')!;
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const successHeading = success.querySelector<HTMLElement>('#inquiry-success-h')!;
  const successEmail = success.querySelector<HTMLElement>('#inquiry-success-email')!;
  const again = success.querySelector<HTMLButtonElement>('.isuccess__again')!;

  const fields: Record<FieldKey, HTMLInputElement | HTMLTextAreaElement> = {
    name: form.querySelector('#f-name')!,
    email: form.querySelector('#f-email')!,
    process: form.querySelector('#f-process')!,
  };

  form.noValidate = true;
  let attempted = false;
  let sending = false;

  restoreDraft();

  // ---------- Validation ----------
  function validate(): Array<{ key: FieldKey; message: string }> {
    const errors: Array<{ key: FieldKey; message: string }> = [];
    if (!fields.name.value.trim()) errors.push({ key: 'name', message: strings.errors.name });
    const email = fields.email.value.trim();
    if (!email) errors.push({ key: 'email', message: strings.errors.emailEmpty });
    else if (!EMAIL_RE.test(email))
      errors.push({ key: 'email', message: strings.errors.emailFormat });
    if (!fields.process.value.trim())
      errors.push({ key: 'process', message: strings.errors.process });
    return errors;
  }

  function describedBy(field: HTMLElement, withError: boolean): void {
    const hintId = `${field.id}-hint`;
    const ids = [
      document.getElementById(hintId) ? hintId : null,
      withError ? `${field.id}-err` : null,
    ]
      .filter(Boolean)
      .join(' ');
    if (ids) field.setAttribute('aria-describedby', ids);
    else field.removeAttribute('aria-describedby');
  }

  function showInlineErrors(errors: Array<{ key: FieldKey; message: string }>): void {
    for (const key of Object.keys(fields) as FieldKey[]) {
      const field = fields[key];
      const err = document.getElementById(`${field.id}-err`)!;
      const found = errors.find((e) => e.key === key);
      if (found) {
        field.setAttribute('aria-invalid', 'true');
        err.textContent = found.message;
        err.hidden = false;
      } else {
        field.removeAttribute('aria-invalid');
        err.textContent = '';
        err.hidden = true;
      }
      describedBy(field, Boolean(found));
    }
  }

  function showSummary(errors: Array<{ key: FieldKey; message: string }>): void {
    summaryList.replaceChildren();
    if (errors.length === 0) {
      summary.hidden = true;
      return;
    }
    summaryHeading.textContent =
      errors.length === 1
        ? strings.summaryOne
        : strings.summaryMany.replace('{n}', String(errors.length));
    for (const { key, message } of errors) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${fields[key].id}`;
      a.textContent = `${strings.labels[key]}: ${message}`;
      a.addEventListener('click', (event) => {
        event.preventDefault();
        fields[key].focus();
      });
      li.append(a);
      summaryList.append(li);
    }
    summary.hidden = false;
  }

  // Live re-validation, only after the first submit attempt.
  form.addEventListener('input', () => {
    if (!attempted) return;
    const errors = validate();
    showInlineErrors(errors);
    if (!summary.hidden) showSummary(errors);
  });

  // ---------- Submit ----------
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending) return;
    attempted = true;
    failure.hidden = true;

    const errors = validate();
    showInlineErrors(errors);
    showSummary(errors);
    if (errors.length > 0) {
      summary.focus();
      return;
    }

    // Snapshot exactly what is sent; the confirmation uses this, never the live fields.
    const payload = new FormData(form);
    const sent = {
      name: String(payload.get('name') ?? '').trim(),
      email: String(payload.get('email') ?? '').trim(),
    };
    setSending(true);
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: payload,
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });
      if (!response.ok) {
        const body: unknown = await response.json().catch(() => null);
        console.error('Inquiry not sent', response.status, body);
        throw new Error(`HTTP ${response.status}`);
      }
      onSuccess(sent);
    } catch (error) {
      if (!(error instanceof Error && error.message.startsWith('HTTP'))) {
        console.error('Inquiry not sent', error);
      }
      onFailure();
    } finally {
      window.clearTimeout(timer);
      setSending(false);
    }
  });

  // Fields are read-only while sending (not disabled, so they stay readable and focusable) so the
  // fields always show what was actually submitted.
  const editable = [
    ...form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
      'input:not([type="hidden"]):not([name="_gotcha"]), textarea',
    ),
  ];

  function setSending(on: boolean): void {
    sending = on;
    form.setAttribute('aria-busy', String(on));
    submit.disabled = on;
    for (const el of editable) el.readOnly = on;
    if (on) {
      submit.textContent = strings.sending;
      status.textContent = strings.sendingStatus;
    } else {
      status.textContent = '';
    }
  }

  function onFailure(): void {
    saveDraft();
    submit.textContent = strings.retry;
    failure.hidden = false;
    failure.focus();
  }

  function onSuccess(sent: { name: string; email: string }): void {
    clearDraft();
    const first = sent.name.split(/\s+/)[0] || strings.nameFallback;
    successHeading.textContent = strings.heading.replace('{name}', first);
    successEmail.textContent = sent.email;
    form.hidden = true;
    success.hidden = false;
    successHeading.focus();
  }

  again.addEventListener('click', () => {
    form.reset();
    attempted = false;
    showInlineErrors([]);
    showSummary([]);
    failure.hidden = true;
    submit.textContent = strings.submit;
    success.hidden = true;
    form.hidden = false;
    fields.name.focus();
  });

  // ---------- Draft backup (sessionStorage only, on failure) ----------
  function saveDraft(): void {
    try {
      const data: Record<string, string> = {};
      for (const name of DRAFT_FIELDS) {
        const el = form.elements.namedItem(name) as HTMLInputElement | null;
        if (el) data[name] = el.value;
      }
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    } catch {
      /* storage unavailable: the values are still in the fields */
    }
  }

  function clearDraft(): void {
    try {
      sessionStorage.removeItem(DRAFT_KEY);
    } catch {
      /* ignore */
    }
  }

  function restoreDraft(): void {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const data = JSON.parse(raw) as Record<string, unknown>;
      for (const name of DRAFT_FIELDS) {
        const el = form.elements.namedItem(name) as HTMLInputElement | null;
        const value = data[name];
        if (el && typeof value === 'string' && !el.value) el.value = value;
      }
    } catch {
      /* ignore malformed or unavailable storage */
    }
  }
}

export {};
