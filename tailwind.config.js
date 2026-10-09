/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#16A34A',
          50: '#EFFBF3',
          100: '#D7F5E0',
          200: '#AFEBC2',
          300: '#7DDBA0',
          400: '#45C57C',
          500: '#16A34A',
          600: '#0F8A3D',
          700: '#0C6E32',
          800: '#0B5629',
          900: '#093F1F',
        },
        secondary: {
          DEFAULT: '#10B981',
          50: '#ECFDF6',
          100: '#D1FAE9',
          500: '#10B981',
          600: '#0D9B6C',
        },
        accent: {
          DEFAULT: '#3B82F6',
          50: '#EEF4FF',
          100: '#DCE8FF',
          500: '#3B82F6',
          600: '#2563EB',
        },
        warn: {
          DEFAULT: '#F59E0B',
          100: '#FEF3D6',
        },
        danger: {
          DEFAULT: '#EF4444',
          100: '#FDE2E2',
        },
        canvas: {
          DEFAULT: '#FAF9F4',
          soil: '#F1EFE5',
        },
        moss: {
          950: '#08110D',
          900: '#0B1712',
          800: '#101F19',
          700: '#162B22',
          600: '#1E3A2D',
        },
        ink: '#0E1712',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      backgroundImage: {
        contour: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Cg fill='none' stroke='%2316A34A' stroke-opacity='0.08' stroke-width='1'%3E%3Cpath d='M0 200 Q100 100 200 200 T400 200'/%3E%3Cpath d='M0 240 Q100 140 200 240 T400 240'/%3E%3Cpath d='M0 280 Q100 180 200 280 T400 280'/%3E%3C/g%3E%3C/svg%3E\")",
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(15, 46, 28, 0.12)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        glow: '0 0 0 1px rgba(22,163,74,0.15), 0 8px 24px rgba(22,163,74,0.18)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        blob: 'blob 12s ease-in-out infinite',
        wave: 'wave 8s linear infinite',
        ripple: 'ripple 0.6s ease-out',
        'pulse-slow': 'pulse 3.5s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        blob: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(30px,-40px) scale(1.08)' },
          '66%': { transform: 'translate(-20px,20px) scale(0.95)' },
        },
        wave: {
          '0%': { backgroundPositionX: '0' },
          '100%': { backgroundPositionX: '1000px' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: 0.6 },
          '100%': { transform: 'scale(4)', opacity: 0 },
        },
      },
      borderRadius: {
        xl2: '1.25rem',
        '3xl': '1.75rem',
      },
    },
  },
  plugins: [],
}
