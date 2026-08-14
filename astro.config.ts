// oxlint-disable eslint-js/camelcase

import { defineConfig } from 'astro/config'

import { URL, TITLE, DESCRIPTION, COLOR, ICONS_SIZES } from './src/data/constants'

import preact from '@astrojs/preact'
import sitemap from 'astro-sitemap'
import playformCompress from '@playform/compress'
import playformInline from '@playform/inline'
import compressor from 'astro-compressor'
import AstroPWA from '@vite-pwa/astro'

import { createAppleSplashScreens, minimal2023Preset } from '@vite-pwa/assets-generator/config'

export default defineConfig({
  site: URL,
  trailingSlash: 'never',
  server: {
    host: true
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },
  compressHTML: false,
  vite: {
    css: {
      transformer: 'lightningcss'
    }
  },
  integrations: [
    preact(),
    AstroPWA({
      base: '/',
      scope: '/',
      registerType: 'autoUpdate',
      manifest: {
        id: 'payoneer-calculator',
        name: TITLE,
        short_name: TITLE,
        description: DESCRIPTION,
        dir: 'ltr',
        lang: 'es',
        display: 'standalone',
        orientation: 'portrait',
        background_color: COLOR,
        theme_color: COLOR,
        scope: '/',
        start_url: '/?utm_source=web_app',
        related_applications: [
          {
            platform: 'webapp',
            url: 'https://payoneer-calculator.web.app/manifest.webmanifest'
          }
        ]
      },
      pwaAssets: {
        image: 'public/maskable-icon-512x512.png',
        preset: {
          ...minimal2023Preset,
          appleSplashScreens: createAppleSplashScreens({
            resizeOptions: { background: '#ffece5', fit: 'contain' },
            linkMediaOptions: {
              log: true,
              addMediaScreen: true,
              basePath: '/',
              xhtml: false
            },
            png: {
              compressionLevel: 9,
              quality: 60
            },
            name: (landscape, size) => {
              return `apple-splash-${landscape ? 'landscape' : 'portrait'}-${size.width}x${size.height}.png`
            }
          }, [
            'iPhone 16', 'iPhone 16 Plus', 'iPhone 16 Pro', 'iPhone 16 Pro Max',
            'iPhone 15', 'iPhone 15 Plus', 'iPhone 15 Pro', 'iPhone 15 Pro Max',
            'iPhone 14', 'iPhone 14 Plus', 'iPhone 14 Pro', 'iPhone 14 Pro Max',
            'iPad 11"', 'iPad Air 11"', 'iPad Pro 11"'
          ])
        }
      },
      workbox: {
        navigateFallback: '/',
        globPatterns: ['./**/*.{html,css,js,svg,png}']
      },
      devOptions: {
        enabled: true
      },
      experimental: {
        directoryAndTrailingSlashHandler: true
      }
    }),
    sitemap({
      canonicalURL: URL,
      lastmod: new Date(),
      createLinkInHead: false,
      xmlns: {
        news: false,
        video: false,
        image: false,
        xhtml: true
      },
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es'
        }
      },
      serialize(item) {
        item.url = item.url.replace(/\/$/g, '') // remove trailing slash
        return item
      }
    }),
    playformInline(),
    playformCompress({
      HTML: {
        'html-minifier-terser': {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          maxLineLength: 0,
          minifyCSS: true,
          minifyJS: true,
          minifyURLs: true,
          noNewlinesBeforeTagClose: true,
          removeAttributeQuotes: false,
          removeComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          sortAttributes: true,
          sortClassName: true,
          useShortDoctype: true
        }
      },
      JavaScript: {
        terser: {
          compress: {
            arguments: true,
            drop_console: true
          },
          format: {
            comments: false,
            indent_level: 2
          },
          ecma: 2020
        }
      },
      Cache: true,
      CSS: false,
      Image: false,
      SVG: false
    }),
    compressor()
  ]
})
