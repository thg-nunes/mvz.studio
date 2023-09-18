import type { Config } from 'tailwindcss'
import withMT from '@material-tailwind/react/utils/withMT'

const config: Config = withMT({
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
        orange: {
          700: '#FF3232',
        },
      },
    },
  },
  plugins: [],
})
export default config
