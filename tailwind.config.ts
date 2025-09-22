import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: 'var(--brand)',
        accent: 'var(--accent)',
        ink: 'var(--ink)',
        bg: 'var(--bg)',
      },
      borderRadius: { card: '1.25rem' },
      boxShadow: {
        soft: '0 12px 30px rgba(0,0,0,0.08)',
        lift: '0 10px 20px rgba(0,0,0,0.10)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
    },
  },
  plugins: [],
}
export default config
