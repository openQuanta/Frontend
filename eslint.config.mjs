import next from "@next/eslint-plugin-next";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@next/next": next,
      "@typescript-eslint": typescriptEslint,
    },
    rules: {
      ...next.configs.recommended.rules,
      ...typescriptEslint.configs.recommended.rules,
      // Add any custom rules here
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    ignores: [".next/*", "node_modules/*", "out/*", ".turbo/*"],
  },
];
