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
  reporter: 'html',
  use: {
    // actionTimeout: 10*1000,
    // navigationTimeout: 30*1000,
    browserName: 'chromium',
    headless: true,
    screenshot: 'on',
    trace: 'on'
  },

});

module.exports = config

