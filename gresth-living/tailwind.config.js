/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black:   '#0D0D0D',
        dark: {
          DEFAULT: '#141414',
          2:       '#1C1C1C',
          3:       '#242424',
        },
        cream: {
          DEFAULT: '#F5F0E8',
          dark:    '#EDE5D0',
          border:  'rgba(201,168,76,0.15)',
        },
        gold: {
          DEFAULT: '#C9A84C',
          hover:   '#9A7A30',
          light:   '#E8C96A',
          pale:    'rgba(201,168,76,0.12)',
          muted:   '#9A7A30',
        },
        charcoal: {
          DEFAULT: '#1A1A1A',
          mid:     'rgba(255,255,255,0.65)',
          light:   'rgba(255,255,255,0.45)',
        },
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        sans:     ['Manrope', 'sans-serif'],
      },
      borderRadius: {
        'btn':  '8px',
        'card': '12px',
        'xl2':  '16px',
      },
      boxShadow: {
        'gold':       '0 4px 24px rgba(201,168,76,0.25)',
        'gold-lg':    '0 8px 48px rgba(201,168,76,0.35)',
        'card':       '0 2px 24px rgba(0,0,0,0.40)',
        'card-hover': '0 16px 56px rgba(0,0,0,0.60)',
        'nav':        '0 2px 32px rgba(0,0,0,0.50)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg,#9A7A30 0%,#C9A84C 45%,#E8C96A 70%,#C9A84C 100%)',
        'dark-gradient': 'linear-gradient(180deg,#0D0D0D 0%,#141414 100%)',
      },
    },
  },
  plugins: [],
}
