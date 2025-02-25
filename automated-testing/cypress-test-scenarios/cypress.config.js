const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    env: {
      baseUrl: "https://www.saucedemo.com/v1/index.html",
      username: "standard_user",
      password: "secret_sauce",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
