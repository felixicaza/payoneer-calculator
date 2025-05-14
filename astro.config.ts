import { defineConfig } from 'astro/config'

import react from '@astrojs/react'
import sitemap from 'astro-sitemap'
import playformCompress from '@playform/compress'
import compressor from 'astro-compressor'
import AstroPWA from '@vite-pwa/astro'
import tailwindcss from '@tailwindcss/vite'

const websiteURL = 'https://payoneer-calculator.web.app/'

// https://astro.build/config
export default defineConfig({
  site: websiteURL,
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
    },
    plugins: [tailwindcss()]
  },
  integrations: [
    react(),
    AstroPWA({
      mode: 'development',
      base: '/',
      scope: '/',
      includeAssets: ['/favicons/android-chrome-512x512.png'],
      registerType: 'autoUpdate',
      manifest: {
        name: 'Calculadora Payonner',
        short_name: 'Calculadora Payoneer',
        description:
          'Calcula de manera FÁCIL, RÁPIDA Y SEGURA, todas las COMISIONES DE PAYONEER Y DEL BANCO aplicadas al momento de realizar un retiro de un CAJERO ATM en Nicaragua.',
        dir: 'ltr',
        lang: 'es',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffece5',
        theme_color: '#ffece5',
        icons: [
          {
            src: '/manifest/icon-48x48.png',
            sizes: '48x48',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/manifest/maskable-icon-48x48.png',
            sizes: '48x48',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/manifest/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/manifest/maskable-icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/manifest/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/manifest/maskable-icon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/manifest/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/manifest/maskable-icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/manifest/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/manifest/maskable-icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/manifest/icon-152x152.png',
            sizes: '152x152',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/manifest/maskable-icon-152x152.png',
            sizes: '152x152',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/manifest/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/manifest/maskable-icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/manifest/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/manifest/maskable-icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/manifest/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/manifest/maskable-icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/manifest/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/manifest/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        navigateFallback: '/',
        globPatterns: ['./**/*.{css,js,html,svg,png,ico,txt}']
      },
      devOptions: {
        enabled: true,
        navigateFallbackAllowlist: [/^\//]
      },
      experimental: {
        directoryAndTrailingSlashHandler: true
      }
    }),
    sitemap({
      canonicalURL: websiteURL,
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
      // Remove trailing slash
      serialize(item) {
        item.url = item.url.replace(/\/$/g, '')
        return item
      }
    }),
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
