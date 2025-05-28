const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "jt4q9w",
  e2e: {
    baseUrl: 'https://r1020640-realbeans.myshopify.com',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    video: true,
    screenshotOnRunFailure: true,
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
