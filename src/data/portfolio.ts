/**
 * Portfolio copy, transcribed verbatim from _handoff/content/portfolio.md and
 * _handoff/content/mobile/portfolio-mobile.md (`...Mobile`, below 768 px).
 * Card titles, tags, problem and built text come from projects.yaml.
 */

export const meta = {
  title: 'Portfolio | Regassa Automations',
  description:
    'Five workflow automation projects by Regassa Automations: a customer pricing system, a checked electricity data dashboard, PR pipeline sync, a quotes library and volunteer rosters.',
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
    problemMobile:
      'Every couple of weeks, each customer price list was updated by hand as freight costs changed.',
    builtMobile:
      'A custom web application: costs are updated once, and branded price lists are generated with one click.',
  },
  gridbloom: {
    alt: 'GridBloom dashboard for PJM with renewable share, average demand and net generation figures above daily demand and hourly generation charts.',
    altMobile:
      'GridBloom dashboard for PJM with headline figures and demand and generation charts.',
    caption: 'Public EIA grid data, historical, not live.',
    tagMobile: 'Reporting and AI-assisted',
    problemMobile:
      'Data with gaps and bad values produces confident report numbers that are wrong.',
    builtMobile:
      'A self-building weekly report that leaves out unsupported figures, with a checked AI summary.',
  },
  'pr-pipeline-sync': {
    problemMobile: 'Staff copied about 850 opportunities a month into 30 client trackers by hand.',
    builtMobile:
      'One checkbox publishes each opportunity to the right client and keeps it up to date.',
  },
  'quotes-library': {
    tagMobile: 'Data cleanup and documents',
    problemMobile: 'A messy, repetitive quotations workbook that would take days to clean by hand.',
    builtMobile:
      'A cleanup and a 400-page Word reference organized by author, delivered in three days.',
  },
  'volunteer-rosters': {
    problemMobile: 'Coordinators pieced sign-ups from two tools into four rosters by hand.',
    builtMobile:
      "Every sign-up lands in the right roster automatically, without overwriting coordinators' notes.",
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
