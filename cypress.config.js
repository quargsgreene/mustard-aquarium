const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    modifyObstructiveCode: true,
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);

      return config;
    },
  },
});
