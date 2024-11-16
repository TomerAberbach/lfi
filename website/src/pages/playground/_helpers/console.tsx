import { join, map, pipe } from 'lfi'
import type { ReactElement } from 'react'
import inspect from 'object-inspect'
import type { Log } from './use-sandbox.ts'

const Console = ({ logs }: { logs: Log[] }) => {
  const messages = convertToMessages(logs)
  return (
    <output className='w-full'>
      {messages.map((message, index) => (
        <LogMessage key={index} message={message} />
      ))}
    </output>
  )
}

const convertToMessages = (logs: Log[]): Message[] => {
  const messages: Message[] = []
  const counts = new Map<string, number>()
  const timers = new Map<string, number>()

  for (const { type, args, timestamp, trace } of logs) {
    switch (type) {
      case `debug`:
      case `error`:
      case `info`:
      case `log`:
      case `warn`:
        messages.push({ type, text: formatArgs(args) })
        break

      case `assert`: {
        const [assertion, ...otherArgs] = args
        if (!assertion) {
          messages.push({
            type: `error`,
            text: `Assertion failed: ${otherArgs.length === 0 ? `console.assert` : formatArgs(otherArgs)}`,
          })
        }
        break
      }

      case `clear`:
        messages.length = 0
        break

      case `count`: {
        const label = extractLabel(args)
        const count = (counts.get(label) ?? 0) + 1
        counts.set(label, count)
        messages.push({ type: `log`, text: `${label}: ${count}` })
        break
      }

      case `countReset`: {
        const label = extractLabel(args)
        if (!counts.delete(label)) {
          messages.push({
            type: `warn`,
            text: `Count for ${inspect(label)} does not exist`,
          })
        }
        break
      }

      case `dir`:
        messages.push({ type: `log`, text: formatArgs(args) })
        break

      case `time`: {
        const label = extractLabel(args)
        if (timers.has(label)) {
          messages.push({
            type: `warn`,
            text: `Timer ${inspect(label)} already exists`,
          })
        } else {
          timers.set(label, timestamp)
        }
        break
      }

      case `timeEnd`: {
        const label = extractLabel(args)
        if (timers.has(label)) {
          const elapsed = timestamp - timers.get(label)!
          timers.delete(label)
          messages.push({
            type: `log`,
            text: `${label}: ${elapsed} ms`,
          })
        } else {
          messages.push({
            type: `warn`,
            text: `Timer ${inspect(label)} does not exist`,
          })
        }
        break
      }

      case `timeLog`: {
        const label = extractLabel(args)
        if (timers.has(label)) {
          const elapsed = timers.get(label)! - timestamp
          messages.push({
            type: `log`,
            text: `${label}: ${elapsed} ms`,
          })
        } else {
          messages.push({
            type: `warn`,
            text: `Timer ${inspect(label)} does not exist`,
          })
        }
        break
      }

      case `trace`:
        messages.push(
          trace
            ? {
                type: `log`,
                text: `${args.length === 0 ? `console.trace` : formatArgs(args)}\n${trace}`,
              }
            : { type: `warn`, text: `Failed to get trace` },
        )
        break
    }
  }

  return messages
}

type Message = {
  type: `debug` | `error` | `info` | `log` | `warn`
  text: string
}

const extractLabel = (args: unknown[]): string => {
  const [labelArg] = args
  return typeof labelArg === `string` ? labelArg : `default`
}

const formatArgs = (args: unknown[]): string =>
  pipe(
    args,
    map(arg => (typeof arg === `string` ? arg : inspect(arg, { indent: 2 }))),
    join(` `),
  )

const LogMessage = ({ message }: { message: Message }) => (
  <div className='flex p-2 px-4 gap-3 w-full'>
    {ICONS.get(message.type)}
    <pre className='w-full text-sm bg-transparent p-0 m-0 overflow-x-auto'>
      {message.text}
    </pre>
  </div>
)

/* eslint-disable react/jsx-key */
const ICONS: ReadonlyMap<Message[`type`], ReactElement> = new Map([
  [
    `error`,
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 20 20'
      className='size-5 fill-red-400'
    >
      <path
        fillRule='evenodd'
        d='M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z'
        clipRule='evenodd'
      />
    </svg>,
  ],
  [
    `info`,
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 20 20'
      fill='currentColor'
      className='size-5'
    >
      <path
        fillRule='evenodd'
        d='M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z'
        clipRule='evenodd'
      />
    </svg>,
  ],
  [
    `warn`,
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 20 20'
      className='size-5 fill-yellow-600'
    >
      <path
        fillRule='evenodd'
        d='M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z'
        clipRule='evenodd'
      />
    </svg>,
  ],
])
/* eslint-enable react/jsx-key */

export default Console
