/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        notion: {
          text: {
            default: 'var(--ng-color-default)',
            gray: 'var(--ng-color-gray)',
            brown: 'var(--ng-color-brown)',
            orange: 'var(--ng-color-orange)',
            yellow: 'var(--ng-color-yellow)',
            green: 'var(--ng-color-green)',
            blue: 'var(--ng-color-blue)',
            purple: 'var(--ng-color-purple)',
            pink: 'var(--ng-color-pink)',
            red: 'var(--ng-color-red)',
          },
          bg: {
            gray: 'var(--ng-bg-gray)',
            brown: 'var(--ng-bg-brown)',
            orange: 'var(--ng-bg-orange)',
            yellow: 'var(--ng-bg-yellow)',
            green: 'var(--ng-bg-green)',
            blue: 'var(--ng-bg-blue)',
            purple: 'var(--ng-bg-purple)',
            pink: 'var(--ng-bg-pink)',
            red: 'var(--ng-bg-red)',
          }
        }
      },
      fontFamily: {
        notion: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          'sans-serif'
        ],
      },
      letterSpacing: {
        notion: '-0.005em',
      },
      lineHeight: {
        notion: '1.5',
      }
    },
  },
  plugins: [],
};
