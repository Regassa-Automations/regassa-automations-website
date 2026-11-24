/**
 * Home page copy, transcribed verbatim from _handoff/content/home.md (desktop) and
 * _handoff/content/mobile/home-mobile.md (phone strings, `...Mobile`, shown below 768 px).
 * Hero, problems, services, selected-work summaries, pricing and founder copy were revised for
 * OI-22/OI-23 (approved by Ayu 2026-11-24; see 08-homepage-clarity-and-landing-pages.md).
 * Do not edit wording here without a change to the content files.
 */

export interface LinkItem {
  label: string;
  href: string;
}

export const meta = {
  title: 'Regassa Automations | Workflow automation for small businesses',
  description:
    'Workflow automation for small teams: tools that end retyping, copy-and-paste documents and hand-built reports. Free consultation and a written quote before work begins.',
  ogTitle: 'Regassa Automations',
  ogDescription:
    'Workflow automation for small teams: tools that run your process, systems that stay in sync, and reports and documents that build themselves.',
  // Generated in Phase 6 (og-default.png).
  ogImage: '/og/og-default.png',
  ogImageAlt:
    'Regassa Automations logo with the line: Workflow automation for complex, everyday operations.',
};

export const hero = {
  eyebrow: 'Workflow automation consulting',
  h1: 'Stop doing the same work twice.',
  lede: 'I build practical tools that take over repetitive office work: retyping information between systems, assembling documents by copy and paste, and rebuilding the same report every week. For small teams that run on spreadsheets, email and a few key people.',
  ledeMobile:
    'I build practical tools that take over repetitive office work, so your team stops retyping, copying and rebuilding the same things every week.',
  primary: { label: 'Discuss your workflow', href: '#inquiry' },
  secondary: { label: 'See examples', href: '#work' },
  proof:
    'Projects for teams in logistics, PR and communications, and community programs. Free consultation, and a written quote before any build begins.',
  proofMobile: 'Free consultation, and a written quote before any build begins.',
  hexList: [
    'Tools that run your process',
    'Systems that stay in sync',
    'Reports and documents that build themselves',
  ],
  figure: {
    // OI-18: route-table screenshot placement approved by Ayu, 2026-11-20.
    alt: 'Client Route Manager table for a fictional customer listing six FCL and LCL routes with origin, destination, routing, container sizes, carrier and match status, including one unmatched route.',
    tag: 'Fictional demo data',
    caption:
      'Route review screen from the logistics rate-sheet application. Routes, carriers and rates are invented.',
    captionMobile: 'Logistics rate-sheet demo.',
  },
};

export const selectedWork = {
  eyebrow: 'Selected work',
  h2: 'Different industries, the same kinds of problems',
  intro:
    'The rate-sheet project is a good example of a pattern that shows up in many offices: complicated rules, a person checking the exceptions, and a client-ready document at the end. Fee schedules, quotes and engagement letters follow the same pattern.',
  allLink: { label: 'See all five projects', href: '/work/' },
  cardLinkLine: 'Read the case study',
  /** Per-card media and phone copy; titles, tags and desktop summaries come from projects.yaml. */
  cards: {
    'freight-rate-sheet-generator': {
      // OI-18: sample PDF page 1 placement approved by Ayu, 2026-11-20.
      alt: 'First page of a generated rate sheet for a fictional customer, with validity dates and container prices.',
      summary:
        "A freight forwarder's client rate sheets, built from route and cost data with the pricing rules applied automatically. A person approves every flagged route before the PDF is created.",
      summaryMobile:
        'Client rate sheets built with the pricing rules applied automatically, and a person approving every exception.',
    },
    'pr-pipeline-sync': {
      summary:
        "One update in a PR agency's master pipeline now reaches about 30 client trackers, instead of being copied into each one by hand.",
      summaryMobile: "One update in the agency's master pipeline reaches about 30 client trackers.",
    },
    gridbloom: {
      alt: 'GridBloom dashboard with headline electricity figures above demand and generation charts.',
      summary:
        'A weekly report and dashboard that build themselves from public data, leave out figures the data cannot support, and include an AI-drafted briefing whose numbers are checked.',
      summaryMobile:
        'A weekly report and dashboard that build themselves, with an AI briefing whose numbers are checked.',
      tagMobile: 'Reporting and AI-assisted',
    },
  } as Record<
    string,
    { alt?: string; summary?: string; summaryMobile?: string; tagMobile?: string }
  >,
};

export interface Problem {
  title: string;
  detail: string;
  links: LinkItem[];
  /** Phone link labels; null drops that link on phones. */
  linksMobile: (string | null)[];
}

export const problems = {
  eyebrow: 'Sound familiar?',
  h2: 'Does any of this sound like your office?',
  intro:
    'If so, there is probably a simpler way. Each of these is a process that works, but only because people keep it working by hand. Each links to the kind of work that fixes it and, where there is one, a project that did.',
  items: [
    {
      title: 'The same client details get typed into three different places.',
      detail: 'And the copies drift apart until someone notices.',
      links: [
        { label: 'Systems that stay in sync', href: '#services' },
        { label: 'Volunteer roster example', href: '/work/volunteer-rosters/' },
      ],
      linksMobile: ['Sync', 'Volunteer example'],
    },
    {
      title: "Pricing or fee rules live in one person's spreadsheet.",
      detail: 'Quotes wait when that person is out, and exceptions are handled from memory.',
      links: [
        { label: 'Tools that run your process', href: '#services' },
        { label: 'Logistics example', href: '/work/freight-rate-sheet-generator/' },
      ],
      linksMobile: ['Process tools', 'Logistics example'],
    },
    {
      title: 'Client documents (quotes, proposals, letters) are built by copy and paste.',
      detail: 'Every version is a chance for a stale number to slip through.',
      links: [
        { label: 'Reports and documents that build themselves', href: '#services' },
        { label: 'Rate-sheet PDF example', href: '/work/freight-rate-sheet-generator/#sample' },
        { label: 'Word reference example', href: '/work/quotes-library/' },
      ],
      linksMobile: ['Documents', 'Rate-sheet example', null],
    },
    {
      title: "The weekly report takes most of someone's day.",
      detail: 'Exports, pasting, reformatting, then writing the summary.',
      links: [
        { label: 'Reports and documents that build themselves', href: '#services' },
        { label: 'GridBloom example', href: '/work/gridbloom/' },
      ],
      linksMobile: ['Reports', 'GridBloom example'],
    },
    {
      title: 'Updates have to be copied into a separate file for every client.',
      detail:
        'The more clients you have, the more time it takes, and the easier it is to miss one.',
      links: [
        { label: 'Systems that stay in sync', href: '#services' },
        { label: 'PR pipeline example', href: '/work/pr-pipeline-sync/' },
      ],
      linksMobile: ['Sync', 'PR pipeline example'],
    },
    {
      title: 'Two systems disagree, and no one knows which is right.',
      detail: 'Reconciling them is a recurring chore with no record of what changed.',
      links: [
        { label: 'Systems that stay in sync', href: '#services' },
        { label: 'PR pipeline example', href: '/work/pr-pipeline-sync/' },
      ],
      linksMobile: ['Sync', 'PR pipeline example'],
    },
    {
      title: "Deadlines and follow-ups live in someone's head or inbox.",
      detail: 'Things slip when that person is busy, and no one else can see what is due.',
      links: [{ label: 'Tools that run your process', href: '#services' }],
      linksMobile: ['Process tools'],
    },
  ] satisfies Problem[],
};

export interface Service {
  title: string;
  /** Category name used on case-study tags, shown small above the title. */
  tag: string;
  description: string;
  descriptionMobile: string;
  addresses: string[];
  related: LinkItem[];
  rule: 'navy' | 'electric' | 'accent';
}

export const services = {
  eyebrow: 'What I build',
  h2: 'Three kinds of work, built around how your team already operates',
  addressesLabel: 'Addresses',
  relatedLabel: 'Examples:',
  moreLink: { label: 'Services, pricing and how a project runs', href: '/services/' },
  items: [
    {
      title: 'Tools that run your process',
      tag: 'Operational applications',
      description:
        "When the rules for pricing, intake or approvals live in one person's head or spreadsheet, I turn them into a simple tool the whole team can use. Unusual cases are flagged for a person to check.",
      descriptionMobile:
        'Your pricing, intake or approval rules in a simple tool the whole team can use, with unusual cases flagged for a person.',
      addresses: [
        'Rules kept in personal spreadsheets',
        'Work that stops when one person is out',
        'Exceptions handled from memory',
      ],
      related: [{ label: 'Logistics rate sheets', href: '/work/freight-rate-sheet-generator/' }],
      rule: 'navy',
    },
    {
      title: 'Systems that stay in sync',
      tag: 'Integrations and data sync',
      description:
        'Your tools update each other, so information is entered once and every copy stays current. You can see what changed and when.',
      descriptionMobile:
        'Information entered once and kept current everywhere it is used, with a record of what changed.',
      addresses: [
        'Repeated data entry between systems',
        'Records that drift out of sync',
        'Duplicate records from several sources',
      ],
      related: [
        { label: 'PR pipeline sync', href: '/work/pr-pipeline-sync/' },
        { label: 'Volunteer rosters', href: '/work/volunteer-rosters/' },
      ],
      rule: 'electric',
    },
    {
      title: 'Reports and documents that build themselves',
      tag: 'Reporting and AI-assisted workflows',
      description:
        'Weekly reports, client documents and summaries generated from your data in a consistent format. Where AI drafts anything, a person reviews it before it is used.',
      descriptionMobile:
        'Reports and client documents generated from your data, with a person reviewing anything AI drafts.',
      addresses: [
        'Reports rebuilt by hand each week',
        'Documents assembled by copy and paste',
        'Recurring summary writing',
      ],
      related: [
        { label: 'Quotes library', href: '/work/quotes-library/' },
        { label: 'GridBloom', href: '/work/gridbloom/' },
      ],
      rule: 'accent',
    },
  ] satisfies Service[],
};

export const approach = {
  eyebrow: 'How a project runs',
  h2: 'Process first, software second',
  steps: [
    {
      num: '01',
      title: 'Understand the process',
      text: 'I learn how the work actually runs today, who touches it, and where it slows down.',
      textMobile: 'How the work really runs, and where it slows down.',
    },
    {
      num: '02',
      title: 'Define rules and exceptions',
      text: 'We write down the rules, the edge cases, and which decisions stay with your staff.',
      textMobile: 'Which decisions stay with your staff.',
    },
    {
      num: '03',
      title: 'Build and review',
      text: 'I build in stages and review each one with you against real or realistic cases.',
      textMobile: 'In stages, against realistic cases.',
    },
    {
      num: '04',
      title: 'Document and hand off',
      text: 'You get written documentation of how it works and how to change it.',
      textMobile: 'Written documentation of how to run and change it.',
    },
  ],
  note: 'Scope, deliverables and any ongoing support are agreed in writing for each engagement before work begins.',
  noteMobile: 'Scope and any ongoing support are agreed in writing for each engagement.',
};

/** OI-23, pricing Option A (transparent ranges), approved by Ayu 2026-11-24. */
export const pricing = {
  h3: 'How pricing works',
  link: { label: 'Discovery options, support plans and full pricing', href: '/services/#pricing' },
  body: "Every project starts with a free 30-minute consultation. Small, clearly defined projects get a written fixed quote, typically $1,500 to $5,000. For larger or more complex workflows, we start with a paid discovery phase (from $750), and the full discovery fee is credited toward your build if you go ahead. Most multi-step automation projects fall between $5,000 and $15,000. You'll always know the price before work begins.",
  bodyMobile:
    "Free 30-minute consultation. Small projects get a written fixed quote, typically $1,500 to $5,000. Larger ones start with a paid discovery phase from $750, credited in full toward your build. You'll always know the price before work begins.",
};

export const reviews = {
  eyebrow: 'What clients say',
  h2: 'Five-star reviews on Upwork',
  upworkLinkLabel: 'See these reviews on Upwork',
  attribution: 'Client, verified Upwork review',
  attributionMobile: 'Client',
  featuredId: 'volunteer',
  featuredProjectLabelMobile: 'Volunteer rosters',
  fullReviewLink: { label: 'Read the full review', href: '/work/volunteer-rosters/#review' },
  cardIds: ['lead-intake', 'quotes'],
};

export const founder = {
  // portrait-home.jpg (blazer photo, OI-07 resolved)
  portraitAlt: 'Ayantu Regassa, founder of Regassa Automations',
  eyebrow: 'Who you will work with',
  eyebrowMobile: 'Who you work with',
  h2: "I'm Ayantu Regassa",
  body: [
    "I'm an engineer and software developer. Before automation, I worked in patent drafting and prosecution at a law firm, where accuracy, deadlines and document standards aren't optional. I bring the same care to your operations: I learn the process, including its exceptions, before I write any code.",
    'Regassa Automations is just me. You work with me directly, from the first conversation to the handoff.',
  ],
  bodyMobile:
    'An engineer and software developer who previously worked in patent drafting and prosecution at a law firm. I learn your process, including its exceptions, before I write any code. You work with me directly, from first conversation to handoff.',
  link: { label: 'More about my background and approach', href: '/about/' },
  linkMobile: 'More about my background',
};

export const inquiry = {
  eyebrow: 'Discuss your workflow',
  h2: "Tell me about a process that takes too much of your team's time.",
  intro: 'A few sentences is enough. You do not need to know what the solution looks like.',
  introMobile:
    'A few sentences is enough. I read every inquiry myself and reply if it looks like a fit, or tell you if it is not.',
  bookingPrefix: 'Prefer to pick a time?',
  bookingLink: 'Book a free consultation',
  nextH3: 'What happens next',
  next: [
    'I read every inquiry myself.',
    'If it looks like a fit, I reply to arrange a short conversation about how the process works today.',
    'If it is not a fit, I tell you so, and suggest a direction where I can.',
  ],
  formH3: 'Inquiry form',
  subject: 'New inquiry from regassaautomations.com',
  fields: [
    {
      id: 'f-name',
      name: 'name',
      label: 'Name',
      required: true,
      type: 'text',
      autocomplete: 'name',
    },
    {
      id: 'f-email',
      name: 'email',
      label: 'Email',
      required: true,
      type: 'email',
      autocomplete: 'email',
    },
    {
      id: 'f-process',
      name: 'process',
      label: 'What process or workflow would you like to improve?',
      hint: 'What happens today, and what is frustrating about it.',
      required: true,
      type: 'textarea',
      autocomplete: 'off',
    },
    {
      id: 'f-tools',
      name: 'tools',
      label: 'Which tools or systems are involved?',
      hint: 'For example Google Sheets, a CRM, email.',
      required: false,
      type: 'text',
      autocomplete: 'off',
    },
    {
      id: 'f-freq',
      name: 'frequency',
      label: 'How often does it happen, or who is involved?',
      hint: 'For example weekly, two people in operations.',
      required: false,
      type: 'text',
      autocomplete: 'off',
    },
  ] as const,
  submit: 'Send inquiry',
  /** Form states (_handoff/docs/04-interactions-and-responsive.md, Inquiry form). */
  states: {
    sending: 'Sending…',
    sendingStatus: 'Sending your inquiry. Please keep this page open.',
    retry: 'Try sending again',
    errorSummaryOne: 'Please fix 1 field before sending:',
    errorSummaryMany: 'Please fix {n} fields before sending:',
    errors: {
      name: 'Enter your name.',
      emailEmpty: 'Enter an email address so I can reply.',
      emailFormat: 'Enter an email address in the format name@example.com.',
      process: 'Describe the process you would like to improve.',
    },
    /** Short field names used in the error summary links ("Name: Enter your name."). */
    summaryLabels: { name: 'Name', email: 'Email', process: 'Process' },
    failureTitle: 'Your inquiry was not sent.',
    failureBody:
      'Something went wrong on our side. Everything you wrote is still here; please try again in a moment.',
    successLabel: 'Inquiry sent',
    successHeading: 'Thank you, {name}. Your note is on its way to me.',
    successNameFallback: 'there',
    successBodyBefore: 'I will read it and reply to',
    successBodyAfter:
      '. If the workflow looks like a fit, my reply will suggest a time for a short conversation.',
    bookingPrefix: 'Want to skip the back-and-forth?',
    bookingLink: 'Pick a time for a free consultation',
    another: 'Send another inquiry',
  },
  privacy: {
    before: 'I use these details only to reply to your inquiry. See the',
    link: 'Privacy page',
    after: 'for how submissions are handled and how to ask for one to be removed.',
    mobileBefore: 'Used only to reply to you.',
    mobileLink: 'Privacy',
    href: '/privacy/',
  },
};
