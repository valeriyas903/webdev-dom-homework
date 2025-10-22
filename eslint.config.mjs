import { defineConfig } from "eslint/config";
import global from "eslint-config-standard-with-typescript/flat/global.js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

export default defineConfig([
  {
    ignores: ["**/*.js", "**/*.cjs", "**/*.mjs"],
    languageOptions: {
      globals: globals,
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
  },
]);