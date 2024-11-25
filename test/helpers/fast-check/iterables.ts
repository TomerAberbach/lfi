import { fc } from '@fast-check/vitest'
import { getIterableIndex, getScheduler } from './test-prop.js'
import type { ConcurIterable } from '~/index.js'
import type { MaybePromiseLike } from '~/internal/types.js'

const getArrayArb = <Value>(
  arb: fc.Arbitrary<Value>,
  {
    unique = false,
    ...constraints
  }: fc.ArrayConstraints & { unique?: boolean } = {},
): fc.Arbitrary<Value[]> => {
  if (!unique) {
    return fc.array(arb, constraints)
  }

  return fc.uniqueArray(arb, { ...constraints, comparator: `SameValue` })
}

export const getIterableArb = <Value>(
  arb: fc.Arbitrary<Value>,
  constraints?: fc.ArrayConstraints & { unique?: boolean },
): fc.Arbitrary<GeneratedIterable<Value>> =>
  getArrayArb(arb, constraints).map(values => ({
    iterable: new IterableWithPrivateFields(values),
    values,
    iterationOrder: values,
  }))

export type GeneratedIterable<Value> = {
  iterable: Iterable<Value>
  values: Value[]
  iterationOrder: Value[]
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
export const nonEmptyIterableArb = getIterableArb(fc.anything(), {
  minLength: 1,
})

export const getAsyncIterableArb = <Value>(
  arb: fc.Arbitrary<Value>,
  constraints?: fc.ArrayConstraints & { unique?: boolean },
): fc.Arbitrary<GeneratedAsyncIterable<Value>> =>
  getArrayArb(arb, constraints).map(values => ({
    iterable: new AsyncIterableWithPrivateFields(values),
    values,
    iterationOrder: values,
  }))

export type GeneratedAsyncIterable<Value> = {
  iterable: AsyncIterable<Value>
  values: Value[]
  iterationOrder: Value[]
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
    yield* this.#values.map(value => getScheduler()!.schedule(value))
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
    return {
      iterable: Object.assign(
        async (apply: (value: Value) => MaybePromiseLike<void>) => {
          await Promise.all(
            values.map(async value => {
              const scheduledValue = await getScheduler()!.schedule(value)
              iterationOrder.push(value)
              await apply(scheduledValue)
            }),
          )
        },
        { [fc.toStringMethod]: () => `ConcurIterable$${index}` },
      ),
      values,
      get iterationOrder() {
        return iterationOrder
      },
    }
  })

export type GeneratedConcurIterable<Value> = {
  iterable: ConcurIterable<Value>
  values: Value[]
  iterationOrder: Value[]
}

export const concurIterableArb = getConcurIterableArb(fc.anything())
export const uniqueConcurIterableArb = getConcurIterableArb(fc.anything(), {
  unique: true,
})
export const nonEmptyConcurIterableArb = getConcurIterableArb(fc.anything(), {
  minLength: 1,
})
