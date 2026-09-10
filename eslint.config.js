const js = require("@eslint/js");
const globals = require("globals");
const reactHooks = require("eslint-plugin-react-hooks");
const importX = require("eslint-plugin-import-x");

// react-hooks exposes its rule set under different keys across versions.
const reactHooksRules =
  reactHooks.configs["recommended-latest"]?.rules ||
  reactHooks.configs.recommended?.rules ||
  {};

module.exports = [
  {
    ignores: ["build/**", "coverage/**", "node_modules/**", "public/**"],
  },
  js.configs.recommended,
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    settings: {
      "import-x/resolver": {
        node: { extensions: [".js", ".jsx"] },
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "import-x": importX,
    },
    rules: {
      ...reactHooksRules,

      // import hygiene (eslint-plugin-react / jsx-a11y don't run on ESLint 10 yet)
      "import-x/first": "error",
      "import-x/no-duplicates": "error",
      "import-x/no-self-import": "error",
      "import-x/no-useless-path-segments": "warn",
      // uuid@14 ships an exports map the resolver can't follow; the bundler
      // handles real module resolution, not eslint.
      "import-x/no-unresolved": ["error", { ignore: ["^uuid$"] }],

      "no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  {
    files: ["src/**/*.test.{js,jsx}", "src/setupTests.js"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
];
