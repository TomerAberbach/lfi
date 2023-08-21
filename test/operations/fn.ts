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

import { expectTypeOf, fc, testProp } from 'tomer'
import { compose, curry, pipe } from '../../src/index.js'
import { fnArb } from '../helpers/fast-check/fn.js'

const fnAndArgsArb = fc
  .tuple(
    fc.func(fc.anything()),
    fc.array(fc.anything(), { minLength: 1, maxLength: 10 }),
  )
  .map(
    ([fn, array]) =>
      [
        Object.defineProperty(fn, `length`, {
          value: array.length,
          enumerable: false,
          writable: false,
        }),
        array,
      ] as const,
  )

test.skip(`curry types are correct`, () => {
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const fn = (a: number, b: string, c: boolean): string => `${a}${b}${c}`
  const curriedFn = curry(fn)

  expectTypeOf(curriedFn(1)(``)(true)).toMatchTypeOf<string>()
  expectTypeOf(curriedFn(1, ``)(true)).toMatchTypeOf<string>()
  expectTypeOf(curriedFn(1, ``, true)).toMatchTypeOf<string>()
  expectTypeOf(curriedFn(1)(``, true)).toMatchTypeOf<string>()
})

testProp(
  `curry does not modify the given function`,
  [fnAndArgsArb],
  ([fn, args]) => {
    const resultBeforeCurry = fn(...args)

    curry(fn)

    const resultAfterCurry = fn(...args)
    expect(resultAfterCurry).toStrictEqual(resultBeforeCurry)
  },
)

testProp(
  `curry returns a curried version of the given function if its length is greater than zero`,
  [fnAndArgsArb],
  ([fn, inputs]) => {
    const curried = curry(fn)

    for (const partition of partitions(inputs)) {
      const returned = partition.reduce<(...args: unknown[]) => unknown>(
        (acc, inputs) => acc(...inputs) as (...args: unknown[]) => unknown,
        curried,
      )

      expect(returned).toStrictEqual(fn(...inputs))
    }
  },
)

const partitions = <Value>(array: Value[]): Iterable<Value[][]> => ({
  *[Symbol.iterator](): Iterator<Value[][]> {
    if (array.length === 0) {
      yield []
      return
    }

    for (let i = 0; i < array.length; i++) {
      const start = array.slice(0, i + 1)
      const end = array.slice(i + 1)

      for (const partition of partitions(end)) {
        yield [start, ...partition]
      }
    }
  },
})

testProp(
  `curry returns the original function if its length is less than or equal to zero`,
  [
    fc
      .tuple(
        fc.func(fc.anything()),
        fc.nat().map(n => -n),
      )
      .map(([fn, length]) =>
        Object.defineProperty(fn, `length`, {
          value: length,
          enumerable: false,
          writable: false,
        }),
      ),
  ],
  fn => {
    const curried = curry(fn)

    expect(curried).toBe(fn)
  },
)

testProp(`curry is idempotent`, [fnAndArgsArb], ([fn, inputs]) => {
  const curried = curry(fn)
  const doubleCurried = curry(curried)

  expect(curried(...inputs)).toStrictEqual(doubleCurried(...inputs))
})

testProp(
  `curry returns a function with the same name and length as the given function`,
  [
    fc.tuple(fnArb, fc.string(), fc.nat()).map(([fn, name, length]) =>
      Object.defineProperties(fn, {
        name: { value: name, enumerable: false, writable: false },
        length: { value: length, enumerable: false, writable: false },
      }),
    ),
  ],
  fn => {
    const curried = curry(fn)

    expect(curried.name).toBe(fn.name)
    expect(curried).toHaveLength(fn.length)
  },
)

test.skip(`pipe types are correct`, () => {
  expectTypeOf(pipe(2)).toMatchTypeOf<number>()
  expectTypeOf(pipe(2, String)).toMatchTypeOf<string>()
  expectTypeOf(pipe(2, String, Boolean)).toMatchTypeOf<boolean>()
})

testProp(
  `pipe returns the given value for a single argument`,
  [fc.anything()],
  value => {
    const piped = pipe(value)

    expect(piped).toBe(value)
  },
)

testProp(
  `pipe pipes`,
  [fc.anything(), fc.array(fc.func(fc.anything()), { minLength: 1 })],
  (value, [firstFn, ...otherFns]) => {
    expect(
      (pipe as (...args: unknown[]) => unknown)(value, firstFn, ...otherFns),
    ).toBe(
      (pipe as (...args: unknown[]) => unknown)(firstFn!(value), ...otherFns),
    )
  },
)

test.skip(`compose types are correct`, () => {
  // eslint-disable-next-line typescript/no-explicit-any
  expectTypeOf(compose(String)).toMatchTypeOf<(a: any) => string>()

  // eslint-disable-next-line typescript/no-explicit-any
  expectTypeOf(compose(String, Boolean)).toMatchTypeOf<(a: any) => boolean>()
})

testProp(
  `compose returns the identity function for no arguments`,
  [fc.anything()],
  value => {
    const fn = compose()

    expect(fn(value)).toBe(value)
  },
)

testProp(
  `compose composes`,
  [fc.anything(), fc.array(fc.func(fc.anything()), { minLength: 1 })],
  (value, [firstFn, ...otherFns]) => {
    expect(
      (compose as (...args: unknown[]) => (arg: unknown) => unknown)(
        firstFn,
        ...otherFns,
      )(value),
    ).toBe(
      (compose as (...args: unknown[]) => (arg: unknown) => unknown)(
        ...otherFns,
      )(firstFn!(value)),
    )
  },
)
