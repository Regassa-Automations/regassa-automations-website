/**
 * Structured data (02-architecture.md, Metadata and structured data).
 * Never add Review, AggregateRating, client names or results. Dates only from real publish events.
 */
const SITE = 'https://regassaautomations.com';
const abs = (path: string) => new URL(path, SITE).href;

const organization = {
  '@type': 'Organization',
  name: 'Regassa Automations',
  url: `${SITE}/`,
};

export function professionalService() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Regassa Automations',
    url: `${SITE}/`,
    logo: abs('/og/logo-mark.png'),
    image: abs('/og/og-default.png'),
    description: 'Practical automation for small teams.',
    founder: { '@type': 'Person', name: 'Ayantu Regassa' },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Portland',
      addressRegion: 'ME',
      addressCountry: 'US',
    },
    areaServed: { '@type': 'Country', name: 'United States' },
  };
}

export function caseStudy(opts: {
  name: string;
  description: string;
  path: string;
  image?: string;
  crumb: string;
}) {
  const url = abs(opts.path);
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: opts.name,
      description: opts.description,
      url,
      creator: organization,
      ...(opts.image ? { image: abs(opts.image) } : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Portfolio', item: abs('/work/') },
        { '@type': 'ListItem', position: 2, name: opts.crumb, item: url },
      ],
    },
  ];
}

/** Serialize for a <script type="application/ld+json"> block; escapes "<" so it can't close the tag. */
export function serialize(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
