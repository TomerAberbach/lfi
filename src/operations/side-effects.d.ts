import type { MaybePromiseLike } from '../internal/types.js'
import type { ConcurIterable } from './core.js'

/**
 * Returns an iterable equivalent to `iterable` that applies `fn` to each value
 * of `iterable` as it is iterated.
 *
 * @example
 * ```js playground
 * import { each, pipe, reduce, toArray } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     [`sloth`, `lazy`, `sleep`],
 *     each(console.log),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> sloth
 * //=> lazy
 * //=> sleep
 * //=> [ 'sloth', 'lazy', 'sleep' ]
 * ```
 *
 * @category Side effects
 * @since v0.0.1
 */
export const each: {
  <From, To extends From>(
    fn: (value: From) => asserts value is To,
  ): (iterable: Iterable<From>) => Iterable<To>
  <From, To extends From>(
    fn: (value: From) => asserts value is To,
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
 * Returns an async iterable equivalent to `asyncIterable` that applies `fn` to
 * each value of `asyncIterable` as it is iterated.
 *
 * The result of applying `fn` to a value is awaited before yielding and then
 * moving on to the next value.
 *
 * @example
 * ```js playground
 * import { asAsync, eachAsync, mapAsync, pipe, reduceAsync, toArray } from 'lfi'
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
 *     eachAsync(console.log),
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> /slɑθ/
 * //=> /ˈleɪzi/
 * //=> /sliːp/
 * //=> [ '/slɑθ/', '/ˈleɪzi/', '/sliːp/' ]
 * ```
 *
 * @category Side effects
 * @since v0.0.1
 */
export const eachAsync: {
  <Value>(
    fn: (value: Value) => PromiseLike<unknown>,
  ): (asyncIterable: AsyncIterable<Value>) => AsyncIterable<Value>
  <Value>(
    fn: (value: Value) => PromiseLike<unknown>,
    asyncIterable: AsyncIterable<Value>,
  ): AsyncIterable<Value>

  <From, To extends From>(
    fn: (value: From) => asserts value is To,
  ): (asyncIterable: AsyncIterable<From>) => AsyncIterable<To>
  <From, To extends From>(
    fn: (value: From) => asserts value is To,
    asyncIterable: AsyncIterable<From>,
  ): AsyncIterable<To>
}

/**
 * Returns an concur iterable equivalent to `concurIterable` that applies `fn`
 * to each value of `concurIterable` as it is iterated.
 *
 * The result of applying `fn` to a value is awaited before yielding.
 *
 * @example
 * ```js playground
 * import { asConcur, eachConcur, mapConcur, pipe, reduceConcur, toArray } from 'lfi'
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
 *     eachConcur(console.log),
 *     reduceConcur(toArray()),
 *   ),
 * )
 * // NOTE: This order may change between runs
 * //=> /slɑθ/
 * //=> /ˈleɪzi/
 * //=> /sliːp/
 * //=> [ '/slɑθ/', '/ˈleɪzi/', '/sliːp/' ]
 * ```
 *
 * @category Side effects
 * @since v0.0.1
 */
export const eachConcur: {
  <Value>(
    fn: (value: Value) => PromiseLike<unknown>,
  ): (concurIterable: ConcurIterable<Value>) => ConcurIterable<Value>
  <Value>(
    fn: (value: Value) => PromiseLike<unknown>,
    concurIterable: ConcurIterable<Value>,
  ): ConcurIterable<Value>

  <From, To extends From>(
    fn: (value: From) => asserts value is To,
  ): (concurIterable: ConcurIterable<From>) => ConcurIterable<To>
  <From, To extends From>(
    fn: (value: From) => asserts value is To,
    concurIterable: ConcurIterable<From>,
  ): ConcurIterable<To>
}

/**
 * Applies `fn` to each value of `iterable`.
 *
 * Like `Array.prototype.forEach`, but for iterables.
 *
 * @example
 * ```js playground
 * import { forEach, pipe } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     [`sloth`, `lazy`, `sleep`],
 *     forEach(console.log),
 *   ),
 * )
 * //=> sloth
 * //=> lazy
 * //=> sleep
 * ```
 *
 * @category Side effects
 * @since v0.0.1
 */
export const forEach: {
  <Value>(fn: (value: Value) => unknown): (iterable: Iterable<Value>) => void
  <Value>(fn: (value: Value) => unknown, iterable: Iterable<Value>): void
}

/**
 * Returns a promise that resolves when `fn` has been applied to each value of
 * `asyncIterable` and the result of each application has been awaited.
 *
 * The result of applying `fn` to a value is awaited before moving on to the
 * next value.
 *
 * Like `Array.prototype.forEach`, but for async iterables.
 *
 * @example
 * ```js playground
 * import { asAsync, forEachAsync, mapAsync, pipe } from 'lfi'
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
 *     forEachAsync(console.log),
 *   ),
 * )
 * //=> /slɑθ/
 * //=> /ˈleɪzi/
 * //=> /sliːp/
 * ```
 *
 * @category Side effects
 * @since v0.0.1
 */
export const forEachAsync: {
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
  ): (asyncIterable: AsyncIterable<Value>) => Promise<void>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
    asyncIterable: AsyncIterable<Value>,
  ): Promise<void>
}

/**
 * Returns a promise that resolves when `fn` has been applied to each value of
 * `concurIterable` and the result of each application has been awaited.
 *
 * The promise rejects if `concurIterable` rejects. However, `fn` will be called
 * with every non-erroring value before the promise rejects, even if
 * non-erroring values arrives after erroring ones.
 *
 * Like `Array.prototype.forEach`, but for concur iterables.
 *
 * @example
 * ```js playground
 * import { asConcur, forEachConcur, mapConcur, pipe } from 'lfi'
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
 *     forEachConcur(console.log),
 *   ),
 * )
 * // NOTE: This order may change between runs
 * //=> /slɑθ/
 * //=> /ˈleɪzi/
 * //=> /sliːp/
 * ```
 *
 * @category Side effects
 * @since v0.0.1
 */
export const forEachConcur: {
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
  ): (concurIterable: ConcurIterable<Value>) => Promise<void>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
    concurIterable: ConcurIterable<Value>,
  ): Promise<void>
}

/**
 * Iterates through `iterable` causing lazy operations to run.
 *
 * @example
 * ```js playground
 * import { consume, each, pipe } from 'lfi'
 *
 * const iterable = pipe(
 *   [`sloth`, `lazy`, `sleep`],
 *   each(console.log),
 * )
 * // No output
 *
 * consume(iterable)
 * //=> sloth
 * //=> lazy
 * //=> sleep
 * ```
 *
 * @category Side effects
 * @since v2.0.0
 */
export const consume: (iterable: Iterable<unknown>) => void

/**
 * Iterates through `asyncIterable` causing lazy operations to run.
 *
 * @example
 * ```js playground
 * import { asAsync, consumeAsync, eachAsync, mapAsync, pipe } from 'lfi'
 *
 * const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`
 *
 * const asyncIterable = pipe(
 *   asAsync([`sloth`, `lazy`, `sleep`]),
 *   mapAsync(async word => {
 *     const response = await fetch(`${API_URL}/${word}`)
 *     return (await response.json())[0].phonetic
 *   }),
 *   eachAsync(console.log),
 * )
 * // No output
 *
 * await consumeAsync(asyncIterable)
 * //=> /slɑθ/
 * //=> /ˈleɪzi/
 * //=> /sliːp/
 * ```
 *
 * @category Side effects
 * @since v2.0.0
 */
export const consumeAsync: (
  asyncIterable: AsyncIterable<unknown>,
) => Promise<void>

/**
 * Returns a promise that resolves after iterating through the `concurIterable`
 * and causing lazy operations to run.
 *
 * The promise rejects if `concurIterable` rejects.
 *
 * @example
 * ```js playground
 * import { asConcur, consumeConcur, eachConcur, mapConcur, pipe } from 'lfi'
 *
 * const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`
 *
 * const asyncIterable = pipe(
 *   asConcur([`sloth`, `lazy`, `sleep`]),
 *   mapConcur(async word => {
 *     const response = await fetch(`${API_URL}/${word}`)
 *     return (await response.json())[0].phonetic
 *   }),
 *   eachConcur(console.log),
 * )
 * // No output
 *
 * await consumeConcur(asyncIterable)
 * // NOTE: This order may change between runs
 * //=> /slɑθ/
 * //=> /ˈleɪzi/
 * //=> /sliːp/
 * ```
 *
 * @category Side effects
 * @since v2.0.0
 */
export const consumeConcur: (
  concurIterable: ConcurIterable<unknown>,
) => Promise<void>

/**
 * Returns an iterable equivalent to `iterable` that iterates over `iterable` at
 * most once by lazily caching the values from the first iteration.
 *
 * @example
 * ```js playground
 * import { each, cache, pipe } from 'lfi'
 *
 * const iterable = pipe(
 *   [`sloth`, `lazy`, `sleep`],
 *   each(console.log),
 *   cache,
 * )
 * // No output
 *
 * console.log([...iterable])
 * //=> sloth
 * //=> lazy
 * //=> sleep
 * //=> [ 'sloth', 'lazy', 'sleep' ]
 *
 * console.log([...iterable])
 * //=> [ 'sloth', 'lazy', 'sleep' ]
 * ```
 *
 * @category Side effects
 * @since v2.0.0
 */
export const cache: <Value>(iterable: Iterable<Value>) => Iterable<Value>

/**
 * Returns an async iterable equivalent to `asyncIterable` that iterates over
 * `asyncIterable` at most once by lazily caching the values from the first
 * iteration.
 *
 * @example
 * ```js playground
 * import { asAsync, eachAsync, cacheAsync, mapAsync, pipe, reduceAsync, toArray } from 'lfi'
 *
 * const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`
 *
 * const asyncIterable = pipe(
 *   asAsync([`sloth`, `lazy`, `sleep`]),
 *   mapAsync(async word => {
 *     const response = await fetch(`${API_URL}/${word}`)
 *     return (await response.json())[0].phonetic
 *   }),
 *   eachAsync(console.log),
 *   cacheAsync,
 * )
 * // No output
 *
 * console.log(
 *   await pipe(
 *     asyncIterable,
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> /slɑθ/
 * //=> /ˈleɪzi/
 * //=> /sliːp/
 * //=> [ '/slɑθ/', '/ˈleɪzi/', '/sliːp/' ]
 *
 * console.log(
 *   await pipe(
 *     asyncIterable,
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ '/slɑθ/', '/ˈleɪzi/', '/sliːp/' ]
 * ```
 *
 * @category Side effects
 * @since v2.0.0
 */
export const cacheAsync: <Value>(
  asyncIterable: AsyncIterable<Value>,
) => AsyncIterable<Value>

/**
 * Returns a concur iterable equivalent to `concurIterable` that iterates over
 * `concurIterable` at most once by lazily caching the values from the first
 * iteration.
 *
 * @example
 * ```js playground
 * import { asConcur, eachConcur, cacheConcur, mapConcur, pipe, reduceConcur, toArray } from 'lfi'
 *
 * const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`
 *
 * const asyncIterable = pipe(
 *   asConcur([`sloth`, `lazy`, `sleep`]),
 *   mapConcur(async word => {
 *     const response = await fetch(`${API_URL}/${word}`)
 *     return (await response.json())[0].phonetic
 *   }),
 *   eachConcur(console.log),
 *   cacheConcur,
 * )
 * // No output
 *
 * console.log(
 *   await pipe(
 *     asyncIterable,
 *     reduceConcur(toArray()),
 *   ),
 * )
 * // NOTE: This order may change between runs
 * //=> /slɑθ/
 * //=> /ˈleɪzi/
 * //=> /sliːp/
 * //=> [ '/slɑθ/', '/ˈleɪzi/', '/sliːp/' ]
 *
 * console.log(
 *   await pipe(
 *     asyncIterable,
 *     reduceConcur(toArray()),
 *   ),
 * )
 * // NOTE: This order may change between runs
 * //=> [ '/slɑθ/', '/ˈleɪzi/', '/sliːp/' ]
 * ```
 *
 * @category Side effects
 * @since v2.0.0
 */
export const cacheConcur: <Value>(
  concurIterable: ConcurIterable<Value>,
) => ConcurIterable<Value>
