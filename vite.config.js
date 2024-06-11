import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "esnext",
  },
  test: {
    coverage: {
      thresholds: {
        lines: 50,
        branches: 50,
        functions: 50,
        statements: 50,
      },
      enabled: true,
      provider: "istanbul",
      reportOnFailure: true,
      reporter: ["json-summary", "json", "text", "html"],
      include: [
        "src/components/**",
        "src/handlers/**",
        "src/mock/**",
        "src/routes/**",
      ],
      exclude: [
        "**/*.stories.[jt]sx",
        "**/*.helper.[jt]sx",
        "**/*.helpers.[jt]sx",
        "**/*.types.ts",
        "src/routes/",
        "src/handlers/",
        "src/components/page",
      ],
    },
    global: true,
    environment: "jsdom",
    setupFiles: "./setupTest",
    css: true,
  },
  plugins: [react()],
});
