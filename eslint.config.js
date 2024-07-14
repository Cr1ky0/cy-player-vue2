const globals = require('globals');
const pluginVue = require('eslint-plugin-vue');
const pluginPrettier = require('eslint-plugin-prettier');
const vueParser = require('vue-eslint-parser');

module.exports = [
  {
    languageOptions: {
      globals: globals.browser,
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: '@babel/eslint-parser',
      },
    },
    files: ['**/*.js', '**/*.vue'],
    ignores: ['**/dist/**', '**/node_modules/**'],
    // recommended.plugins: ['prettier']
  },
  ...pluginVue.configs['flat/essential'],
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-deprecated-destroyed-lifecycle': 'off',
    },
  },
];
