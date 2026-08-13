// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 30*1000,
  expect: {
    timeout: 5*1000
  },
  retries: 1,
  workers: 3,
  reporter: 'html',
  projects: [
    {
      name: 'safari',
      use: {
      actionTimeout: 10*1000,
      navigationTimeout: 30*1000,
      browserName: 'webkit',
      headless: false,
      screenshot: 'off',
      trace: 'on',
      ...devices['iPhone 11']
      }
    },
    {
      name: 'chrome',
      use: {
      actionTimeout: 10*1000,
      navigationTimeout: 30*1000,
      browserName: 'chromium',
      headless: false,
      screenshot: 'on',
      video: 'retain-on-failure',
      trace: 'on'
      }
    }
  ]
  

});

module.exports = config

