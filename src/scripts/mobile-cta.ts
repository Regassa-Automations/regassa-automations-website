/**
 * Sticky mobile CTA bar (04-interactions-and-responsive.md): hidden while any part of
 * #inquiry is in view. The hidden state uses visibility:hidden, which removes it from tab order.
 */
const bar = document.querySelector<HTMLElement>('[data-mobile-cta]');
const inquiry = document.getElementById('inquiry');

if (bar && inquiry && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      bar.classList.toggle('is-hidden', entry.isIntersecting);
    }
  });
  observer.observe(inquiry);
}

export {};
