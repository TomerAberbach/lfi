import { fc } from '@fast-check/vitest'
import { expect, vitest } from 'vitest'
import delay from './helpers/delay.js'

vitest.useFakeTimers()
fc.configureGlobal({ numRuns: 250 })

expect.extend({
  toBeIterable(received: unknown, { pure = true } = {}) {
    // Does it look like an iterable?
    let pass =
      typeof received === `object` &&
      received != null &&
      typeof (received as Record<PropertyKey, unknown>)[Symbol.iterator] ===
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
      typeof (received as Record<PropertyKey, unknown>)[
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
        // eslint-disable-next-line require-atomic-updates
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
        // eslint-disable-next-line require-atomic-updates
        pass = true
      } catch {
        // eslint-disable-next-line require-atomic-updates
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
          typeof (received as Record<PropertyKey, unknown>)[methodName] ===
          `function`,
      ) &&
      !(received as Record<PropertyKey, unknown>).create

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
          typeof (received as Record<PropertyKey, unknown>)[methodName] ===
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

declare module 'vitest' {
  /* eslint-disable typescript/no-empty-object-type, typescript/consistent-type-definitions */
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining<T = any> extends CustomMatchers<T> {}
  interface ExpectStatic extends CustomMatchers {}
  /* eslint-enable typescript/no-empty-object-type, typescript/consistent-type-definitions */
}
