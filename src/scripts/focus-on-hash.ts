/**
 * In-page links and focus (04-interactions-and-responsive.md).
 * After an in-page jump, move focus to the target section's heading (tabindex="-1").
 * Exception: #inquiry (and the legacy #book) focuses the Name field, on click and on page load.
 */
const INQUIRY_FIELD = 'f-name';

function focusTarget(hash: string): void {
  const id = decodeURIComponent(hash.replace(/^#/, ''));
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) return;

  // #book is the previous site's anchor for the inquiry form; treat it the same way.
  const field = id === 'inquiry' || id === 'book' ? document.getElementById(INQUIRY_FIELD) : null;
  const heading =
    field ??
    (target.matches('h1, h2, h3, [tabindex="-1"]')
      ? target
      : target.querySelector<HTMLElement>('h2[tabindex="-1"], h1[tabindex="-1"], h2, h1'));
  if (!heading) return;
  if (!heading.hasAttribute('tabindex') && !field) heading.setAttribute('tabindex', '-1');
  // preventScroll: the browser has already scrolled to the anchor (with scroll-margin-top).
  heading.focus({ preventScroll: true });
}

// Move focus once the browser has finished its own fragment navigation. Firefox applies the
// navigation after a requestAnimationFrame callback, so wait for hashchange instead; when the
// hash is already current (no hashchange), fall back to a short timeout.
window.addEventListener('hashchange', () => focusTarget(location.hash));

document.addEventListener('click', (event) => {
  if (event.defaultPrevented || event.button !== 0) return;
  const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href*="#"]');
  if (!link) return;
  const url = new URL(link.href, location.href);
  if (url.pathname !== location.pathname || !url.hash) return;
  if (url.hash === location.hash) window.setTimeout(() => focusTarget(url.hash), 50);
});

if (location.hash) {
  const run = () => {
    focusTarget(location.hash);
    // The browser's own fragment scroll can finish after this and, per the HTML spec, move focus
    // to the viewport when the target section is not focusable. For a short window, put focus
    // back unless the visitor has clicked, tapped or pressed a key in the meantime.
    let userActed = false;
    const acted = () => (userActed = true);
    const restore = () =>
      window.setTimeout(() => {
        if (!userActed && document.activeElement === document.body) focusTarget(location.hash);
      }, 0);
    document.addEventListener('pointerdown', acted, true);
    document.addEventListener('keydown', acted, true);
    document.addEventListener('focusout', restore, true);
    window.setTimeout(() => {
      document.removeEventListener('pointerdown', acted, true);
      document.removeEventListener('keydown', acted, true);
      document.removeEventListener('focusout', restore, true);
    }, 1000);
  };
  if (document.readyState === 'complete') run();
  else window.addEventListener('load', run, { once: true });
}

export {};
