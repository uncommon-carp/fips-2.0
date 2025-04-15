import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      // 👇 Prettier's formatting rules as ESLint errors
      'prettier/prettier': ['error', { singleQuote: true }],
    },
  },
  // 👇 This disables rules that conflict with Prettier
  prettier,
);
