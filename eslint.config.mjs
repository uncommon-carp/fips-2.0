// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
    },
  },
  {
    files: ['webpack.sls.ts'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
);
