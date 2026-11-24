/**
 * Sticky mobile CTA bar (04-interactions-and-responsive.md, OI-21).
 * Hidden while any part of #inquiry is in view, and while the hero's own CTA buttons
 * (marked data-mobile-cta-hide-while-visible) are on screen, so the same button never
 * appears twice. The hidden state uses visibility:hidden, which removes it from tab order.
 * Without JavaScript or IntersectionObserver the bar simply stays visible.
 */
const bar = document.querySelector<HTMLElement>('[data-mobile-cta]');
const targets = [
  document.getElementById('inquiry'),
  ...document.querySelectorAll<HTMLElement>('[data-mobile-cta-hide-while-visible]'),
].filter((el): el is HTMLElement => el !== null);

if (bar && targets.length > 0 && 'IntersectionObserver' in window) {
  const visible = new Set<Element>();
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) visible.add(entry.target);
      else visible.delete(entry.target);
    }
    bar.classList.toggle('is-hidden', visible.size > 0);
  });
  for (const target of targets) observer.observe(target);
}

export {};
