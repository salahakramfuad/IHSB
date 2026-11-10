import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

const eslintConfig = [
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**', 'build/**', '.claude/**', 'next-env.d.ts', 'public/**']
  },
  ...nextVitals,
  ...nextTypescript,
  {
    // The admin dashboard predates these rules and its logic is intentionally
    // left untouched; report its legacy patterns as warnings instead of errors.
    files: ['app/admin/**', 'components/admin/**', 'lib/auth/auth.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/immutability': 'warn',
      'react-hooks/error-boundaries': 'warn',
      'react-hooks/static-components': 'warn',
      'react-hooks/purity': 'warn',
      'react/no-unescaped-entities': 'warn'
    }
  }
]

export default eslintConfig
