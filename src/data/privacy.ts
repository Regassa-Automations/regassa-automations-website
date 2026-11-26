/**
 * Privacy page copy, transcribed verbatim from _handoff/content/privacy.md (OI-05, approved 2026-11-20).
 * Rich text is kept as small segment arrays so links stay real elements.
 */

import type { Segment } from './types';
export type { Segment };

export interface PrivacySection {
  id: string;
  h2: string;
  paragraphs?: Segment[][];
  list?: string[];
  /** Paragraphs that follow the list. */
  after?: Segment[][];
}

export const meta = {
  title: 'Privacy | Regassa Automations',
  description:
    'How the inquiry form and consultation booking on regassaautomations.com handle your information, and how to ask for a submission to be removed.',
};

export const intro = {
  eyebrow: 'Privacy',
  h1: 'How inquiry information is handled',
  updatedPrefix: 'Last updated',
  launchPlaceholder: '[LAUNCH DATE]',
  lede: 'This page explains what the inquiry form and consultation booking on this site collect, why, who processes them, and how to ask about or remove your information.',
};

export const sections: PrivacySection[] = [
  {
    id: 'collects',
    h2: 'What the form collects',
    list: [
      'Your name and email address.',
      'Your description of the process or workflow you would like to improve.',
      'Optionally, the tools involved and how often the process happens or who is involved.',
    ],
    after: [
      [
        'Please do not include confidential client records, passwords or financial details in the form. If a project needs them, we will agree on a safer way to share them.',
      ],
    ],
  },
  {
    id: 'booking',
    h2: 'Booking a consultation',
    paragraphs: [
      [
        'The calendar booking links open a booking page run by Google Calendar appointment schedules, part of Google Workspace. When you book, Google collects your name, email address and anything you write in the booking question, and sends you a confirmation and reminders. Google\'s handling of that information is described in the ',
        { text: 'Google Privacy Policy', href: 'https://policies.google.com/privacy' },
        '.',
      ],
    ],
  },
  {
    id: 'why',
    h2: 'Why it is collected',
    paragraphs: [
      [
        'It is used only to read your inquiry or booking, reply to you, and, if you choose to continue, prepare for a first conversation. It is not added to a mailing list and is not sold or shared for marketing.',
      ],
    ],
  },
  {
    id: 'processors',
    h2: 'Who processes it',
    paragraphs: [
      [
        'Form submissions are received through ',
        { text: 'Formspree', href: 'https://formspree.io/legal/privacy-policy' },
        ', which forwards them to my business email. Formspree keeps a copy of each submission in its dashboard for 30 days, then deletes it. My business email and calendar are provided by Google Workspace.',
      ],
    ],
  },
  {
    id: 'retention',
    h2: 'How long it is kept',
    paragraphs: [
      [
        'Inquiries and consultation booking records that do not lead to a project are deleted after 12 months. If we work together, project correspondence is kept for as long as needed for the engagement and for business and tax records.',
      ],
    ],
  },
  {
    id: 'requests',
    h2: 'Asking about or removing a submission',
    paragraphs: [
      [
        'Email ',
        {
          text: 'privacy@regassaautomations.com',
          href: 'mailto:privacy@regassaautomations.com',
        },
        ' with the subject "Privacy request" and the email address you used. I will confirm what is held and delete it on request.',
      ],
    ],
  },
  {
    id: 'analytics',
    h2: 'Site analytics and cookies',
    paragraphs: [
      [
        'This site does not use analytics or advertising cookies, and it loads no fonts or scripts from other services.',
      ],
    ],
  },
];

export const returnLink = { label: 'Return to the inquiry form', href: '/#inquiry' };
