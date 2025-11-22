import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        colombia: {
          yellow: '#FCD116',
          blue: '#003893',
          red: '#CE1126',
        },
      },
    },
  },
  plugins: [],
}
export default config
