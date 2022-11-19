import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    chromeWebSecurity: false,
    video: false,
    baseUrl: 'http://127.0.0.1:3000',
    experimentalStudio: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      ADMIN_SECRET: 'ADMINSECRETKEY',
      ABI_BASE: 'http://localhost:8000/api/v1',
    },
  },
})
