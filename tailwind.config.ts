import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: 'var(--brand)',
        accent: 'var(--accent)',
        ink: 'var(--ink)',
        bg: 'var(--bg)'
      },
        borderRadius: {
          'card': '1.25rem'
        },
        boxShadow: {
          'soft': '0 10px 25px rgba(0,0,0,0.06)'
        }
    },
  },
  plugins: [],
}
export default config
