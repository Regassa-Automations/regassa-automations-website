/**
 * Services and pricing page (OI-25, 2026-11-24). Service descriptions come from Home
 * (src/data/home.ts > services) so the two pages never drift apart. Pricing follows the
 * decisions in OI-23: Option A ranges and fixed-price discovery tiers credited toward the build.
 * Support plan prices are the researched figures, approved by Ayu 2026-11-24 as a starting point;
 * response times and hosting pass-through are not promised here until decided.
 */

export const meta = {
  title: 'Services and pricing | Regassa Automations',
  description:
    'What Regassa Automations builds, how a project runs and what it costs: free consultation, fixed-price discovery from $750, and typical project ranges.',
  ogTitle: 'Services and pricing: Regassa Automations',
  ogDescription:
    'Tools that run your process, systems that stay in sync, and reports and documents that build themselves. Clear pricing before any work begins.',
  ogImage: '/og/og-default.png',
  ogImageAlt: 'Regassa Automations logo with the line: Practical automation for small teams.',
};

export const intro = {
  eyebrow: 'Services and pricing',
  h1: 'What I build, how it works, and what it costs.',
  lede: 'I build practical tools for small teams that run on spreadsheets, email and a few key people. Every project starts with a free consultation, and you always know the price before work begins.',
  ledeMobile:
    'I build practical tools for small teams. Every project starts with a free consultation, and you always know the price before work begins.',
  jump: [
    { label: 'What I build', href: '#what' },
    { label: 'How it works', href: '#how' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Questions', href: '#faq' },
  ],
};

export const whatIBuild = {
  h2: 'What I build',
  intro:
    'I do three kinds of work, often combined in one project and always built around the tools your team already uses.',
};

export const howItWorks = {
  h2: 'How working together works',
  steps: [
    {
      label: '01 · Free',
      title: 'Consultation',
      text: 'A 30-minute call about the process, what it costs your team today, and whether automation makes sense. No preparation needed.',
      textMobile: 'A 30-minute call about the process and whether automation makes sense.',
    },
    {
      label: '02 · Fixed price',
      title: 'Discovery',
      text: 'For anything beyond a small, clearly defined project, I map the process, its rules and its exceptions, and you get a written plan and quote.',
      textMobile: 'I map the process, rules and exceptions; you get a written plan and quote.',
    },
    {
      label: '03 · Priced up front',
      title: 'Build and review',
      text: 'Built in stages and reviewed with you against realistic cases before anything goes live.',
      textMobile: 'In stages, reviewed against realistic cases.',
    },
    {
      label: '04 · Included',
      title: 'Handoff',
      text: 'Written documentation of how the system works and how to change it. Ongoing support is optional and agreed in writing.',
      textMobile: 'Documentation your team can follow. Support is optional.',
    },
  ],
};

export interface DiscoveryTier {
  name: string;
  price: string;
  length: string;
  bestFor: string;
  includes: string;
}

export const pricing = {
  h2: 'Pricing',
  intro:
    "Small, clearly defined projects get a written fixed quote after the free consultation. Larger or more complex workflows start with a paid discovery phase, so you get a clear plan and a firm price before committing to more. You'll always know the price before work begins.",
  discovery: {
    h3: 'Discovery options',
    note: 'The full discovery fee is credited toward your build if you go ahead, and the plan is yours to keep either way.',
    bestForLabel: 'Best for',
    includesLabel: 'You get',
    tiers: [
      {
        name: 'Workflow Review',
        price: '$750',
        length: 'About 1 week',
        bestFor: 'One workflow that touches one or two tools.',
        includes:
          'A map of the process as it runs today, the best opportunities to automate it with estimated time saved, and a fixed quote for the first build.',
      },
      {
        name: 'Standard Discovery',
        price: '$1,800',
        length: 'About 2 weeks',
        bestFor: 'A workflow with several steps, tools or people involved.',
        includes:
          'Written requirements, an inventory of your data and tools, a proposed design, the main risks, and a fixed quote or a phased plan with prices.',
      },
      {
        name: 'System Roadmap',
        price: '$3,500 to $4,500',
        length: '3 to 4 weeks',
        bestFor: 'A larger system with complex rules and a person reviewing exceptions.',
        includes:
          'Everything in Standard Discovery, plus a small working test of the riskiest part and a priced plan for each stage of the build.',
      },
    ] satisfies DiscoveryTier[],
  },
  builds: {
    h3: 'Typical build costs',
    rows: [
      {
        label: 'Small, clearly defined projects',
        price: '$1,500 to $5,000',
        detail: 'Fixed quote after the free consultation.',
      },
      {
        label: 'Multi-step workflows',
        price: '$5,000 to $15,000',
        detail: 'Fixed quote after discovery.',
      },
      {
        label: 'Larger systems',
        price: 'From $15,000',
        detail: 'Priced in stages, each with a fixed price before it starts.',
      },
    ],
  },
  factors: {
    h3: 'What affects the price',
    items: [
      'How many tools and systems are involved',
      'How many rules and exceptions the process has',
      'How clean and consistent your existing data is',
      'Whether documents or reports need precise formatting',
      'How much documentation your team needs',
    ],
  },
  support: {
    h3: 'Ongoing support plans',
    text: 'Support plans are optional and month to month unless noted. On every plan, fixes are covered: if something I built breaks, or a tool it relies on changes, I fix it at no extra cost. Higher plans add time each month for changes and improvements. New features are quoted separately.',
    fairUse:
      'Covered fixes apply to systems I built, under normal use. Work caused by changes someone else makes to the system is quoted separately. Unused hours do not roll over.',
    plans: [
      {
        name: 'Care',
        price: '$175 a month',
        fit: 'One or two small automations.',
        includes: 'Monitoring and covered fixes. Small changes are quoted separately.',
      },
      {
        name: 'Standard',
        price: '$450 a month',
        fit: 'Mid-size systems.',
        includes:
          'Covered fixes, plus up to 4 hours a month for changes and adjustments, and a quarterly check-in.',
      },
      {
        name: 'Partner',
        price: '$1,100 a month',
        fit: 'Larger systems your team relies on every day.',
        includes:
          'Covered fixes, plus up to 10 hours a month for improvements, and a monthly review. Three-month minimum.',
      },
    ],
  },
};

export const faq = {
  h2: 'Common questions',
  items: [
    {
      q: 'Do I need to switch to new software?',
      a: 'Usually not. Most projects work with the tools you already use, such as Google Workspace, spreadsheets and email. If a change would genuinely help, I explain why and what it would cost before anything is built.',
    },
    {
      q: 'What if we need changes partway through?',
      a: 'Changes are normal. Anything outside the agreed scope is written up with its price and timing before work on it starts, so there are no surprise bills.',
    },
    {
      q: 'How are larger projects priced?',
      a: 'Larger builds are split into stages. Each stage gets a fixed price before it starts, and you decide whether to continue after each one.',
    },
    {
      q: 'Will my team be able to run it without you?',
      a: 'Yes. Every project ends with written documentation of how the system works and how to change it.',
    },
    {
      q: 'Where does AI fit in?',
      a: 'Only where it helps, and a person always reviews anything it drafts before it is used.',
    },
  ],
};

export const next = {
  h2: 'Not sure where to start?',
  body: "Describe the process in a few sentences, or book a free consultation. I'll suggest the smallest useful first step.",
  bodyMobile: "Describe the process, or book a free consultation. I'll suggest where to start.",
  ghostLabel: 'Discuss your workflow',
  otherLinkMobile: 'See the work',
};
