module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  ignorePatterns: ['**/output/*', '**/example/*', '**/dist/*'],
  extends: ['airbnb-typescript/base'],
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  rules: {
    'comma-dangle': ['error', 'never'],
    '@typescript-eslint/comma-dangle': ['error', 'never'],
    'import/no-extraneous-dependencies': 'off'
  }
};
