// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      "bable.config.js",
      "jest.config.js",
      "eslint.config.mjs",
      "src/index.js",
      "dist/**/*",
      "**/*.js",
    ],
  }
);
