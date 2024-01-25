/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme'

export const breakpoints = {
  xs: '320px',
  sm: '575px',
  md: '768px',
  lg: '976px',
  xl: '1280px',
}

export const colors = {
  primary: {
    light: '#E0EDE4',
    base: '#A8C3B0',
    dark: '#82B08C',
  },
  neutral: {
    white: '#FFFFFF',
    lighter: '#F6F5FF',
    light: '#F4F4F4',
    base: '#D9D9D9',
    dark: '#686A8A',
    darker: '#303030',
  },
  error: {
    dark: '#BB2929',
    base: '#E03939',
    light: '#FB7171',
  },
}

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: { ...breakpoints },
      fontFamily: {
        SF: ['SF UI Text', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        ...colors,
      },
    },
  },
  plugins: [],
}
