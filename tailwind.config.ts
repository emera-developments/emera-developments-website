import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
    './app/error.vue',
  ],
  // Enable RTL variants (e.g. rtl:text-right, ltr:text-left)
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Cairo', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Cairo', 'ui-serif', 'Georgia', 'serif'],
        arabic: ['Cairo', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#f0f4ff',
          100: '#dce6ff',
          200: '#b8ccff',
          300: '#85a8ff',
          400: '#4d7aff',
          500: '#1a50ff',
          600: '#0033e6',
          700: '#0028b8',
          800: '#001f8a',
          900: '#001263',
          950: '#000a3d',
        },
        gold: {
          400: '#d4a843',
          500: '#c49a2e',
          600: '#a67f20',
        },
      },
      screens: {
        xs: '375px',
      },
    },
  },
  plugins: [],
} satisfies Config
