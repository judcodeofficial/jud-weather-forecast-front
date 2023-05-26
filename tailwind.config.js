/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'oswald': ['var(--font-oswald)'],
        'comme': ['var(--font-comme)']
      },
      colors: {
        'jud-primary': {
          light: '#EFEFEF',
          DEFAULT: '#001E3C',
          dark: '#001E3C'
        },
        'jud-secondary': {
          light: '#000000',
          DEFAULT: '#132F4C',
          dark: '#132F4C'
        },
      },
    },
  },
  plugins: [], 
}
