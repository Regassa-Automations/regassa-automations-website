/**
 * About copy, transcribed verbatim from _handoff/content/about.md and
 * _handoff/content/mobile/about-mobile.md (`...Mobile`, below 768 px).
 * Tools list is the confirmed 11-item list (OI-06 resolved); the canvas review note is never shown.
 * Background items revised for OI-22 (industries worked with; law firm context), 2026-11-24.
 */

export const meta = {
  title: 'About Ayantu Regassa | Regassa Automations',
  description:
    'Ayantu Regassa is an MIT-trained engineer and software developer with more than seven years of software engineering experience. You work with her directly, from discovery to handoff.',
  ogTitle: 'About: Regassa Automations',
  ogDescription: 'You work directly with me, start to finish.',
  ogImage: '/og/og-default.png',
  ogImageAlt: 'Regassa Automations logo with the line: Practical automation for small teams.',
};

export const intro = {
  eyebrow: 'About',
  h1: 'You work directly with me, start to finish.',
  lede: "I'm Ayantu Regassa, an engineer and software developer. Regassa Automations is my independent practice: there is no account manager or handoff to a junior team. The person who asks about your process is the person who builds and documents the system.",
  ledeMobile:
    "I'm Ayantu Regassa, an engineer and software developer. Regassa Automations is my independent practice: the person who asks about your process is the person who builds and documents the system.",
  primary: { label: 'Discuss your workflow', href: '/#inquiry' },
  secondary: { label: 'See the work', href: '/work/' },
  // portrait-about.jpg (cardigan photo, OI-07 resolved)
  portraitAlt: 'Ayantu Regassa',
};

export const background = {
  h2: 'How my background shapes the work',
  items: [
    {
      title: 'Engineering',
      text: 'I trained as an engineer at MIT. That training shows up as a habit of mapping a system completely, including the inputs nobody mentions, before changing any part of it.',
      textMobile:
        'I trained as an engineer at MIT, and I map a system completely, including inputs nobody mentions, before changing any part of it.',
    },
    {
      title: 'Software development',
      text: "I have more than seven years of software engineering experience, much of it building workflow automation in Python and Google Apps Script. I've built systems for logistics companies, PR agencies and nonprofit programs. The industries differ, but the problems are the same: information typed in twice, rules that live in one person's head, and documents rebuilt by hand.",
      textMobile:
        'I have more than seven years of software engineering experience, much of it in workflow automation with Python and Google Apps Script.',
    },
    {
      title: 'Patent technical work',
      text: 'As a patent technical specialist at a top IP law firm, I read dense technical material and described exactly what a system does and does not do, under strict accuracy and deadline standards. I apply the same precision to your business rules and their exceptions.',
      textMobile:
        'As a patent technical specialist at a top IP law firm, I described exactly what a system does and does not do. I apply the same precision to your rules and exceptions.',
    },
  ],
};

export const approach = {
  eyebrow: 'Project approach',
  h2: 'From discovery to handoff',
  cards: [
    {
      label: '01 · Discovery',
      title: 'Understand the process',
      text: 'Conversations with the people who do the work, plus a look at the real files and tools.',
      textMobile: 'Talk with the people who do the work; look at real files.',
    },
    {
      label: '02 · Definition',
      title: 'Rules and exceptions',
      text: 'A written description of the rules, edge cases and the decisions that stay with your staff.',
      textMobile: 'Written down, including which decisions stay with staff.',
    },
    {
      label: '03 · Build',
      title: 'Build and review',
      text: 'Built in stages and reviewed with you against realistic cases before anything goes live.',
      textMobile: 'In stages, reviewed against realistic cases.',
    },
    {
      label: '04 · Handoff',
      title: 'Document and hand off',
      text: 'Documentation your team can follow, and support terms agreed for the engagement.',
      textMobile: 'Documentation your team can follow; support terms agreed.',
    },
  ],
};

export const tools = {
  h2: 'Tools and capabilities',
  intro:
    'I list these separately so it is clear what I have used in delivered work and what would be new for a given project.',
  used: {
    title: 'Used in delivered work',
    tags: [
      'Python',
      'pandas',
      'python-docx',
      'Google Apps Script',
      'Google Sheets',
      'Google Forms',
      'Node.js',
      'Google Cloud Run',
      'PDF generation',
      'API integrations',
      'LLM-assisted drafting with review',
    ],
  },
  future: {
    title: 'Possible future integrations',
    text: 'Other systems with a usable API or export, such as CRMs, accounting tools or practice-management software. These are assessed during discovery, not assumed.',
    textMobile:
      'Other systems with a usable API or export, assessed during discovery rather than assumed.',
  },
};

export const cta = {
  h2: 'Start with a short description',
  body: "Tell me what the process is and what is frustrating about it. I'll reply personally.",
  primary: { label: 'Discuss your workflow', href: '/#inquiry' },
  secondaryMobile: { label: 'See the work', href: '/work/' },
};
