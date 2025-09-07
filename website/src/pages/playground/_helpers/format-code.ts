import estreePrettierPlugin from 'prettier/plugins/estree'
import typescriptPrettierPlugin from 'prettier/plugins/typescript'
import { format as prettierFormat } from 'prettier/standalone'

const formatCode = async (code: string): Promise<string> =>
  await prettierFormat(code, {
    parser: `typescript`,
    plugins: [estreePrettierPlugin, typescriptPrettierPlugin],
    arrowParens: `avoid`,
    bracketSameLine: false,
    bracketSpacing: true,
    embeddedLanguageFormatting: `auto`,
    endOfLine: `lf`,
    htmlWhitespaceSensitivity: `ignore`,
    jsxSingleQuote: true,
    printWidth: 80,
    proseWrap: `always`,
    quoteProps: `as-needed`,
    semi: false,
    singleAttributePerLine: false,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: `all`,
    useTabs: false,
  })

export default formatCode
