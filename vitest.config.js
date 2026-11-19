import { defineConfig, configDefaults } from "vitest/config";

// The design system tests live in tests/; the React claims portal has its own Jest setup.
export default defineConfig({
  test: { exclude: [...configDefaults.exclude, "claims-portal/**"] },
});
