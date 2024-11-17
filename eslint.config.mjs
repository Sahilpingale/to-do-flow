import globals from "globals"
import pluginReact from "eslint-plugin-react"
import tseslint from "typescript-eslint"

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    rules: {
      "no-console": ["warn", { allow: ["warn", "error", "debug"] }],
      "no-unused-vars": "off",
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: globals.browser,
    },
  },
  pluginReact.configs.flat.recommended,
  // ...tseslint.configs.recommended,
]
