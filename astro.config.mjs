import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'

const websiteURL = 'https://payoneer-calculator.web.app/'

// https://astro.build/config
export default defineConfig({
  site: websiteURL,
  trailingSlash: 'never',
  server: {
    host: true
  },
  integrations: [
    tailwind({
      applyBaseStyles: false
    }),
    react()
  ]
})
