// @ts-check
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './AccuKnox-user-management-tests/tests',

  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: 'html',

  use: {
    trace: 'on',
    headless: false,
    channel: 'chrome',   // ✅ USE SYSTEM CHROME
  },

  projects: [
    {
      name: 'chrome',
      use: {
        channel: 'chrome',   // ✅ SYSTEM CHROME
        headless: false,
      },
    },
  ],
});
