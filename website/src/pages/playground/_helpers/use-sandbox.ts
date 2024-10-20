/* eslint-disable new-cap */
import { useEffect, useMemo, useState } from 'react'
import type { WorkerBox } from 'workerboxjs'
import createWorkerBox from 'workerboxjs'
import { map, pipe, reduce, toObject } from 'lfi'
import bundleCode from './bundle-code.ts'

const useSandbox = (): Sandbox => {
  const [workerBox, setWorkerBox] = useState<WorkerBox | null>(null)
  const [isRunning, setRunning] = useState(false)
  const [logs, setLogs] = useState<Log[]>([])

  useEffect(() => {
    if (!workerBox) {
      void (async () => {
        setWorkerBox(await createWorkerBox())
      })()
    }

    return () => workerBox?.destroy()
  }, [workerBox])

  const run = useMemo(() => {
    if (!workerBox) {
      return null
    }

    return async (code: string): Promise<void> => {
      setLogs([])

      const console = pipe(
        LOG_TYPES,
        map((type): [string, (...args: unknown[]) => void] => [
          type,
          (...args: unknown[]) => {
            let trace: string | undefined
            if (type === `trace`) {
              try {
                // eslint-disable-next-line unicorn/error-message
                throw new Error()
              } catch (error: unknown) {
                trace = (error as Error).stack
                if (trace) {
                  trace = trace.slice(trace.indexOf(`\n`) + 1)
                }
              }
            }
            setLogs(logs => [
              ...logs,
              { type, args, timestamp: performance.now(), trace },
            ])
          },
        ]),
        reduce(toObject()),
      )

      setRunning(true)
      try {
        await workerBox.run(await bundleCode(code), { console })
      } catch (error: unknown) {
        if (error instanceof Error) {
          setLogs(logs => [
            ...logs,
            {
              type: `error`,
              args: [error.message],
              timestamp: performance.now(),
            },
          ])
        } else {
          throw error
        }
      } finally {
        setRunning(false)
      }
    }
  }, [workerBox])

  return { isRunning, run, logs }
}

export type Sandbox = {
  isRunning: boolean
  run: ((code: string) => Promise<void>) | null
  logs: Log[]
}

export type Log = {
  type: (typeof LOG_TYPES)[number]
  args: unknown[]
  timestamp: number
  trace?: string
}

const LOG_TYPES = [
  `assert`,
  `clear`,
  `count`,
  `countReset`,
  `debug`,
  `dir`,
  `error`,
  `info`,
  `log`,
  `time`,
  `timeEnd`,
  `timeLog`,
  `trace`,
  `warn`,
] as const

export default useSandbox
