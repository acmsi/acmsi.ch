import eslintPluginAstro from 'eslint-plugin-astro'
import tseslint from 'typescript-eslint'

export default [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '.astro/**',
      'test-results/**',
      'playwright-report/**',
      'playwright/.cache/**',
      'src/env.d.ts',
    ],
  },
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
]
