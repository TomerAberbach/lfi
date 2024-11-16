/* eslint-disable typescript/no-misused-promises */
import Layout from '@theme/Layout'
import { useRef, useState } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import Heading from '@theme/Heading'
import { useHistory } from '@docusaurus/router'
import { useSpinDelay } from 'spin-delay'
import { fromBase64, toBase64 } from '@site/src/helpers/base64.ts'
import { ClipLoader } from 'react-spinners'
import dedent from 'dedent'
import useSandbox from './_helpers/use-sandbox.ts'
import type { Sandbox } from './_helpers/use-sandbox.ts'
import type { EditorRef } from './_helpers/editor.tsx'
import Editor from './_helpers/editor.tsx'
import Console from './_helpers/console.tsx'

const PlaygroundPage = () => (
  <Layout title='Playground' wrapperClassName='flex flex-col'>
    <Playground />
  </Layout>
)

const Playground = () => {
  const editorRef = useRef<EditorRef>(null)
  const defaultCode = useDefaultCode()
  const sandbox = useSandbox()

  const isRunning = useSpinDelay(sandbox.isRunning, {
    delay: 0,
    minDuration: 200,
  })

  return (
    <>
      <Heading as='h1' className='text-2xl m-4'>
        Playground
      </Heading>
      <div className='flex flex-col lg:flex-row w-full'>
        <div className='flex flex-col flex-1 lg:w-[60%] h-[700px]'>
          {editorRef.current ? (
            <EditorToolbar
              editor={editorRef.current}
              sandbox={sandbox}
              isRunning={isRunning}
            />
          ) : null}
          <Editor ref={editorRef} defaultCode={defaultCode} />
        </div>
        <div className='h-[700px] lg:w-[40%]'>
          <EditorConsole sandbox={sandbox} isRunning={isRunning} />
        </div>
      </div>
    </>
  )
}

const useDefaultCode = (): string => {
  const { location } = useHistory()

  const { hash } = location
  if (!hash) {
    return DEFAULT_CODE
  }

  try {
    return fromBase64(hash.slice(1))
  } catch {
    return DEFAULT_CODE
  }
}

const DEFAULT_CODE = dedent`
  import { filter, map, pipe, reduce, toArray } from 'lfi'

  const messySlothDiaryEntries = [
    [\`Strawberry\`, \`slept\`],
    [\`max\`, \`ate  \`],
    [\`max\`, \`\`],
    [\`STRAWBERRY\`, \`climbed\`],
    [\`Bitsy\`, \`ate\`],
    [\`bitsy\`, \`strolled\`],
    [\`strawberry\`, \`Slept\`],
    [\`Bitsy\`, \`  \`],
  ]

  const cleanSlothDiaryEntries =
    // Pass the entries through each operation in order, and then return the last
    // operation's result
    pipe(
      messySlothDiaryEntries,
      // Transform each entry by trimming and lowercasing strings
      map(([sloth, activity]) => [
        sloth.toLowerCase(),
        activity.trim().toLowerCase(),
      ]),
      // Remove each entry that has an empty activity
      filter(([, activity]) => activity.length > 0),
      // Collect the clean entries into an array
      reduce(toArray()),
    )

  console.log(cleanSlothDiaryEntries)
  //=> [
  //=>   [ 'strawbery', 'slept' ],
  //=>   [ 'max', 'ate' ],
  //=>   [ 'strawbery', 'climbed' ],
  //=>   [ 'bitsy', 'ate' ],
  //=>   [ 'bitsy', 'strolled' ],
  //=>   [ 'strawbery', 'slept' ],
  //=> ]
`

const EditorToolbar = ({
  editor,
  sandbox,
  isRunning,
}: {
  editor: EditorRef
  sandbox: Sandbox
  isRunning: boolean
}) => {
  const timeoutHandleRef = useRef<number | null>(null)
  const [copiedLink, setCopiedLink] = useState(false)

  return (
    <div className='bg-smores-200 dark:bg-mud-950 w-[calc(100%-1px)] flex px-2 gap-2'>
      <EditorToolbarButton
        onClick={() =>
          sandbox.isRunning ? sandbox.cancel() : sandbox.run?.(editor.code)
        }
      >
        {isRunning ? `Cancel` : `Run`}
      </EditorToolbarButton>
      <EditorToolbarButton onClick={() => editor.format()}>
        Format
      </EditorToolbarButton>
      <EditorToolbarButton
        onClick={async () => {
          const playgroundUrl = createPlaygroundUrl(editor.code)
          await navigator.clipboard.writeText(String(playgroundUrl))
          window.location.hash = playgroundUrl.hash

          setCopiedLink(true)
          if (timeoutHandleRef.current) {
            window.clearTimeout(timeoutHandleRef.current)
          }
          timeoutHandleRef.current = window.setTimeout(
            () => setCopiedLink(false),
            3000,
          )
        }}
      >
        {copiedLink ? `Link copied!` : `Copy link`}
      </EditorToolbarButton>
    </div>
  )
}

const createPlaygroundUrl = (code: string): URL =>
  new URL(`/playground#${toBase64(code)}`, window.location.href)

const EditorToolbarButton = (
  props: ButtonHTMLAttributes<HTMLButtonElement>,
) => (
  <button
    type='button'
    {...props}
    className='bg-transparent border-none text-[0.9375rem] font-semibold cursor-pointer dark:hover:bg-mud-900 hover:bg-smores-300 py-2.5 h-10'
  />
)

const EditorConsole = ({
  sandbox,
  isRunning,
}: {
  sandbox: Sandbox
  isRunning: boolean
}) => (
  <div className='flex flex-col w-[calc(100%+1.5px)] h-full bg-[#fbf0c6] dark:bg-[#292828] border-l-[1.5px] -translate-x-[1.5px] dark:border-mud-900 border-smores-300 border-r-0 border-y-0 border-solid'>
    <Heading
      as='h2'
      className='py-2.5 text-[0.9375rem] px-2 dark:bg-mud-950 bg-smores-200 h-10 mb-2 flex items-center gap-2'
    >
      Output
      {isRunning ? (
        <ClipLoader color='currentColor' size={14} aria-label='Running...' />
      ) : null}
    </Heading>
    <div className='overflow-y-auto h-[calc(100%-3rem)] flex-grow-0 max-w-full'>
      <Console logs={sandbox.logs} />
    </div>
  </div>
)

export default PlaygroundPage
