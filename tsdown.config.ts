import terser from '@rollup/plugin-terser'
import MagicString from 'magic-string'
import treeShakeable from 'rollup-plugin-tree-shakeable'
import { defineConfig } from 'tsdown/config'

export default defineConfig([
  {
    entry: `src/index.js`,
    platform: `neutral`,
    sourcemap: `inline`,
    dts: false,
    publint: true,
    plugins: [
      {
        name: `const-to-let`,
        renderChunk(code) {
          const magicString = new MagicString(code)
          magicString.replaceAll(`const `, `let `)
          return magicString.hasChanged()
            ? {
                code: magicString.toString(),
                map: magicString.generateMap({ hires: true }),
              }
            : null
        },
      },
      terser({
        ecma: 2020,
        module: true,
        toplevel: true,
        compress: {
          passes: 2,
          unsafe: true,
          unsafe_comps: true,
          unsafe_math: true,
        },
        mangle: {
          properties: {
            builtins: true,
            regex: `^_[^_]+`,
          },
        },
      }),
      treeShakeable(),
    ],
  },
  {
    entry: `src/index.d.ts`,
    dts: { emitDtsOnly: true },
  },
])
