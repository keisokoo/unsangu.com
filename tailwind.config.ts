import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const disabledCss = {
  'code::before': false,
  'code::after': false,
  'blockquote p:first-of-type::before': false,
  'blockquote p:last-of-type::after': false,
  pre: false,
  code: false,
  'pre code': false
}
/** @type {import('tailwindcss').Config} */
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    pageSize: {
      1: '1'
    },
    extend: {
      typography: {
        DEFAULT: { css: disabledCss },
        sm: { css: disabledCss },
        lg: { css: disabledCss },
        xl: { css: disabledCss },
        '2xl': { css: disabledCss },
      },
      fontFamily: {
        noto: ['var(--font-noto)'],
        roboto: ['var(--font-roboto)'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          page: (value) => ({
            maxWidth: value,
            width: '100%',
            margin: '0 auto',
          }),
        },
        { values: theme('pageSize') }
      )
    })
  ],
}
export default config
