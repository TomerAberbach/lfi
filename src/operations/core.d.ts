import type { MaybePromiseLike } from '../internal/types.js'

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
 * Returns a curried version of `fn`.
 *
 * @example
 * ```js
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
 */
export const curry: <Parameters extends readonly any[], Return>(
  fn: (...args: Parameters) => Return,
) => Curried<Parameters, Return>

/**
 * Returns the result of piping `value` through the given functions.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     `sloth`,
 *     name => `${name.toUpperCase()}!`,
 *     text => [text, text, text],
 *     array => array.join(` `),
 *   ),
 * )
 * // => SLOTH! SLOTH! SLOTH!
 * ```
 *
 * @category Core
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
}

/**
 * Returns a function that takes a single parameter and pipes it through the
 * given functions.
 *
 * @example
 * ```js
 * const screamify = compose(
 *   name => `${name.toUpperCase()}!`,
 *   text => [text, text, text],
 *   array => array.join(` `),
 * )
 *
 * console.log(screamify(`sloth`))
 * // => SLOTH! SLOTH! SLOTH!
 * ```
 *
 * @category Core
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
}

/**
 * Returns an async iterable wrapper around `iterable`.
 *
 * Note that when passing a concur iterable the returned async iterable may have
 * to buffer the values produced by the concur iterable because values may not
 * be read from the async iterable as quickly as they are produced by the concur
 * iterable. This is a fundamental problem because concur iterables are "push"
 * based while async iterables are "pull" based, which creates backpressure.
 *
 * @example
 * ```js
 * const asyncIterable = asAsync([`sloth`, `more sloth`, `even more sloth`])
 *
 * console.log(typeof asyncIterable[Symbol.asyncIterator])
 * //=> function
 *
 * for await (const value of asyncIterable) {
 *   console.log(value)
 * }
 * //=> sloth
 * //=> more sloth
 * //=> even more sloth
 * ```
 *
 * @category Core
 */
export const asAsync: <Value>(
  iterable: Iterable<Value> | AsyncIterable<Value> | ConcurIterable<Value>,
) => AsyncIterable<Value>

/**
 * Represents a potentially lazy collection of values, each of type `Value`,
 * that can be iterated over concurrently.
 *
 * The collection can be iterated by invoking the concur iterable with an
 * `apply` callback. The callback is applied to each value in the collection,
 * potentially asynchronously, in some order.
 *
 * Invoking the concur iterable returns a promise that resolves when `apply`
 * has been applied to each value in the concur iterable and each result
 * returned by `apply` is awaited.
 *
 * It is like an event emitter that accepts only one event handler and returns a
 * promise that resolves when all events have been emitted and handled.
 *
 * @example
 * ```js
 * const slothNamesConcurIterable = pipe(
 *   asConcur(['sloth-names1.txt', 'sloth-names2.txt']),
 *   mapConcur(filename => fs.promises.readFile(filename, `utf8`)),
 *   flatMapConcur(content => content.split(`\n`)),
 * )
 * ```
 *
 * @category Core
 */
export type ConcurIterable<Value> = (
  apply: ConcurIterableApply<Value>,
) => Promise<void>

/**
 * The callback invoked for each value of a {@link ConcurIterable}.
 *
 * @category Core
 */
export type ConcurIterableApply<Value> = (
  value: Value,
) => MaybePromiseLike<void>

/**
 * Returns a concur iterable wrapper around `iterable`.
 *
 * @example
 * ```js
 * const concurIterable = asConcur([`sloth`, `more sloth`, `even more sloth`])
 *
 * await forEachConcur(console.log, concurIterable)
 * //=> sloth
 * //=> more sloth
 * //=> even more sloth
 * ```
 *
 * @category Core
 */
export const asConcur: <Value>(
  iterable: Iterable<Value> | AsyncIterable<Value> | ConcurIterable<Value>,
) => ConcurIterable<Value>

/**
 * An iterable that contains zero values.
 *
 * Can be used as an iterable of any type.
 *
 * Like `[]`, but opaque.
 *
 * @example
 * ```js
 * console.log([...empty])
 * //=> []
 * ```
 *
 * @category Core
 */
export const empty: Iterable<any>

/**
 * An async iterable that contains zero values.
 *
 * Can be used as an async iterable of any type.
 *
 * Like `[]`, but for async iterables.
 *
 * @example
 * ```js
 * console.log(await pipe(emptyAsync, reduceAsync(toArray())))
 * //=> []
 * ```
 *
 * @category Core
 */
export const emptyAsync: AsyncIterable<any>

/**
 * A concur iterable that contains zero values.
 *
 * Can be used as a concur iterable of any type.
 *
 * Like `[]`, but for concur iterables.
 *
 * @example
 * ```js
 * console.log(await pipe(emptyConcur, reduceConcur(toArray())))
 * //=> []
 * ```
 *
 * @category Core
 */
export const emptyConcur: ConcurIterable<any>

/**
 * Returns an iterable equivalent, but not referentially equal, to `iterable`.
 *
 * @category Core
 */
export const opaque: <Value>(iterable: Iterable<Value>) => Iterable<Value>

/**
 * Returns an async iterable equivalent, but not referentially equal, to
 * `asyncIterable`.
 *
 * @category Core
 */
export const opaqueAsync: <Value>(
  asyncIterable: AsyncIterable<Value>,
) => AsyncIterable<Value>

/**
 * Returns an concur iterable equivalent, but not referentially equal, to
 * `concurIterable`.
 *
 * @category Core
 */
export const opaqueConcur: <Value>(
  concurIterable: ConcurIterable<Value>,
) => ConcurIterable<Value>
