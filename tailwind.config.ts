import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'coffee': '#2b0f0b',
        'electric-orange': '#ff3300',
        'bone': '#f2e8d5',
        'terracotta': '#d97d54',
        'taupe': '#a89085',
      },
      fontFamily: {
        'syne': ['Syne', 'sans-serif'],
        'mono': ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
