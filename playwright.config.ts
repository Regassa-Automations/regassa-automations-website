import { defineConfig, devices } from '@playwright/test';

// Dedicated port so tests never attach to an unrelated dev server on 4321.
const PORT = 4391;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list']],
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
  },
  // CROSS=1 adds WebKit (Safari engine, phone) and Firefox (desktop): `npm run test:browsers`.
  projects: [
    {
      name: 'mobile',
      use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 } },
    },
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    ...(process.env.CROSS
      ? [
          {
            name: 'mobile-webkit',
            use: { ...devices['iPhone 13'], viewport: { width: 390, height: 844 } },
          },
          {
            name: 'desktop-firefox',
            use: { ...devices['Desktop Firefox'], viewport: { width: 1440, height: 900 } },
          },
        ]
      : []),
  ],
  webServer: {
    command: `npx astro preview --port ${PORT} --host 127.0.0.1 --ignore-lock`,
    url: `http://127.0.0.1:${PORT}/`,
    reuseExistingServer: false,
  },
});
