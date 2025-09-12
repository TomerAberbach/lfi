import type { MaybePromiseLike, PositiveInteger } from '../internal/types.js'

/** @internal */
type Curried<Parameters extends readonly any[], Return> = <
  PartialParameters extends Partial<Parameters>,
>(
  ...args: PartialParameters
) => PartialParameters extends Parameters
  ? Return
  : Parameters extends readonly [
        ...TupleOfSameLength<PartialParameters>,
        ...infer RemainingParameters,
      ]
    ? RemainingParameters extends any[]
      ? Curried<RemainingParameters, Return>
      : never
    : never

/** @internal */
type TupleOfSameLength<Tuple extends readonly any[]> = Extract<
  { [Key in keyof Tuple]: any },
  readonly any[]
>

/**
 * Returns a [curried](https://lfi.dev/docs/concepts/currying) version of `fn`.
 *
 * @example
 * ```js playground
 * import { curry } from 'lfi'
 *
 * function slothLog(a, b, c) {
 *   console.log(`${a} Sloth ${b} Sloth ${c}`)
 * }
 *
 * const curriedSlothLog = curry(slothLog)
 *
 * console.log(curriedSlothLog.name)
 * //=> slothLog
 *
 * console.log(curriedSlothLog.length)
 * //=> 3
 *
 * curriedSlothLog(`Hello`, `World`, `!`)
 * curriedSlothLog(`Hello`)(`World`, `!`)
 * curriedSlothLog(`Hello`, `World`)(`!`)
 * curriedSlothLog(`Hello`)(`World`)(`!`)
 * //=> Hello Sloth World Sloth !
 * //=> Hello Sloth World Sloth !
 * //=> Hello Sloth World Sloth !
 * //=> Hello Sloth World Sloth !
 * ```
 *
 * @category Core
 * @since v0.0.1
 */
export const curry: <Parameters extends readonly any[], Return>(
  fn: (...args: Parameters) => Return,
) => Curried<Parameters, Return>

/**
 * Returns the result of piping `value` through the given functions.
 *
 * @example
 * ```js playground
 * import { map, pipe, reduce, toArray } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     [`sloth`, `lazy`, `sleep`],
 *     map(word => word.toUpperCase()),
 *     reduce(toArray()),
 *     // Also works with non-`lfi` functions!
 *     array => array.sort(),
 *   ),
 * )
 * //=> [ 'SLOTH', 'LAZY', 'SLEEP' ]
 * ```
 *
 * @category Core
 * @since v0.0.1
 */
export const pipe: {
  <Value>(value: Value): Value
  <A, B>(value: A, fn: (a: A) => B): B
  <A, B, C>(value: A, fn1: (a: A) => B, fn2: (b: B) => C): C
  <A, B, C, D>(
    value: A,
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
  ): D
  <A, B, C, D, E>(
    value: A,
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E,
  ): E
  <A, B, C, D, E, F>(
    value: A,
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E,
    fn5: (e: E) => F,
  ): F
  <A, B, C, D, E, F, G>(
    value: A,
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E,
    fn5: (e: E) => F,
    fn6: (f: F) => G,
  ): G
  <A, B, C, D, E, F, G, H>(
    value: A,
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E,
    fn5: (e: E) => F,
    fn6: (f: F) => G,
    fn7: (g: G) => H,
  ): H
  <A, B, C, D, E, F, G, H, I>(
    value: A,
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E,
    fn5: (e: E) => F,
    fn6: (f: F) => G,
    fn7: (g: G) => H,
    fn8: (h: H) => I,
  ): I
  <A, B, C, D, E, F, G, H, I, J>(
    value: A,
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E,
    fn5: (e: E) => F,
    fn6: (f: F) => G,
    fn7: (g: G) => H,
    fn8: (h: H) => I,
    fn9: (i: I) => J,
  ): J
  (value: unknown, ...fns: ((value: unknown) => unknown)[]): unknown
}

/**
 * Returns a function that takes a single parameter and pipes it through the
 * given functions.
 *
 * @example
 * ```js playground
 * import { compose, map, reduce, toArray } from 'lfi'
 *
 * const screamify = compose(
 *   map(word => word.toUpperCase()),
 *   reduce(toArray()),
 *   // Also works with non-`lfi` functions!
 *   array => array.sort(),
 * )
 *
 * console.log(screamify([`sloth`, `lazy`, `sleep`]))
 * //=> [ 'SLOTH', 'LAZY', 'SLEEP' ]
 * ```
 *
 * @category Core
 * @since v0.0.2
 */
export const compose: {
  (): <Value>(value: Value) => Value
  <A, B>(fn: (a: A) => B): (value: A) => B
  <A, B, C>(fn1: (a: A) => B, fn2: (b: B) => C): (value: A) => C
  <A, B, C, D>(
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
  ): (value: A) => D
  <A, B, C, D, E>(
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E,
  ): (value: A) => E
  <A, B, C, D, E, F>(
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E,
    fn5: (e: E) => F,
  ): (value: A) => F
  <A, B, C, D, E, F, G>(
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E,
    fn5: (e: E) => F,
    fn6: (f: F) => G,
  ): (value: A) => G
  <A, B, C, D, E, F, G, H>(
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E,
    fn5: (e: E) => F,
    fn6: (f: F) => G,
    fn7: (g: G) => H,
  ): (value: A) => H
  <A, B, C, D, E, F, G, H, I>(
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E,
    fn5: (e: E) => F,
    fn6: (f: F) => G,
    fn7: (g: G) => H,
    fn8: (h: H) => I,
  ): (value: A) => I
  <A, B, C, D, E, F, G, H, I, J>(
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E,
    fn5: (e: E) => F,
    fn6: (f: F) => G,
    fn7: (g: G) => H,
    fn8: (h: H) => I,
    fn9: (i: I) => J,
  ): (value: A) => J
  (...fns: ((value: unknown) => unknown)[]): (value: unknown) => unknown
}

/**
 * Returns an async iterable wrapper around `iterable`.
 *
 * WARNING: When passing a concur iterable the default behavior of the returned
 * async iterable is to buffer the values yielded by the concur iterable if they
 * are not read from the async iterable as quickly as they are yielded by the
 * concur iterable. This happens because
 * [concur iterables are push-based while async iterables are pull-based](https://lfi.dev/docs/concepts/concurrent-iterable#how-is-it-different-from-an-asynciterable),
 * which creates backpressure. To customize how backpressure is applied, pass a
 * {@link BackpressureStrategy}.
 *
 * @example
 * ```js playground
 * import { asAsync } from 'lfi'
 *
 * const asyncIterable = asAsync([`sloth`, `lazy`, `sleep`])
 *
 * console.log(typeof asyncIterable[Symbol.asyncIterator])
 * //=> function
 *
 * for await (const value of asyncIterable) {
 *   console.log(value)
 * }
 * //=> sloth
 * //=> lazy
 * //=> sleep
 * ```
 *
 * @category Core
 * @since v0.0.2
 */
export const asAsync: {
  <Value>(
    iterable: Iterable<Value> | AsyncIterable<Value> | ConcurIterable<Value>,
  ): AsyncIterable<Awaited<Value>>

  <Value, Size extends number = number>(
    concurIterable:
      | Iterable<Value>
      | AsyncIterable<Value>
      | ConcurIterable<Value>,
    options?: AsAsyncOptions<Size>,
  ): AsyncIterable<Awaited<Value>>
}

/**
 * Options for {@link asAsync}.
 *
 * @category Core
 * @since v5.0.0
 */
export type AsAsyncOptions<Size extends number = number> = Readonly<{
  /**
   * The strategy to use for applying backpressure when the input concur
   * iterable is yielding values faster than the returned async iterable can
   * process them.
   *
   * Does nothing if the input is not a concur iterable.
   *
   * @since v2.0.0
   */
  backpressureStrategy?: BackpressureStrategy<Size>
}>

/**
 * A strategy to use for applying backpressure adapting a concur iterable from
 * push-based iteration to pull-based iteration.
 *
 * @category Core
 * @since v5.0.0
 */
export type BackpressureStrategy<Size extends number = number> = Readonly<{
  /**
   * The maximum number of values to buffer when the concur iterable yields
   * values faster than the downstream consumer can process them.
   *
   * Defaults to `Infinity`.
   */
  bufferLimit?: PositiveInteger<Size>

  /**
   * The strategy to apply when the {@link BackpressureStrategy.bufferLimit}
   * would be exceeded.
   *
   * The strategies behave as follows:
   * - `drop-first`: When the buffer is full, earlier buffered values are
   *   evicted to make room for new ones.
   * - `drop-last`: When the buffer is full, new values are ignored.
   * - `error`: When the buffer is full and a new value comes in, an error is
   *   thrown.
   *
   * Defaults to `error`. Note that `overflowStrategy` does nothing when
   * {@link BackpressureStrategy.bufferLimit} is `Infinity`.
   */
  overflowStrategy?: `drop-first` | `drop-last` | `error`
}>

/**
 * A symbol used as the key when storing a {@link ConcurIterable}'s iteration
 * function.
 *
 * @category Core
 * @since v5.0.0
 */
export const concurIteratorSymbol: unique symbol

/**
 * Represents a lazy collection of values, each of type `Value`, that can be
 * iterated concurrently.
 *
 * The collection can be iterated by invoking the concur iterable's
 * {@link concurIteratorSymbol} function with an `apply` callback. The callback
 * is applied to each value in the collection, potentially asynchronously, in
 * some order.
 *
 * Invoking the concur iterable's {@link concurIteratorSymbol} function returns
 * a promise that resolves when `apply` has been applied to each value in the
 * concur iterable and each result returned by `apply` is awaited.
 *
 * A [concur iterable](https://lfi.dev/docs/concepts/concurrent-iterable) is
 * effectively a cold push-based observable backed by some asynchronous
 * operations.
 *
 * @example
 * ```js playground
 * import { asConcur, concurIteratorSymbol, mapConcur, pipe } from 'lfi'
 *
 * const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`
 *
 * const concurIterable = pipe(
 *   asConcur([`sloth`, `lazy`, `sleep`]),
 *   mapConcur(async word => {
 *     const response = await fetch(`${API_URL}/${word}`)
 *     return (await response.json())[0].phonetic
 *   }),
 * )
 *
 * await concurIterable[concurIteratorSymbol](console.log)
 * // NOTE: This order may change between runs
 * //=> /slɑθ/
 * //=> /ˈleɪzi/
 * //=> /sliːp/
 * ```
 *
 * @category Core
 * @since v0.0.2
 */
export type ConcurIterable<Value> = {
  [concurIteratorSymbol]: (apply: ConcurIterableApply<Value>) => Promise<void>
}

/**
 * The callback invoked for each value of a {@link ConcurIterable}.
 *
 * @category Core
 * @since v2.0.0
 */
export type ConcurIterableApply<Value> = (
  value: Value,
) => MaybePromiseLike<void>

/**
 * Returns a concur iterable wrapper around `iterable`.
 *
 * @example
 * ```js playground
 * import { asConcur, forEachConcur } from 'lfi'
 *
 * const concurIterable = asConcur([`sloth`, `lazy`, `sleep`])
 *
 * await forEachConcur(console.log, concurIterable)
 * //=> sloth
 * //=> lazy
 * //=> sleep
 * ```
 *
 * @category Core
 * @since v0.0.2
 */
export const asConcur: <Value>(
  iterable: Iterable<Value> | AsyncIterable<Value> | ConcurIterable<Value>,
) => ConcurIterable<Awaited<Value>>

/**
 * An iterable that contains zero values.
 *
 * Can be used as an iterable of any type.
 *
 * Like `[]`, but opaque.
 *
 * @example
 * ```js playground
 * import { empty } from 'lfi'
 *
 * console.log([...empty()])
 * //=> []
 * ```
 *
 * @category Core
 * @since v0.0.1
 */
export const empty: <Value = unknown>() => Iterable<Value>

/**
 * An async iterable that contains zero values.
 *
 * Can be used as an async iterable of any type.
 *
 * Like `[]`, but for async iterables.
 *
 * @example
 * ```js playground
 * import { emptyAsync, pipe, reduceAsync, toArray } from 'lfi'
 *
 * console.log(
 *   await pipe(
 *     emptyAsync(),
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> []
 * ```
 *
 * @category Core
 * @since v0.0.1
 */
export const emptyAsync: <Value = unknown>() => AsyncIterable<Value>

/**
 * A concur iterable that contains zero values.
 *
 * Can be used as a concur iterable of any type.
 *
 * Like `[]`, but for concur iterables.
 *
 * @example
 * ```js playground
 * import { emptyConcur, pipe, reduceConcur, toArray } from 'lfi'
 *
 * console.log(
 *   await pipe(
 *     emptyConcur(),
 *     reduceConcur(toArray()),
 *   ),
 * )
 * //=> []
 * ```
 *
 * @category Core
 * @since v0.0.2
 */
export const emptyConcur: <Value = unknown>() => ConcurIterable<Value>

/**
 * Returns an iterable equivalent, but not referentially equal, to `iterable`.
 *
 * @example
 * ```js playground
 * import { opaque } from 'lfi'
 *
 * const array = [`sloth`, `lazy`, `sleep`]
 * const iterable = opaque(array)
 *
 * console.log(array === iterable)
 * //=> false
 *
 * console.log([...iterable])
 * //=> [ 'sloth', 'lazy', 'sleep' ]
 * ```
 *
 * @category Core
 * @since v2.0.0
 */
export const opaque: <Value>(iterable: Iterable<Value>) => Iterable<Value>

/**
 * Returns an async iterable equivalent, but not referentially equal, to
 * `asyncIterable`.
 *
 * @example
 * ```js playground
 * import { asAsync, opaqueAsync, pipe, reduceAsync, toArray } from 'lfi'
 *
 * const asyncIterable = asAsync([`sloth`, `lazy`, `sleep`])
 * asyncIterable.property = 42
 * const opaqueAsyncIterable = opaqueAsync(asyncIterable)
 *
 * console.log(asyncIterable === opaqueAsyncIterable)
 * //=> false
 *
 * console.log(opaqueAsyncIterable.property)
 * //=> undefined
 *
 * console.log(
 *   await pipe(
 *     opaqueAsyncIterable,
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'lazy', 'sleep' ]
 * ```
 *
 * @category Core
 * @since v2.0.0
 */
export const opaqueAsync: <Value>(
  asyncIterable: AsyncIterable<Value>,
) => AsyncIterable<Value>

/**
 * Returns an concur iterable equivalent, but not referentially equal, to
 * `concurIterable`.
 *
 * @example
 * ```js playground
 * import { asConcur, opaqueConcur, pipe, reduceConcur, toArray } from 'lfi'
 *
 * const concurIterable = asConcur([`sloth`, `lazy`, `sleep`])
 * concurIterable.property = 42
 * const opaqueConcurIterable = opaqueConcur(concurIterable)
 *
 * console.log(concurIterable === opaqueConcurIterable)
 * //=> false
 *
 * console.log(opaqueConcurIterable.property)
 * //=> undefined
 *
 * console.log(
 *   await pipe(
 *     opaqueConcurIterable,
 *     reduceConcur(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'lazy', 'sleep' ]
 * ```
 *
 * @category Core
 * @since v2.0.0
 */
export const opaqueConcur: <Value>(
  concurIterable: ConcurIterable<Value>,
) => ConcurIterable<Value>
