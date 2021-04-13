/**
 * Copyright 2021 Google LLC
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

import { fc } from 'ava-fast-check'
import { asConcur } from '../../src/as.js'
import { mapConcur } from '../../src/map.js'
import { delay } from './index.js'

export const nonSafeIntegerDoubleArb = fc
  .double()
  .filter(number => !Number.isSafeInteger(number))
export const negativeIntegerArb = fc.integer({ max: -1 })
export const nonPositiveIntegerArb = fc.integer({ max: 0 })
export const nonNegativeIntegerArb = fc.integer({ min: 0 })
export const positiveIntegerArb = fc.integer({ min: 1 })

const timeoutArb = fc.integer({ min: 1, max: 100 })

export const getThunkArb = arb =>
  fc.tuple(arb, timeoutArb).map(([value, timeout]) =>
    Object.assign(() => delay(timeout).then(() => value), {
      value,
      timeout,
      toString: () =>
        `() => delay(${timeout}).then(() => ${fc.stringify(value)})`
    })
  )

export const getIterableArb = (arb, constraints) => {
  const arrayArb = fc.array(arb, constraints)

  return fc.oneof(
    arrayArb.map(array =>
      Object.assign(array, { values: [...array], iterationOrder: [...array] })
    ),
    fc.tuple(fc.object(), arrayArb).map(([object, array]) => ({
      ...object,
      values: [...array],
      iterationOrder: [...array],
      [Symbol.iterator]: () => array[Symbol.iterator](),
      toString: () => `iterable { ${fc.stringify(array)} }`
    }))
  )
}

const aggregateTimeouts = timeouts =>
  timeouts.length > 0
    ? {
        minTimeout: Math.min(...timeouts),
        maxTimeout: Math.max(...timeouts)
      }
    : { minTimeout: 0, maxTimeout: 0 }

export const getAsyncIterableArb = (arb, constraints) =>
  getIterableArb(getThunkArb(arb), constraints).map(iterable => {
    const { [Symbol.iterator]: getIterator, ...rest } = iterable

    const timeouts = iterable.values.map(({ timeout }) => timeout)
    const values = iterable.values.map(({ value }) => value)

    return {
      ...rest,
      values,
      iterationOrder: [...values],
      timeouts,
      ...aggregateTimeouts(timeouts),
      async *[Symbol.asyncIterator]() {
        for (const thunk of iterable) {
          yield thunk()
        }
      },
      toString: () => `asyncIterable { ${fc.stringify(iterable.values)} }`
    }
  })

export const getConcurIterableArb = (arb, constraints) =>
  getIterableArb(getThunkArb(arb), constraints).map(iterable => {
    const timeouts = iterable.values.map(({ timeout }) => timeout)
    const values = iterable.values.map(({ value }) => value)

    const iterationOrder = [...iterable.values]
      .sort((thunk1, thunk2) => thunk1.timeout - thunk2.timeout)
      .map(({ value }) => value)

    return Object.assign(
      mapConcur(thunk => thunk(), asConcur(iterable)),
      {
        values,
        iterationOrder,
        timeouts,
        ...aggregateTimeouts(timeouts),
        toString: () => `concurIterable { ${fc.stringify(iterationOrder)} }`
      }
    )
  })

const coerceToArb = value =>
  value instanceof fc.Arbitrary ? value : fc.constant(value)

export const getFnArb = (
  arb,
  { getFuncArb = fc.func, name = fc.string(), length = fc.nat() } = {}
) =>
  fc
    .tuple(getFuncArb(arb), coerceToArb(name), coerceToArb(length))
    .map(([fn, name, length]) =>
      Object.defineProperties(fn, {
        length: {
          enumerable: false,
          writable: false,
          value: length
        },
        name: {
          enumerable: false,
          writable: false,
          value: name
        }
      })
    )

export const getAsyncFnArb = (arb, constraints) =>
  getFnArb(arb, {
    ...constraints,
    getFuncArb: arb =>
      fc.tuple(fc.func(arb), timeoutArb).map(([fn, timeout]) =>
        Object.assign((...args) => delay(timeout).then(() => fn(...args)), {
          sync: fn,
          timeout,
          toString: () =>
            `(...args) => delay(${timeout}).then(() => (${fc.stringify(
              fn
            )})(...args))`
        })
      )
  })

export const getMaybeAsyncFnArb = (arb, constraints) =>
  fc.oneof(
    getFnArb(arb, constraints).map(fn =>
      Object.assign(fn, { sync: fn, timeout: 0 })
    ),
    getAsyncFnArb(arb, constraints)
  )

export const [
  iterableArb,
  asyncIterableArb,
  concurIterableArb,
  fnArb,
  maybeAsyncFnArb
] = [
  getIterableArb,
  getAsyncIterableArb,
  getConcurIterableArb,
  getFnArb,
  getMaybeAsyncFnArb
].map(getArb => getArb(fc.anything()))

export const asyncCompareFnArb = fc
  .tuple(fc.compareFunc(), timeoutArb)
  .map(([fn, timeout]) =>
    Object.assign((a, b) => delay(timeout).then(() => fn(a, b)), {
      sync: fn,
      timeout,
      toString: () =>
        `(...args) => delay(${timeout}).then(() => (${fc.stringify(
          fn
        )})(...args))`
    })
  )

export const maybeAsyncCompareFnArb = fc.oneof(
  fc.compareFunc().map(fn => Object.assign(fn, { sync: fn, timeout: 0 })),
  asyncCompareFnArb
)

export const [
  emptyIterableArb,
  emptyAsyncIterableArb,
  emptyConcurIterableArb
] = [getIterableArb, getAsyncIterableArb, getConcurIterableArb].map(getArb =>
  getArb(fc.anything(), { minLength: 0, maxLength: 0 })
)

export const [
  nonEmptyIterableArb,
  nonEmptyAsyncIterableArb,
  nonEmptyConcurIterableArb
] = [getIterableArb, getAsyncIterableArb, getConcurIterableArb].map(getArb =>
  getArb(fc.anything(), { minLength: 1 })
)

export const [predicateArb, asyncPredicateArb, maybeAsyncPredicateArb] = [
  getFnArb,
  getAsyncFnArb,
  getMaybeAsyncFnArb
].map(getArb => getArb(fc.oneof(fc.boolean(), fc.anything())))
