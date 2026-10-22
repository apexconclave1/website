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
        // Colours by role, set per palette as CSS variables in globals.css (html[data-palette]).
        // <alpha-value> keeps opacity modifiers like border-soft/20 working.
        deep: 'rgb(var(--c-deep) / <alpha-value>)', // darkest: nav, footer, hero, bottom of dark sections
        ground: 'rgb(var(--c-ground) / <alpha-value>)', // dark base; text on light sections
        soft: 'rgb(var(--c-soft) / <alpha-value>)', // body text on dark; light section background
        bright: 'rgb(var(--c-bright) / <alpha-value>)', // headlines on dark
        accent: 'rgb(var(--c-accent) / <alpha-value>)', // highlight: buttons, lines, labels
        'on-accent': 'rgb(var(--c-on-accent) / <alpha-value>)', // text on accent fills
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
