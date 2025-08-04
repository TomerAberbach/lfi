import CodeBlock from '@theme-original/CodeBlock'
import type CodeBlockType from '@theme/CodeBlock'
import type { WrapperProps } from '@docusaurus/types'
import Link from '@docusaurus/Link'
import { toBase64 } from '@site/src/helpers/base64.ts'

const CodeBlockWrapper = ({
  metastring,
  children,
  ...otherProps
}: Props): JSX.Element => {
  if (!(metastring ?? ``).split(/\s+/u).includes(`playground`)) {
    return <CodeBlock {...otherProps}>{children}</CodeBlock>
  }

  let code: string | null
  if (typeof children === `string`) {
    code = children
  } else if (
    Array.isArray(children) &&
    children.every(child => typeof child === `string`)
  ) {
    code = children.join(``)
  } else {
    code = null
  }

  return (
    <div className='group relative'>
      <CodeBlock {...otherProps}>{children}</CodeBlock>
      {code !== null && (
        <Link
          target='_blank'
          href={`/playground#${toBase64(code)}`}
          className='dark:!bg-mud-800/20 !bg-smores-300/40 !text-smores-950 hover:!text-smores-950 dark:!text-mud-200 dark:hover:!text-mud-200 hover:!bg-smores-300/100 dark:hover:!bg-mud-800/100 !absolute !bottom-3 !right-3 !flex !flex-row !items-center !gap-1.5 !rounded-lg !px-2.5 !py-1.5 !text-sm !opacity-0 !transition !duration-500 !ease-in-out group-hover:!opacity-100'
        >
          Playground <ExternalLinkIcon />
        </Link>
      )}
    </div>
  )
}

const ExternalLinkIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 16 16'
    fill='currentColor'
    className='size-4'
  >
    <path d='M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z' />
    <path d='M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z' />
  </svg>
)

type Props = WrapperProps<typeof CodeBlockType>

declare module '@theme/CodeBlock' {
  // eslint-disable-next-line typescript/consistent-type-definitions
  interface Props {
    readonly playground?: boolean
  }
}

export default CodeBlockWrapper
