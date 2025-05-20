const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'c6hwzr',
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php',
    setupNodeEvents(on, config) {
    },
  },
});
