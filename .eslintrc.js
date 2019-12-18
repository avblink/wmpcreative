module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jquery: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    // '@nuxtjs',
    // 'plugin:nuxt/recommended',
    'plugin:vue/recommended',
    'eslint:recommended',
    'prettier/vue',
    'plugin:prettier/recommended'
  ],
  // add your custom rules here
  rules: {
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-v-html': 'off'
  },
  globals: {
    $nuxt: true,
    lightcase: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
};
