/**
 * Quotes library case study copy, transcribed verbatim from _handoff/content/work/quotes-library.md
 * and _handoff/content/mobile/quotes-library-mobile.md. Sample quotations are public domain only;
 * none of the client's collection appears. The review comes from projects.yaml.
 */
import type { Pair, Segment } from '../types';
import type { SheetColumn, SheetRow } from '../../components/work/shared/sheet-types';
import type { PaperEntry } from '../../components/work/specific/paper-types';

export const meta = {
  title: 'Quotes Library: Excel to Word Automation | Regassa Automations',
  description:
    'How Regassa Automations cleaned a quotations workbook with Python, removed true duplicates while keeping every category, and generated a 400-page Word reference.',
  ogTitle: 'From a cluttered workbook to a 400-page reference',
  ogDescription:
    'A Python cleanup with a scored duplicates report, and a generated Word reference organized by author.',
  ogImage: '/og/og-default.png',
  ogImageAlt:
    'Regassa Automations logo with the line: Workflow automation for complex, everyday operations.',
};

const franklin: PaperEntry = {
  author: 'Franklin, Benjamin',
  quotes: [{ text: 'Well done is better than well said.', categories: 'Action · Character' }],
};

export const hero = {
  crumb: 'Quotes library',
  tags: ['Data cleanup', 'Document generation', 'Python'],
  tagsMobile: ['Data cleanup', 'Document generation'],
  h1: 'From a cluttered workbook to a 400-page reference',
  lede: 'A Python workflow that cleaned a quotations collection spread across Excel worksheets, removed true duplicates while keeping every category a quote belonged to, and generated a formatted, navigable Word document.',
  ledeMobile:
    'A Python workflow that cleaned a quotations collection spread across Excel worksheets, removed true duplicates while keeping every category, and generated a formatted Word document.',
  secondary: { label: 'See the before and after', href: '#transform' },
  paperLabel:
    'Illustration of a page from the generated Word document: author headings sorted by last name, each quotation in italics, and the categories it belongs to listed beneath it.',
  paperLabelMobile:
    'Illustration of a generated page: author headings sorted by last name, quotations in italics, categories beneath each.',
  paper: [
    {
      letter: 'E',
      author: 'Emerson, Ralph Waldo',
      quotes: [
        {
          text: 'Nothing great was ever achieved without enthusiasm.',
          categories: 'Motivation · Character',
        },
      ],
    },
    {
      letter: 'F',
      author: 'Franklin, Benjamin',
      quotes: [
        { text: 'Well done is better than well said.', categories: 'Action · Character' },
        { text: 'Lost time is never found again.', categories: 'Time' },
      ],
    },
  ] satisfies PaperEntry[],
  paperMobile: [
    {
      author: 'Emerson, Ralph Waldo',
      quotes: [
        {
          text: 'Nothing great was ever achieved without enthusiasm.',
          categories: 'Motivation · Character',
        },
      ],
    },
    franklin,
  ] satisfies PaperEntry[],
  caption: 'Illustration of the output format, with public-domain sample quotations.',
  captionMobile: 'Illustration of the output, with public-domain quotations.',
  facts: [
    { k: 'Client', v: 'Upwork client; identity private' },
    { k: 'Built with', v: 'Python, pandas and python-docx' },
    { k: 'Timeline', v: 'Three days, August 2025' },
    {
      k: 'Delivered',
      v: 'Cleaned workbook, 400+ page Word document, duplicates report and the code',
    },
  ] satisfies Pair[],
  factsNoteMobile:
    'An Upwork client; identity private. Built in three days in August 2025 with Python, pandas and python-docx.',
};

export const jumps = [
  { label: 'Overview', labelMobile: 'Challenge', href: '#overview' },
  { label: 'Before and after', href: '#transform' },
  { label: 'Duplicates, carefully', labelMobile: 'Duplicates', href: '#duplicates' },
  { label: 'The document', labelMobile: 'Document', href: '#document' },
  { label: 'Results', href: '#results' },
  { label: 'Other industries', labelMobile: 'Other uses', href: '#elsewhere' },
  { label: 'Technical detail', labelMobile: 'Technical', href: '#technical' },
];

export const overview = {
  num: '01',
  h2: 'The challenge',
  body: [
    'The client kept a large collection of quotations in an Excel workbook, one worksheet per category. Over time the same quotation had been entered in several places: sometimes because it really belonged to more than one category, sometimes as a plain copy, and sometimes with slightly different punctuation or author spelling.',
    'They wanted two things: a clean version of the collection, and a reference document organized by author that they could actually read and navigate.',
  ],
  bodyMobile:
    "Quotations lived in one worksheet per category. Some were repeated because they belonged to several categories, some were plain copies, and some differed only by a comma or an author's spelling.",
  cards: [
    {
      label: 'Categories',
      title: 'Worksheets were the categories',
      text: "A quote's category was only recorded by which sheet it sat in. Merging copies risked losing that information.",
      textMobile: 'Merging copies risked losing categories.',
    },
    {
      label: 'Duplicates',
      title: 'Same, similar or different?',
      text: 'Some repeats were exact, some differed by a comma, and some looked alike but were genuinely different quotations.',
      textMobile: 'Not every near-match is a copy.',
    },
    {
      label: 'Scale',
      title: 'Hundreds of pages to format',
      text: 'Organizing and styling a document this size by hand would mean days of repetitive editing, with plenty of room for inconsistency.',
      textMobile: 'Days of repetitive editing by hand.',
    },
  ],
};

export const transform = {
  num: '02',
  h2: 'Before and after',
  intro: 'Three workbook rows become one entry. An illustration using a public-domain quotation.',
  sheet: {
    caption: 'Source workbook',
    columns: [
      { label: 'Worksheet' },
      { label: 'Author' },
      { label: 'Quotation' },
    ] satisfies SheetColumn[],
    rows: [
      {
        tone: 'yellow',
        cells: ['Action', 'Benjamin Franklin', 'Well done is better than well said.'],
      },
      {
        tone: 'yellow',
        toneLabel: '(same quote, second category)',
        cells: ['Character', 'Benjamin Franklin', 'Well done is better than well said.'],
      },
      {
        tone: 'pink',
        toneLabel: '(near-copy)',
        cells: ['Action', 'B. Franklin', 'Well done is better than well said'],
      },
    ] satisfies SheetRow[],
    figcaption:
      'Yellow: same quote in two categories. Pink: a near-copy with a different author spelling and no period.',
  },
  mobileRows: [
    {
      tone: 'yellow' as const,
      sheet: 'Action',
      text: 'Benjamin Franklin · Well done is better than well said.',
    },
    {
      tone: 'yellow' as const,
      sheet: 'Character',
      text: 'Benjamin Franklin · Well done is better than well said.',
      hidden: '(same quote, second category)',
    },
    {
      tone: 'pink' as const,
      sheet: 'Action',
      text: 'B. Franklin · Well done is better than well said',
      hidden: '(near-copy)',
    },
  ],
  mobileSourceLabel: 'Source workbook',
  mobileLegend: 'Yellow: one quote in two categories. Pink: a near-copy.',
  mobileDocLabel: 'In the document',
  entry: [franklin] satisfies PaperEntry[],
  entryCaption: "One entry, filed under the author's last name, keeping both categories.",
  callout: {
    title: 'A quote and its categories are separate facts',
    body: 'The key modeling decision: treat "which quotation is this" and "which categories is it in" as two different pieces of information. That let the cleanup remove copies without losing any of the classification the client had built up.',
    bodyMobile: 'That decision let the cleanup remove copies without losing any classification.',
  },
};

export const duplicates = {
  num: '03',
  h2: 'Finding duplicates, and showing the work',
  body: [
    'Exact matching caught identical entries. Fuzzy matching caught near-copies that differed in punctuation, spacing or small wording changes, and gave each pair a similarity score.',
    "Similar isn't always redundant. A near-match might be a typo, a shortened version, or a genuinely different quotation. So the scores went into a separate duplicates report the client could review, instead of the script silently deciding.",
  ],
  bodyMobile:
    "Exact matching caught identical entries; fuzzy matching scored near-copies. The scores went into a duplicates report the client could review, because similar isn't always redundant.",
  sheet: {
    caption: 'Duplicates report (illustration)',
    columns: [
      { label: 'Quotation A' },
      { label: 'Quotation B' },
      { label: 'Similarity' },
    ] satisfies SheetColumn[],
    rows: [
      {
        cells: [
          { kind: 'wrap', text: 'Well done is better than well said.' },
          { kind: 'wrap', text: 'Well done is better than well said' },
          { kind: 'score', text: '98', strong: true },
        ],
      },
      {
        cells: [
          { kind: 'wrap', text: 'Lost time is never found again.' },
          { kind: 'wrap', text: 'Lost time is never found again!' },
          { kind: 'score', text: '97', strong: true },
        ],
      },
      {
        cells: [
          { kind: 'wrap', text: 'Well begun is half done.' },
          { kind: 'wrap', text: 'Well done is better than well said.' },
          { kind: 'score', text: '61' },
        ],
      },
    ] satisfies SheetRow[],
    figcaption:
      'Public-domain examples. High scores are likely copies; the low score is two different sayings that only look alike.',
  },
  mobileRows: [
    { pair: '"…well said." vs "…well said"', score: '98', strong: true },
    { pair: '"…found again." vs "…found again!"', score: '97', strong: true },
    { pair: '"Well begun is half done." vs "Well done is…"', score: '61', strong: false },
  ],
  similarityLabel: 'similarity',
  mobileNote: 'Illustration with public-domain sayings. The last pair only looks alike.',
  cards: [
    {
      label: 'Authors',
      title: 'One name per person',
      text: 'Variations like "B. Franklin" and "Benjamin Franklin" were normalized, so one author\'s quotations stayed together.',
    },
    {
      label: 'Missing values',
      title: 'No "nan" in the document',
      text: 'Empty spreadsheet cells can surface as technical placeholders. The generator made sure none appeared as an author name or anywhere a reader would see it.',
    },
  ],
  mobileCard: {
    title: 'One name per author',
    text: '"B. Franklin" and "Benjamin Franklin" were normalized, and empty cells never appear as "nan".',
  },
};

export const document = {
  num: '04',
  h2: 'A document built to be used',
  intro:
    'The Word document was generated entirely by code, so every one of its 400-plus pages follows the same structure and styling.',
  steps: [
    {
      title: 'Grouped by author',
      text: 'Every quotation from the same person together, wherever it came from in the workbook.',
      textMobile: 'Wherever the quote came from.',
    },
    {
      title: 'Sorted by last name',
      text: "So it reads like a reference book, not the spreadsheet's row order.",
      textMobile: 'Reads like a reference book.',
    },
    {
      title: 'Categories under each quote',
      text: 'Every theme a quote belongs to, shown once.',
      textMobile: 'Every theme, shown once.',
    },
    {
      title: 'Real Word headings',
      text: "Heading 1 and 2 styles, so Word's navigation pane works.",
      textMobile: "Word's navigation pane works.",
      accent: true,
    },
    {
      title: 'A live table of contents',
      text: 'Built from those headings and set to update when the file opens.',
      textMobile: 'Updates when the file opens.',
    },
    {
      title: 'Rebuildable any time',
      text: 'If the collection changes, the script produces a fresh, consistent document.',
      hideMobile: true,
    },
  ],
};

export const results = {
  num: '05',
  h2: 'What was delivered',
  stats: [
    {
      figure: '400+',
      text: 'pages of formatted, navigable Word reference',
      textMobile: 'pages in Word',
    },
    { figure: '3 days', text: 'from the source workbook to delivery', textMobile: 'to delivery' },
    {
      figure: '4',
      text: 'deliverables: cleaned workbook, Word document, duplicates report and the code',
      textMobile: 'deliverables',
    },
  ],
  lineMobile:
    'A cleaned workbook, the Word document, a duplicates report and the code that produced them.',
  tableCaption: 'What was delivered: before and after',
  columns: ['Area', 'Before', 'After'],
  rows: [
    {
      area: 'Duplicates',
      before: 'Exact and near-copies scattered across sheets',
      after: 'Removed, with a scored report to review',
    },
    {
      area: 'Categories',
      before: 'Implied by which worksheet a quote sat in',
      after: 'Listed under each quote, all kept',
    },
    {
      area: 'Authors',
      before: 'Several spellings of the same name',
      after: 'One normalized name, sorted by last name',
    },
    {
      area: 'Reading it',
      before: 'Scrolling worksheets',
      after: 'A styled document with a table of contents',
    },
  ],
  note: 'This was data cleanup and document production, not a live system. Comparing and organizing the supplied quotations is not the same as verifying their wording or authorship, and the work made no claim to do so.',
  noteMobile:
    'Data cleanup and document production, not a live system. Organizing quotations is not the same as verifying their wording or authorship.',
};

export const elsewhere = {
  num: '06',
  h2: 'The same pattern, other industries',
  intro: [
    'Any organization with ',
    { text: 'a spreadsheet that grew messy', strong: true },
    ' and needs ',
    { text: 'a polished document', strong: true },
    ' from it.',
  ] satisfies Segment[],
  cards: [
    {
      label: 'Law firms',
      title: 'Clause and precedent libraries',
      titleMobile: 'Clause libraries',
      text: 'Standard clauses tracked in a spreadsheet, deduplicated and published as a navigable Word reference.',
    },
    {
      label: 'Accounting firms',
      labelMobile: 'Accounting',
      title: 'Engagement letter templates',
      titleMobile: 'Engagement letters',
      text: 'Service descriptions and terms kept in one sheet, assembled into consistent Word documents.',
    },
    {
      label: 'HR and operations',
      labelMobile: 'HR',
      title: 'Policy handbooks',
      text: 'Policies maintained as rows, published as a formatted handbook with a table of contents.',
    },
    {
      label: 'Nonprofits',
      title: 'Grant boilerplate',
      text: 'Reusable program descriptions by theme, without duplicate versions drifting apart.',
    },
    {
      label: 'Distributors',
      title: 'Product catalogs',
      text: 'A product spreadsheet with items in several categories, published as a printable catalog.',
    },
    {
      label: 'Training teams',
      labelMobile: 'Training',
      title: 'Reference manuals and FAQs',
      titleMobile: 'Manuals and FAQs',
      text: 'Questions and answers collected over time, cleaned and organized into one manual.',
    },
  ],
};

export const technical = {
  num: '07',
  h2: 'Technical detail',
  chips: ['Python', 'pandas', 'python-docx', 'Fuzzy matching', 'Microsoft Excel', 'Microsoft Word'],
  chipsMobile: ['Python', 'pandas', 'python-docx', 'Fuzzy matching'],
  accordions: [
    {
      title: 'Cleaning the workbook',
      text: "pandas read every worksheet, recorded each row's sheet as its category, normalized author names and handled missing values. The cleaned collection was written back to Excel as its own deliverable.",
    },
    {
      title: 'Exact and fuzzy duplicate detection',
      text: 'Identical text was matched directly. Near-duplicates were compared with a similarity score, and every flagged pair went into a standalone report so the decisions could be checked.',
    },
    {
      title: 'Consolidating categories',
      text: 'When the same author and quotation appeared in several worksheets, the generator rendered it once and listed every sheet it came from as its categories.',
    },
    {
      title: 'Generating the Word document',
      text: 'python-docx built the document with Heading 1 and Heading 2 styles, inserted a Word table-of-contents field, and set the file to ask Word to update fields on opening so the contents reflect the generated pages.',
    },
  ],
  mobileAccordions: [
    {
      title: 'Cleaning the workbook',
      text: 'Each sheet read as a category, authors normalized, missing values handled, cleaned collection saved back to Excel.',
    },
    {
      title: 'Duplicate detection',
      text: 'Exact matches plus scored near-matches, all listed in a standalone report.',
    },
    {
      title: 'Generating the document',
      text: 'python-docx with Heading 1 and 2 styles, a table-of-contents field, and fields set to update on opening.',
    },
  ],
};

export const next = {
  h2: 'Have a spreadsheet that should be a document?',
  body: "Tell me what's in it and what the finished document needs to look like. We can discuss cleaning it up and generating it consistently.",
  bodyMobile: "Tell me what's in it and what the finished document needs to look like.",
};
