import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: '#0b0b0d',
        gold: {
          DEFAULT: '#c9a227',
          soft: '#e5c766',
          deep: '#8a6f14',
        },
      },
      fontFamily: {
        sans: ['var(--font-vazirmatn)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 0 40px -10px rgba(201,162,39,0.45)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config