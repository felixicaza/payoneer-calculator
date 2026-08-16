// oxlint-disable eslint-js/camelcase

import { defineConfig, fontProviders } from 'astro/config'

import { URL, TITLE, DESCRIPTION, COLOR, PWA_ICONS_SIZES, PWA_APPLE_ICONS_SIZES } from './src/data/constants'

import { composeVisitors } from 'lightningcss'
import pxtorem from 'lightningcss-plugin-pxtorem'

import preact from '@astrojs/preact'
import sitemap from 'astro-sitemap'
import playformCompress from '@playform/compress'
import playformInline from '@playform/inline'
import compressor from 'astro-compressor'
import AstroPWA from '@vite-pwa/astro'

import { createAppleSplashScreens } from '@vite-pwa/assets-generator/config'

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
      transformer: 'lightningcss',
      lightningcss: {
        visitor: composeVisitors([pxtorem()])
      }
    }
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'DM Sans',
      cssVariable: '--dm-sans',
      weights: ['100 700']
    }
  ],
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
            url: `${URL}/manifest.webmanifest`
          }
        ]
      },
      pwaAssets: {
        image: 'public/pwa-icon-512x512.png',
        preset: {
          assetName(type, { width, height }) {
            if (type === 'transparent') return `pwa-icon-${width}x${height}.png`
            if (type === 'maskable') return `pwa-icon-maskable-${width}x${height}.png`
            if (type === 'apple') return `apple-touch-icon-${width}x${height}.png`
            return `pwa-${width}x${height}.png`
          },
          transparent: {
            padding: 0.1,
            sizes: PWA_ICONS_SIZES,
            favicons: [[16, 'favicon-16x16.png'], [32, 'favicon-32x32.png'], [48, 'favicon.ico']]
          },
          maskable: {
            padding: 0.1,
            sizes: PWA_ICONS_SIZES,
            resizeOptions: { background: 'transparent' }
          },
          apple: {
            padding: 0.1,
            sizes: PWA_APPLE_ICONS_SIZES,
            resizeOptions: { background: 'transparent' }
          },
          appleSplashScreens: createAppleSplashScreens({
            resizeOptions: { background: COLOR }
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
    compressor({ gzip: false })
  ]
})
