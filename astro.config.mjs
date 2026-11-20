// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://regassaautomations.com',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // Keep styles external so the CSP needs no 'unsafe-inline' (see _handoff/docs/02-architecture.md).
    inlineStylesheets: 'never',
  },
  vite: {
    build: {
      // Never inline scripts or assets: the CSP is script-src 'self' with no hashes.
      assetsInlineLimit: 0,
    },
  },
  integrations: [
    sitemap({
      filter: (page) => !/\/thanks\/|\/404/.test(page),
    }),
  ],
});
