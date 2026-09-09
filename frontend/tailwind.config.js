/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ashram: {
          cream: '#FDFBF7',
          creamDark: '#F5F2EB',
          card: '#FFFFFF',
          green: '#1C3D2F',
          greenHover: '#142E23',
          saffron: '#D96B27',
          saffronHover: '#B85315',
          gold: '#D4AF37',
          goldLight: '#F3E5AB',
          brown: '#8B5E3C',
          charcoal: '#2C3E35',
          muted: '#65776C',
          border: '#E8E4DA'
        },
        darkAshram: {
          bg: '#0F1412',
          surface: '#16201B',
          card: '#1C2822',
          border: '#2A3C33',
          text: '#F5F2EB',
          muted: '#A5B5AC',
          gold: '#E5C158',
          green: '#2D5A46'
        }
      },
      fontFamily: {
        heading: ['Playfair Display', 'Cormorant Garamond', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        sans: ['Inter', 'Poppins', 'sans-serif'],
        hindi: ['Noto Sans Devanagari', 'sans-serif']
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(28, 61, 47, 0.06), 0 2px 6px -1px rgba(28, 61, 47, 0.04)',
        'card-hover': '0 12px 30px -4px rgba(28, 61, 47, 0.12), 0 4px 12px -2px rgba(28, 61, 47, 0.06)',
        'dark-soft': '0 4px 20px -2px rgba(0, 0, 0, 0.4)',
        'dark-hover': '0 12px 32px -4px rgba(0, 0, 0, 0.6)'
      }
    },
  },
  plugins: [],
}
