import type { MaybePromiseLike } from '../internal/types.js'
import type { ConcurIterable } from './as.js'

/**
 * Returns an iterable that contains the values of `iterable` in iteration order
 * excluding the values for which `fn` returns a falsy value.
 *
 * Like `Array.prototype.filter`, but for iterables.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     [`sloth party`, `building`, `sloths in trees`, `city`],
 *     filter(string => string.includes(`sloth`)),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 'sloth party', 'sloths in trees' ]
 * ```
 */
export const filter: {
  <From, To>(
    fn: (value: From) => value is To,
  ): (iterable: Iterable<From>) => Iterable<To>
  <From, To>(
    fn: (value: From) => value is To,
    iterable: Iterable<From>,
  ): Iterable<To>

  <Value>(
    fn: (value: Value) => unknown,
  ): (iterable: Iterable<Value>) => Iterable<Value>
  <Value>(
    fn: (value: Value) => unknown,
    iterable: Iterable<Value>,
  ): Iterable<Value>
}

/**
 * Returns an async iterable that contains the values of `asyncIterable` in
 * iteration order excluding the values for which `fn` returns a value awaitable
 * to a falsy value.
 *
 * Like `Array.prototype.filter`, but for async iterables.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asAsync([`sloth party`, `building`, `sloths in trees`, `city`]),
 *     filterAsync(string => string.includes(`sloth`)),
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ 'sloth party', 'sloths in trees' ]
 * ```
 */
export const filterAsync: {
  <From, To>(
    fn: (value: From) => value is To,
  ): (asyncIterable: AsyncIterable<From>) => AsyncIterable<To>
  <From, To>(
    fn: (value: From) => Value is To,
    asyncIterable: AsyncIterable<From>,
  ): AsyncIterable<To>

  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
  ): (asyncIterable: AsyncIterable<Value>) => AsyncIterable<Value>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
    asyncIterable: AsyncIterable<Value>,
  ): AsyncIterable<Value>
}

/**
 * Returns a concur iterable that contains the values of `concurIterable`
 * excluding the values for which `fn` returns a value awaitable to a falsy
 * value.
 *
 * Like `Array.prototype.filter`, but for concur iterables.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asConcur([`sloth party`, `building`, `sloths in trees`, `city`]),
 *     filterConcur(string => string.includes(`sloth`)),
 *     reduceConcur(toArray()),
 *   ),
 * )
 * //=> [ 'sloth party', 'sloths in trees' ]
 * ```
 */
export const filterConcur: {
  <From, To>(
    fn: (value: From) => value is To,
  ): (concurIterable: ConcurIterable<From>) => ConcurIterable<To>
  <From, To>(
    fn: (value: From) => value is To,
    concurIterable: ConcurIterable<From>,
  ): ConcurIterable<To>

  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
  ): (concurIterable: ConcurIterable<Value>) => ConcurIterable<Value>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
    concurIterable: ConcurIterable<Value>,
  ): ConcurIterable<Value>
}

/**
 * Returns an iterable containing the values of `iterable` transformed by `fn`
 * in iteration order excluding the values for which `fn` returns `null` or
 * `undefined`.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     [
 *       { sloth: `sloth party` },
 *       { notSloth: `building` },
 *       { sloth: `sloths in trees` },
 *       { notSloth: `city` },
 *     ],
 *     filterMap(object => object.sloth),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 'sloth party', 'sloths in trees' ]
 * ```
 */
export const filterMap: {
  <From, To>(
    fn: (value: From) => To | null | undefined,
  ): (iterable: Iterable<From>) => Iterable<NonNullable<To>>
  <From, To>(
    fn: (value: From) => To | null | undefined,
    iterable: Iterable<From>,
  ): Iterable<NonNullable<To>>
}

/**
 * Returns an async iterable containing the values of `asyncIterable`
 * transformed by `fn` in iteration order excluding the values for which `fn`
 * returns a value awaitable to null or undefined.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asAsync([
 *       { sloth: `sloth party` },
 *       { notSloth: `building` },
 *       { sloth: `sloths in trees` },
 *       { notSloth: `city` },
 *     ]),
 *     filterMapAsync(object => object.sloth),
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ 'sloth party', 'sloths in trees' ]
 * ```
 */
export const filterMapAsync: {
  <From, To>(
    fn: (value: From) => MaybePromiseLike<To | null | undefined>,
  ): (asyncIterable: AsyncIterable<From>) => AsyncIterable<NonNullable<To>>
  <From, To>(
    fn: (value: From) => MaybePromiseLike<To | null | undefined>,
    asyncIterable: AsyncIterable<From>,
  ): AsyncIterable<NonNullable<To>>
}

/**
 * Returns a concur iterable containing the values of `concurIterable`
 * transformed by `fn` excluding the values for which `fn` returns a value
 * awaitable to `null` or `undefined`.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asConcur([
 *       { sloth: `sloth party` },
 *       { notSloth: `building` },
 *       { sloth: `sloths in trees` },
 *       { notSloth: `city` },
 *     ]),
 *     filterMapConcur(object => object.sloth),
 *     reduceConcur(toArray()),
 *   ),
 * )
 * //=> [ 'sloth party', 'sloths in trees' ]
 * ```
 */
export const filterMapConcur: {
  <From, To>(
    fn: (value: From) => MaybePromiseLike<To | null | undefined>,
  ): (concurIterable: ConcurIterable<From>) => ConcurIterable<NonNullable<To>>
  <From, To>(
    fn: (value: From) => MaybePromiseLike<To | null | undefined>,
    concurIterable: ConcurIterable<From>,
  ): ConcurIterable<NonNullable<To>>
}

/**
 * Returns an iterable containing the values of `iterable` in iteration order
 * excluding the values of `excluded`.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     [`sloth`, `sleep`, `fast`, `slow`, `mean`],
 *     exclude([`mean`, `fast`]),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'sleep', 'slow' ]
 * ```
 */
export const exclude: {
  (
    excluded: Iterable<unknown>,
  ): <Value>(iterable: Iterable<Value>) => Iterable<Value>
  <Value>(
    excluded: Iterable<unknown>,
    iterable: Iterable<Value>,
  ): Iterable<Value>
}

/**
 * Returns an async iterable containing the values of `asyncIterable` in
 * iteration order excluding the values of `excluded`.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asAsync([`sloth`, `sleep`, `fast`, `slow`, `mean`]),
 *     excludeAsync([`mean`, `fast`]),
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'sleep', 'slow' ]
 * ```
 */
export const excludeAsync: {
  (
    excluded: Iterable<unknown>,
  ): <Value>(asyncIterable: AsyncIterable<Value>) => AsyncIterable<Value>
  <Value>(
    excluded: Iterable<unknown>,
    asyncIterable: AsyncIterable<Value>,
  ): AsyncIterable<Value>
}

/**
 * Returns a concur iterable containing the values of `concurIterable` in
 * iteration order excluding the values of `excluded`.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asConcur([`sloth`, `sleep`, `fast`, `slow`, `mean`]),
 *     excludeConcur([`mean`, `fast`]),
 *     reduceConcur(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'sleep', 'slow' ]
 * ```
 */
export const excludeConcur: {
  (
    excluded: Iterable<unknown>,
  ): <Value>(concurIterable: ConcurIterable<Value>) => ConcurIterable<Value>
  <Value>(
    excluded: Iterable<unknown>,
    concurIterable: ConcurIterable<Value>,
  ): ConcurIterable<Value>
}

/**
 * Returns an iterable containing the values of `iterable` in iteration order,
 * except values for which `fn` returns the same value are deduplicated.
 *
 * When values are deduplicated, the value earlier in iteration order wins.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     [`sloth`, `sleep`, `fast`, `slow`, `mean`],
 *     uniqueBy(word => word.length),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'fast' ]
 * ```
 */
export const uniqueBy: {
  <Value>(
    fn: (value: Value) => unknown,
  ): (iterable: Iterable<Value>) => Iterable<Value>
  <Value>(
    fn: (value: Value) => unknown,
    iterable: Iterable<Value>,
  ): Iterable<Value>
}

/**
 * Returns an async iterable containing the values of `asyncIterable` in
 * iteration order, except values for which `fn` returns a value awaitable to
 * the same value are deduplicated.
 *
 * When values are deduplicated, the value earlier in iteration order wins.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asAsync([`sloth`, `sleep`, `fast`, `slow`, `mean`]),
 *     uniqueByAsync(word => word.length),
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'fast' ]
 * ```
 */
export const uniqueByAsync: {
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
  ): (asyncIterable: AsyncIterable<Value>) => AsyncIterable<Value>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
    asyncIterable: AsyncIterable<Value>,
  ): AsyncIterable<Value>
}

/**
 * Returns a concur iterable containing the values of `concurIterable`, except
 * values for which `fn` returns a value awaitable to the same value are
 * deduplicated.
 *
 * When values are deduplicated, the value earlier in iteration order wins.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asConcur([`sloth`, `sleep`, `fast`, `slow`, `mean`]),
 *     uniqueByConcur(word => word.length),
 *     reduceConcur(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'fast' ]
 * ```
 */
export const uniqueByConcur: {
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
  ): (concurIterable: ConcurIterable<Value>) => ConcurIterable<Value>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
    concurIterable: ConcurIterable<Value>,
  ): ConcurIterable<Value>
}

/**
 * Returns an iterable containing the values of `iterable` in iteration order,
 * except values are deduplicated if they are equal using `Object.is`.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     [`sloth`, `not sloth`, `sloth`],
 *     unique,
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'not sloth' ]
 * ```
 */
export const unique: <Value>(iterable: Iterable<Value>) => Iterable<Value>

/**
 * Returns an async iterable containing the values of `asyncIterable` in
 * iteration order, except values are deduplicated if they are equal using
 * `Object.is`.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asAsync([`sloth`, `not sloth`, `sloth`]),
 *     uniqueAsync,
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'not sloth' ]
 * ```
 */
export const uniqueAsync: <Value>(
  asyncIterable: AsyncIterable<Value>,
) => AsyncIterable<Value>

/**
 * Returns a concur iterable containing the values of `concurIterable` in
 * iteration order, except values are deduplicated if they are equal using
 * `Object.is`.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asConcur([`sloth`, `not sloth`, `sloth`]),
 *     uniqueConcur,
 *     reduceConcur(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'not sloth' ]
 * ```
 */
export const uniqueConcur: <Value>(
  concurIterable: ConcurIterable<Value>,
) => ConcurIterable<Value>
