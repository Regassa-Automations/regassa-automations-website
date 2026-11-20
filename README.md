# Regassa Automations website

Public deployment source for [regassaautomations.com](https://regassaautomations.com), built with Astro and TypeScript.

## Local development

Use Node.js 24 and npm.

```sh
npm ci
npm run dev
```

## Validation

```sh
npm run build
npm run check
npm run test:html
npm run test:links
npx playwright install chromium
npm test
```

Browser tests cover accessibility, navigation, forms, responsive behavior and page metadata. Form tests intercept submissions and do not send inquiries.

## Deployment

Netlify settings are supplied in `netlify.toml`: build with `npm run build`, publish `dist`, and use Node.js 24. Use `main` as the production branch. Security headers and redirects live in `public/_headers` and `public/_redirects`.

Confirm the deploy preview before production. After deployment, check legacy redirects, HTTPS, the contact form from the live domain, booking and cancellation, and playback/captions on real mobile devices. Run screen reader and forced-colors checks before release.

## Content and confidentiality

Preserve approved wording, testimonial attribution, and fictional-data labels. Freight examples use fictional demonstration data; the PR and volunteer examples use invented names. GridBloom is an independent project using public data. Never commit client records, credentials, private project identifiers, internal evidence notes, or source handoff materials.

This repository contains a reviewed deployment snapshot with a fresh history.
