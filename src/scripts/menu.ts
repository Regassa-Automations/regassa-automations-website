/**
 * Mobile menu enhancement (04-interactions-and-responsive.md, Mobile navigation).
 * The <details> menu works without JS; this keeps aria-expanded in sync and adds
 * Escape, link-activation and outside-click closing. The Menu/Close label is CSS-driven.
 */
function enhance(menu: HTMLDetailsElement): void {
  const summary = menu.querySelector('summary');
  if (!summary) return;
  const header = menu.closest('header');

  const sync = () => summary.setAttribute('aria-expanded', String(menu.open));
  const close = (returnFocus: boolean) => {
    if (!menu.open) return;
    menu.open = false;
    if (returnFocus) summary.focus();
  };

  sync();
  menu.addEventListener('toggle', sync);

  menu.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.open) {
      event.preventDefault();
      close(true);
    }
  });

  // Close when a link inside is activated, including same-page hash links.
  menu.querySelectorAll('nav a').forEach((link) => {
    link.addEventListener('click', () => close(false));
  });

  // Close on a click outside the header.
  document.addEventListener('click', (event) => {
    if (!menu.open) return;
    const target = event.target as Node | null;
    if (target && !(header ?? menu).contains(target)) close(false);
  });
}

document.querySelectorAll<HTMLDetailsElement>('details[data-menu]').forEach(enhance);

export {};
