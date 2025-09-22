/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: {
          black: '#000000',
          yellow: '#FFE500',
          white: '#FFFFFF',
        },
        
        // Custom Yellow Scale
        yellow: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FFF000',
          500: '#FFE500',
          600: '#E6CE00',
          700: '#CCB800',
          800: '#B3A200',
          900: '#998C00',
        },
        
        // Extended Gray Scale for Dark Theme
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#3A3A3A',
          700: '#2A2A2A',
          800: '#1A1A1A',
          900: '#0A0A0A',
          950: '#050505',
        },
        
        // Semantic Colors
        success: {
          50: '#ECFDF5',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        },
        warning: {
          50: '#FFFBEB',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
        error: {
          50: '#FEF2F2',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
        },
        info: {
          50: '#EFF6FF',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
        },
      },
      
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      
      fontSize: {
        'hero': ['clamp(2rem, 8vw, 8rem)', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        'section': ['clamp(1.5rem, 4vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
      },
      
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(255, 229, 0, 0.2)' },
          '100%': { boxShadow: '0 0 30px rgba(255, 229, 0, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'lines': 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px)',
        'grid': 'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
      },
      
      backgroundSize: {
        'grid': '50px 50px',
      },
      
      backdropBlur: {
        xs: '2px',
      },
      
      borderRadius: {
        'none': '0',
        'xs': '0.125rem',
      },
      
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
      
      scale: {
        '102': '1.02',
        '103': '1.03',
      },
      
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      
      screens: {
        'xs': '475px',
        '3xl': '1680px',
        '4xl': '2048px',
      },
      
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '2/3': '2 / 3',
        '9/16': '9 / 16',
      },
      
      boxShadow: {
        'glow': '0 0 20px rgba(255, 229, 0, 0.3)',
        'glow-lg': '0 0 40px rgba(255, 229, 0, 0.4)',
        'inner-glow': 'inset 0 0 20px rgba(255, 229, 0, 0.1)',
      },
      
      blur: {
        'xs': '2px',
      },
      
      brightness: {
        '25': '.25',
        '175': '1.75',
      },
      
      contrast: {
        '25': '.25',
        '175': '1.75',
      },
      
      grayscale: {
        '50': '.5',
      },
      
      invert: {
        '50': '.5',
      },
      
      saturate: {
        '25': '.25',
        '175': '1.75',
      },
      
      sepia: {
        '25': '.25',
        '75': '.75',
      },
    },
  },
  plugins: [
    // Add any additional plugins here
    function({ addUtilities, addComponents, theme }) {
      addUtilities({
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.writing-vertical': {
          'writing-mode': 'vertical-rl',
          'text-orientation': 'mixed',
        },
        '.safe-top': {
          'padding-top': 'env(safe-area-inset-top)',
        },
        '.safe-bottom': {
          'padding-bottom': 'env(safe-area-inset-bottom)',
        },
        '.focus-ring': {
          '@apply focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-black': {},
        },
      });

      addComponents({
        '.container-main': {
          '@apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8': {},
        },
        '.section-spacing': {
          '@apply py-16 md:py-24 lg:py-32': {},
        },
        '.btn-primary': {
          '@apply bg-yellow-500 text-black px-6 py-3 rounded-none font-medium hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 active:scale-95 focus-ring': {},
        },
        '.btn-secondary': {
          '@apply bg-transparent border border-white text-white px-6 py-3 rounded-none font-medium hover:bg-white hover:text-black transition-all duration-300 focus-ring': {},
        },
        '.btn-ghost': {
          '@apply bg-transparent text-white px-6 py-3 rounded-none font-medium hover:bg-gray-900 transition-all duration-300 focus-ring': {},
        },
        '.input-primary': {
          '@apply bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all duration-300 placeholder:text-gray-500': {},
        },
        '.card-primary': {
          '@apply bg-gray-900 border border-gray-800 p-6 rounded-none hover:border-gray-700 transition-all duration-300': {},
        },
        '.card-highlight': {
          '@apply bg-gradient-to-br from-gray-900 to-gray-800 border border-yellow-500/20 p-6 rounded-none hover:border-yellow-500/40 transition-all duration-300': {},
        },
        '.text-gradient': {
          '@apply bg-gradient-to-r from-yellow-500 to-yellow-400 bg-clip-text text-transparent': {},
        },
        '.text-hero': {
          '@apply text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight': {},
        },
        '.text-section': {
          '@apply text-2xl md:text-3xl lg:text-4xl font-semibold': {},
        },
        '.bg-lines': {
          'background-image': 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px)',
        },
        '.bg-grid': {
          'background-image': 'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
          'background-size': '50px 50px',
        },
      });
    },
  ],
  darkMode: 'class',
};