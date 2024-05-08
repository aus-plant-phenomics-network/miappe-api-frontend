import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    coverage: {
      thresholds: {
        lines: 50,
        branches: 50,
        functions: 50,
        statements: 50
      },
      enabled: true,
      provider: "istanbul",
      reportOnFailure: true,
      reporter: ['json-summary', 'json', 'text'],
    },
    global: true,
    environment: "jsdom",
    setupFiles: "./setupTest",
    css: true,
  },
  plugins: [react()],
})
