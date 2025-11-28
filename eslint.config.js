import { defineConfig } from 'eslint-define-config'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

export default defineConfig({
  extends: [
    '@nuxt/eslint-config',
    'plugin:vue/vue3-recommended'
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'prefer-const': 'warn',
    'no-console': 'warn'
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es2022: true
  }
})