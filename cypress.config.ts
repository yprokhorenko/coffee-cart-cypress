import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
     baseUrl: 'https://coffee-cart.app',
     viewportWidth: 1920,
     viewportHeight: 1080,
     video: false,
     retries: { runMode: 1, openMode: 0 },
  },
});
