import { format as prettierFormat } from 'prettier/standalone'
import typescriptPrettierPlugin from 'prettier/plugins/typescript'
import estreePrettierPlugin from 'prettier/plugins/estree'
import prettierConfig from '@tomer/prettier-config'
import type { Config } from 'prettier'

const formatCode = async (code: string): Promise<string> =>
  await prettierFormat(code, {
    parser: `typescript`,
    plugins: [estreePrettierPlugin, typescriptPrettierPlugin],
    ...(prettierConfig as Config),
  })

export default formatCode
