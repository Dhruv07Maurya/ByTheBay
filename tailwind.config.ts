import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: 'var(--font-outfit)',
        playfair: 'var(--font-playfair)',
      },
      colors: {
        cream: '#f3f0ea',
        'dark-900': '#111111',
        'dark-top': '#1a1a1a',
        brown: '#8b6f47',
        'brown-warm': '#8b6f47',
        'brown-800': '#3b1f14',
        'gray-light': '#e8e6e1',
        'gray-med': '#d0ccbf',
        'gray-dark': '#6b6057',
      },
      spacing: {
        'safe': 'env(safe-area-inset-bottom)',
      },
      opacity: {
        '2': '0.02',
        '3': '0.03',
      },
    },
  },
  plugins: [],
}

export default config
