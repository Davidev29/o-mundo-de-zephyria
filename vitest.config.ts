import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    include: ["packages/**/*.test.ts", "packages/**/*.test.tsx", "apps/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
  resolve: {
    alias: {
      "@core": "/packages/core/src",
      "@game": "/packages/game/src",
      "@shared": "/packages/shared/src",
      "@ui": "/packages/ui/src",
      "@net": "/packages/net/src",
      "@audio": "/packages/audio/src",
    },
  },
});
