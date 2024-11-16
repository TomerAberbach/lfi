import { useColorMode } from '@docusaurus/theme-common'
import MonacoEditor from '@monaco-editor/react'
import type { editor } from 'monaco-editor'
import * as lfi from 'lfi'
import { map, pipe, reduce, toArray } from 'lfi'
import AutoImport from '@kareemkermad/monaco-auto-import'
import type { Monaco } from '@monaco-editor/react'
// @ts-expect-error TypeScript is mad that we're importing a declaration file
// without `import type`
import lfiTypeDeclarations from '!!raw-loader!../../../../../dist/index.d.ts'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import gruvboxMaterialLight from './gruvbox-material-light.json'
import gruvboxMaterialDark from './gruvbox-material-dark.json'
import formatCode from './format-code.ts'
import zooTypeDeclarations from '!!raw-loader!./zoo.d.ts'

const Editor = forwardRef<EditorRef, EditorProps>(
  ({ defaultCode, className }: EditorProps, ref) => {
    const { colorMode } = useColorMode()
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>()

    useImperativeHandle(
      ref,
      () => ({
        get code() {
          return editorRef.current?.getModel()?.getValue() ?? ``
        },
        format: async () => {
          await editorRef.current
            ?.getAction(`editor.action.formatDocument`)!
            .run()
        },
      }),
      [],
    )

    return (
      <MonacoEditor
        className={className}
        height={700}
        defaultLanguage='javascript'
        defaultValue={defaultCode}
        theme={`gruvbox-material-${colorMode}`}
        options={{
          padding: { top: 10, bottom: 10 },
          fontSize: 14,
          tabSize: 2,
          showUnused: false,
          minimap: { enabled: false },
          automaticLayout: true,
          scrollBeyondLastLine: false,
        }}
        beforeMount={configureMonaco}
        onMount={(editor, monaco) => {
          editorRef.current = editor
          configureMonacoEditor(editor, monaco)
        }}
      />
    )
  },
)

export type EditorRef = {
  code: string
  format: () => Promise<void>
}

export type EditorProps = {
  defaultCode: string
  className?: string
}

const configureMonaco = (monaco: Monaco) => {
  monaco.editor.defineTheme(
    `gruvbox-material-light`,
    gruvboxMaterialLight as editor.IStandaloneThemeData,
  )
  monaco.editor.defineTheme(
    `gruvbox-material-dark`,
    gruvboxMaterialDark as editor.IStandaloneThemeData,
  )

  monaco.languages.registerDocumentFormattingEditProvider(`javascript`, {
    provideDocumentFormattingEdits: async model => [
      {
        text: await formatCode(model.getValue()),
        range: model.getFullModelRange(),
      },
    ],
  })

  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSuggestionDiagnostics: true,
  })
  monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    lib: [`esnext`, `webworker`],
    target: monaco.languages.typescript.ScriptTarget.ESNext,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.ESNext,
    noEmit: true,
  })
  monaco.languages.typescript.javascriptDefaults.addExtraLib(
    // eslint-disable-next-line typescript/no-base-to-string
    `declare module 'lfi' { ${String(lfiTypeDeclarations)} }`,
    `lfi`,
  )
  monaco.languages.typescript.javascriptDefaults.addExtraLib(
    `declare module 'zoo' { ${zooTypeDeclarations} }`,
    `zoo`,
  )
}

const configureMonacoEditor = (
  editor: editor.IStandaloneCodeEditor,
  monaco: Monaco,
) =>
  new AutoImport({
    monaco,
    editor,
    spacesBetweenBraces: true,
    doubleQuotes: false,
    semiColon: false,
    alwaysApply: true,
  }).imports.saveFile({
    path: `lfi`,
    imports: pipe(
      Object.entries(lfi),
      map(([name, value]) => ({
        type:
          typeof value === `function`
            ? (`function` as const)
            : (`const` as const),
        name,
      })),
      reduce(toArray()),
    ),
  })

export default Editor
