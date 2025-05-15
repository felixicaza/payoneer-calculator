import type { Linter } from 'eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReact from '@eslint-react/eslint-plugin'
import { configs as configsAstro } from 'eslint-plugin-astro'
import pluginJsonc from 'eslint-plugin-jsonc'
import pluginPackageJson from 'eslint-plugin-package-json'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginReactRefresh from 'eslint-plugin-react-refresh'
import pluginYml from 'eslint-plugin-yml'
import neostandard, { plugins, resolveIgnoresFromGitignore } from 'neostandard'
import parserTs from '@typescript-eslint/parser'

export default defineConfig([
  globalIgnores(resolveIgnoresFromGitignore()),
  { languageOptions: { globals: { ...globals.browser, ...globals.node, ...globals.serviceworker } } },
  pluginJs.configs.recommended,
  neostandard({
    noJsx: true,
    ts: true
  }),
  plugins.promise.configs['flat/recommended'],
  plugins['@stylistic'].configs['recommended-flat'],
  pluginJsonc.configs['flat/recommended-with-jsonc'],
  pluginPackageJson.configs.recommended,
  pluginYml.configs['flat/recommended'],
  {
    files: ['src/**/*.tsx'],
    languageOptions: { parser: parserTs, parserOptions: { ecmaFeatures: { jsx: true } } },
    ...pluginReact.configs.recommended,
    ...pluginReactHooks.configs['recommended-latest'],
    ...pluginReactRefresh.configs.recommended
  },
  configsAstro['flat/jsx-a11y-recommended'],
  configsAstro['flat/recommended'],
  {
    files: ['src/**/*.astro'],
    rules: {
      '@stylistic/jsx-one-expression-per-line': ['error', { allow: 'non-jsx' }]
    }
  },
  {
    files: ['src/**/*.astro/*.ts'],
    rules: {
      '@stylistic/indent': ['error', 2]
    }
  },
  {
    rules: {
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/comma-dangle': ['error', 'never'],
      '@stylistic/no-multi-spaces': ['error', { ignoreEOLComments: false }],

      'astro/jsx-a11y/anchor-is-valid': 'warn',

      'yml/indent': ['error', 3, { indicatorValueIndent: 2 }],
      'yml/quotes': ['error', { prefer: 'double' }]
    }
  }
]) as Linter.Config
