import type { MaybePromiseLike } from '../internal/types.js'
import type { ConcurIterable } from './core.js'

/**
 * Returns an iterable containing the values of `iterable` transformed by `fn`
 * in iteration order.
 *
 * Like `Array.prototype.map`, but for iterables.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     [`sloth`, `more sloth`, `even more sloth`],
 *     map(string => string.length),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 5, 10, 15 ]
 * ```
 *
 * @category Transforms
 * @since v0.0.1
 */
export const map: {
  // These overloads help with inferring tuple types returned from the callback.
  <From, To extends unknown[] | []>(
    fn: (value: From) => To,
  ): (iterable: Iterable<From>) => Iterable<To>
  <From, To extends unknown[] | []>(
    fn: (value: From) => To,
    iterable: Iterable<From>,
  ): Iterable<To>

  <From, To>(
    fn: (value: From) => To,
  ): (iterable: Iterable<From>) => Iterable<To>
  <From, To>(fn: (value: From) => To, iterable: Iterable<From>): Iterable<To>
}

/**
 * Returns an async iterable containing the values of `asyncIterable`
 * transformed by `fn` in iteration order.
 *
 * Like `Array.prototype.map`, but for async iterables.
 *
 * @example
 * ```js playground
 * import { asAsync, mapAsync, pipe, reduceAsync, toArray } from 'lfi'
 *
 * const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`
 *
 * console.log(
 * await pipe(
 *     asAsync([`sloth`, `lazy`, `sleep`]),
 *     mapAsync(async word => {
 *       const response = await fetch(`${API_URL}/${word}`)
 *       return (await response.json())[0].phonetic
 *     }),
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ '/slɑθ/', '/ˈleɪzi/', '/sliːp/' ]
 * ```
 *
 * @category Transforms
 * @since v0.0.1
 */
export const mapAsync: {
  // These overloads help with inferring tuple types returned from the callback.
  <From, To extends unknown[] | []>(
    fn: (value: From) => MaybePromiseLike<To>,
  ): (asyncIterable: AsyncIterable<From>) => AsyncIterable<To>
  <From, To extends unknown[] | []>(
    fn: (value: From) => MaybePromiseLike<To>,
    asyncIterable: AsyncIterable<From>,
  ): AsyncIterable<To>

  <From, To>(
    fn: (value: From) => MaybePromiseLike<To>,
  ): (asyncIterable: AsyncIterable<From>) => AsyncIterable<To>
  <From, To>(
    fn: (value: From) => MaybePromiseLike<To>,
    asyncIterable: AsyncIterable<From>,
  ): AsyncIterable<To>
}

/**
 * Returns a concur iterable containing the values of `concurIterable`
 * transformed by `fn` in iteration order.
 *
 * Like `Array.prototype.map`, but for concur iterables.
 *
 * @example
 * ```js playground
 * import { asConcur, mapConcur, pipe, reduceConcur, toArray } from 'lfi'
 *
 * const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`
 *
 * console.log(
 *   await pipe(
 *     asConcur([`sloth`, `lazy`, `sleep`]),
 *     mapConcur(async word => {
 *       const response = await fetch(`${API_URL}/${word}`)
 *       return (await response.json())[0].phonetic
 *     }),
 *     reduceConcur(toArray()),
 *   ),
 * )
 * // NOTE: This order may change between runs
 * //=> [ '/slɑθ/', '/ˈleɪzi/', '/sliːp/' ]
 * ```
 *
 * @category Transforms
 * @since v0.0.1
 */
export const mapConcur: {
  // These overloads help with inferring tuple types returned from the callback.
  <From, To extends unknown[] | []>(
    fn: (value: From) => MaybePromiseLike<To>,
  ): (concurIterable: ConcurIterable<From>) => ConcurIterable<To>
  <From, To extends unknown[] | []>(
    fn: (value: From) => MaybePromiseLike<To>,
    concurIterable: ConcurIterable<From>,
  ): ConcurIterable<To>

  <From, To>(
    fn: (value: From) => MaybePromiseLike<To>,
  ): (concurIterable: ConcurIterable<From>) => ConcurIterable<To>
  <From, To>(
    fn: (value: From) => MaybePromiseLike<To>,
    concurIterable: ConcurIterable<From>,
  ): ConcurIterable<To>
}

/**
 * Returns an iterable containing the values of the iterables returned from
 * applying `fn` to each value of `iterable` in iteration order.
 *
 * Like `Array.prototype.flatMap`, but for iterables.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     [`sloth`, `more sloth`, `even more sloth`],
 *     flatMap(string => [string, string.length]),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 5, 'more sloth', 10, 'even more sloth', 15 ]
 * ```
 *
 * @category Transforms
 * @since v0.0.1
 */
export const flatMap: {
  // These overloads help with inferring tuple types returned from the callback.
  <From, To extends unknown[] | []>(
    fn: (value: From) => Iterable<To>,
  ): (iterable: Iterable<From>) => Iterable<To>
  <From, To extends unknown[] | []>(
    fn: (value: From) => Iterable<To>,
    iterable: Iterable<From>,
  ): Iterable<To>

  <From, To>(
    fn: (value: From) => Iterable<To>,
  ): (iterable: Iterable<From>) => Iterable<To>
  <From, To>(
    fn: (value: From) => Iterable<To>,
    iterable: Iterable<From>,
  ): Iterable<To>
}

/**
 * Returns an async iterable containing the values of the async iterables
 * returned, or resolving from promises returned, from applying `fn` to each
 * value of `asyncIterable` in iteration order.
 *
 * Like `Array.prototype.flatMap`, but for async iterables.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asAsync([`sloth`, `more sloth`, `even more sloth`]),
 *     flatMapAsync(string => [string, string.length]),
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 5, 'more sloth', 10, 'even more sloth', 15 ]
 * ```
 *
 * @category Transforms
 * @since v0.0.1
 */
export const flatMapAsync: {
  // These overloads help with inferring tuple types returned from the callback.
  <From, To extends unknown[] | []>(
    fn: (value: From) => MaybePromiseLike<Iterable<To> | AsyncIterable<To>>,
  ): (asyncIterable: AsyncIterable<From>) => AsyncIterable<To>
  <From, To extends unknown[] | []>(
    fn: (value: From) => MaybePromiseLike<Iterable<To> | AsyncIterable<To>>,
    asyncIterable: AsyncIterable<From>,
  ): AsyncIterable<To>

  <From, To>(
    fn: (value: From) => MaybePromiseLike<Iterable<To> | AsyncIterable<To>>,
  ): (asyncIterable: AsyncIterable<From>) => AsyncIterable<To>
  <From, To>(
    fn: (value: From) => MaybePromiseLike<Iterable<To> | AsyncIterable<To>>,
    asyncIterable: AsyncIterable<From>,
  ): AsyncIterable<To>
}

/**
 * Returns an concur iterable containing the values of the concur iterables
 * returned, or resolving from promises returned, from applying `fn` to each
 * value of `concurIterable`.
 *
 * Like `Array.prototype.flatMap`, but for concur iterables.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asConcur([`sloth`, `more sloth`, `even more sloth`]),
 *     flatMapConcur(string => [string, string.length]),
 *     reduceConcur(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 5, 'more sloth', 10, 'even more sloth', 15 ]
 * ```
 *
 * @category Transforms
 * @since v0.0.1
 */
export const flatMapConcur: {
  // These overloads help with inferring tuple types returned from the callback.
  <From, To extends unknown[] | []>(
    fn: (
      value: From,
    ) => MaybePromiseLike<
      Iterable<To> | AsyncIterable<To> | ConcurIterable<To>
    >,
  ): (concurIterable: ConcurIterable<From>) => ConcurIterable<To>
  <From, To extends unknown[] | []>(
    fn: (
      value: From,
    ) => MaybePromiseLike<
      Iterable<To> | AsyncIterable<To> | ConcurIterable<To>
    >,
    concurIterable: ConcurIterable<From>,
  ): ConcurIterable<To>

  <From, To>(
    fn: (
      value: From,
    ) => MaybePromiseLike<
      Iterable<To> | AsyncIterable<To> | ConcurIterable<To>
    >,
  ): (concurIterable: ConcurIterable<From>) => ConcurIterable<To>
  <From, To>(
    fn: (
      value: From,
    ) => MaybePromiseLike<
      Iterable<To> | AsyncIterable<To> | ConcurIterable<To>
    >,
    concurIterable: ConcurIterable<From>,
  ): ConcurIterable<To>
}

/**
 * Returns an iterable that contains the values of each iterable in `iterable`
 * in iteration order.
 *
 * Like `Array.prototype.flat`, but for iterables.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     [[1, 2], [3, `sloth`, 5], [6, 7]],
 *     flatten,
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 1, 2, 3, 'sloth', 5, 6, 7 ]
 * ```
 *
 * @category Transforms
 * @since v0.0.1
 */
export const flatten: <Value>(
  iterable: Iterable<Iterable<Value>>,
) => Iterable<Value>

/**
 * Returns an async iterable that contains the values of each iterable in
 * `asyncIterable` in iteration order.
 *
 * Like `Array.prototype.flat`, but for async iterables.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asAsync([asAsync([1, 2]), [3, `sloth`, 5], asAsync([6, 7])]),
 *     flattenAsync,
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ 1, 2, 3, 'sloth', 5, 6, 7 ]
 * ```
 *
 * @category Transforms
 * @since v0.0.1
 */
export const flattenAsync: <Value>(
  asyncIterable: AsyncIterable<Iterable<Value> | AsyncIterable<Value>>,
) => AsyncIterable<Value>

/**
 * Returns a concur iterable that contains the values of each iterable in
 * `concurIterable`.
 *
 * Like `Array.prototype.flat`, but for concur iterables.
 *
 * Unlike {@link concat} and {@link concatAsync}, this function does not
 * necessarily iterate over each iterable in sequence.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asConcur([asConcur([1, 2]), [3, `sloth`, 5], asAsync([6, 7])]),
 *     flattenConcur,
 *     reduceConcur(toArray()),
 *   ),
 * )
 * //=> [ 1, 2, 3, 'sloth', 5, 6, 7 ]
 * ```
 *
 * @category Transforms
 * @since v0.0.1
 */
export const flattenConcur: <Value>(
  concurIterable: ConcurIterable<
    Iterable<Value> | AsyncIterable<Value> | ConcurIterable<Value>
  >,
) => ConcurIterable<Value>

/**
 * Returns an iterable equivalent to `iterable` except each value of `iterable`
 * is placed in an entry containing the value's 0-based index in the iteration
 * order followed by the value itself.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     [`sloth`, `more sloth`, `even more sloth`],
 *     index,
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ [ 0, 'sloth' ], [ 1, 'more sloth' ], [ 2, 'even more sloth' ] ]
 * ```
 *
 * @category Transforms
 * @since v2.0.0
 */
export const index: <Value>(
  iterable: Iterable<Value>,
) => Iterable<[number, Value]>

/**
 * Returns an async iterable equivalent to `asyncIterable` except each value of
 * `asyncIterable` is placed in an entry containing the value's 0-based index in
 * the iteration order followed by the value itself.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asAsync([`sloth`, `more sloth`, `even more sloth`]),
 *     indexAsync,
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ [ 0, 'sloth' ], [ 1, 'more sloth' ], [ 2, 'even more sloth' ] ]
 * ```
 *
 * @category Transforms
 * @since v2.0.0
 */
export const indexAsync: <Value>(
  asyncIterable: AsyncIterable<Value>,
) => AsyncIterable<[number, Value]>

/**
 * Returns a concur iterable equivalent to `concurIterable` except each value of
 * `concurIterable` is placed in an entry containing the value's 0-based index
 * in the iteration order followed by the value itself.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asConcur([`sloth`, `more sloth`, `even more sloth`]),
 *     indexConcur,
 *     reduceConcur(toArray()),
 *   ),
 * )
 * //=> [ [ 0, 'sloth' ], [ 1, 'more sloth' ], [ 2, 'even more sloth' ] ]
 * ```
 *
 * @category Transforms
 * @since v2.0.0
 */
export const indexConcur: <Value>(
  concurIterable: ConcurIterable<Value>,
) => ConcurIterable<[number, Value]>
