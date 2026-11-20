/**
 * Home page copy, transcribed verbatim from _handoff/content/home.md (desktop) and
 * _handoff/content/mobile/home-mobile.md (phone strings, `...Mobile`, shown below 768 px).
 * Do not edit wording here without a change to the content files.
 */

export interface LinkItem {
  label: string;
  href: string;
}

export const meta = {
  title: 'Regassa Automations | Workflow automation for small businesses',
  description:
    'Workflow automation consulting from Portland, Maine. I turn disconnected spreadsheets, manual handoffs and complicated business rules into reliable systems.',
  ogTitle: 'Regassa Automations',
  ogDescription:
    'Workflow automation for complex, everyday operations: operational applications, integrations and data sync, reporting and AI-assisted workflows.',
  // Generated in Phase 6 (og-default.png).
  ogImage: '/og/og-default.png',
  ogImageAlt:
    'Regassa Automations logo with the line: Workflow automation for complex, everyday operations.',
};

export const hero = {
  eyebrow: 'Workflow automation consulting',
  h1: 'Workflow automation for complex, everyday operations.',
  lede: 'I turn disconnected spreadsheets, manual handoffs, and complicated business rules into reliable systems, so your team spends less time moving information and more time using it.',
  primary: { label: 'Discuss your workflow', href: '#inquiry' },
  secondary: { label: 'Explore the work', href: '#work' },
  hexList: [
    'Operational applications',
    'Integrations and data sync',
    'Reporting and AI-assisted workflows',
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
  h2: 'Systems built for real operational processes',
  allLink: { label: 'See all five projects', href: '/work/' },
  cardLinkLine: 'Read the case study',
  /** Per-card media and phone copy; titles, tags and desktop summaries come from projects.yaml. */
  cards: {
    'freight-rate-sheet-generator': {
      // OI-18: sample PDF page 1 placement approved by Ayu, 2026-11-20.
      alt: 'First page of a generated rate sheet for a fictional customer, with validity dates and container prices.',
      summaryMobile:
        'Matches routes to cost data, applies pricing rules, holds exceptions for review, and generates a PDF.',
    },
    'pr-pipeline-sync': {
      summaryMobile:
        "Publishes a PR agency's opportunities from one master pipeline to about 30 client trackers.",
    },
    gridbloom: {
      alt: 'GridBloom dashboard with headline electricity figures above demand and generation charts.',
      summaryMobile:
        'A pipeline, dashboard and weekly report that withhold unsupported figures, with a checked AI briefing.',
      tagMobile: 'Reporting and AI-assisted',
    },
  } as Record<string, { alt?: string; summaryMobile?: string; tagMobile?: string }>,
};

export interface Problem {
  title: string;
  detail: string;
  links: LinkItem[];
  /** Phone link labels; null drops that link on phones. */
  linksMobile: (string | null)[];
}

export const problems = {
  eyebrow: 'Problems I work on',
  h2: 'Does any of this sound like your week?',
  intro:
    'Each of these is a process that works, but only because people keep it working by hand. Each links to the service and a project that addresses it.',
  items: [
    {
      title: 'The same information is typed into three places.',
      detail: 'And the copies drift apart until someone notices.',
      links: [
        { label: 'Integrations and data sync', href: '#services' },
        { label: 'PR pipeline example', href: '/work/pr-pipeline-sync/' },
      ],
      linksMobile: ['Integrations', 'PR pipeline example'],
    },
    {
      title: "Pricing rules live in one person's spreadsheet.",
      detail: 'Quotes wait when that person is out, and exceptions are handled from memory.',
      links: [
        { label: 'Operational applications', href: '#services' },
        { label: 'Logistics example', href: '/work/freight-rate-sheet-generator/' },
      ],
      linksMobile: ['Operational apps', 'Logistics example'],
    },
    {
      title: 'The weekly report takes most of a day.',
      detail: 'Exports, pasting, reformatting, then writing the summary.',
      links: [
        { label: 'Reporting and AI-assisted workflows', href: '#services' },
        { label: 'GridBloom example', href: '/work/gridbloom/' },
      ],
      linksMobile: ['Reporting', 'GridBloom example'],
    },
    {
      title: 'Client documents are assembled by copy and paste.',
      detail: 'Every version is a chance for a stale number to slip through.',
      links: [
        { label: 'Operational applications', href: '#services' },
        { label: 'Rate-sheet PDF example', href: '/work/freight-rate-sheet-generator/#sample' },
        { label: 'Word reference example', href: '/work/quotes-library/' },
      ],
      linksMobile: ['Operational apps', 'Rate-sheet example', null],
    },
    {
      title: 'Two systems disagree and nobody knows which is right.',
      detail: 'Reconciling them is a recurring chore with no record of what changed.',
      links: [
        { label: 'Integrations and data sync', href: '#services' },
        { label: 'PR pipeline example', href: '/work/pr-pipeline-sync/' },
      ],
      linksMobile: ['Integrations', 'PR pipeline example'],
    },
    {
      title: 'Sign-ups arrive from several forms with duplicates.',
      detail: 'The roster is never quite current, and roles get merged by hand.',
      links: [
        { label: 'Operational applications', href: '#services' },
        { label: 'Volunteer roster example', href: '/work/volunteer-rosters/' },
      ],
      linksMobile: ['Operational apps', 'Volunteer example'],
    },
  ] satisfies Problem[],
};

export const featured = {
  eyebrow: 'Featured project',
  h2: 'From route list to rate sheet, with a person approving the exceptions',
  intro:
    "A logistics rate-sheet application that takes a client's requested routes and cost data, applies the pricing rules consistently, and stops for review wherever the data does not fit the rules.",
  tag: 'Demo uses fictional routes and sample rates',
  tagMobile: 'Fictional routes and sample rates',
  stepsLabel: 'How the rate-sheet workflow runs',
  steps: [
    {
      num: '01',
      label: 'Input',
      title: 'Routes and cost data',
      titleMobile: 'Routes and cost data',
      description: 'Client route list and carrier costs are loaded.',
    },
    {
      num: '02',
      label: 'Match',
      title: 'Route matching',
      titleMobile: 'Route matching',
      description: 'Each route is matched to cost records; gaps are flagged.',
    },
    {
      num: '03',
      label: 'Price',
      title: 'Pricing rules',
      titleMobile: 'Pricing rules',
      description: 'Rules are applied the same way every time.',
    },
    {
      num: '04',
      label: 'Review',
      title: 'Exception review',
      titleMobile: 'Exception review by a person',
      description: 'A person approves or corrects every flagged route.',
      highlight: true,
    },
    {
      num: '05',
      label: 'Generate',
      title: 'Rate-sheet PDF',
      titleMobile: 'Rate-sheet PDF and report',
      description: 'A formatted PDF plus a generation report.',
    },
    {
      num: '06',
      label: 'Deliver',
      title: 'Delivery',
      titleMobile: 'Delivery',
      description: 'Save the PDF, or generate and email it to the client.',
    },
  ],
  figures: [
    {
      // OI-18: route-table screenshot placement approved by Ayu, 2026-11-20.
      alt: 'Customer route table with match status for six fictional routes, one of them unmatched.',
      caption:
        'Route management: matched, unmatched and flagged routes side by side. Fictional data.',
    },
    {
      // OI-18: sample PDF page 1 placement approved by Ayu, 2026-11-20.
      alt: 'Page one of the generated sample rate sheet, with validity dates, container prices by size and LCL rates per cubic meter.',
      caption: 'Generated rate sheet with sample rates.',
      link: {
        label: 'View the full sample PDF in the case study',
        href: '/work/freight-rate-sheet-generator/#sample',
      },
    },
  ],
  button: { label: 'Read the logistics case study', href: '/work/freight-rate-sheet-generator/' },
};

export interface Service {
  title: string;
  description: string;
  descriptionMobile: string;
  addresses: string[];
  related: LinkItem[];
  rule: 'navy' | 'electric' | 'accent';
}

export const services = {
  eyebrow: 'Services',
  h2: 'Three kinds of work, often combined',
  addressesLabel: 'Addresses',
  relatedLabel: 'Related:',
  items: [
    {
      title: 'Operational applications',
      description:
        'Small, purpose-built tools that hold your business rules, so the process does not depend on who is in the office.',
      descriptionMobile:
        'Purpose-built tools that hold your business rules, so the process does not depend on who is in the office.',
      addresses: [
        'Rules kept in personal spreadsheets',
        'Documents assembled by hand',
        'Exceptions handled from memory',
      ],
      related: [
        { label: 'Logistics rate sheets', href: '/work/freight-rate-sheet-generator/' },
        { label: 'Quotes library', href: '/work/quotes-library/' },
      ],
      rule: 'navy',
    },
    {
      title: 'Integrations and data synchronization',
      description:
        'Connections between the tools you already use, with reconciliation so you can see what changed and what needs a decision.',
      descriptionMobile:
        'Connections between the tools you use, with reconciliation so you can see what changed.',
      addresses: [
        'Repeated data entry between systems',
        'Records that drift out of sync',
        'Duplicate records from several sources',
      ],
      related: [{ label: 'PR pipeline sync', href: '/work/pr-pipeline-sync/' }],
      rule: 'electric',
    },
    {
      title: 'Reporting and AI-assisted workflows',
      description:
        'Dashboards fed directly from your sources, and, where it helps, a language model that drafts research or summaries for a person to check.',
      descriptionMobile:
        'Dashboards fed from your sources, and model-drafted summaries that a person checks.',
      addresses: [
        'Reports rebuilt by hand each week',
        'Figures scattered across exports',
        'Recurring research and summary writing',
      ],
      related: [{ label: 'GridBloom', href: '/work/gridbloom/' }],
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
    "I'm an engineer and software developer. Earlier in my career I worked as a patent technical specialist, where the job was reading dense technical material closely and describing exactly what a system does. I bring the same care to your operations: I learn the process, including its exceptions, before I write any code.",
    'Regassa Automations is just me. You work with me directly, from the first conversation to the handoff.',
  ],
  bodyMobile:
    'An engineer and software developer, formerly a patent technical specialist. I learn your process, including its exceptions, before I write any code. You work with me directly, from first conversation to handoff.',
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
