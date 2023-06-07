/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      us: '375px',
      xs: '411px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1536px'
    }
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('any-hover', '@media (any-hover: hover) { &:hover }')
      addVariant(
        'group-any-hover',
        '@media (any-hover: hover) { .group:hover & }'
      )
    }
  ]
}
