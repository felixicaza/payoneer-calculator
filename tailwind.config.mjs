import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    screens: {
      xs: '576px',
      ...defaultTheme.screens
    }
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('any-hover', '@media (any-hover: hover) { &:hover }')
    }
  ]
}
