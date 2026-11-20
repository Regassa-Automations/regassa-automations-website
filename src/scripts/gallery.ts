/**
 * Gallery dialog (04-interactions-and-responsive.md). Upgrades [data-gallery-open] links to
 * buttons that open the page's <dialog> at that item. Arrow keys move, Escape closes (native),
 * focus returns to the opener. Without JS the links simply open the full-size image.
 */
const dialog = document.querySelector<HTMLDialogElement>('[data-gallery-dialog]');

if (dialog && typeof dialog.showModal === 'function') {
  const items = [...dialog.querySelectorAll<HTMLElement>('[data-gallery-item]')];
  const title = dialog.querySelector<HTMLElement>('#gd-title')!;
  const pos = dialog.querySelector<HTMLElement>('[data-gallery-pos]')!;
  const close = dialog.querySelector<HTMLButtonElement>('[data-gallery-close]')!;
  const prev = dialog.querySelector<HTMLButtonElement>('[data-gallery-prev]')!;
  const next = dialog.querySelector<HTMLButtonElement>('[data-gallery-next]')!;
  let index = 0;
  let opener: HTMLElement | null = null;

  for (const item of items) {
    const max = item.dataset.max;
    const img = item.querySelector('img');
    if (max && img) img.style.maxWidth = max;
  }

  const show = (i: number) => {
    index = (i + items.length) % items.length;
    items.forEach((el, n) => (el.hidden = n !== index));
    title.textContent = items[index]?.dataset.title ?? '';
    pos.textContent = `${index + 1} of ${items.length}`;
  };

  // Replace each opener link with a real button.
  for (const link of document.querySelectorAll<HTMLAnchorElement>('a[data-gallery-open]')) {
    const button = document.createElement('button');
    button.type = 'button';
    // Copy class and data attributes (including Astro's scoped-style data-astro-cid-*), not href.
    for (const attr of [...link.attributes]) {
      if (attr.name !== 'href') button.setAttribute(attr.name, attr.value);
    }
    button.setAttribute('aria-label', `View larger: ${link.dataset.title ?? ''}`);
    button.append(...link.childNodes);
    link.replaceWith(button);
    button.addEventListener('click', () => {
      opener = button;
      show(Number(button.dataset.galleryOpen));
      dialog.showModal();
      close.focus();
    });
  }

  close.addEventListener('click', () => dialog.close());
  prev.addEventListener('click', () => show(index - 1));
  next.addEventListener('click', () => show(index + 1));
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      show(index - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      show(index + 1);
    }
  });
  // Click on the backdrop closes.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    opener?.focus();
    opener = null;
  });
}

export {};
