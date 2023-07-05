import { defineConfig } from '@vite-pwa/assets-generator/config'

const defaultSizes = [48, 72, 96, 128, 144, 152, 192, 256, 384, 512]

export default defineConfig({
  preset: {
    transparent: {
      sizes: defaultSizes,
      favicons: [[16, 32, 48, 'favicon.ico']]
    },
    maskable: {
      sizes: defaultSizes
    },
    apple: {
      sizes: [60, 76, 120, 152, 180]
    }
  },
  images: ['public/favicon.png']
})
