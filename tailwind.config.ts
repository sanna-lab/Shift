import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        blossom: '#F4ACB7',
        sky: '#CDDCDF',
        parchment: '#EDEDE9',
        seashell: '#F8EDEB',
        periwinkle: '#DCD6F7',
        apricot: '#FFDAB9',
        pink: '#FFCAD4',
        peach: '#FBC4AB',
      },
      boxShadow: {
        soft: '0 20px 45px rgba(15, 23, 42, 0.08)',
      },
      borderRadius: {
        '24': '24px',
      },
    },
  },
  plugins: [],
} satisfies Config;
