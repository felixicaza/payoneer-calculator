import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Payoneer Calculator',
        short_name: 'Payoneer Calculator',
        theme_color: '#ffece5',
        background_color: '#ffece5',
        dir: 'ltr',
        id: 'payoneer-calculator',
        scope: '/',
        orientation: 'portrait',
        icons: [
          {
            src: '/pwa-48x48.png',
            sizes: '48x48',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/maskable-icon-48x48.png',
            sizes: '48x48',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/pwa-72x72.png',
            sizes: '72x72',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/maskable-icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/pwa-96x96.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/maskable-icon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/pwa-128x128.png',
            sizes: '128x128',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/maskable-icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/pwa-144x144.png',
            sizes: '144x144',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/maskable-icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/pwa-152x152.png',
            sizes: '152x152',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/maskable-icon-152x152.png',
            sizes: '152x152',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/maskable-icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/pwa-256x256.png',
            sizes: '256x256',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/maskable-icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/pwa-384x384.png',
            sizes: '384x384',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/maskable-icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        navigateFallback: '/',
        globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}']
      },
      devOptions: {
        enabled: true,
        navigateFallbackAllowlist: [/^\/$/]
      }
    })
  ]
})
