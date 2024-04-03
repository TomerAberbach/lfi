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

/* eslint-disable require-atomic-updates, no-restricted-syntax, jest/no-standalone-expect */
import { fc, jest } from 'tomer'
import delay from './helpers/delay.js'

jest.useFakeTimers()
fc.configureGlobal({ numRuns: 250 })

expect.extend({
  toBeIterable(received: unknown, { pure = true } = {}) {
    // Does it look like an iterable?
    let pass =
      typeof received === `object` &&
      received != null &&
      typeof (received as Record<keyof never, unknown>)[Symbol.iterator] ===
        `function`

    let values1
    let values2

    if (pass) {
      try {
        // Can it be iterated?
        values1 = [...(received as Iterable<unknown>)]
      } catch {
        pass = false
      }
    }

    if (pass && pure) {
      try {
        values2 = [...(received as Iterable<unknown>)]
        pass = this.equals(values1, values2)
      } catch {
        pass = false
      }
    }

    return {
      pass,
      message: (): string =>
        `expected ${String(received)} ${pass ? `not ` : ``}to be ${
          pure ? `a pure ` : ``
        }iterable`,
    }
  },

  async toBeAsyncIterable(received: unknown, { pure = true } = {}) {
    // Does it look like an async iterable?
    let pass =
      typeof received === `object` &&
      received != null &&
      typeof (received as Record<keyof never, unknown>)[
        Symbol.asyncIterator
      ] === `function`

    const values1: unknown[] = []
    const values2: unknown[] = []

    if (pass) {
      try {
        // Can it be async iterated?
        for await (const value of received as AsyncIterable<unknown>) {
          values1.push(value)
        }
      } catch {
        pass = false
      }
    }

    if (pass && pure) {
      try {
        // Can it be async iterated again to produce the same values?
        for await (const value of received as AsyncIterable<unknown>) {
          values2.push(value)
        }
        pass = this.equals(values1, values2)
      } catch {
        pass = false
      }
    }

    return {
      pass,
      message: (): string =>
        `expected ${String(received)} ${pass ? `not ` : ``}to be ${
          pure ? `a pure ` : ``
        }async iterable`,
    }
  },

  async toBeConcurIterable(received: unknown, { pure = true } = {}) {
    // Does it look like a concur iterable?
    let pass = typeof received === `function`

    const values1: unknown[] = []
    const values2: unknown[] = []

    if (pass) {
      try {
        // Can it be concur iterated?
        await (received as (...args: unknown[]) => unknown)(
          async (value: unknown) => {
            await delay(2)
            values1.push(value)
          },
        )
      } catch {
        pass = false
      }
    }

    if (pass && pure) {
      try {
        // Can it be concur iterated again to produce the same values, but not
        // necessarily in the same order?
        await (received as (...args: unknown[]) => unknown)((value: unknown) =>
          values2.push(value),
        )
        expect(values1).toIncludeSameMembers(values2)
        pass = true
      } catch {
        pass = false
      }
    }

    return {
      pass,
      message: (): string =>
        `expected ${String(received)} ${pass ? `not ` : ``}to be ${
          pure ? `a pure ` : ``
        }concur iterable`,
    }
  },

  toBeOptionalReducer(received: unknown) {
    const pass =
      typeof received === `object` &&
      received != null &&
      [`add`, `finish`].every(
        methodName =>
          // eslint-disable-next-line typescript/no-unsafe-member-access
          typeof (received as Record<keyof never, unknown>)[methodName] ===
          `function`,
      ) &&
      !(received as Record<keyof never, unknown>).create

    return {
      pass,
      message: (): string =>
        `expected ${String(received)} ${pass ? `not ` : ``}to be an optional reducer`,
    }
  },

  toBeReducer(received: unknown, { keyed = false } = {}) {
    const pass =
      typeof received === `object` &&
      received != null &&
      [`create`, `add`, `finish`, keyed && `get`].filter(Boolean).every(
        methodName =>
          // eslint-disable-next-line typescript/no-unsafe-member-access
          typeof (received as Record<keyof never, unknown>)[methodName] ===
          `function`,
      )

    return {
      pass,
      message: (): string =>
        `expected ${String(received)} ${pass ? `not ` : ``}to be a reducer`,
    }
  },
})

type CustomMatchers<Returned = unknown> = {
  toBeIterable: (options?: IterableOptions) => Returned
  toBeAsyncIterable: (options?: IterableOptions) => Promise<Returned>
  toBeConcurIterable: (options?: IterableOptions) => Promise<Returned>
  toBeOptionalReducer: () => Returned
  toBeReducer: (options?: { keyed?: boolean }) => Returned
}

type IterableOptions = { pure?: boolean }

declare global {
  /* eslint-disable typescript/no-namespace, typescript/consistent-type-definitions */
  namespace jest {
    interface Expect extends CustomMatchers {}
    interface Matchers<R> extends CustomMatchers<R> {}
    interface InverseAsymmetricMatchers extends CustomMatchers {}
  }
  /* eslint-enable */
}
