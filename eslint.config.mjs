import js from "@eslint/js";
import globals from "globals";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
    },
  },
  { files: ["src/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["src/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
  { files: ["src/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"] },
  { files: ["src/*.jsonc"], plugins: { json }, language: "json/jsonc", extends: ["json/recommended"] },
  { files: ["src/*.json5"], plugins: { json }, language: "json/json5", extends: ["json/recommended"] },
  { files: ["src/*.md"], plugins: { markdown }, language: "markdown/commonmark", extends: ["markdown/recommended"] },
  { files: ["src/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"] },
]);
