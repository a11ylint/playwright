// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig, Page } from '@playwright/test';
import { RGAATestsOptions } from './tests/AccessibilityFixtures';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
// eslint-disable-next-line import/no-default-export
export default defineConfig<RGAATestsOptions>({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Accessibility',
      use: {
        URLS: [
          {
            url: 'https://playwright.dev',
            waitingPredicate: async (page: Page) => {
              await page.waitForSelector('text=Playwright enables');
            },
          },
          {
            url: 'https://fake-university.com',
            waitingPredicate: async (page: Page) => {
              await page.waitForSelector('text=Choose your future');
            },
          },
          {
            url: 'https://fake-university.com/about.html',
            waitingPredicate: async (page: Page) => {
              await page.waitForSelector('text=About the Fake University');
            },
          },
          {
            url: 'https://fake-university.com/news-and-events.html',
            waitingPredicate: async (page: Page) => {
              await page.waitForSelector('text=Stay connected and informed with the latest news and events');
            },
          },
          {
            url: 'https://www.lesnumeriques.com/',
            waitingPredicate: async (page: Page) => {
              await page.waitForSelector('text=Produits populaires');
            },
          },
          {
            url: 'https://mickaelcroquet.fr',
            waitingPredicate: async (page: Page) => {
              await page.waitForSelector('text=a french full stack developper currently based at Lille working at AXA');
            },
          },
          {
            url: 'https://www.accessibility-developer-guide.com/examples/forms/bad-example/_examples/generally-bad-form/',
            waitingPredicate: async (page: Page) => {
              await page.waitForSelector('text=Play around with the example on CodePen');
            },
          },
        ],
      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
