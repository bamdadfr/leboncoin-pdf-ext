// @ts-check

/**
 * @type {import('eslint').Linter.Config}
 **/
module.exports = {
  plugins: ['simple-import-sort'],
  extends: ['next/core-web-vitals', 'next/typescript'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
    'react/jsx-curly-brace-presence': ['error', 'never'],
  },
};
