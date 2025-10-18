import { defineConfig } from "eslint-define-config";
import next from "@next/eslint-plugin-next";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

export default defineConfig({
  plugins: {
    "@next/next": next,
    "@typescript-eslint": typescriptEslint,
  },
  extends: [
    "plugin:@next/next/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: typescriptParser,
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // Add any custom rules here
  },
  settings: {
    react: {
      version: "detect",
    },
  },
});
