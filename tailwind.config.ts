import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0D7377',
          light: '#0f8a8f',
          dark: '#095a5d',
          50: '#f0fafa',
          100: '#d0f0f1',
          200: '#a1e1e3',
          300: '#72d2d5',
          400: '#43c3c7',
          500: '#0D7377',
          600: '#0b6164',
          700: '#095051',
          800: '#073e3f',
          900: '#052d2d',
        },
        warmWhite: '#F8F5F0',
        accent: {
          DEFAULT: '#E8A838',
          light: '#f0c060',
          dark: '#c08020',
        },
        emergency: '#DC2626',
        slate: {
          800: '#1E293B',
        },
      },
      fontFamily: {
        heading: ["'Instrument Serif'", 'serif'],
        body: ["'DM Sans'", 'sans-serif'],
      },
      borderRadius: {
        bubble: '16px',
        card: '12px',
      },
      boxShadow: {
        soft: '0 2px 12px rgba(0, 0, 0, 0.08)',
        medium: '0 4px 20px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(13, 115, 119, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(13, 115, 119, 0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
