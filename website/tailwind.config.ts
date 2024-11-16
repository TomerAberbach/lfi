import type { Config } from 'tailwindcss'

const config = {
  content: [
    `./src/**/*.{js,cjs,mjs,ts,cts,mts,jsx,tsx,html}`,
    `./docusaurus.config.ts`,
  ],
  corePlugins: { preflight: false },
  darkMode: [`selector`, `[data-theme='dark']`],
  theme: {
    extend: {
      colors: {
        smores: {
          '50': `hsl(41, 89%, 96%)`,
          '100': `hsl(42, 86%, 92%)`,
          '200': `hsl(39, 84%, 83%)`,
          '300': `hsl(37, 84%, 72%)`,
          '400': `hsl(33, 83%, 61%)`,
          '500': `hsl(31, 82%, 52%)`,
          '600': `hsl(27, 78%, 48%)`,
          '700': `hsl(24, 77%, 40%)`,
          '800': `hsl(22, 69%, 34%)`,
          '900': `hsl(22, 65%, 28%)`,
          '950': `hsl(20, 70%, 15%)`,
        },
        mud: {
          '50': `#f5f5f1`,
          '100': `#e6e4db`,
          '200': `#cfcbb9`,
          '300': `#b4ab90`,
          '400': `#9e9271`,
          '500': `#8f8163`,
          '600': `#7a6b54`,
          '700': `#665747`,
          '800': `#55483e`,
          '900': `#4b4038`,
          '950': `#2a221e`,
        },
      },
    },
  },
} satisfies Config

export default config
