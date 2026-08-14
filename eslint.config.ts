import { felixicaza } from '@felixicaza/eslint-config'

import pluginReact from '@eslint-react/eslint-plugin'
import pluginReactHooksExtra from 'eslint-plugin-react-hooks-extra'
import pluginReactRefresh from 'eslint-plugin-react-refresh'
import parserTs from '@typescript-eslint/parser'

export default felixicaza({}, [
  pluginReact.configs.recommended,
  pluginReactHooksExtra.configs.recommended,
  pluginReactRefresh.configs.recommended,
  {
    files: ['src/**/*.tsx'],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: { jsx: true }
      }
    }
  },
  {
    files: ['src/**/*.astro'],
    rules: {
      '@eslint-react/no-missing-key': 'off'
    }
  },
  {
    rules: {
      'astro/no-unused-css-selector': 'off'
    }
  }
])
