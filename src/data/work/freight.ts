/**
 * Freight case study copy, transcribed verbatim from
 * _handoff/content/work/freight-rate-sheet-generator.md and
 * _handoff/content/mobile/freight-mobile.md (`...Mobile`, below 768 px).
 * All companies, customers and rates are fictional demo data. The engine is rule-based.
 */
import type { Pair, Segment } from '../types';

export const meta = {
  title: 'Freight Rate Sheet Automation | Regassa Automations',
  description:
    'See how Regassa Automations built a custom freight application for route matching, customer pricing and PDF rate sheets using Google Sheets and Cloud Run.',
  ogTitle: 'Automated Freight Rate Sheet Generator',
  ogDescription:
    'A custom freight workflow connecting spreadsheet data, customer routes, pricing exceptions and PDF generation. Explore the anonymized case study.',
  ogImage: '/og/og-freight.png',
  ogImageAlt: 'Automated Freight Rate Sheet Generator portfolio project by Regassa Automations',
};

export const hero = {
  crumb: 'Freight Rate Sheet Generator',
  tags: ['Workflow automation', 'Custom web application', 'Document generation'],
  tagsMobile: ['Workflow automation', 'Document generation'],
  h1: 'Automated Freight Rate Sheet Generator',
  lede: "A custom web application that turns spreadsheet rate data, customer routes and pricing rules into branded, customer-ready rate sheets, with a person reviewing every case the rules can't settle.",
  ledeMobile:
    "A custom web application that turns spreadsheet rate data, customer routes and pricing rules into branded rate sheets, with a person reviewing every case the rules can't settle.",
  secondary: {
    label: 'Download a sample rate sheet',
    suffix: 'PDF',
    href: '/downloads/freight-rate-sheet-sample-demo.pdf',
  },
  figure: {
    alt: 'First page of a generated rate sheet for a fictional customer, showing validity dates, an FCL table with 20FT, 40HQ and 45HQ prices, and an LCL table with rates per CBM and minimum volumes.',
    altMobile:
      'First page of a generated rate sheet for a fictional customer, with validity dates and FCL and LCL rate tables.',
    caption: "A rate sheet produced by the application's portfolio demo.",
    captionMobile: 'A rate sheet produced by the portfolio demo.',
  },
  facts: [
    { k: 'Industry', v: 'Freight forwarding and logistics' },
    { k: 'Client', v: 'Freight forwarder; identity confidential' },
    { k: 'Built with', v: 'Node.js, Google Cloud Run, Google Sheets and Drive' },
    {
      k: 'About the demo',
      v: 'A real client project, shown through a separate demo. Every company, customer and rate on this page is fictional.',
    },
  ] satisfies Pair[],
  factsNoteMobile:
    'A real client project for a freight forwarder, shown through a separate demo. Every company, customer and rate on this page is fictional.',
};

export const jumps = [
  { label: 'Overview', labelMobile: 'Challenge', href: '#overview' },
  { label: 'Walkthrough video', labelMobile: 'Video', href: '#walkthrough' },
  { label: 'One route, start to finish', labelMobile: 'One route', href: '#journey' },
  { label: 'The application', labelMobile: 'The app', href: '#application' },
  { label: 'Results', href: '#results' },
  { label: 'Other industries', href: '#elsewhere' },
  { label: 'Technical detail', labelMobile: 'Technical', href: '#technical' },
];

export const overview = {
  num: '01',
  h2: 'The challenge and my role',
  body: [
    "A freight forwarder prepared customer rate sheets from recurring Excel rate workbooks, customer route lists and pricing rules spread across files. Each sheet had to bring together the available rates, the routes a customer needs, the container sizes or service required and that customer's commercial terms, and those inputs all change on different schedules.",
    'I analyzed the workbooks and their pricing logic, structured the customer and route data, and built the application end to end: matching and pricing services, browser workflows, Google Workspace integrations, PDF output and cloud deployment.',
  ],
  bodyMobile:
    'Rate sheets were built from Excel rate workbooks, customer route lists and pricing rules across files, all changing on different schedules. I analyzed the logic, structured the data and built the application end to end.',
  cards: [
    {
      label: 'Locations',
      title: "Names aren't direct matches",
      text: 'Ports have aliases and destinations can depend on routing rules, so a simple lookup can return a plausible but wrong lane.',
      textMobile: 'Ports have aliases; destinations can depend on routing rules.',
    },
    {
      label: 'Equipment',
      title: 'One lane, several container sizes',
      text: 'A lane can suit one container size and not another. Smaller shipments are priced per cubic meter with minimum volumes.',
      textMobile: 'A lane can suit one size and not another.',
    },
    {
      label: 'Exceptions',
      title: 'Some decisions need a person',
      text: 'Spot offers need review, and a rate refresh must never undo a deliberate manual choice or a saved pricing exception.',
      textMobile: 'A rate refresh must never undo a manual choice.',
    },
  ],
};

export const walkthrough = {
  src: '/video/freight-walkthrough.mp4',
  captions: '/video/freight-walkthrough-captions.vtt',
  ariaLabel:
    'Walkthrough video: Automated Freight Rate Sheet Generator, 2 minutes 42 seconds, with captions',
  ariaLabelMobile: 'Walkthrough video, 2 minutes 42 seconds, with captions',
  monoLabel: 'Walkthrough',
  monoLabelMobile: 'Walkthrough · 2:42',
  h2: "See one customer's rate sheet come together",
  body: 'Customer routes, carrier-rate matching and a pricing exception, followed through to a finished PDF. Recorded in the separate demo with email delivery turned off.',
  meta: {
    duration: '2:42',
    captions: 'Captions on by default',
    transcriptLink: 'Read the transcript',
  },
  chaptersSummaryMobile: '8 chapters',
  transcriptSummary: 'Transcript',
  chapters: [
    { seconds: 0, label: '0:00', name: 'Project and finished output' },
    { seconds: 16, label: '0:16', name: 'Source data and requirements' },
    { seconds: 32, label: '0:32', name: 'Customer routes and matching' },
    { seconds: 57, label: '0:57', name: 'Route pricing exception' },
    { seconds: 83, label: '1:23', name: 'Customer document preview' },
    { seconds: 103, label: '1:43', name: 'PDF generation and saved output' },
    { seconds: 128, label: '2:08', name: 'Reviewing previous output' },
    { seconds: 141, label: '2:21', name: 'Architecture and contribution' },
  ],
  transcript: [
    {
      time: '0:00',
      title: 'Project and finished output.',
      text: "Regassa Automations built this application for a freight forwarder. It turns customer routes, carrier rates and pricing rules into branded rate sheets like this one. This is a separate demo, so every company, customer and price you'll see is fictional.",
    },
    {
      time: '0:16',
      title: 'Source data and requirements.',
      text: 'The data lived in separate spreadsheets: customer routes, carrier rates that change every cycle, and pricing rules. The same lane can be written differently in each, so a correct quote needs service, routing, equipment and customer terms to agree.',
    },
    {
      time: '0:32',
      title: 'Customer routes and matching.',
      text: 'Each customer keeps a saved route list. Full container loads, or FCL, are quoted by container size, so the requested sizes stay together. Less than container loads, or LCL, share a container and are priced per cubic meter. The matching engine uses explicit location and routing rules to find the right carrier lane, shows why it chose it, and keeps any lane an operator picked by hand.',
    },
    {
      time: '0:57',
      title: 'Route pricing exception.',
      text: "Matching and pricing are separate decisions. This route follows the customer's standard pricing. Here, the operator adds seven dollars and fifty cents per cubic meter on top of it. The server calculates the new price before anything is saved, and the exception stays with this route when its carrier match is refreshed.",
    },
    {
      time: '1:23',
      title: 'Customer document preview.',
      text: 'In the generator, the operator sets the validity dates and selects the customer. The preview assembles the routes, calculated prices, minimum volumes, notes and terms, including the exception just saved. Nothing has been created yet; this is a review step. Email delivery is switched off in this demo.',
    },
    {
      time: '1:43',
      title: 'PDF generation and saved output.',
      text: "Generating uses the same pricing as the preview and saves the PDF to Google Drive. The screen shows each stage and reports the result. Here is the saved document, with the adjusted LCL rate and the customer's notes and terms. The internal reason for the price change stays out of the customer's copy.",
    },
    {
      time: '2:08',
      title: 'Reviewing previous output.',
      text: 'Every run is saved. An operator can return to a previous batch, check its files and open the PDF without regenerating anything, so there is a record of what was produced for each customer.',
    },
    {
      time: '2:21',
      title: 'Architecture and contribution.',
      text: "Regassa Automations designed the data model, the matching and pricing logic, the Google Workspace integration, the web application and the cloud deployment. If your business runs on spreadsheets, customer-specific rules and recurring documents, let's talk about building a workflow like this for yours.",
    },
  ],
};

export const journey = {
  num: '02',
  h2: 'One route, start to finish',
  intro:
    'How a single customer route becomes a priced line on a rate sheet. The route shown is taken from the sample rate sheet.',
  introMobile: 'A route from the sample rate sheet, followed through the application.',
  label: 'One route, start to finish',
  steps: [
    {
      label: '1 · Request',
      title: 'The customer needs a route',
      rows: [
        { k: 'From', v: 'Laem Chabang' },
        { k: 'To', v: 'Halifax' },
        { k: 'Service', v: 'Terminal' },
        { k: 'Sizes', v: '20FT, 40HQ' },
      ],
      rowsMobile: [
        { k: 'Route', v: 'Laem Chabang to Halifax' },
        { k: 'Sizes', v: '20FT, 40HQ' },
      ],
      note: "Saved once on the customer's route list and reused every cycle.",
      noteMobile: null,
    },
    {
      label: '2 · Match',
      title: 'A source lane is chosen',
      rows: [
        { k: 'Routing', v: 'Via Vancouver' },
        { k: 'Carrier', v: 'Carrier Atlas' },
        { k: 'Reason', v: 'Recorded' },
      ],
      rowsMobile: [
        { k: 'Routing', v: 'Via Vancouver' },
        { k: 'Carrier', v: 'Carrier Atlas' },
      ],
      note: 'Rules handle aliases, routing and container fit. The choice is stored with its explanation.',
      noteMobile: null,
      alertMobile: 'No clear match? It stops with a reason for a person to decide.',
    },
    {
      label: '3 · Price',
      title: 'Customer terms are applied',
      rows: [
        { k: 'Profile', v: 'Customer pricing' },
        { k: 'Exception', v: 'If one is saved' },
        { k: 'Calculated by', v: 'Server' },
      ],
      rowsMobile: [],
      note: 'A saved route exception stays with the route through future rate refreshes.',
      noteMobile: 'Pricing profile plus any saved route exception, calculated on the server.',
    },
    {
      label: '4 · Document',
      title: 'It lands on the rate sheet',
      rows: [
        { k: '20FT', v: '$3,099' },
        { k: '40HQ', v: '$4,251' },
        { k: '45HQ', v: 'Not requested', muted: true },
      ],
      rowsMobile: [
        { k: '20FT', v: '$3,099' },
        { k: '40HQ', v: '$4,251' },
      ],
      note: 'Previewed first, then rendered to PDF and saved to Drive.',
      noteMobile: null,
    },
  ],
  callout: {
    title: 'When no lane fits, a person decides',
    body: 'At step 2, a route with no suitable or no clear match is never priced from a guess. It shows the reason, and the operator can choose a lane manually. That choice is protected from later automatic rematches.',
  },
};

export const application = {
  num: '03',
  h2: 'The application',
  body: [
    "Operators work in dedicated workspaces for clients, routes, rate sheet generation, notes and audit history. Each customer's source rates, pricing and document content are assigned separately, so changing one never quietly changes another.",
    "A route can follow the customer's standard pricing, add an adjustment on top, or use its own formula on the matched rate. Previews and PDFs use the same server calculation, so what the operator reviews is what the customer receives.",
  ],
  bodyMobile:
    "Workspaces for clients, routes, generation, notes and audit history. Previews and PDFs share one calculation, so what's reviewed is what's sent.",
  galleryLabel: 'Application screenshots',
  gallery: [
    {
      key: 'generator',
      title: 'Rate sheet generator',
      caption:
        'Set validity dates, choose customers and generate PDFs. Email delivery is turned off in the demo.',
      alt: 'Rate Sheet Generator with validity dates of November 16 to 30, 2026, one fictional customer selected, and a batch summary showing 6 routes to process.',
    },
    {
      key: 'routes',
      title: 'Customer routes and match status',
      caption:
        'Every route shows whether it matched a source lane. The unmatched route waits for a person to decide.',
      alt: 'Client Route Manager table for a fictional customer listing six FCL and LCL routes with origin, destination, routing, container sizes, carrier and match status, including one unmatched route.',
    },
    {
      key: 'exception',
      title: 'Route pricing exception',
      caption:
        'The Laem Chabang to Halifax route from the sample sheet with a $150 adjustment, calculated by the server before anything is saved.',
      alt: 'Route pricing editor with Adjust client price selected and a $150 per container adjustment; the price preview changes 20FT from $3,099 to $3,249 and 40HC from $4,251 to $4,401.',
    },
    {
      key: 'sheet',
      title: 'Finished rate sheet',
      caption:
        'Validity dates, container prices by size and per-cubic-meter rates with minimum volumes.',
      alt: 'Generated rate sheet with validity dates, an FCL equipment price table and an LCL table with rates per CBM and minimum volumes.',
    },
  ],
  dialogTag: 'Fictional demo data',
  mobileFigures: [
    {
      key: 'exception',
      alt: 'Route pricing editor with a $150 adjustment; the preview changes 20FT from $3,099 to $3,249 and 40HC from $4,251 to $4,401.',
      title: 'Route pricing exception.',
      caption: 'Previewed by the server before saving.',
    },
    {
      key: 'routesMobile',
      alt: 'Client Route Manager on a phone, showing the selected test customer, its assigned profiles and FCL route match counts.',
      title: 'Client Route Manager on a phone.',
      caption: 'Match status for every route.',
    },
    {
      key: 'generator',
      alt: 'Rate Sheet Generator with validity dates and one fictional customer selected.',
      title: 'Rate sheet generator.',
      caption: 'Dates, customers and PDFs in one place.',
    },
  ],
  cycle: {
    title: 'How a rate cycle runs',
    sub: 'From new source rates to saved customer documents.',
    steps: [
      {
        title: 'Refresh and rematch',
        text: 'Load new source rates and rematch the relevant customer routes.',
        textMobile: 'Load new rates, rematch routes.',
      },
      {
        title: 'Review exceptions',
        text: 'Resolve unmatched or ambiguous routes; manual choices are kept.',
        textMobile: 'Resolve unmatched routes.',
        accent: true,
      },
      {
        title: 'Apply pricing',
        text: 'Customer terms and saved route exceptions.',
        textMobile: 'Customer terms and exceptions.',
      },
      {
        title: 'Set dates and preview',
        text: 'A read-only preview of each document. Nothing is saved or sent yet.',
        textMobile: 'Nothing saved or sent yet.',
      },
      {
        title: 'Generate PDFs',
        text: 'Batch generation with progress and an outcome report.',
        textMobile: 'With a batch outcome report.',
      },
      {
        title: 'Review saved output',
        text: 'Earlier batches stay available in Drive and in the app.',
        textMobile: 'Past batches stay available.',
      },
    ],
  },
};

export const results = {
  num: '04',
  h2: 'What changed',
  tableCaption: 'What changed: before and with the application',
  columns: ['Area', 'Before', 'With the application'] as [string, string, string],
  rows: [
    {
      area: 'Customer routes',
      before: 'Routes and preferences in workbook tabs',
      after: 'Saved route records with assigned profiles',
    },
    {
      area: 'Rate interpretation',
      before: 'Rate workbooks plus separate reference data',
      after: 'Rule-based matching with an explanation for every result',
    },
    {
      area: 'Pricing',
      before: 'Workbook formulas and one-off adjustments',
      after: 'Shared pricing profiles and route exceptions that persist',
    },
    {
      area: 'Exceptions',
      before: 'Interpreted case by case',
      after: 'Flagged with a reason; manual choices are protected',
    },
    {
      area: 'Documents',
      before: 'Assembled into the final sheet',
      after: 'Preview, PDF generation and a searchable archive',
    },
  ],
  mobileLabels: { before: 'Before:', after: 'Now:' },
  mobileCards: [
    {
      title: 'Pricing',
      before: 'workbook formulas and one-off adjustments',
      after: 'shared profiles and exceptions that persist',
    },
    {
      title: 'Exceptions',
      before: 'interpreted case by case',
      after: 'flagged with a reason; manual choices protected',
    },
    {
      title: 'Documents',
      before: 'assembled into the final sheet',
      after: 'preview, PDF generation and an archive',
    },
  ],
  operator: {
    title: 'What the operator gets',
    items: [
      'The same price in the preview and the PDF',
      'Customer exceptions that survive rate refreshes',
      'A clear list of routes that need a decision',
      'Every past rate sheet, one click away',
    ],
  },
  sample: {
    title: 'Sample rate sheet',
    text: 'Two pages: rates for both shipment types, notes and terms.',
    textMobilePrefix: 'Two pages · PDF',
    linkLabel: 'Download PDF',
  },
  note: 'These are delivered capabilities, verified in controlled demo runs and automated tests. Time savings would need to be measured in routine use, so none are claimed here.',
  noteMobile:
    'Verified in demo runs and automated tests. No time savings are claimed until measured in routine use.',
};

export const elsewhere = {
  num: '05',
  h2: 'The same pattern, other industries',
  intro: [
    'The hard part was never freight. It was ',
    { text: 'spreadsheet data', strong: true },
    ', ',
    { text: 'customer-specific rules', strong: true },
    ' and ',
    { text: 'a recurring document', strong: true },
    ' that has to be right every time. That combination turns up in many businesses.',
  ] satisfies Segment[],
  introMobile:
    'Spreadsheet data, customer-specific rules and a recurring document that has to be right every time.',
  cards: [
    {
      label: 'Accounting firms',
      labelMobile: 'Accounting',
      title: 'Client reports and engagement letters',
      text: 'Figures from practice software and spreadsheets turned into the same monthly report for every client.',
    },
    {
      label: 'Insurance agencies',
      labelMobile: 'Insurance',
      title: 'Renewal and quote summaries',
      text: 'Carrier quotes and client details assembled once into a clear proposal, instead of re-keyed three times.',
    },
    {
      label: 'Law firms',
      title: 'Engagement letters and fee estimates',
      text: 'Intake details, matter type and billing rules assembled into consistent letters and estimates.',
    },
    {
      label: 'Distribution',
      title: 'Customer price lists',
      text: 'A master catalog plus account-specific discounts, issued as a branded list each season.',
    },
    {
      label: 'Agencies and consultancies',
      labelMobile: 'Agencies',
      title: 'Proposals and statements of work',
      text: 'Standard rates and client terms combined into proposals that match every time.',
    },
    {
      label: 'Trades and manufacturing',
      labelMobile: 'Trades',
      title: 'Quotes from cost sheets',
      text: "Material and labor costs, markups by customer type and a quote that's ready to send.",
    },
  ],
};

export const technical = {
  num: '06',
  h2: 'Technical detail',
  chips: [
    'JavaScript',
    'Node.js',
    'Express',
    'Google Cloud Run',
    'Sheets and Drive APIs',
    'Google Docs',
    'Puppeteer',
    'Chromium',
  ],
  chipsMobile: [
    'Node.js',
    'Express',
    'Cloud Run',
    'Sheets and Drive APIs',
    'Google Docs',
    'Puppeteer',
  ],
  diagramCaption:
    'Simplified runtime view. Matching, pricing and rendering run inside the application; Sheets and Drive provide persistent storage.',
  decisions: [
    {
      lead: 'Matching kept apart from pricing.',
      text: " Choosing a source lane is a different decision from a customer's commercial terms, so saved pricing instructions survive a rematch.",
    },
    {
      lead: 'One calculation for preview and PDF.',
      text: ' The browser sends pricing instructions, never a final price; the server calculates both outputs.',
    },
    {
      lead: 'Grouped edits saved together.',
      text: ' One container route can span several equipment rows. Changes are validated and written together, and an uncertain save is checked rather than resent.',
    },
  ],
  worked: {
    intro:
      'In a controlled demo run, these route exceptions were saved, reopened, kept through a rematch and matched in both preview and PDF. Resetting them restored the inherited prices. Demonstration values only.',
    caption: 'Worked pricing example (demonstration values)',
    columns: ['Service', 'Inherited', 'Change', 'Result'],
    rows: [
      ['FCL 20FT', '$2,350', '+$125', '$2,475'],
      ['FCL 40HC', '$3,270', '+$175', '$3,445'],
      ['FCL 45FT', '$4,140', '+$225', '$4,365'],
      ['LCL Door, per CBM', '$135.00', '+$7.50', '$142.50'],
    ],
  },
  accordions: [
    {
      title: 'Matching',
      text: 'The engine normalizes origin, destination and routing using configured aliases, equivalences and coverage rules. Full container load (FCL) evaluation considers the eligible source pool, equipment viability and carrier preferences; less than container load (LCL) has separate matching and fallback behavior. Matching and pricing are deterministic, rule-based logic.',
    },
    {
      title: 'Pricing modes',
      text: 'Customer profiles supply shared defaults. A route can use them, adjust the customer result, or apply a replacement formula to the matched base. FCL exceptions can target selected container sizes; LCL uses a price per cubic meter. Spot and unavailable values keep their special handling instead of becoming zero-dollar quotes.',
    },
    {
      title: 'Saving and recovery',
      text: 'The browser sends pricing instructions, equipment scope, a configuration version and a server preview fingerprint. Route changes, pricing instructions and the committed operation result are written together within one workbook. An operation ID supports status checks, so a retried save never becomes a second change.',
    },
    {
      title: 'Integration and access',
      text: 'The demo is separated from client resources and uses fictional data. Startup checks require an explicit resource allowlist and disabled outbound email. Identity-Aware Proxy and IAM provide the access boundary, and saved PDFs are served through application endpoints that check the configured output folder.',
    },
  ],
  accordionTitles: {
    decisions: 'Engineering decisions that mattered',
    worked: 'A worked pricing example',
  },
  mobileAccordions: [
    {
      title: 'Engineering decisions',
      body: [
        'Matching is kept apart from pricing, so exceptions survive rematches. Preview and PDF share one server calculation. Grouped route edits are saved together, and uncertain saves are checked rather than resent.',
      ] satisfies Segment[],
    },
    {
      title: 'A worked pricing example',
      body: [
        'Demo route exceptions: FCL 20FT ',
        { text: '$2,350', mono: true },
        ' to ',
        { text: '$2,475', mono: true },
        '; 40HC ',
        { text: '$3,270', mono: true },
        ' to ',
        { text: '$3,445', mono: true },
        '; 45FT ',
        { text: '$4,140', mono: true },
        ' to ',
        { text: '$4,365', mono: true },
        '; LCL ',
        { text: '$135.00', mono: true },
        ' to ',
        { text: '$142.50', mono: true },
        ' per CBM. Saved, kept through a rematch, matched in preview and PDF.',
      ] satisfies Segment[],
    },
    {
      title: 'Matching and pricing',
      body: [
        'Aliases, equivalences and coverage rules normalize each route. Profiles supply defaults; routes can adjust or replace them. Spot and unavailable values never become zero-dollar quotes. Deterministic, rule-based logic.',
      ] satisfies Segment[],
    },
    {
      title: 'Architecture and access',
      body: [
        'A Node.js app on Cloud Run reads and writes Google Sheets, stores PDFs in Drive and reads notes from Docs. The demo is isolated from client resources, email is disabled, and access runs through Identity-Aware Proxy and IAM.',
      ] satisfies Segment[],
    },
  ],
};

export const next = {
  h2: 'Have a workflow that needs to work together?',
  body: 'Tell me where information enters your process, which rules need to apply, and what your team needs at the end. We can discuss an automation that fits the way your business operates.',
  bodyMobile:
    'Tell me where information enters your process, which rules apply, and what your team needs at the end.',
};
