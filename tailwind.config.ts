import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        black: '#16181E',
        gray: {
          100: '#F9F9F9',
          900: '#21242D',
        },
        cyan: {
          500: '#00B9AE',
        },
      },
    },
  },
  plugins: [],
}
export default config
