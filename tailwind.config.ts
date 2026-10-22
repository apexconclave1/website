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
        // Brand palette (owner brief, 2026-10-22). No other colours.
        ink: '#0C0C0D', // dark backgrounds: hero, nav, footer
        cream: '#EAE6DF', // logo, text on ink, light sections
        bronze: '#8C7B5A', // accents only: thin lines, icons, highlights
        paper: '#F4F1EA', // alternate light sections
        stone: '#6E6A62', // secondary text on paper only (fails contrast on ink; use cream/70 there)
        hairline: '#CFC9BD', // borders on paper (on ink use cream/10 to cream/30)
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        serif: ['var(--font-newsreader)', 'Newsreader', 'Georgia', 'serif'],
      },
      borderRadius: {
        // 2px everywhere (owner decision)
        DEFAULT: '2px',
        sm: '2px',
        md: '2px',
        lg: '2px',
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
