module.exports = {
  settings: {
    react: {
      version: 'detect'
    }
  },
  parser: '@typescript-eslint/parser',
  plugins: ['unused-imports', 'react-hooks', 'sort-imports-es6-autofix', 'jest'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info']
      }
    ],
    'no-unused-vars': 'warn',
    'no-nested-ternary': 'error',
    'unused-imports/no-unused-imports-ts': 'warn',
    'react/no-unescaped-entities': ['warn'],
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-extra-semi': 'off',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      { allowExpressions: true }
    ],
    'no-extra-semi': 'off',
    'sort-imports-es6-autofix/sort-imports-es6': [
      'warn',
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
      }
    ]
  },
  env: {
    browser: true,
    node: true,
    'jest/globals': true
  }
}
