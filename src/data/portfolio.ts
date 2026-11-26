/**
 * Portfolio copy, transcribed verbatim from _handoff/content/portfolio.md and
 * _handoff/content/mobile/portfolio-mobile.md (`...Mobile`, below 768 px).
 * Card titles, tags, problem and built text come from projects.yaml.
 */

export const meta = {
  title: 'Portfolio | Regassa Automations',
  description:
    'Five workflow automation projects by Regassa Automations: freight rate sheets, a checked electricity data dashboard, PR pipeline sync, a quotes library and volunteer rosters.',
  ogTitle: 'Portfolio: Regassa Automations',
  ogDescription: 'Five workflows, from messy inputs to dependable outputs.',
  ogImage: '/og/og-default.png',
  ogImageAlt: 'Regassa Automations logo with the line: Practical automation for small teams.',
};

export const intro = {
  eyebrow: 'Portfolio',
  h1: 'Five workflows, from messy inputs to dependable outputs',
  lede: 'Each project started as a process people were holding together by hand. The case studies show the previous process, what I built, where a person stays in control, and what is measured versus what the system is designed to do.',
  ledeMobile:
    'Each case study shows the previous process, what I built, where a person stays in control, and what was measured versus what it was designed to do.',
};

export const labels = {
  projects: 'Projects',
  problem: 'Problem',
  built: 'What I built',
  linkLine: 'Read the case study',
  featured: 'Featured',
};

export interface CardExtra {
  alt?: string;
  altMobile?: string;
  caption?: string;
  tagMobile?: string;
  problemMobile: string;
  builtMobile: string;
}

export const cards: Record<string, CardExtra> = {
  'freight-rate-sheet-generator': {
    // OI-18: route-table screenshot placement approved by Ayu, 2026-11-20.
    alt: 'Client Route Manager table for a fictional customer listing FCL and LCL routes with container sizes, carrier and match status.',
    caption: 'Fictional routes and sample rates.',
    problemMobile: 'Rate sheets built by matching routes and applying pricing rules by hand.',
    builtMobile: 'Matching, pricing, exception review and PDF generation with a report.',
  },
  gridbloom: {
    alt: 'GridBloom dashboard for PJM with renewable share, average demand and net generation figures above daily demand and hourly generation charts.',
    altMobile:
      'GridBloom dashboard for PJM with headline figures and demand and generation charts.',
    caption: 'Public EIA grid data, historical, not live.',
    tagMobile: 'Reporting and AI-assisted',
    problemMobile:
      'Public grid data with gaps and quirks produces confident numbers that are wrong.',
    builtMobile:
      'A pipeline, dashboard and weekly report that withhold unsupported figures, with a checked AI briefing.',
  },
  'pr-pipeline-sync': {
    problemMobile:
      'Opportunities copied by hand from a master pipeline into about 30 client trackers.',
    builtMobile:
      'An Apps Script sync that publishes, updates and moves each record to the right client.',
  },
  'quotes-library': {
    tagMobile: 'Data cleanup and documents',
    problemMobile:
      'Quotations across worksheets, with copies, near-copies and multiple categories.',
    builtMobile: 'A Python cleanup and a generated 400-page Word reference organized by author.',
  },
  'volunteer-rosters': {
    problemMobile:
      'Sign-ups from Google Forms and SignUpGenius across four locations, with returning volunteers.',
    builtMobile:
      "Routing, matching and merge rules that keep each location's roster current without overwriting it.",
  },
};

export const quotesCardIllustration = {
  label:
    'Illustration of a generated Word page with an author heading, a quotation and its categories',
  author: 'Franklin, Benjamin',
  quote: 'Well done is better than well said.',
  categories: 'Action · Character',
};

export const cta = {
  h2: 'Recognize your own process in one of these?',
  body: 'Describe it in a few sentences and I will tell you honestly whether it is a fit.',
  bodyMobile: "Describe it in a few sentences and I'll tell you honestly whether it is a fit.",
  button: { label: 'Get a free consultation', href: '/#inquiry' },
};
