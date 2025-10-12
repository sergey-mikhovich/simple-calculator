const js = require('@eslint/js');
const globals = require('globals');
const prettier = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');
const { defineConfig } = require("eslint/config");

module.exports = defineConfig([
    js.configs.recommended,
    {
        ignores: [
            "**/*",
            "!src/**",
        ],
    },
    {
        files: ['src/**/*.js'],
        languageOptions: {
            ecmaVersion: 2024,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.es2021,
            },
        },
        plugins: {
            prettier,
        },
        rules: {
            ...prettierConfig.rules,
            'prettier/prettier': 'error',
            'no-unused-vars': 'warn',
            'no-console': 'off',
            'prefer-const': 'error',
            'no-var': 'error',
            'arrow-spacing': ['error', { before: true, after: true }],
            'comma-dangle': ['error', 'always-multiline'],
            'quotes': ['error', 'single', { avoidEscape: true }],
        },
    },
]);