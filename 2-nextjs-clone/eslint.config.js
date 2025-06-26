import globals from 'globals';
import { defineConfig } from 'eslint/config';
import js from '@eslint/js';


export default defineConfig([
  {
    files: ['**/*.js'],

    languageOptions: {
      ecmaVersion: 2025,
      globals: {
        ...globals.node,
        ...globals.nodeBuiltin
      },
    },

    plugins: { js },
    extends: ['js/recommended'],

    rules: {
      'no-unused-vars': 'warn',
      'no-undef':       'warn',
    },
  },
]);