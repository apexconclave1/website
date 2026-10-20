import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#080909',
        surface: '#141718',
        'soft-white': '#F4F2ED',
        'muted-grey': '#A5A6A2',
        'warm-bronze': '#C7A16A',
        'deep-teal': '#21474D',
        // Borders and raised hover surfaces (design skill: layer 2 and layer 3)
        line: '#1a1d1e',
        'line-strong': '#2a2d2e',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '10px',
        lg: '12px',
        sm: '8px',
      },
      maxWidth: {
        container: '1240px', // design sheet: 1200-1280px
      },
      // Brand ease-out curve; every `transition` class uses it unless it names another
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      keyframes: {
        'step-in': { from: { opacity: '0', transform: 'translateY(8px)' } },
      },
      animation: {
        'step-in': 'step-in 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
};

export default config;
