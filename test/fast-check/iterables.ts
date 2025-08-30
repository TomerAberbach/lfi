import { fc } from '@fast-check/vitest'
import { asConcur, mapConcur, pipe } from '../../src/index.js'
import type { ConcurIterableApply } from '../../src/index.js'
import { time, timeAsync, timeConcur } from '../timings.ts'
import type {
  TimedAsyncIterable,
  TimedConcurIterable,
  TimedIterable,
} from '../timings.ts'
import { getIterableIndex, getScheduler } from './test-prop.ts'

const getArrayArb = <Value>(
  arb: fc.Arbitrary<Value>,
  {
    unique = false,
    ...constraints
  }: fc.ArrayConstraints & { unique?: boolean } = {},
): fc.Arbitrary<Value[]> =>
  unique
    ? fc.uniqueArray(arb, { ...constraints, comparator: `SameValue` })
    : fc.array(arb, constraints)

export const getIterableArb = <Value>(
  arb: fc.Arbitrary<Value>,
  constraints?: fc.ArrayConstraints & { unique?: boolean },
): fc.Arbitrary<GeneratedIterable<Value>> =>
  getArrayArb(arb, constraints).map(values => ({
    iterable: time(new IterableWithPrivateFields(values)),
    values,
    getIterationOrder: () => values,
  }))

export type GeneratedIterable<Value> = {
  iterable: TimedIterable<Value>
  values: Value[]
  getIterationOrder: () => Value[]
}

// Used to ensure we call `Symbol.iterator` with the right `this`.
class IterableWithPrivateFields<Value> {
  readonly #values
  readonly #index

  public constructor(values: Value[]) {
    this.#values = values
    this.#index = getIterableIndex()
  }

  public [Symbol.iterator](): Iterator<Value> {
    return this.#values[Symbol.iterator]()
  }

  public [fc.toStringMethod](): string {
    return `Iterable$${this.#index}`
  }
}

export const iterableArb = getIterableArb(fc.anything())
export const uniqueIterableArb = getIterableArb(fc.anything(), { unique: true })
export const nonEmptyIterableArb = getIterableArb(fc.anything(), {
  minLength: 1,
})

export const getAsyncIterableArb = <Value>(
  arb: fc.Arbitrary<Value>,
  constraints?: fc.ArrayConstraints & { unique?: boolean },
): fc.Arbitrary<GeneratedAsyncIterable<Value>> =>
  getArrayArb(arb, constraints).map(values => ({
    iterable: timeAsync(new AsyncIterableWithPrivateFields(values)),
    values,
    getIterationOrder: () => values,
  }))

export type GeneratedAsyncIterable<Value> = {
  iterable: TimedAsyncIterable<Value>
  values: Value[]
  getIterationOrder: () => Value[]
}

// Used to ensure we call `Symbol.asyncIterator` with the right `this`.
class AsyncIterableWithPrivateFields<Value> {
  readonly #values
  readonly #index

  public constructor(values: Value[]) {
    this.#values = values
    this.#index = getIterableIndex()
  }

  public async *[Symbol.asyncIterator](): AsyncIterator<Value> {
    yield* this.#values.map(value =>
      getScheduler()!.schedule(Promise.resolve(value), fc.stringify(value)),
    )
  }

  public [fc.toStringMethod](): string {
    return `AsyncIterable$${this.#index}`
  }
}

export const asyncIterableArb = getAsyncIterableArb(fc.anything())
export const uniqueAsyncIterableArb = getAsyncIterableArb(fc.anything(), {
  unique: true,
})
export const nonEmptyAsyncIterableArb = getAsyncIterableArb(fc.anything(), {
  minLength: 1,
})

export const getConcurIterableArb = <Value>(
  arb: fc.Arbitrary<Value>,
  constraints?: fc.ArrayConstraints & { unique?: boolean },
): fc.Arbitrary<GeneratedConcurIterable<Value>> =>
  getArrayArb(arb, constraints).map(values => {
    const index = getIterableIndex()

    const iterationOrder: Value[] = []
    const concurIterable = pipe(
      asConcur(values),
      mapConcur(async value => {
        const scheduledValue = await getScheduler()!.schedule(
          Promise.resolve(value),
          fc.stringify(value),
        )
        iterationOrder.push(value)
        return scheduledValue
      }),
    )
    const timedConcurIterable = timeConcur(
      (apply: ConcurIterableApply<Value>) => {
        iterationOrder.length = 0
        return concurIterable(apply)
      },
    )

    return {
      iterable: Object.assign(timedConcurIterable, {
        [fc.toStringMethod]: () => `ConcurIterable$${index}`,
      }),
      values,
      getIterationOrder: () => iterationOrder,
    }
  })

export type GeneratedConcurIterable<Value> = {
  iterable: TimedConcurIterable<Value>
  values: Value[]
  getIterationOrder: () => Value[]
}

export const concurIterableArb = getConcurIterableArb(fc.anything())
export const uniqueConcurIterableArb = getConcurIterableArb(fc.anything(), {
  unique: true,
})
export const nonEmptyConcurIterableArb = getConcurIterableArb(fc.anything(), {
  minLength: 1,
})
