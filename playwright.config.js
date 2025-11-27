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
    headless: true,       
    channel: 'chrome',    
  },

  projects: [
    {
      name: 'chrome',
      use: {
        channel: 'chrome',
        headless: true,    
      },
    },
  ],
});

