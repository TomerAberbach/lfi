import { rollup } from '@rollup/browser'
import lfiSource from '!!raw-loader!lfi'
import pFilterSource from '!!raw-loader!p-filter'
import pMapSource from '!!raw-loader!p-map'
import zooSource from '!!raw-loader!./zoo.js'

const bundleCode = async (code: string): Promise<string> => {
  const input = `index.ts`
  const modules = new Map([
    [input, code],
    [`zoo`, zooSource],
    [`lfi`, lfiSource],
    [`p-filter`, pFilterSource],
    [`p-map`, pMapSource],
  ])

  const bundle = await rollup({
    input,
    plugins: [
      {
        name: `loader`,
        resolveId: source => (modules.has(source) ? source : undefined),
        load: id => modules.get(id),
      },
    ],
    onwarn: () => {},
  })
  const { output } = await bundle.generate({ format: `es` })

  return output[0].code
}

export default bundleCode
