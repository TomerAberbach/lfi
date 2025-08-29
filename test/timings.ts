import type { ConcurIterable } from '../src/index'
import { createAsyncIterable, createIterable } from '../src/internal/helpers.js'
import type { MaybePromiseLike } from '../src/internal/types.js'

export const timed = async <Value>(
  fn: () => MaybePromiseLike<Value>,
): Promise<{ elapsed: number; result: Value }> => {
  const now = Date.now()
  const result = await fn()
  return { elapsed: Date.now() - now, result }
}

export type Timings = {
  values: number[]
  min: () => number
  max: () => number
  sum: () => number
}

export type TimedIterable<Value> = Iterable<Value> & { yieldTimings: Timings }
export const time = <Value>(
  iterable: Iterable<Value>,
): TimedIterable<Value> => {
  const yieldTimings = createTimings()
  return Object.assign(
    createIterable(function* () {
      const now = Date.now()
      for (const value of iterable) {
        yieldTimings.values.push(Date.now() - now)
        yield value
      }
    }),
    { yieldTimings },
  )
}

export type TimedAsyncIterable<Value> = AsyncIterable<Value> & {
  yieldTimings: Timings
}
export const timeAsync = <Value>(
  asyncIterable: AsyncIterable<Value>,
): TimedAsyncIterable<Value> => {
  const yieldTimings = createTimings()
  return Object.assign(
    createAsyncIterable(async function* () {
      const now = Date.now()
      for await (const value of asyncIterable) {
        yieldTimings.values.push(Date.now() - now)
        yield value
      }
    }),
    { yieldTimings },
  )
}

export type TimedConcurIterable<Value> = ConcurIterable<Value> & {
  yieldTimings: Timings
}
export const timeConcur = <Value>(
  concurIterable: ConcurIterable<Value>,
): TimedConcurIterable<Value> => {
  const yieldTimings = createTimings()

  const timedConcurIterable: ConcurIterable<Value> = async apply => {
    const now = Date.now()
    await concurIterable(async value => {
      yieldTimings.values.push(Date.now() - now)
      await apply(value)
    })
  }

  return Object.assign(timedConcurIterable, { yieldTimings })
}

export const createTimings = (): Timings => {
  const timings: number[] = []
  return {
    values: timings,
    min: () => (timings.length === 0 ? 0 : Math.min(...timings)),
    max: () => (timings.length === 0 ? 0 : Math.max(...timings)),
    sum: () => timings.reduce((a, b) => a + b),
  }
}

export const addTimings = (timings1: Timings, timings2: Timings): Timings => {
  const newTimings = createTimings()
  for (const timing of timings1.values) {
    newTimings.values.push(timing)
  }
  for (const [index, timing] of timings2.values.entries()) {
    newTimings.values[index] = (newTimings.values[index] ?? 0) + timing
  }
  return newTimings
}

export const concatTimings = (allTimings: Timings[]): Timings => {
  const newTimings = createTimings()
  for (const timings of allTimings) {
    newTimings.values.push(...timings.values)
  }
  return newTimings
}
