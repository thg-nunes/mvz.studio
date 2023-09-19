import type { Config } from 'tailwindcss'
import withMT from '@material-tailwind/react/utils/withMT'

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
        orange: {
          700: '#FF3232',
        },
      },
      animation: {
        floating: 'floating linear 750ms infinite',
      },
      keyframes: {
        floating: {
          '0%': {
            marginTop: '0px',
          },
          '25%': {
            marginTop: '2px',
          },
          '50%': {
            marginTop: '0px',
          },
          '75%': {
            marginTop: '-2px',
          },
          '100%': {
            marginTop: '0px',
          },
        },
      },
      boxShadow: {
        '3xl': '0px 0px 10px 5px rgb(0 0 0 / 1)',
      },
    },
  },
  plugins: [],
}

export default withMT(config)
