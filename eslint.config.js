import { defineFlatConfig } from 'eslint-define-config'
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default defineFlatConfig(
  await createConfigForNuxt(
    {},
    {
      rules: {
        'vue/multi-word-component-names': 'off',
        'vue/html-self-closing': 'off',
        'vue/attributes-order': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        'prefer-const': 'warn',
        'no-console': 'warn'
      }
    }
  )
)
