import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    coverage: {
      thresholds: {
        lines: 70,
        branches: 70,
        functions: 70,
        statements: 70
      },
      enabled: true,
      provider: "istanbul",
      reportOnFailure: true,
      reporter: "html"
    },
    global: true,
    environment: "jsdom",
    setupFiles: "./setupTest",
    css: true,
  },
  plugins: [react()],
})
