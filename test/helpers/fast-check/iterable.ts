/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { fc } from 'tomer'
import type { MaybePromiseLike } from '../../../src/internal/types.js'
import type { ConcurIterable } from '../../../src/index.js'
import { getIterableIndex, getScheduler } from './test-prop.js'

export const iterableArb = getIterableArb(fc.anything())
export const nonEmptyIterableArb = getIterableArb(fc.anything(), {
  minLength: 1,
})

export function getIterableArb<Value>(
  arb: fc.Arbitrary<Value>,
  constraints?: fc.ArrayConstraints & { unique?: boolean },
): fc.Arbitrary<GeneratedIterable<Value>> {
  return getArrayArb(arb, constraints).map(values => ({
    iterable: new IterableWithPrivateFields(values),
    values,
  }))
}

export type GeneratedIterable<Value> = {
  iterable: Iterable<Value>
  values: Value[]
}

// Used to ensure we call `Symbol.iterator` with the right `this`
class IterableWithPrivateFields<Value> {
  #values
  #index

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

export const asyncIterableArb = getAsyncIterableArb(fc.anything())
export const uniqueAsyncIterableArb = getAsyncIterableArb(fc.anything(), {
  unique: true,
})
export const nonEmptyAsyncIterableArb = getAsyncIterableArb(fc.anything(), {
  minLength: 1,
})

export function getAsyncIterableArb<Value>(
  arb: fc.Arbitrary<Value>,
  constraints?: fc.ArrayConstraints & { unique?: boolean },
): fc.Arbitrary<GeneratedAsyncIterable<Value>> {
  return getArrayArb(arb, constraints).map(values => ({
    iterable: new AsyncIterableWithPrivateFields(values),
    values,
  }))
}

export type GeneratedAsyncIterable<Value> = {
  iterable: AsyncIterable<Value>
  values: Value[]
}

// Used to ensure we call `Symbol.asyncIterator` with the right `this`
class AsyncIterableWithPrivateFields<Value> {
  #values
  #index

  public constructor(values: Value[]) {
    this.#values = values
    this.#index = getIterableIndex()
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async *[Symbol.asyncIterator](): AsyncIterator<Value> {
    yield* this.#values.map(value => getScheduler()!.schedule(value))
  }

  public [fc.toStringMethod](): string {
    return `AsyncIterable$${this.#index}`
  }
}

export const concurIterableArb = getConcurIterableArb(fc.anything())
export const uniqueConcurIterableArb = getConcurIterableArb(fc.anything(), {
  unique: true,
})
export const nonEmptyConcurIterableArb = getConcurIterableArb(fc.anything(), {
  minLength: 1,
})

export function getConcurIterableArb<Value>(
  arb: fc.Arbitrary<Value>,
  constraints?: fc.ArrayConstraints & { unique?: boolean },
): fc.Arbitrary<GeneratedConcurIterable<Value>> {
  return getArrayArb(arb, constraints).map(values => {
    const index = getIterableIndex()
    return {
      iterable: Object.assign(
        async (apply: (value: Value) => MaybePromiseLike<void>) => {
          await Promise.all(
            values.map(async value =>
              apply(await getScheduler()!.schedule(value)),
            ),
          )
        },
        { [fc.toStringMethod]: () => `ConcurIterable$${index}` },
      ),
      values,
    }
  })
}

function getArrayArb<Value>(
  arb: fc.Arbitrary<Value>,
  {
    unique = false,
    ...constraints
  }: fc.ArrayConstraints & { unique?: boolean } = {},
): fc.Arbitrary<Value[]> {
  if (!unique) {
    return fc.array(arb, constraints)
  }

  return fc.uniqueArray(arb, { ...constraints, comparator: `SameValue` })
}

export type GeneratedConcurIterable<Value> = {
  iterable: ConcurIterable<Value>
  values: Value[]
}
