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
        // Colours by role, set as CSS variables in globals.css: Apex Conclave by default, DIPLOVIA inside .theme-diplovia.
        // <alpha-value> keeps opacity modifiers like border-soft/20 working.
        deep: 'rgb(var(--c-deep) / <alpha-value>)', // darkest step, hover fills
        ground: 'rgb(var(--c-ground) / <alpha-value>)', // page background
        surface: 'rgb(var(--c-surface) / <alpha-value>)', // secondary surfaces, panels
        soft: 'rgb(var(--c-soft) / <alpha-value>)', // body text, hairlines
        bright: 'rgb(var(--c-bright) / <alpha-value>)', // headlines
        accent: 'rgb(var(--c-accent) / <alpha-value>)', // Apex lime, DIPLOVIA gold: buttons, lines, labels
        'on-accent': 'rgb(var(--c-on-accent) / <alpha-value>)', // text on accent fills
        wine: 'rgb(var(--c-wine) / <alpha-value>)', // DIPLOVIA burgundy: fills and artwork only
      },
      fontFamily: {
        sans: ['Rupee', 'var(--font-inter)', 'Inter', 'sans-serif'], // Rupee: ₹ only, from the device font (globals.css)
        display: ['Rupee', 'var(--font-display)', 'system-ui', 'sans-serif'], // Space Grotesk (Apex) or Cormorant Garamond (DIPLOVIA)
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
  // hover: styles only on devices with a pointer, so a tap on a phone never leaves a hover look stuck (Apple HIG review)
  future: { hoverOnlyWhenSupported: true },
  plugins: [],
};

export default config;
