/**
 * GridBloom case study copy, transcribed verbatim from _handoff/content/work/gridbloom.md and
 * _handoff/content/mobile/gridbloom-mobile.md (`...Mobile`, below 768 px).
 * Independent project on real public data. The AI lead line is approved wording: never edit it.
 */
import type { Pair, Segment } from '../types';

export const meta = {
  title: 'GridBloom: Electricity Data You Can Check | Regassa Automations',
  description:
    'An independent Regassa Automations project: a data pipeline, dashboard and weekly report on public U.S. grid data, with an AI briefing whose every figure is checked.',
  ogTitle: 'GridBloom: electricity data you can check',
  ogDescription:
    "A data pipeline, dashboard and weekly report that withhold figures the data can't support, with an AI briefing whose every number is checked.",
  ogImage: '/og/og-gridbloom.png',
  ogImageAlt: 'GridBloom independent project by Regassa Automations',
};

export const hero = {
  crumb: 'GridBloom',
  tags: ['Data pipeline', 'Reporting and AI-assisted workflow'],
  tagsMobile: ['Data pipeline', 'AI-assisted reporting'],
  h1: 'GridBloom: electricity data you can check',
  lede: "A data pipeline, dashboard and weekly report built on public U.S. grid data. It checks every figure before showing it, says plainly when the data can't support a number, and adds an AI briefing whose every figure is verified against its sources.",
  ledeMobile:
    "A data pipeline, dashboard and weekly report on public U.S. grid data. It checks every figure, says plainly when the data can't support a number, and verifies every figure in its AI briefing.",
  secondary: { label: 'See how the AI is checked', href: '#ai' },
  figure: {
    alt: 'GridBloom dashboard for PJM, September 23 to October 22, 2026: renewable share of reported net generation 9.0%, average demand 86,645 MW, reported net generation 62,989 GWh, a daily demand chart and an hourly generation-by-fuel chart.',
    altMobile:
      'GridBloom dashboard for PJM: renewable share 9.0%, average demand 86,645 MW, net generation 62,989 GWh, with daily demand and hourly generation charts.',
    caption: 'PJM, September 23 to October 22, 2026: thirty days of hourly fuel data.',
    captionMobile: 'PJM, thirty days of hourly fuel data.',
  },
  facts: [
    {
      k: 'Project type',
      v: 'Independent demonstration of the kind of work I do for clients whose projects stay private',
    },
    { k: 'Data', v: 'Public EIA hourly grid data for ISO New England, NYISO and PJM' },
    { k: 'Built with', v: 'Python, SQLite, FastAPI, React and the OpenAI API' },
    {
      k: 'About the data',
      v: 'Real historical observations, not live. No client data is involved.',
    },
  ] satisfies Pair[],
  factsNoteMobile:
    'An independent demonstration of the kind of work I do for clients whose projects stay private, built on public EIA data for ISO New England, NYISO and PJM. Real historical observations, not live, and no client data.',
};

export const jumps = [
  { label: 'Overview', labelMobile: 'Why', href: '#overview' },
  { label: 'From source to number', labelMobile: 'Source to number', href: '#journey' },
  { label: 'The dashboard', labelMobile: 'Dashboard', href: '#dashboard' },
  { label: 'Checked AI briefing', labelMobile: 'AI briefing', href: '#ai' },
  { label: 'Weekly report', labelMobile: 'Report', href: '#report' },
  { label: 'Results', href: '#results' },
  { label: 'Other industries', href: '#elsewhere' },
  { label: 'Technical detail', labelMobile: 'Technical', href: '#technical' },
];

export const overview = {
  num: '01',
  h2: 'Why I built it',
  body: [
    'I built GridBloom on public data to show the kind of pipeline and reporting work I do for clients whose projects stay private. Using public electricity data means every part of it can be shown in full.',
    "Most reporting problems aren't about charts. They're about inputs that arrive late, in different shapes, with gaps nobody mentions, and a summary someone has to trust. GridBloom covers that work end to end: importing uneven source data, deciding when a figure is trustworthy, and adding AI where it helps.",
    "The U.S. Energy Information Administration publishes hourly demand and generation by fuel for every grid operator. It's rich data, and it's uneven in exactly the ways business data is.",
  ],
  bodyMobile: [
    'I built GridBloom on public data to show the kind of pipeline and reporting work I do for clients whose projects stay private.',
    'Most reporting problems are about inputs, not charts. GridBloom shows the whole job: importing uneven data, deciding when a figure is trustworthy, and adding AI where it helps.',
  ],
  cards: [
    {
      label: 'Timing',
      title: "Hours and days don't line up",
      text: 'Each value is labeled with the end of its hour in UTC. Daily totals have to follow New York calendar days, including 23- and 25-hour days when the clocks change.',
      textMobile: 'UTC hour labels, New York calendar days and 23- or 25-hour clock-change days.',
    },
    {
      label: 'Coverage',
      title: 'Some data is missing or implausible',
      text: 'NYISO reports solar as zero in every hour, daylight included. ISO New England petroleum is missing on whole days. A dashboard that just adds up what it receives shows confident numbers that are wrong.',
      textMobile:
        'NYISO solar reads zero around the clock; ISO New England petroleum is missing on whole days.',
    },
    {
      label: 'AI',
      title: 'A summary must stay traceable',
      text: 'An AI summary is only useful if it keeps those qualifications and every figure in it can be traced back to the data.',
      textMobile: 'Every figure in it has to lead back to the data.',
    },
  ],
};

export const journey = {
  num: '02',
  h2: 'From source data to a published number',
  intro:
    'Every figure on the dashboard passes through the same four stages. The values in step 4 are from the PJM view above.',
  label: 'From source data to a published number',
  steps: [
    {
      label: '1 · Import',
      title: 'Load it with its history',
      rows: [
        { k: 'Observations', v: '124,055', mono: true },
        { k: 'Import runs', v: '63', mono: true },
        { k: 'Each value keeps', v: 'Source, unit, hash' },
      ],
      rowsMobile: [
        { k: 'Observations', v: '124,055', mono: true },
        { k: 'Import runs', v: '63', mono: true },
      ],
      note: 'An API week and a six-month bulk extract. Re-importing unchanged data changes nothing.',
      noteMobile: null,
    },
    {
      label: '2 · Audit',
      title: 'Measure the gaps first',
      rows: [
        { k: 'Overlap checked', v: 'API vs bulk' },
        { k: 'Values compared', v: '4,872', mono: true },
        { k: 'Mismatches', v: '0', mono: true },
      ],
      rowsMobile: [
        { k: 'API vs bulk', v: '4,872 compared', mono: true },
        { k: 'Mismatches', v: '0', mono: true },
      ],
      note: 'A history audit records missing hours, fuel categories and timing before any metric is built.',
      noteMobile: null,
    },
    {
      label: '3 · Policy',
      title: 'Apply written rules',
      rows: [
        { k: 'Rules kept in', v: 'Versioned file' },
        { k: 'Fuels vs total', v: 'Flag over 1%' },
        { k: 'Too little data', v: 'Withheld' },
      ],
      rowsMobile: [],
      note: 'When a share may be published is a documented decision, not a hidden code branch.',
      noteMobile: 'A versioned policy decides when a share may be published.',
      alertMobile: 'Not enough data? The figure is withheld with the reason.',
    },
    {
      label: '4 · Dashboard',
      title: 'Show it, with its limits',
      rows: [
        { k: 'Renewable share', v: '9.0%' },
        { k: 'Avg demand', v: '86,645 MW' },
        { k: 'Net generation', v: '62,989 GWh' },
      ],
      rowsMobile: [
        { k: 'Renewable share', v: '9.0%' },
        { k: 'Avg demand', v: '86,645 MW' },
      ],
      note: 'Served read-only. Every chart has a table view and every gap stays visible.',
      noteMobile: null,
    },
  ],
  callout: {
    title: "When the data can't support a number, nothing is estimated",
    body: 'At step 3, NYISO\'s renewable share is withheld because its solar is reported as zero around the clock. The dashboard shows "Insufficient coverage" and the reason, instead of a partial percentage that looks precise.',
  },
};

export const dashboard = {
  num: '03',
  h2: 'The dashboard',
  body: [
    'Pick a grid operator and a date range to see demand, generation by fuel, renewable share and a data quality summary. Missing hours are shaded, suspect hours are hatched, and fuel totals that disagree with reported generation by more than 1% are flagged rather than adjusted.',
    "A Data pipeline panel reads the database's own import records: each source, how many runs succeeded, how many values were new, revised or unchanged, and the latest hour stored for every series.",
  ],
  bodyMobile:
    'Demand, generation by fuel, renewable share and data quality for any period. Gaps are shaded, suspect hours hatched, and every chart has a table view.',
  galleryLabel: 'Dashboard screenshots',
  /** Dialog items, in order. The gallery shows the first four. */
  gallery: [
    {
      key: 'dashboard',
      maxWidth: '100%',
      title: 'Thirty days of PJM data',
      caption:
        'Headline figures, daily demand and hourly generation by fuel, September 23 to October 22, 2026.',
      alt: 'GridBloom dashboard for PJM showing renewable share 9.0%, average demand 86,645 MW, peak hourly demand 114,265 MW, reported net generation 62,989 GWh, a daily demand line chart and a stacked hourly generation-by-fuel chart.',
    },
    {
      key: 'gaps',
      maxWidth: '100%',
      title: 'Gaps and suspect hours, marked',
      caption:
        'ISO New England, October 12 to 16. Shaded hours lack a fuel category; hatched hours are suspect. Fuel-mix percentages are withheld.',
      alt: 'Hourly generation chart for ISO New England with a shaded region where petroleum was not reported and a hatched band of suspect hours, followed by a daily renewable share chart, a fuel mix list with percentages withheld, and a data quality panel listing missing and suspect hours.',
    },
    {
      key: 'nyiso',
      maxWidth: '100%',
      title: 'Insufficient coverage, explained',
      caption:
        'NYISO in dark mode. Solar reads zero in every hour, so the renewable share is withheld with the reason shown.',
      alt: 'GridBloom dashboard for NYISO in dark mode, October 16 to 22, 2026. The renewable share card reads Insufficient coverage, explaining that solar is reported as 0 in every hour including daylight. Average demand 14,584 MW and reported net generation 2,082 GWh are shown.',
    },
    {
      key: 'briefing',
      maxWidth: '646px',
      title: 'Saved AI briefing',
      caption:
        "ISO New England, October 17 to 22, 2026. Every line links to its evidence; the limitation can't be removed.",
      alt: 'Grid briefing card labeled Saved briefing with its generation time and the model gpt-5-mini, listing overview, notable findings and a limitation, each with a View evidence link.',
    },
    {
      key: 'email',
      maxWidth: '760px',
      title: 'Weekly report email',
      caption:
        'ISO New England, November 9 to 15, 2026, with pipeline status, headline figures and a cited AI briefing.',
      alt: 'GridBloom report email with data pipeline status, ISO New England headline figures, renewable share shown as insufficient coverage with its reason, an AI briefing with numbered citations, and overview, findings and limitations lists.',
    },
    {
      key: 'emailPhone',
      maxWidth: '390px',
      title: 'Report email on a phone',
      caption: 'The same email at phone width, with headline figures stacked one per row.',
      alt: 'The GridBloom report email at phone width with headline figures stacked one per row.',
    },
  ],
  dialogTag: undefined as string | undefined,
  mobileFigures: [
    {
      key: 'gaps',
      ratio: '4/5',
      alt: 'ISO New England hourly generation chart with shaded hours where petroleum was not reported and hatched suspect hours, followed by renewable share and a fuel mix with percentages withheld.',
      title: 'Gaps and suspect hours, marked.',
      caption: 'ISO New England, October 12 to 16.',
    },
    {
      key: 'nyiso',
      ratio: '16/11',
      alt: 'NYISO dashboard in dark mode with the renewable share card reading Insufficient coverage, because solar is reported as 0 in every hour.',
      title: 'Insufficient coverage, explained.',
      caption: "NYISO's share is withheld with the reason.",
    },
  ],
};

export const ai = {
  num: '04',
  h2: 'An AI briefing that has to show its work',
  /** Approved wording (06-content-rules.md). Do not edit. */
  lead: 'I use AI where it adds real value. Here it picks out what matters and writes the summary, and the system checks every figure it uses.',
  body: 'On request, GridBloom sends approved figures to OpenAI. The model chooses which facts matter most for the period and writes up to four sentences, each citing the facts it relies on.',
  checksIntro: 'Before anything is shown, GridBloom checks every sentence:',
  checks: [
    'Every cited fact is one it was given',
    'Every number and date appears in those facts, so no new sums, ratios or averages get through',
    'No claims about causes, forecasts or emissions',
    'Required caveats, like "insufficient coverage", can\'t be dropped',
  ],
  after:
    'One failing sentence withholds the whole analysis, and the card says why. Each citation links to the chart or figure behind it, and reopening the same period reuses the saved result without another model call.',
  bodyMobile:
    'The model writes up to four sentences, each citing approved facts. Every sentence is checked:',
  checksMobile: [
    'Cited facts must be ones it was given',
    'Every number and date must appear in them',
    'No causes, forecasts or emissions claims',
    "Required caveats can't be dropped",
  ],
  afterMobile: 'One failing sentence withholds the whole analysis.',
  figure: {
    alt: 'Grid briefing card for ISO New England, October 17 to 22, 2026, labeled Saved briefing with its generation time and the model gpt-5-mini. Overview, notable findings and limitations each end in a View evidence link.',
    altMobile:
      'Saved Grid briefing for ISO New England, labeled with the model gpt-5-mini and its generation time, with View evidence links on every line.',
    caption:
      'A real saved briefing for ISO New England, October 17 to 22, 2026, labeled with its model and original generation time.',
    captionMobile: 'A real saved briefing, ISO New England, October 17 to 22, 2026.',
    dialogIndex: 3,
  },
  stat: {
    figure: '5 → 1',
    text: 'In six live test runs, the checks first withheld five of six analyses. Fixing false positives in the checker and the prompt brought that to one of six. The checks were never loosened, and the remaining rejection was a genuine citation error by the model, caught as designed.',
    textMobile:
      'Withheld analyses in six live runs, before and after fixing false positives. The checks were never loosened; the last rejection was a real citation error, caught as designed.',
  },
};

export const report = {
  num: '05',
  h2: 'A weekly report for people who never open the dashboard',
  body: [
    "A scheduled job pulls new data and emails a branded report: each region's latest week, its checked AI briefing with numbered citations, and the health of the data pipeline. It uses the same calculation code as the dashboard, so nothing is recalculated for email.",
    'When a week falls outside the audited period, the renewable share reads "Insufficient coverage" with the reason. When an import fails, the email arrives as "Action needed" instead of not arriving at all.',
  ],
  bodyMobile:
    'A scheduled email with each region\'s week, its checked briefing and pipeline health. A failed import arrives as "Action needed" instead of silence.',
  phone: {
    alt: 'The same report email at phone width, with headline figures stacked one per row.',
    side: 'The same email at phone width. Gmail displays the same layout.',
    dialogIndex: 5,
  },
  email: {
    alt: 'GridBloom report email for ISO New England, November 9 to 15, 2026: data pipeline status with no failed imports, demand total 2,093 GWh, peak hourly demand 15,140 MW, net generation 1,924 GWh, renewable share shown as insufficient coverage with its reason, and an AI briefing with numbered citations.',
    caption: 'A real report for ISO New England, November 9 to 15, 2026, after a live data pull.',
    dialogIndex: 4,
  },
  mobileFigure: {
    alt: 'GridBloom report email at phone width: pipeline status, then ISO New England headline figures stacked one per row.',
    title: 'The report on a phone.',
    caption: 'ISO New England, November 9 to 15, 2026.',
  },
  cycle: {
    title: 'How a weekly report runs',
    sub: 'From new source data to an email in the inbox.',
    steps: [
      {
        title: 'Pull new data',
        text: 'Resume from the latest stored hour, looking back to catch revised values.',
        textMobile: 'From the latest stored hour, with a look-back.',
      },
      {
        title: 'Record the import',
        text: 'Count new, revised and unchanged values. A failure is recorded with its reason.',
        textMobile: 'New, revised and unchanged values counted.',
      },
      {
        title: 'Calculate under the policy',
        text: 'The same rules as the dashboard, including withheld figures.',
        textMobile: 'Same rules as the dashboard.',
      },
      {
        title: 'Attach the checked briefing',
        text: 'A saved briefing that passed every check. No AI call unless asked for.',
        textMobile: 'No AI call unless asked for.',
        accent: true,
      },
      {
        title: 'Send the report',
        text: 'A branded HTML email that works on desktop and phone.',
        textMobile: 'Branded HTML for desktop and phone.',
      },
      {
        title: 'Flag problems',
        text: 'A failed pull shows up as "Action needed" in the subject line.',
        textMobile: '"Action needed" in the subject line.',
      },
    ],
  },
};

const mono = (text: string): Segment => ({ text, mono: true });

export const results = {
  num: '06',
  h2: 'What was verified',
  tableCaption: 'What was verified (table)',
  columns: ['Check', 'Result'],
  rows: [
    {
      area: 'Published reference figures',
      after: [
        'Reproduces the documented seven-day renewable shares exactly: ISO New England ',
        mono('18.6653%'),
        ', PJM ',
        mono('9.1042%'),
      ] satisfies Segment[],
    },
    {
      area: 'Two sources, one answer',
      after: [
        'All ',
        mono('4,872'),
        ' values where the API and bulk data overlap match exactly',
      ] satisfies Segment[],
    },
    {
      area: 'Repeat imports',
      after:
        'Replaying unchanged source data creates no revisions; every run keeps its own audit trail',
    },
    {
      area: 'Automated tests',
      after: [
        mono('76'),
        ' backend and ',
        mono('22'),
        ' frontend tests passing, plus the production build, covering clock-change days, the 1% boundary and every coverage rule',
      ] satisfies Segment[],
    },
    {
      area: 'Live AI acceptance',
      after:
        'Generation, evidence links, saved reload and NYISO coverage handling checked with a real model',
    },
  ],
  mobileCards: [
    {
      title: 'Published reference figures',
      after: 'Reproduced exactly: ISO New England 18.6653%, PJM 9.1042%',
    },
    { title: 'Two sources, one answer', after: 'All 4,872 overlapping values match' },
    {
      title: 'Automated tests',
      after: '76 backend and 22 frontend tests passing, plus the production build',
    },
    {
      title: 'Live AI acceptance',
      after: 'Generation, evidence links, saved reload and NYISO coverage handling',
    },
  ],
  note: "GridBloom runs locally as a demonstration. It isn't publicly hosted, and no time savings or production scale are claimed. The test counts describe the revision shown here.",
  noteMobile:
    'A local demonstration, not publicly hosted. No time savings or production scale are claimed.',
};

export const elsewhere = {
  num: '07',
  h2: 'The same pattern, your data',
  intro: [
    'Electricity is just the example. The pattern is ',
    { text: 'data from more than one system', strong: true },
    ', ',
    { text: 'rules for when a figure can be trusted', strong: true },
    ' and ',
    { text: 'a summary someone relies on every week', strong: true },
    '.',
  ] satisfies Segment[],
  introMobile:
    'Data from more than one system, rules for when a figure can be trusted, and a summary someone relies on every week.',
  cards: [
    {
      label: 'Accounting firms',
      labelMobile: 'Accounting',
      title: 'Monthly client dashboards',
      text: 'Figures from practice and bookkeeping software, with a figure held back until the month is actually closed.',
    },
    {
      label: 'Insurance agencies',
      labelMobile: 'Insurance',
      title: 'Book-of-business reporting',
      text: 'Carrier downloads combined into one weekly view of renewals, premiums and gaps that need follow-up.',
    },
    {
      label: 'Law firms',
      title: 'Matter and billing summaries',
      text: 'Time and billing data in a weekly email, with a short AI summary that cites every figure it mentions.',
    },
    {
      label: 'Operations teams',
      labelMobile: 'Operations',
      title: 'One weekly operations email',
      text: "Orders, inventory and support data from separate tools, with a clear flag when a source didn't update.",
    },
    {
      label: 'Nonprofits',
      title: 'Program and grant reporting',
      text: 'Program records turned into funder-ready figures, with missing data shown as missing rather than guessed.',
    },
    {
      label: 'Property management',
      labelMobile: 'Property',
      title: 'Portfolio performance reports',
      text: 'Occupancy, rent and maintenance data from several systems, reconciled before it reaches owners.',
    },
  ],
};

export const technical = {
  num: '08',
  h2: 'Technical detail',
  chips: [
    'Python',
    'SQLite',
    'FastAPI',
    'React',
    'Vite',
    'Recharts',
    'OpenAI Responses API',
    'Structured Outputs',
    'HTML email',
  ],
  chipsMobile: ['Python', 'SQLite', 'FastAPI', 'React', 'Recharts', 'OpenAI Responses API'],
  diagramCaption:
    'Simplified view. Charts and saved briefings never leave the machine; only a new briefing request sends approved figures to OpenAI.',
  accordions: [
    {
      title: 'Engineering decisions that mattered',
      leads: [
        {
          lead: 'Provenance over convenience.',
          text: ' Every value records its origin, unit, period, a hash of the raw payload and the import run that brought it in. The source comparison and audit depend on it.',
        },
        {
          lead: 'Policy as data.',
          text: ' Which fuel categories are usable for each region, and when a share may be published, live in a versioned rules file with a written decision record.',
        },
        {
          lead: 'Read-only serving.',
          text: ' The dashboard, audit and reporting open the database read-only. Only the importers can write observations.',
        },
        {
          lead: 'Missing stays missing.',
          text: ' Gaps are shown and explained. Nothing is filled in, smoothed or estimated.',
        },
      ],
    },
    {
      title: 'How renewable share is calculated',
      paragraphs: [
        'Reported solar, wind, conventional hydro and geothermal generation, divided by reported net generation. Storage and hybrid categories are kept separate. Period shares use summed megawatt-hours, not an average of hourly shares.',
        'It is a share of generation reported in the region, not of electricity consumed there, and the dashboard says so.',
      ],
    },
    {
      title: 'What the data audit found',
      leads: [
        {
          lead: 'NYISO:',
          text: ' solar is reported as zero in every hour, including daylight, so no NYISO renewable share is published.',
        },
        {
          lead: 'ISO New England:',
          text: ' petroleum is missing on whole days (864 hours), which withholds fuel-mix percentages. Three hours where every fuel reads zero withhold both percentages.',
        },
        {
          lead: 'PJM:',
          text: ' no internal gaps, but demand runs 15 hours past the last generation data, so those hours carry no share.',
        },
      ],
    },
    {
      title: 'AI integration boundaries',
      paragraphs: [
        'Briefings are generated only when someone asks. The model returns a strict structured response, and anything referring to an unknown fact, a duplicate or a missing required limitation is rejected. The API key stays on the server and never reaches the browser.',
        'A separate cache keeps each result with its inputs, model, prompt version, usage and generation time. Automated tests mock the provider; real generation was checked separately during acceptance.',
      ],
    },
    {
      title: 'Running it',
      paragraphs: [
        'GridBloom runs on a laptop. The analytics need no cloud services or API keys; an OpenAI key is needed only to generate new briefings, and email settings only for the report. Source code is private.',
      ],
    },
  ],
  mobileAccordions: [
    {
      title: 'Engineering decisions',
      text: 'Every value keeps its source, unit, raw-payload hash and import run. Coverage rules live in a versioned policy file. The dashboard, audit and report read the database read-only. Missing stays missing.',
    },
    {
      title: 'How renewable share is calculated',
      text: "Reported solar, wind, conventional hydro and geothermal over reported net generation, using summed megawatt-hours. Storage and hybrids are kept separate. It's a share of generation, not of consumption.",
    },
    {
      title: 'What the data audit found',
      text: 'NYISO solar reads zero in every hour, so no NYISO share is published. ISO New England petroleum is missing for 864 hours. PJM demand runs 15 hours past its last generation data.',
    },
    {
      title: 'AI integration and running it',
      text: 'Briefings run only on request, with a strict structured response; the key never reaches the browser. Results are cached with model, prompt version and usage. Everything else runs on a laptop with no API keys. Source code is private.',
    },
  ],
};

export const next = {
  h2: "Have reports you don't fully trust?",
  body: "Tell me where your figures come from, who reads them and what goes wrong today. We can talk about a reporting workflow that checks itself and tells you when it can't.",
  bodyMobile: 'Tell me where your figures come from, who reads them and what goes wrong today.',
};
