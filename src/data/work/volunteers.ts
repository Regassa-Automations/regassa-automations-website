/**
 * Volunteer rosters case study copy, transcribed verbatim from
 * _handoff/content/work/volunteer-rosters.md and _handoff/content/mobile/volunteer-rosters-mobile.md.
 * CONFIDENTIAL CLIENT: never name the organization or its towns (OI-16). All volunteers are invented.
 * The review text comes from projects.yaml (reviews collection), not from here.
 */
import type { Pair, Segment } from '../types';
import type { SheetColumn, SheetRow } from '../../components/work/shared/sheet-types';

export const meta = {
  title: 'Volunteer Registration and Rosters | Regassa Automations',
  description:
    "How Regassa Automations connected Google Forms and SignUpGenius to four location rosters, merging returning volunteers without overwriting coordinators' details.",
  ogTitle: 'Two sign-up tools, one clean roster per location',
  ogDescription:
    "An Apps Script and SignUpGenius API integration that routes each sign-up to its location's roster and merges returning volunteers.",
  ogImage: '/og/og-default.png',
  ogImageAlt:
    'Regassa Automations logo with the line: Workflow automation for complex, everyday operations.',
};

export const hero = {
  crumb: 'Volunteer rosters',
  tags: ['Integration and data sync', 'API integration', 'Google Apps Script'],
  tagsMobile: ['Integration and data sync', 'API integration'],
  h1: 'Two sign-up tools, one clean roster per location',
  lede: "An automation for a volunteer program in four locations that brings registrations from Google Forms and SignUpGenius into each location's roster, recognizing returning volunteers and never overwriting what coordinators already know.",
  ledeMobile:
    "An automation for a four-location volunteer program that brings Google Forms and SignUpGenius registrations into each location's roster, recognizing returning volunteers and never overwriting what coordinators already know.",
  secondary: { label: 'See how records merge', href: '#merge' },
  caption: 'Two intake paths, shared rules, a separate roster for each location.',
  captionMobile: 'Two intake paths, a separate roster for each location.',
  facts: [
    { k: 'Sector', v: 'Nonprofit volunteer program' },
    { k: 'Client', v: 'Four-location program; identity confidential' },
    { k: 'Built with', v: 'Google Apps Script, Forms, Sheets and Docs, and the SignUpGenius API' },
    { k: 'About the examples', v: 'Every volunteer, email and phone number shown is invented.' },
  ] satisfies Pair[],
  factsNoteMobile:
    'A nonprofit volunteer program in four locations; identity confidential. Built with Google Apps Script, Forms, Sheets, Docs and the SignUpGenius API. Every volunteer shown is invented.',
};

export const jumps = [
  { label: 'Overview', labelMobile: 'Challenge', href: '#overview' },
  { label: 'Two intake paths', labelMobile: 'Two paths', href: '#paths' },
  { label: 'Merge, not overwrite', labelMobile: 'Merge', href: '#merge' },
  { label: 'For coordinators', labelMobile: 'Coordinators', href: '#coordinators' },
  { label: 'Training and adoption', labelMobile: 'Adoption', href: '#adoption' },
  { label: 'Results', href: '#results' },
  { label: 'Other industries', labelMobile: 'Other uses', href: '#elsewhere' },
  { label: 'Technical detail', labelMobile: 'Technical', href: '#technical' },
];

export const overview = {
  num: '01',
  h2: 'The challenge and my role',
  body: [
    'A volunteer program running in four locations collected sign-ups two ways: registration forms for each location, and role sign-ups in SignUpGenius. The two produced differently shaped data, and coordinators needed it all in one organized roster for their location, without losing details they had already added by hand.',
    'I designed the registration forms, connected SignUpGenius through its API, wrote the routing, matching and merge rules in Google Apps Script, documented the system, and trained coordinators whose comfort with technology varied widely.',
  ],
  bodyMobile:
    "Volunteers came in through location forms and SignUpGenius, in different shapes. Coordinators needed one organized roster per location without losing details they'd added. I designed the forms, connected the API, wrote the matching and merge rules, documented it and trained the coordinators.",
  cards: [
    {
      label: 'Two sources',
      title: 'Same people, different shapes',
      text: 'A form response is organized around one submission. A sign-up report is organized around an opportunity and its roles. Neither looks like a roster.',
      textMobile: 'Neither a form response nor a sign-up report looks like a roster.',
    },
    {
      label: 'Working documents',
      title: 'Rosters people already rely on',
      titleMobile: 'Rosters people rely on',
      text: 'Coordinators add notes, columns and corrections. An import that rebuilds the sheet, or blanks out a phone number, does more harm than good.',
      textMobile: 'An import must never blank out what coordinators added.',
    },
    {
      label: 'Returning volunteers',
      title: 'One person, many sign-ups',
      text: 'The same volunteer signs up for several roles over time, sometimes with different capitalization or a shared family email.',
      textMobile: 'Different capitalization, sometimes a shared family email.',
    },
  ],
};

export const paths = {
  num: '02',
  h2: 'Two intake paths, one set of rosters',
  h2Mobile: 'Two intake paths',
  intro: "Each source gets the treatment it needs. Both end in the right location's roster.",
  cards: [
    {
      label: 'Path 1 · On submission',
      labelMobile: 'On submission',
      title: 'Registration forms',
      intro:
        'Each location has its own form, with separate question paths for adult and teen volunteers.',
      steps: [
        'A volunteer submits the form; the response is kept in its own sheet.',
        'The submission triggers the script immediately.',
        "Answers are mapped to the roster's columns, whichever question path was taken.",
        "A new row is added to that location's roster.",
      ],
      textMobile:
        "One form per location, with adult and teen question paths. Each response is mapped to the roster's columns and added as a new row.",
    },
    {
      label: 'Path 2 · On a schedule',
      labelMobile: 'On a schedule',
      title: 'SignUpGenius sign-ups',
      intro:
        'The script checks SignUpGenius regularly, so nobody has to download and reconcile reports.',
      steps: [
        'Find the available sign-ups and pull their filled reports through the API.',
        "Work out the location from the sign-up's title.",
        'Tidy names, emails, phone numbers, dates and roles into one consistent shape.',
        'Match each volunteer to the roster, then update their row or add a new one.',
      ],
      textMobile:
        'Reports pulled through the API, routed by the location in the sign-up title, tidied, matched to the roster, then updated or added.',
      scheduled: true,
    },
  ],
};

export const merge = {
  num: '03',
  h2: 'Merge, not overwrite',
  body: "When a returning volunteer signs up again, the import adds what's new and keeps what the roster already knows. Here's one invented example: a volunteer already on the roster signs up for a second role, with her email typed differently and no phone number.",
  bodyMobile:
    'A returning volunteer signs up for a second role, with her email typed differently and no phone number.',
  caption: 'Merging a returning volunteer (illustration)',
  columns: [
    { label: 'Version', hidden: true },
    { label: 'First name' },
    { label: 'Last name' },
    { label: 'Email' },
    { label: 'Phone' },
    { label: 'Latest sign-up' },
    { label: 'Roles' },
    { label: 'Coordinator notes' },
  ] satisfies SheetColumn[],
  rows: [
    {
      cells: [
        'Roster today',
        'Dana',
        'Whitfield',
        'dana.w@example.com',
        '(555) 014-2290',
        '3/2/2026',
        'Greeter',
        'Prefers mornings',
      ],
    },
    {
      cells: [
        'New sign-up',
        'Dana',
        'Whitfield',
        'Dana.W@Example.com',
        { kind: 'muted', text: '(blank)' },
        '4/18/2026',
        'Set-up crew',
        { kind: 'muted', text: 'n/a' },
      ],
    },
    {
      highlight: true,
      cells: [
        'Roster after',
        'Dana',
        'Whitfield',
        { kind: 'kept', text: 'dana.w@example.com', label: 'kept' },
        { kind: 'kept', text: '(555) 014-2290', label: 'kept' },
        { kind: 'changed', text: '4/18/2026', label: 'updated' },
        { kind: 'changed', text: 'Greeter; Set-up crew', label: 'updated' },
        { kind: 'kept', text: 'Prefers mornings', label: 'kept' },
      ],
    },
  ] satisfies SheetRow[],
  legend:
    'Green: kept from the roster. Blue: updated from the sign-up. The changed row is highlighted so the coordinator can find it.',
  legendMobile: 'Green: kept. Blue: updated. The changed row is highlighted.',
  mobileCards: [
    {
      label: 'Roster today',
      tone: 'muted' as const,
      rows: [
        { k: 'Name', v: 'Dana Whitfield' },
        { k: 'Email', v: 'dana.w@example.com' },
        { k: 'Phone', v: '(555) 014-2290' },
        { k: 'Latest sign-up', v: '3/2/2026' },
        { k: 'Roles', v: 'Greeter' },
      ],
    },
    {
      label: 'New sign-up',
      tone: 'muted' as const,
      rows: [
        { k: 'Email', v: 'Dana.W@Example.com' },
        { k: 'Phone', v: '(blank)', state: 'muted' as const },
        { k: 'Date', v: '4/18/2026' },
        { k: 'Role', v: 'Set-up crew' },
      ],
    },
    {
      label: 'Roster after',
      tone: 'after' as const,
      rows: [
        { k: 'Email', v: 'dana.w@example.com', state: 'kept' as const },
        { k: 'Phone', v: '(555) 014-2290', state: 'kept' as const },
        { k: 'Latest sign-up', v: '4/18/2026', state: 'changed' as const },
        { k: 'Roles', v: 'Greeter; Set-up crew', state: 'changed' as const },
      ],
    },
  ],
  rules: {
    title: 'The merge rules',
    items: [
      'Fill blank fields when the sign-up has a usable value',
      'Replace a phone number only with a valid one, never with a blank or a bad one',
      'Keep the most recent sign-up date that can actually be read',
      'Combine distinct roles, without repeating one already listed',
      'Leave every other cell, column and format exactly as it was',
    ],
    itemsMobile: [
      'Fill blanks with usable values',
      'Replace a phone only with a valid one',
      'Keep the latest readable date',
      'Combine distinct roles',
      'Leave everything else untouched',
    ],
  },
  why: {
    title: 'Why email and first name together',
    titleMobile: 'Why email and first name',
    text: 'Matching on email alone would merge family members who share one address into a single volunteer. Matching on email plus first name keeps them as separate people. Emails are lowercased first, so capitalization never creates a duplicate.',
    textMobile:
      'Email alone would merge family members who share an address. Emails are lowercased first, so capitalization never creates a duplicate.',
    small:
      "It's a practical rule for this workflow, not a claim to resolve every possible variation in a name. Form registrations are added as new rows; the matching applies to the SignUpGenius import.",
  },
};

export const coordinators = {
  num: '04',
  h2: 'Built around the coordinators',
  intro:
    'The rosters stayed the spreadsheets coordinators already used. The automation fit around them rather than the other way around.',
  cards: [
    {
      label: 'See what changed',
      title: 'New and updated rows are highlighted',
      titleMobile: 'Changed rows highlighted',
      text: 'After each run, a coordinator can spot additions and changes at a glance instead of rereading the whole roster.',
      textMobile: 'Spot additions and updates without rereading the roster.',
    },
    {
      label: 'Flexible columns',
      title: 'Headers found by name',
      text: "The script recognizes common variations of each column name, so a roster doesn't have to be restructured before the automation can use it.",
      textMobile: 'Common column-name variations are recognized.',
    },
    {
      label: 'No code for wording',
      title: 'Form text kept in a document',
      titleMobile: 'Form wording in a document',
      text: "Each location's form title and description live in an editable Google Doc. Change the doc, and the live form follows on the next scheduled update.",
      textMobile: 'Edit the doc; the live form follows. No code needed.',
    },
  ],
};

export const adoption = {
  num: '05',
  h2: 'Training and adoption',
  body: 'The coordinators ranged from very comfortable with spreadsheets to not at all. Training was part of the build, not a single handoff meeting, and what users found confusing changed the workflow itself.',
  bodyMobile:
    'Coordinators ranged from very comfortable with spreadsheets to not at all, so training shaped the build.',
  steps: [
    {
      title: 'Test the whole path',
      text: 'From form or sign-up to the finished roster row, not just whether the data arrived.',
      textMobile: 'Source to finished roster row.',
    },
    {
      title: 'Write it down',
      text: 'Technical documentation plus a plain-language guide for coordinators.',
      textMobile: 'Technical docs and a plain guide.',
    },
    {
      title: 'Group walkthroughs',
      text: 'The whole system shown end to end.',
      textMobile: 'The system end to end.',
    },
    {
      title: 'One-on-one sessions',
      text: 'Personal time for anyone who needed it.',
      textMobile: 'For anyone who needed them.',
      accent: true,
    },
    {
      title: 'Simplify from feedback',
      text: 'Steps that confused people were changed, and recurring questions went into the guide.',
      textMobile: 'Confusing steps changed; questions added to the guide.',
    },
    {
      title: 'Hand over',
      text: 'Including how to tell a source, form, mapping or access problem from an automation one.',
      hideMobile: true,
    },
  ],
  callout: {
    title: 'From "how do I" to "could it also"',
    body: "Within a couple of weeks, coordinators' questions shifted from how to use the system to suggestions for what it could do next.",
    bodyMobile:
      'Within a couple of weeks, questions shifted from how to use it to ideas for what it could do next.',
  },
};

export const results = {
  num: '06',
  h2: 'What changed',
  tableCaption: 'What changed: before and with the automation',
  columns: ['Area', 'Before', 'With the automation'],
  rows: [
    {
      area: 'Form registrations',
      before: 'Response sheets reorganized into rosters by hand',
      after: "Mapped into the right location's roster on submission",
    },
    {
      area: 'SignUpGenius',
      before: 'Reports downloaded and reconciled manually',
      after: 'Pulled on a schedule and merged into the rosters',
    },
    {
      area: 'Returning volunteers',
      before: 'Risk of duplicates or lost details',
      after: 'Matched and updated in place, with roles combined',
    },
    {
      area: 'Reviewing changes',
      before: 'Scanning the whole roster',
      after: 'Changed rows highlighted after each run',
    },
    {
      area: 'Form wording',
      before: 'Edited form by form',
      after: 'Maintained in one document per location',
    },
  ],
  mobileLabels: { before: 'Before:', after: 'Now:' },
  mobileCards: [
    {
      title: 'Form registrations',
      before: 'reorganized by hand',
      after: 'mapped into the roster on submission',
    },
    {
      title: 'SignUpGenius',
      before: 'downloaded and reconciled manually',
      after: 'pulled on a schedule and merged',
    },
    {
      title: 'Returning volunteers',
      before: 'duplicates or lost details',
      after: 'matched and updated in place',
    },
  ],
  note: 'These are delivered capabilities and observed adoption. No time study was done, so no time savings are claimed. Roles record what volunteers signed up for, not attendance or hours served.',
  noteMobile:
    'Delivered capabilities and observed adoption; no time savings are claimed. Roles record sign-ups, not attendance or hours.',
};

export const elsewhere = {
  num: '07',
  h2: 'The same pattern, other organizations',
  intro: [
    'Anywhere people arrive through ',
    { text: 'more than one tool', strong: true },
    ' and someone keeps ',
    { text: 'a list they rely on', strong: true },
    ', the same matching and merge rules apply.',
  ] satisfies Segment[],
  introMobile: 'People arriving through more than one tool, and a list someone relies on.',
  cards: [
    {
      label: 'Law firms',
      title: 'Client intake',
      text: 'Website inquiries and scheduling bookings combined into one intake list, without duplicating returning clients.',
    },
    {
      label: 'Faith and community groups',
      labelMobile: 'Community',
      title: 'Member and volunteer lists',
      text: 'Event sign-ups and registration forms merged into one directory per ministry or program.',
    },
    {
      label: 'Youth sports and clubs',
      labelMobile: 'Youth sports',
      title: 'Team rosters',
      text: "Registrations and volunteer-parent sign-ups routed to each team, keeping coaches' notes intact.",
    },
    {
      label: 'Event organizers',
      labelMobile: 'Events',
      title: 'Attendee and staff lists',
      text: 'Ticketing exports and shift sign-ups reconciled into one list per venue.',
    },
    {
      label: 'Schools and PTAs',
      labelMobile: 'Schools',
      title: 'Parent volunteer rosters',
      text: 'Form registrations and sign-up sheets combined by school or grade.',
    },
    {
      label: 'Membership organizations',
      labelMobile: 'Membership',
      title: 'Chapter directories',
      text: "Renewals and event registrations routed to each chapter's list without overwriting local details.",
    },
  ],
};

export const technical = {
  num: '08',
  h2: 'Technical detail',
  chips: [
    'Google Apps Script',
    'Google Forms',
    'Google Sheets',
    'Google Docs',
    'SignUpGenius API',
    'JSON and CSV',
  ],
  chipsMobile: ['Apps Script', 'Forms', 'Sheets', 'Docs', 'SignUpGenius API'],
  accordions: [
    {
      title: 'Triggers matched to the job',
      text: "Form submissions run the moment they arrive. SignUpGenius imports and the form-wording updates run on a schedule. One standalone Apps Script project serves all four locations, with each location's forms, response sheets, wording documents and roster configured separately.",
    },
    {
      title: 'Normalizing incoming data',
      text: 'Sign-up reports arrive as JSON or CSV and are translated into one internal shape. Emails are lowercased, dates are checked and unreadable ones set aside rather than guessed, phone numbers are validated, and role values are cleaned before comparison.',
    },
    {
      title: 'Routing to the right location',
      text: "Form responses come from a location-specific form. SignUpGenius records are routed by reading the location from the sign-up's title, then written to that location's roster.",
    },
    {
      title: 'Two roles columns',
      text: 'Roles from SignUpGenius are combined into a semicolon-separated list. Roles volunteers chose on the registration form are kept in their own column, so neither source overwrites the other.',
    },
  ],
  mobileAccordions: [
    {
      title: 'Triggers matched to the job',
      text: 'Form submissions run on arrival; SignUpGenius imports and form-wording updates run on a schedule. One script project serves all four locations.',
    },
    {
      title: 'Normalizing incoming data',
      text: 'JSON and CSV reports become one shape. Emails lowercased, dates checked, phones validated, roles cleaned.',
    },
    {
      title: 'Two roles columns',
      text: 'SignUpGenius roles are combined in one column; roles chosen on the form keep their own, so neither source overwrites the other.',
    },
  ],
};

export const next = {
  h2: 'People signing up in more than one place?',
  body: 'Tell me which tools they use and what your list needs to look like. We can discuss keeping it current without losing what your team has already added.',
  bodyMobile: 'Tell me which tools they use and what your list needs to look like.',
};
