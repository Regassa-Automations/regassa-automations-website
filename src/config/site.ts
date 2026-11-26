/**
 * Single source for external service URLs. No other file may hard-code these.
 * See _handoff/docs/01-implementation-plan.md (Phase 0, task 6) and 07-open-items.md.
 */
export const site = {
  /** Formspree Free plan, form "Regassa Audit" (OI-01, decided 2026-11-20). */
  formEndpoint: 'https://formspree.io/f/xjkqbpln',
  /** Google Calendar appointment schedule, linked only, never embedded (OI-04, decided 2026-11-20). */
  bookingUrl: 'https://calendar.app.google/up1aPaBhLxAn3zmo9',
  /** Public Upwork profile so visitors can verify the reviews. */
  upworkReviewsUrl: 'https://www.upwork.com/freelancers/aregassa',
} as const;

export type SiteConfig = typeof site;

/** Primary navigation. `homeHref` is used on Home, where in-page links stay hash-only. */
export type NavKey = 'home' | 'services' | 'portfolio' | 'about';

export interface NavItem {
  key: NavKey;
  label: string;
  href: string;
  homeHref?: string;
}

export const primaryNav: NavItem[] = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'services', label: 'Services', href: '/services/' },
  { key: 'portfolio', label: 'Portfolio', href: '/work/' },
  { key: 'about', label: 'About', href: '/about/' },
];

/** Site-wide primary CTA. */
export const primaryCta = {
  label: 'Get a free consultation',
  href: '/#inquiry',
  homeHref: '#inquiry',
} as const;

/** Footer "Site" links (full footer) and compact footer links. */
export const footerSiteLinks = [
  { label: 'Services', href: '/services/' },
  { label: 'Portfolio', href: '/work/' },
  { label: 'About', href: '/about/' },
  { label: 'Privacy', href: '/privacy/' },
] as const;

/** Footer copy from _handoff/content/home.md (Footer). */
export const footerCopy = {
  tagline: 'Practical automation for small teams. Based in Portland, Maine.',
  businessName: 'Regassa Automations',
} as const;

/** Pick the right href for the current page. */
export function hrefFor(link: { href: string; homeHref?: string }, onHome: boolean): string {
  return onHome && link.homeHref ? link.homeHref : link.href;
}

/**
 * Privacy page "Last updated" date (OI-05, set at launch on 2026-11-20). Update it whenever the
 * Privacy page changes. If it is ever null, the page shows "[LAUNCH DATE]" and the tests fail.
 */
export const privacyLastUpdated: string | null = 'November 20, 2026';
