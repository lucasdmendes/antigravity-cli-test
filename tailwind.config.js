/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        terminal: {
          green: {
            bg: '#070d0a',
            surface: '#0f1a14',
            border: '#1b3829',
            text: '#4ade80',
            bright: '#86efac',
            muted: '#227248',
            accent: '#10b981',
          },
          amber: {
            bg: '#0e0b06',
            surface: '#1c150b',
            border: '#3c2912',
            text: '#fbbf24',
            bright: '#fde68a',
            muted: '#925816',
            accent: '#f59e0b',
          },
          slate: {
            bg: '#0a0d14',
            surface: '#111827',
            border: '#1f293d',
            text: '#93c5fd',
            bright: '#e0f2fe',
            muted: '#3b82f6',
            accent: '#0ea5e9',
          },
        },
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
