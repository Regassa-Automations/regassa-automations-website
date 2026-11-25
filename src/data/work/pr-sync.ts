/**
 * PR pipeline sync case study copy, transcribed verbatim from
 * _handoff/content/work/pr-pipeline-sync.md and _handoff/content/mobile/pr-pipeline-sync-mobile.md.
 * CONFIDENTIAL CLIENT: never name the agency (OI-15). All people, clients and outlets are invented.
 */
import type { Pair, Segment } from '../types';
import type { SheetColumn, SheetRow } from '../../components/work/shared/sheet-types';

export const meta = {
  title: 'PR Pipeline and Client Tracker Sync | Regassa Automations',
  description:
    "How Regassa Automations replaced a failing Make.com workflow with Google Apps Script that publishes a PR agency's opportunities from one master pipeline to about 30 client trackers.",
  ogTitle: 'One master pipeline, thirty client trackers',
  ogDescription:
    "A Google Apps Script sync that publishes each opportunity to the right client's tracker and follows it from Pipeline to Secured.",
  ogImage: '/og/og-default.png',
  ogImageAlt:
    'Regassa Automations logo with the line: Workflow automation for complex, everyday operations.',
};

export const hero = {
  crumb: 'PR pipeline sync',
  tags: ['Integration and data sync', 'Google Apps Script', 'Google Sheets'],
  tagsMobile: ['Integration and data sync', 'Google Apps Script'],
  h1: 'One master pipeline, thirty client trackers',
  lede: "A Google Apps Script automation for a PR agency that publishes each opportunity from the team's master pipeline to the right client's tracker, and keeps it up to date from first pitch to secured coverage.",
  ledeMobile:
    "An automation for a PR agency that publishes each opportunity from the team's master pipeline to the right client's tracker, and keeps it up to date until coverage is secured.",
  secondary: { label: 'Follow one opportunity', href: '#journey' },
  caption: 'The agency edits one spreadsheet. Each client sees only their own work.',
  facts: [
    { k: 'Industry', v: 'Public relations' },
    { k: 'Client', v: 'Boutique PR agency, about 20 staff; identity confidential' },
    { k: 'Built with', v: 'Google Apps Script and Google Sheets, replacing a Make.com workflow' },
    { k: 'Timeline', v: 'Built December 2025 to January 2026, then supported in daily use' },
  ] satisfies Pair[],
  factsNoteMobile:
    'A boutique PR agency of about 20 staff; identity confidential. Built December 2025 to January 2026 in Google Apps Script, replacing a Make.com workflow. All names shown are invented.',
};

export const jumps = [
  { label: 'Overview', labelMobile: 'Challenge', href: '#overview' },
  { label: 'One opportunity, start to finish', labelMobile: 'One opportunity', href: '#journey' },
  { label: 'The Record ID', labelMobile: 'Record ID', href: '#identity' },
  { label: 'In the spreadsheet', labelMobile: 'Spreadsheet', href: '#sheet' },
  { label: 'Rollout and support', labelMobile: 'Rollout', href: '#rollout' },
  { label: 'Results', href: '#results' },
  { label: 'Other industries', href: '#elsewhere' },
  { label: 'Technical detail', labelMobile: 'Technical', href: '#technical' },
];

export const overview = {
  num: '01',
  h2: 'The challenge and my role',
  body: [
    "A boutique PR agency tracked every media opportunity in one master spreadsheet: client, outlet, contact, owner, dates and next steps. Each client also had their own tracker showing the work on their account, split into Pipeline and Secured tabs. An existing Make.com workflow was supposed to keep the two aligned, but it wasn't working well, so staff were finding the right client file, copying rows across and checking they matched.",
    "I analyzed the spreadsheets and the workflow, replaced the Make.com setup with Google Apps Script running inside the agency's own Google Workspace, rolled it out to the live 2026 trackers, trained the team and supported it in daily use.",
  ],
  bodyMobile:
    "Every opportunity lived in one master sheet, and each client had their own tracker. A Make.com workflow meant to keep them aligned wasn't working well, so staff were copying rows by hand. I replaced it with Apps Script, rolled it out, trained the team and supported it in daily use.",
  cards: [
    {
      label: 'Two views',
      title: 'Internal and client-facing',
      text: "The team needs every client in one place. Each client should see only their own work, in the layout they're used to.",
      textMobile: 'All clients in one place for the team; each client sees only their own.',
    },
    {
      label: 'Long-lived records',
      title: 'An opportunity keeps changing for weeks',
      text: 'Next steps get updated again and again, and a pitch eventually moves from Pipeline to Secured. Appending a new row each time would bury the client in duplicates.',
      textMobile: 'Updated many times, then moved from Pipeline to Secured.',
    },
    {
      label: 'Shared spreadsheets',
      title: 'Many people, many files',
      text: 'About 20 staff working at once, client names typed slightly differently, headers moved, and the occasional client file the script had not been given edit access to.',
      textMobile: 'About 20 staff, varied client names, moved headers, missing access.',
    },
  ],
};

export const journey = {
  num: '02',
  h2: 'One opportunity, start to finish',
  intro:
    "This follows a single pitch from the agency's master pipeline to a client's tracker. It stays the same record the whole way. Names are invented.",
  label: 'One opportunity, start to finish',
  steps: [
    {
      label: '1 · Enter',
      title: 'A team member logs the pitch',
      rows: [
        { k: 'Record ID', v: '01482', mono: true },
        { k: 'Client', v: 'Fernwood Bakery' },
        { k: 'Destination', v: 'Pipeline' },
      ],
      rowsMobile: [
        { k: 'Record ID', v: '01482', mono: true },
        { k: 'Destination', v: 'Pipeline' },
      ],
      note: 'Dropdowns keep client, owner and type consistent. The record gets a permanent ID.',
      noteMobile: null,
    },
    {
      label: '2 · Publish',
      title: "It appears in the client's tracker",
      rows: [
        { k: 'Ready to Sync', v: 'Ticked' },
        { k: 'Lands in', v: 'Pipeline tab' },
        { k: 'Status', v: 'synced' },
      ],
      rowsMobile: [],
      note: "The team member decides when it's ready. The script finds the client's file, tab and columns.",
      noteMobile: "Ready to Sync is ticked; the script finds the client's file, tab and columns.",
      alertMobile: 'Can\'t finish? "Sync Failed", with the reason logged.',
    },
    {
      label: '3 · Update',
      title: 'Next steps change, in place',
      rows: [
        { k: 'Matched by', v: 'Record ID' },
        { k: 'Rows added', v: '0', mono: true },
        { k: 'Row updated', v: '1', mono: true },
      ],
      rowsMobile: [
        { k: 'Matched by', v: 'Record ID' },
        { k: 'Rows added', v: '0', mono: true },
      ],
      note: 'The same client row is updated each time, however many times the pitch moves on.',
      noteMobile: null,
    },
    {
      label: '4 · Secure',
      title: 'Coverage lands, the record moves',
      rows: [
        { k: 'Destination', v: 'Secured' },
        { k: 'Client sees', v: 'Secured tab' },
        { k: 'Pipeline copy', v: 'Moved, not duplicated' },
      ],
      rowsMobile: [
        { k: 'Destination', v: 'Secured' },
        { k: 'Client sees', v: 'Secured tab' },
      ],
      note: "The client's view follows the record's current status.",
      noteMobile: null,
    },
  ],
  callout: {
    title: "When a sync can't finish, it says why",
    body: "At step 2, a record that can't be published shows \"Sync Failed\" and the reason is logged with its row: an unrecognized client name, or a client file the script can't open. A data-entry mistake and a sharing problem need different fixes, so they're reported differently.",
  },
};

export const identity = {
  num: '03',
  h2: 'Why every record needed its own ID',
  body: [
    "The obvious way to match a master row to its client copy is by date, client, outlet and contact. Looking at the agency's real data showed that combination isn't unique: one editor can be working on two separate stories for the same client and outlet on the same day.",
    'Matching on those fields would update the wrong story or merge two into one. So each new master record gets a sequential Record ID, copied into the client tracker on its first sync. Every later update finds its row by that ID, whatever else has been edited.',
  ],
  bodyMobile:
    'Date, client, outlet and contact looked like a natural key, but the real data showed one editor working on two stories for the same client and outlet on the same day. A permanent Record ID on both copies keeps them apart.',
  sheet: {
    caption: 'Two different stories, identical matching fields',
    columns: [
      { label: 'Record ID', highlight: true },
      { label: 'Original Date' },
      { label: 'Client' },
      { label: 'Outlet' },
      { label: 'Contact' },
      { label: 'Next Steps' },
    ] satisfies SheetColumn[],
    rows: [
      {
        cells: [
          { kind: 'id', text: '01482' },
          '3/12/2026',
          'Fernwood Bakery',
          'City Table Weekly',
          'J. Rivera',
          { kind: 'wrap', text: 'Sent founder bio for spring openings round-up' },
        ],
      },
      {
        cells: [
          { kind: 'id', text: '01483' },
          '3/12/2026',
          'Fernwood Bakery',
          'City Table Weekly',
          'J. Rivera',
          { kind: 'wrap', text: 'Pitched sourdough class for weekend events list' },
        ],
      },
    ] satisfies SheetRow[],
    figcaption: 'Illustration with invented names. Only the Record ID tells these two apart.',
  },
  mobileCards: [
    {
      id: '01482',
      rows: [
        { k: 'Date · Client', v: '3/12 · Fernwood Bakery' },
        { k: 'Outlet · Contact', v: 'City Table Weekly · J. Rivera' },
        { k: 'Next steps', v: 'Sent founder bio for spring round-up' },
      ],
    },
    {
      id: '01483',
      rows: [
        { k: 'Date · Client', v: '3/12 · Fernwood Bakery' },
        { k: 'Outlet · Contact', v: 'City Table Weekly · J. Rivera' },
        { k: 'Next steps', v: 'Pitched sourdough class for events list' },
      ],
    },
  ],
  idLabel: 'Record ID',
  mobileNote: 'Illustration with invented names.',
};

export const sheet = {
  num: '04',
  h2: 'What the team works with',
  body: "The agency kept working in the spreadsheet it already knew. Three columns were added at the front: the Record ID, a Sync Status, and a Ready to Sync checkbox that publishes a record when it's ready. Dropdowns on the key fields keep entries consistent enough to route.",
  bodyMobile:
    'The agency kept the same spreadsheet, with a Record ID, a Sync Status and a Ready to Sync checkbox added at the front, and dropdowns on key fields.',
  mock: {
    caption: 'Master pipeline (illustration)',
    columns: [
      { label: 'Record ID', highlight: true },
      { label: 'Sync Status' },
      { label: 'Ready to Sync' },
      { label: 'Original Date' },
      { label: 'Client' },
      { label: 'Destination Tab' },
      { label: 'Owner' },
      { label: 'Type' },
      { label: 'Outlet' },
      { label: 'Next Steps' },
    ] satisfies SheetColumn[],
    rows: [
      {
        cells: [
          { kind: 'id', text: '01480' },
          { kind: 'chip', tone: 'ok', text: 'synced' },
          { kind: 'check', on: false },
          '3/11/2026',
          { kind: 'dd', text: 'Kestrel Bikes' },
          { kind: 'dd', text: 'Secured' },
          { kind: 'dd', text: 'Priya S.' },
          'Digital',
          'Ride Monthly',
          { kind: 'wrap', text: 'Story live; sent thank-you note' },
        ],
      },
      {
        cells: [
          { kind: 'id', text: '01482' },
          { kind: 'chip', tone: 'req', text: 'syncing required' },
          { kind: 'check', on: true },
          '3/12/2026',
          { kind: 'dd', text: 'Fernwood Bakery' },
          { kind: 'dd', text: 'Pipeline' },
          { kind: 'dd', text: 'Marcus L.' },
          'Print',
          'City Table Weekly',
          { kind: 'wrap', text: 'Editor asked for photos by Friday' },
        ],
      },
      {
        cells: [
          { kind: 'id', text: '01484' },
          { kind: 'chip', tone: 'fail', text: 'Sync Failed' },
          { kind: 'check', on: false },
          '3/12/2026',
          { kind: 'dd', text: 'Quill Sleep' },
          { kind: 'dd', text: 'Pipeline' },
          { kind: 'dd', text: 'Elena R.' },
          'Podcast',
          'Rested Hour',
          { kind: 'wrap', text: 'Booking recording date' },
        ],
      },
    ] satisfies SheetRow[],
    figcaption:
      "Illustration with invented names, using the real column structure and status values. The failed row's reason (here, a client file without edit access) goes to an automation log with its row number.",
  },
  statusRowsMobile: [
    { left: '01480 · Kestrel Bikes', tone: 'ok' as const, status: 'synced' },
    { left: '01482 · Fernwood Bakery', tone: 'req' as const, status: 'syncing required' },
    { left: '01484 · Quill Sleep', tone: 'fail' as const, status: 'Sync Failed' },
  ],
  kpi: {
    h3: 'The KPI summary for leadership',
    body: 'The same master pipeline feeds an executive summary: each staff member against each client, counting open opportunities.',
    bodyMobile:
      'Open opportunities by staff member and client over a rolling 30 days. Counts records, not updates, and leaves out anything secured.',
    list: [
      'Counts records, not updates. Editing next steps five times is still one opportunity.',
      'Excludes anything already secured.',
      'Uses a rolling window, 30 days by default, based on when the opportunity was first logged.',
    ],
    small:
      'Leadership can see who is carrying which accounts, and which clients have little in motion.',
    caption: 'Open opportunities, last 30 days (illustration)',
    staffLabel: 'Staff member',
    totalLabel: 'Total',
    columns: [
      { label: 'Fernwood' },
      { label: 'Kestrel' },
      { label: 'Quill' },
      { label: 'Morrow' },
      { label: 'Bluepine' },
      { label: 'Harbor' },
    ],
    rows: [
      {
        name: 'Priya S.',
        total: 14,
        cells: [
          [1, 1],
          [7, 4],
          [0, 0],
          [3, 2],
          [2, 1],
          [1, 1],
        ],
      },
      {
        name: 'Marcus L.',
        total: 11,
        cells: [
          [5, 3],
          [0, 0],
          [2, 1],
          [0, 0],
          [4, 2],
          [0, 0],
        ],
      },
      {
        name: 'Elena R.',
        total: 9,
        cells: [
          [0, 0],
          [1, 1],
          [6, 3],
          [2, 1],
          [0, 0],
          [0, 0],
        ],
      },
      {
        name: 'Sam T.',
        total: 6,
        cells: [
          [2, 1],
          [0, 0],
          [0, 0],
          [1, 1],
          [3, 2],
          [0, 0],
        ],
      },
      {
        name: 'Jordan P.',
        total: 4,
        cells: [
          [0, 0],
          [2, 1],
          [1, 1],
          [0, 0],
          [1, 1],
          [0, 0],
        ],
      },
    ] as Array<{ name: string; total: number; cells: Array<[number, 0 | 1 | 2 | 3 | 4]> }>,
    totals: { total: 44, cells: [8, 10, 9, 6, 10, 1] },
    figcaption:
      'A smaller version with invented staff, clients and counts. The real summary covers every staff member and about 30 clients; here, one client clearly needs attention.',
    mobile: {
      columns: [
        { label: 'Fern.', full: 'Fernwood' },
        { label: 'Kest.', full: 'Kestrel' },
        { label: 'Quill' },
        { label: 'Harb.', full: 'Harbor' },
      ],
      rows: [
        {
          name: 'Priya S.',
          total: 9,
          cells: [
            [1, 1],
            [7, 4],
            [0, 0],
            [1, 1],
          ],
        },
        {
          name: 'Marcus L.',
          total: 7,
          cells: [
            [5, 3],
            [0, 0],
            [2, 1],
            [0, 0],
          ],
        },
        {
          name: 'Elena R.',
          total: 7,
          cells: [
            [0, 0],
            [1, 1],
            [6, 3],
            [0, 0],
          ],
        },
      ] as Array<{ name: string; total: number; cells: Array<[number, 0 | 1 | 2 | 3 | 4]> }>,
      totals: { total: 23, cells: [6, 8, 8, 1] },
      note: 'Smaller illustration with invented staff, clients and counts.',
    },
  },
};

export const rollout = {
  num: '05',
  h2: 'Rollout and support',
  body: 'This was a migration of a workflow the agency was using every day, timed with the move to a new reporting year. The 2025 tabs stayed intact while new 2026 Pipeline and Secured tabs were prepared in every client tracker.',
  bodyMobile:
    'The live workflow was migrated at the start of a new reporting year, with the 2025 tabs kept intact.',
  steps: [
    {
      title: 'Build on copies',
      text: 'Development and testing on working copies, never the live files.',
      textMobile: 'Never the live files.',
    },
    {
      title: 'Prepare the 2026 trackers',
      text: 'New tabs with the expected columns, links in a Client Sheet Links tab, edit access checked.',
      textMobile: 'Tabs, links and edit access.',
    },
    {
      title: 'Go live',
      text: 'Connected to the live master pipeline, with missing links and access resolved with the agency.',
      textMobile: 'Connected to the live pipeline.',
    },
    {
      title: 'Train the team',
      text: 'A written user guide and live screen-shared demonstrations.',
      textMobile: 'User guide and live demos.',
      accent: true,
    },
    {
      title: 'Collect questions in one place',
      titleMobile: 'Collect questions',
      text: 'A shared questions log, so answers were written once and reused.',
      textMobile: 'One shared log, answers reused.',
    },
    {
      title: 'Support daily use',
      text: 'Diagnosing permissions, renamed headers and missing client mappings, then resyncing affected records.',
      textMobile: 'Permissions, headers, mappings, resyncs.',
    },
  ],
  example: {
    label: 'Example',
    text: 'One client tracker had a column labeled "Notes" instead of "Next Steps", so next steps weren\'t reaching that client. Fixing the header and resyncing existing records filled in what was missing. Reliable automation here depended on the script and the spreadsheets working together.',
  },
};

export const results = {
  num: '06',
  h2: 'What changed',
  stats: [
    {
      figure: '~5,900',
      text: 'records published through the system from January to July 2026',
      textMobile: 'records, Jan to Jul 2026',
    },
    {
      figure: '~30',
      text: 'client trackers kept in step with one master pipeline',
      textMobile: 'client trackers',
    },
    {
      figure: '~30 hrs',
      text: 'of manual copying and checking avoided each month, estimated',
      textMobile: 'a month saved, est.',
    },
  ],
  tableCaption: 'What changed: before and with the automation',
  columns: ['Area', 'Before', 'With the automation'],
  rows: [
    {
      area: 'Client updates',
      before: "Rows copied into each client's file by hand",
      after: 'Published from the master pipeline with one checkbox',
    },
    {
      area: 'Record identity',
      before: 'Guessed from date, client, outlet and contact',
      after: 'A permanent Record ID on both copies',
    },
    {
      area: 'Status changes',
      before: 'Moved between tabs manually',
      after: 'Follows the record from Pipeline to Secured',
    },
    {
      area: 'Failures',
      before: 'Noticed when a client asked',
      after: 'Flagged on the row, with the reason logged',
    },
    {
      area: 'Tooling',
      before: 'A separate Make.com workflow',
      after: "Runs inside the agency's own Google Workspace",
    },
  ],
  mobileLabels: { before: 'Before:', after: 'Now:' },
  mobileCards: [
    {
      title: 'Client updates',
      before: 'copied into each file by hand',
      after: 'published with one checkbox',
    },
    {
      title: 'Status changes',
      before: 'moved between tabs manually',
      after: 'follows the record to Secured',
    },
    {
      title: 'Failures',
      before: 'noticed when a client asked',
      after: 'flagged on the row, reason logged',
    },
  ],
  note: "The record count comes from the master pipeline. The time figure is an estimate, based on roughly 850 new records a month, plus their later updates, at a minute or two each to copy and check by hand; it wasn't measured in a formal time study. Further phases were proposed for heavier simultaneous use and a structured input form; the agency chose to stay with the current system.",
  noteMobile:
    'The time figure is an estimate from record volume, not a formal time study. Further phases were proposed; the agency chose to stay with the current system.',
};

export const elsewhere = {
  num: '07',
  h2: 'The same pattern, other industries',
  intro: [
    'Any firm that keeps ',
    { text: 'one internal list of work', strong: true },
    ' and owes ',
    { text: 'each client a view of their part', strong: true },
    ' runs into the same problem.',
  ] satisfies Segment[],
  introMobile:
    'The pattern is one internal list of work, with each client owed a view of their part.',
  cards: [
    {
      label: 'Accounting firms',
      labelMobile: 'Accounting',
      title: 'Client task and document lists',
      text: "One firm-wide tracker of returns and requests, with each client seeing what's outstanding for them.",
    },
    {
      label: 'Law firms',
      title: 'Matter status for clients',
      text: 'Internal matter tracking published as a client-facing status sheet, without exposing internal notes.',
    },
    {
      label: 'Marketing agencies',
      labelMobile: 'Marketing',
      title: 'Campaign and content trackers',
      text: "A master content calendar feeding each client's approval sheet.",
    },
    {
      label: 'Staffing agencies',
      labelMobile: 'Staffing',
      title: 'Candidate pipelines by employer',
      text: 'One recruiting pipeline, with each employer seeing only their own candidates and stages.',
    },
    {
      label: 'Property management',
      labelMobile: 'Property',
      title: 'Owner maintenance reports',
      text: "Work orders tracked centrally, with each owner's open and completed jobs in their own sheet.",
    },
    {
      label: 'Consultancies',
      labelMobile: 'Consulting',
      title: 'Deliverable trackers',
      text: 'One project register, with client-specific status pages that stay current.',
    },
  ],
};

export const technical = {
  num: '08',
  h2: 'Technical detail',
  chips: ['Google Apps Script', 'Google Sheets', 'Data validation', 'Caching', 'Replaced Make.com'],
  chipsMobile: ['Google Apps Script', 'Google Sheets', 'Data validation', 'Caching'],
  accordions: [
    {
      title: 'How a record is synced',
      text: "Read the master row and check its required fields. Find the client's spreadsheet through the links table. Find the destination tab and its columns by header name. Look for an existing copy by Record ID. Then create, update or move the client row, and record the outcome in the Sync Status column, or log the failure with its row and reason.",
    },
    {
      title: 'Matching client names',
      text: 'The same client could be labeled slightly differently in the pipeline and the links table. Names are normalized, special characters handled and close matches accepted, so routing tolerates small inconsistencies while the links table stays the single place to configure destinations.',
    },
    {
      title: 'Surviving everyday spreadsheet edits',
      text: 'Client trackers are maintained by people, so the script looks for the header row within the first 25 rows rather than assuming a fixed position. Inserting a row above the table no longer breaks the sync.',
    },
    {
      title: 'Performance and "ghost rows"',
      text: 'After launch, caching and optimizations reduced delays. Empty rows had been showing "syncing required" with nothing to send; that was fixed so the status column only flags real work. Very heavy simultaneous use remains subject to Google Sheets and Apps Script limits.',
    },
    {
      title: 'Adding a new client',
      text: "A documented checklist: add the client to the dropdown options, add their spreadsheet link to the links table, prepare the year's Pipeline and Secured tabs with the expected column names, and confirm the right accounts have edit access. No code changes needed.",
    },
  ],
  mobileAccordions: [
    {
      title: 'How a record is synced',
      text: "Check required fields, find the client's file through the links table, find the tab and columns by header name, look for an existing copy by Record ID, then create, update or move it and record the outcome.",
    },
    {
      title: 'Matching client names',
      text: "Names are normalized and close matches accepted, so small spelling differences don't stop a record from reaching its client.",
    },
    {
      title: 'Surviving spreadsheet edits',
      text: "The script finds the header row within the first 25 rows, so inserting rows above a table doesn't break it.",
    },
    {
      title: 'Performance and ghost rows',
      text: 'Caching reduced delays, and empty rows no longer show "syncing required". Heavy simultaneous use remains subject to Google Sheets limits.',
    },
  ],
};

export const next = {
  h2: 'Copying the same rows into several spreadsheets?',
  body: 'Tell me where your team keeps the master list and who needs to see which part of it. We can discuss keeping it in the tools you already use.',
  bodyMobile: 'Tell me where your master list lives and who needs to see which part.',
};
