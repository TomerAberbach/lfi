import type { MaybePromiseLike } from '../internal/types.js'
import type { ConcurIterable } from './core.js'

/**
 * Returns an iterable containing the values of `iterable` transformed by `fn`
 * in iteration order.
 *
 * Like `Array.prototype.map`, but for iterables.
 *
 * @example
 * ```js playground
 * import { map, pipe, reduce, toArray } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     [`sloth`, `lazy`, `sleep`],
 *     map(word => word.length),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 5, 4, 5 ]
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
 *   await pipe(
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
 * ```js playground
 * import { flatMap, pipe, reduce, toArray } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     [`sloth`, `lazy`, `sleep`],
 *     flatMap(word => [word, `much ${word}`]),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [
 * //=>   'sloth',
 * //=>   'much sloth',
 * //=>   'lazy',
 * //=>   'much lazy',
 * //=>   'sleep',
 * //=>   'much sleep'
 * //=> ]
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
 * ```js playground
 * import { asAsync, flatMapAsync, map, pipe, reduceAsync, toArray } from 'lfi'
 *
 * const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`
 *
 * console.log(
 *   await pipe(
 *     asAsync([`sloth`, `lazy`, `sleep`]),
 *     flatMapAsync(async word => {
 *       const response = await fetch(`${API_URL}/${word}`)
 *       const [{ meanings }] = await response.json()
 *       return map(meaning => meaning.partOfSpeech, meanings)
 *     }),
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [
 * //=>   'noun',
 * //=>   'verb',
 * //=>   'noun',
 * //=>   'verb',
 * //=>   'adjective',
 * //=>   'verb'
 * //=> ]
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
 * ```js playground
 * import { asConcur, flatMapConcur, map, pipe, reduceConcur, toArray } from 'lfi'
 *
 * const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`
 *
 * console.log(
 *   await pipe(
 *     asConcur([`sloth`, `lazy`, `sleep`]),
 *     flatMapConcur(async word => {
 *       const response = await fetch(`${API_URL}/${word}`)
 *       const [{ meanings }] = await response.json()
 *       return map(meaning => meaning.partOfSpeech, meanings)
 *     }),
 *     reduceConcur(toArray()),
 *   ),
 * )
 * // NOTE: This order may change between runs
 * //=> [
 * //=>   'noun',
 * //=>   'verb',
 * //=>   'noun',
 * //=>   'verb',
 * //=>   'adjective',
 * //=>   'verb'
 * //=> ]
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
 * ```js playground
 * import { flatten, pipe, reduce, toArray } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     [[`sloth`, `lazy`], [`sleep`]],
 *     flatten,
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'lazy', 'sleep' ]
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
 * ```js playground
 * import { asAsync, flattenAsync, map, mapAsync, pipe, reduceAsync, toArray } from 'lfi'
 *
 * const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`
 *
 * console.log(
 *   await pipe(
 *     asAsync([`sloth`, `lazy`, `sleep`]),
 *     mapAsync(async word => {
 *       const response = await fetch(`${API_URL}/${word}`)
 *       const [{ meanings }] = await response.json()
 *       return map(meaning => meaning.partOfSpeech, meanings)
 *     }),
 *     flattenAsync,
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [
 * //=>   'noun',
 * //=>   'verb',
 * //=>   'noun',
 * //=>   'verb',
 * //=>   'adjective',
 * //=>   'verb'
 * //=> ]
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
 * Unlike {@link flatten} and {@link flattenAsync}, this function does not
 * necessarily iterate over each iterable in sequence.
 *
 * @example
 * ```js playground
 * import { asConcur, flattenConcur, map, mapConcur, pipe, reduceConcur, toArray } from 'lfi'
 *
 * const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`
 *
 * console.log(
 *   await pipe(
 *     asConcur([`sloth`, `lazy`, `sleep`]),
 *     mapConcur(async word => {
 *       const response = await fetch(`${API_URL}/${word}`)
 *       const [{ meanings }] = await response.json()
 *       return map(meaning => meaning.partOfSpeech, meanings)
 *     }),
 *     flattenConcur,
 *     reduceConcur(toArray()),
 *   ),
 * )
 * // NOTE: This order may change between runs
 * //=> [
 * //=>   'noun',
 * //=>   'verb',
 * //=>   'noun',
 * //=>   'verb',
 * //=>   'adjective',
 * //=>   'verb'
 * //=> ]
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
 * ```js playground
 * import { index, join, map, pipe, reduce } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     [`sloth`, `lazy`, `sleep`],
 *     index,
 *     map(([index, word]) => `${index + 1}. ${word}`),
 *     join(`\n`),
 *   ),
 * )
 * //=> 1. sloth
 * //=> 2. lazy
 * //=> 3. sleep
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
 * ```js playground
 * import { asAsync, indexAsync, joinAsync, mapAsync, pipe } from 'lfi'
 *
 * const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`
 *
 * console.log(
 *   await pipe(
 *     asAsync([`sloth`, `lazy`, `sleep`]),
 *     mapAsync(async word => {
 *       const response = await fetch(`${API_URL}/${word}`)
 *       return (await response.json())[0].phonetic
 *     }),
 *     indexAsync,
 *     mapAsync(([index, word]) => `${index + 1}. ${word}`),
 *     joinAsync(`\n`),
 *   ),
 * )
 * //=> 1. /slɑθ/
 * //=> 2. /ˈleɪzi/
 * //=> 3. /sliːp/
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
 * ```js playground
 * import { asConcur, indexConcur, joinConcur, mapConcur, pipe } from 'lfi'
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
 *     indexConcur,
 *     mapConcur(([index, word]) => `${index + 1}. ${word}`),
 *     joinConcur(`\n`),
 *   ),
 * )
 * // NOTE: This order may change between runs
 * //=> 1. /slɑθ/
 * //=> 2. /ˈleɪzi/
 * //=> 3. /sliːp/
 * ```
 *
 * @category Transforms
 * @since v2.0.0
 */
export const indexConcur: <Value>(
  concurIterable: ConcurIterable<Value>,
) => ConcurIterable<[number, Value]>
