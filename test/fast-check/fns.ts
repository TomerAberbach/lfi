import { fc } from '@fast-check/vitest'
import { getScheduler } from './test-prop.ts'

export const fnArb = fc.func(fc.anything())
export const predicateArb = fc.func(fc.oneof(fc.boolean(), fc.anything()))

const getAsyncFn = <Args extends unknown[], Value>(
  fn: (...args: Args) => readonly [Value, boolean],
): GeneratedAsyncFn<Value, Args> => {
  const asyncFn = Object.assign(
    (...args: Args) => {
      const [value, shouldReturnPromise] = fn(...args)
      if (!shouldReturnPromise) {
        return value
      }

      return getScheduler()!
        .schedule(args[0])
        .then(() => value)
    },
    { [fc.toStringMethod]: () => fc.stringify(fn) },
  )

  return {
    asyncFn,
    syncFn: (...args: Args) => fn(...args)[0],
  }
}

export type GeneratedAsyncFn<
  Value = unknown,
  Args extends unknown[] = unknown[],
> = {
  asyncFn: (...args: Args) => Value | Promise<Value>
  syncFn: (...args: Args) => Value
}

export const getAsyncFnArb = <Value>(
  arb: fc.Arbitrary<Value>,
): fc.Arbitrary<GeneratedAsyncFn<Value>> =>
  fc.func(fc.tuple(arb, fc.boolean())).map(getAsyncFn)

export const asyncFnArb = getAsyncFnArb(fc.anything())
export const asyncPredicateArb = getAsyncFnArb(
  fc.oneof(fc.boolean(), fc.anything()),
)

export const asyncCompareFnArb: fc.Arbitrary<
  GeneratedAsyncFn<number, [unknown, unknown]>
> = fc
  .tuple(fc.compareFunc(), fc.func(fc.boolean()))
  .map(([compareFn, shouldReturnPromiseFn]) =>
    getAsyncFn(
      (a: unknown, b: unknown) =>
        [compareFn(a, b), shouldReturnPromiseFn(a, b)] as const,
    ),
  )

export const asyncAbelianGroupFnArb: fc.Arbitrary<GeneratedAsyncFn<number>> = fc
  .tuple(
    fc.constantFrom((a: number, b: number) => a + b, Math.max, Math.min),
    fc.func(fc.boolean()),
  )
  .map(([abelianGroupFn, shouldReturnPromiseFn]) =>
    getAsyncFn((a = 0, b = 0) => [
      abelianGroupFn(Number(a), Number(b)),
      shouldReturnPromiseFn(a, b),
    ]),
  )
