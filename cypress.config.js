const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportWidth: 3840,
  viewportHeight: 2160,
  e2e: {
    baseUrl: 'http://localhost:8000',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: false,
    video: false,
    screenshotOnRunFailure: true,
  },
})
