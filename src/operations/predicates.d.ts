import type { MaybePromiseLike } from '../internal/types.js'
import type { ConcurIterable } from './core.js'

/** @internal */
type Predicate = {
  <Value>(fn: (value: Value) => unknown): (iterable: Iterable<Value>) => boolean
  <Value>(fn: (value: Value) => unknown, iterable: Iterable<Value>): boolean
}

/** @internal */
type PredicateAsync = {
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
  ): (asyncIterable: AsyncIterable<Value>) => Promise<boolean>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
    asyncIterable: AsyncIterable<Value>,
  ): Promise<boolean>
}

/** @internal */
type PredicateConcur = {
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
  ): (concurIterable: ConcurIterable<Value>) => Promise<boolean>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
    concurIterable: ConcurIterable<Value>,
  ): Promise<boolean>
}

/**
 * Returns `true` if `fn` returns a truthy value for all values of `iterable`.
 * Otherwise returns `false`.
 *
 * Like `Array.prototype.every`, but for iterables.
 *
 * @example
 * ```js playground
 * import { all, pipe } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     [`sloth`, `lazy`, `sleep`],
 *     all(word => word.includes(`l`)),
 *   ),
 * )
 * //=> true
 *
 * console.log(
 *   pipe(
 *     [`sloth`, `lazy`, `sleep`],
 *     all(word => word.includes(`s`)),
 *   ),
 * )
 * //=> false
 * ```
 *
 * @category Predicates
 * @since v0.0.1
 */
export const all: Predicate

/**
 * Returns a promise that resolves to `true` if `fn` returns a truthy value or a
 * promise that resolves to a truthy value for all values of `asyncIterable`.
 * Otherwise returns a promise that resolves to `false`.
 *
 * Like `Array.prototype.every`, but for async iterables.
 *
 * @example
 * ```js playground
 * import { allAsync, asAsync, pipe } from 'lfi'
 *
 * const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`
 * const getPartsOfSpeech = async word => {
 *   const response = await fetch(`${API_URL}/${word}`)
 *   const [{ meanings }] = await response.json()
 *   return meanings.map(meaning => meaning.partOfSpeech)
 * }
 *
 * console.log(
 *   await pipe(
 *     asAsync([`sloth`, `lazy`, `sleep`]),
 *     allAsync(async word => (await getPartsOfSpeech(word)).includes(`verb`)),
 *   ),
 * )
 * //=> true
 *
 * console.log(
 *   await pipe(
 *     asAsync([`sloth`, `lazy`, `sleep`]),
 *     allAsync(async word => (await getPartsOfSpeech(word)).includes(`noun`)),
 *   ),
 * )
 * //=> false
 * ```
 *
 * @category Predicates
 * @since v0.0.1
 */
export const allAsync: PredicateAsync

/**
 * Returns a promise that resolves to `true` if `fn` returns a truthy value or a
 * promise that resolves to a truthy value for all values of `concurIterable`.
 * Otherwise returns a promise that resolves to `false`.
 *
 * Like `Array.prototype.every`, but for concur iterables.
 *
 * @example
 * ```js playground
 * import { allConcur, asConcur, pipe } from 'lfi'
 *
 * const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`
 * const getPartsOfSpeech = async word => {
 *   const response = await fetch(`${API_URL}/${word}`)
 *   const [{ meanings }] = await response.json()
 *   return meanings.map(meaning => meaning.partOfSpeech)
 * }
 *
 * console.log(
 *   await pipe(
 *     asConcur([`sloth`, `lazy`, `sleep`]),
 *     allConcur(async word => (await getPartsOfSpeech(word)).includes(`verb`)),
 *   ),
 * )
 * //=> true
 *
 * console.log(
 *   await pipe(
 *     asConcur([`sloth`, `lazy`, `sleep`]),
 *     allConcur(async word => (await getPartsOfSpeech(word)).includes(`noun`)),
 *   ),
 * )
 * //=> false
 * ```
 *
 * @category Predicates
 * @since v0.0.2
 */
export const allConcur: PredicateConcur

/**
 * Returns `true` if `fn` returns a truthy value for any value of `iterable`.
 * Otherwise returns `false`.
 *
 * Like `Array.prototype.some`, but for iterables.
 *
 * @example
 * ```js playground
 * import { any, pipe } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     [`sloth`, `lazy`, `sleep`],
 *     any(word => word.includes(`s`)),
 *   ),
 * )
 * //=> true
 *
 * console.log(
 *   pipe(
 *     [`sloth`, `lazy`, `sleep`],
 *     any(word => word.includes(`x`)),
 *   ),
 * )
 * //=> false
 * ```
 *
 * @category Predicates
 * @since v0.0.1
 */
export const any: Predicate

/**
 * Returns a promise that resolves to `true` if `fn` returns a truthy value or a
 * promise that resolves to a truthy value for any value of `asyncIterable`.
 * Otherwise returns a promise that resolves to `false`.
 *
 * Like `Array.prototype.some`, but for async iterables.
 *
 * @example
 * ```js playground
 * import { anyAsync, asAsync, pipe } from 'lfi'
 *
 * const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`
 * const getPartsOfSpeech = async word => {
 *   const response = await fetch(`${API_URL}/${word}`)
 *   const [{ meanings }] = await response.json()
 *   return meanings.map(meaning => meaning.partOfSpeech)
 * }
 *
 * console.log(
 *   await pipe(
 *     asAsync([`sloth`, `lazy`, `sleep`]),
 *     anyAsync(async word => (await getPartsOfSpeech(word)).includes(`noun`)),
 *   ),
 * )
 * //=> true
 *
 * console.log(
 *   await pipe(
 *     asAsync([`sloth`, `lazy`, `sleep`]),
 *     anyAsync(async word => (await getPartsOfSpeech(word)).includes(`adverb`)),
 *   ),
 * )
 * //=> false
 * ```
 *
 * @category Predicates
 * @since v0.0.1
 */
export const anyAsync: PredicateAsync

/**
 * Returns a promise that resolves to `true` if `fn` returns a truthy value or a
 * promise that resolves to a truthy value for any value of `concurIterable`.
 * Otherwise returns a promise that resolves to `false`.
 *
 * Like `Array.prototype.some`, but for concur iterables.
 *
 * @example
 * ```js playground
 * import { anyConcur, asConcur, pipe } from 'lfi'
 *
 * const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`
 * const getPartsOfSpeech = async word => {
 *   const response = await fetch(`${API_URL}/${word}`)
 *   const [{ meanings }] = await response.json()
 *   return meanings.map(meaning => meaning.partOfSpeech)
 * }
 *
 * console.log(
 *   await pipe(
 *     asConcur([`sloth`, `lazy`, `sleep`]),
 *     anyConcur(async word => (await getPartsOfSpeech(word)).includes(`noun`)),
 *   ),
 * )
 * //=> true
 *
 * console.log(
 *   await pipe(
 *     asConcur([`sloth`, `lazy`, `sleep`]),
 *     anyConcur(async word => (await getPartsOfSpeech(word)).includes(`adverb`)),
 *   ),
 * )
 * //=> false
 * ```
 *
 * @category Predicates
 * @since v0.0.2
 */
export const anyConcur: PredicateConcur

/**
 * Returns `true` if `fn` returns a falsy value for all values of `iterable`.
 * Otherwise returns `false`.
 *
 * @example
 * ```js playground
 * import { none, pipe } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     [`sloth`, `lazy`, `sleep`],
 *     none(word => word.includes(`s`)),
 *   ),
 * )
 * //=> false
 *
 * console.log(
 *   pipe(
 *     [`sloth`, `lazy`, `sleep`],
 *     none(word => word.includes(`x`)),
 *   ),
 * )
 * //=> true
 * ```
 *
 * @category Predicates
 * @since v0.0.1
 */
export const none: Predicate

/**
 * Returns a promise that resolves to `true` if `fn` returns a falsy value or a
 * promise that resolves to a falsy value for all values of `asyncIterable`.
 * Otherwise returns a promise that resolves to `false`.
 *
 * @example
 * ```js playground
 * import { noneAsync, asAsync, pipe } from 'lfi'
 *
 * const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`
 * const getPartsOfSpeech = async word => {
 *   const response = await fetch(`${API_URL}/${word}`)
 *   const [{ meanings }] = await response.json()
 *   return meanings.map(meaning => meaning.partOfSpeech)
 * }
 *
 * console.log(
 *   await pipe(
 *     asAsync([`sloth`, `lazy`, `sleep`]),
 *     noneAsync(async word => (await getPartsOfSpeech(word)).includes(`noun`)),
 *   ),
 * )
 * //=> false
 *
 * console.log(
 *   await pipe(
 *     asAsync([`sloth`, `lazy`, `sleep`]),
 *     noneAsync(async word => (await getPartsOfSpeech(word)).includes(`adverb`)),
 *   ),
 * )
 * //=> true
 * ```
 *
 * @category Predicates
 * @since v0.0.1
 */
export const noneAsync: PredicateAsync

/**
 * Returns a promise that resolves to `true` if `fn` returns a falsy value or a
 * promise that resolves to a falsy value for all values of `concurIterable`.
 * Otherwise returns a promise that resolves to `false`.
 *
 * @example
 * ```js playground
 * import { noneConcur, asConcur, pipe } from 'lfi'
 *
 * const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`
 * const getPartsOfSpeech = async word => {
 *   const response = await fetch(`${API_URL}/${word}`)
 *   const [{ meanings }] = await response.json()
 *   return meanings.map(meaning => meaning.partOfSpeech)
 * }
 *
 * console.log(
 *   await pipe(
 *     asConcur([`sloth`, `lazy`, `sleep`]),
 *     noneConcur(async word => (await getPartsOfSpeech(word)).includes(`noun`)),
 *   ),
 * )
 * //=> true
 *
 * console.log(
 *   await pipe(
 *     asConcur([`sloth`, `lazy`, `sleep`]),
 *     noneConcur(async word => (await getPartsOfSpeech(word)).includes(`adverb`)),
 *   ),
 * )
 * //=> false
 * ```
 *
 * @category Predicates
 * @since v0.0.2
 */
export const noneConcur: PredicateConcur

/**
 * Returns `true` if any value of `iterable` is equal to `searchElement` using
 * `Object.is`. Otherwise returns `false`.
 *
 * Like `Array.prototype.includes`, but for iterables.
 *
 * @example
 * ```js playground
 * import { includes, pipe } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     [`sloth`, `lazy`, `sleep`],
 *     includes(`lazy`),
 *   ),
 * )
 * //=> true
 *
 * console.log(
 *   pipe(
 *     [`sloth`, `lazy`, `sleep`],
 *     includes(`awake`),
 *   ),
 * )
 * //=> false
 * ```
 *
 * @category Predicates
 * @since v0.0.2
 */
export const includes: {
  (searchElement: unknown): <Value>(iterable: Iterable<Value>) => boolean
  <Value>(searchElement: unknown, iterable: Iterable<Value>): boolean
}

/**
 * Returns a promise that resolves to `true` if any value of `asyncIterable` is
 * equal to `searchElement` using `Object.is`. Otherwise returns a promise that
 * resolves to `false`.
 *
 * Like `Array.prototype.includes`, but for async iterables.
 *
 * @example
 * ```js playground
 * import { asAsync, flatMapAsync, includesAsync, pipe } from 'lfi'
 *
 * const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`
 * const getPartsOfSpeech = async word => {
 *   const response = await fetch(`${API_URL}/${word}`)
 *   const [{ meanings }] = await response.json()
 *   return meanings.map(meaning => meaning.partOfSpeech)
 * }
 *
 * console.log(
 *   await pipe(
 *     asAsync([`sloth`, `lazy`, `sleep`]),
 *     flatMapAsync(getPartsOfSpeech),
 *     includesAsync(`noun`),
 *   ),
 * )
 * //=> true
 *
 * console.log(
 *   await pipe(
 *     asAsync([`sloth`, `lazy`, `sleep`]),
 *     flatMapAsync(getPartsOfSpeech),
 *     includesAsync(`adverb`),
 *   ),
 * )
 * //=> false
 * ```
 *
 * @category Predicates
 * @since v0.0.2
 */
export const includesAsync: {
  (
    searchElement: unknown,
  ): <Value>(asyncIterable: AsyncIterable<Value>) => Promise<boolean>
  <Value>(
    searchElement: unknown,
    asyncIterable: AsyncIterable<Value>,
  ): Promise<boolean>
}

/**
 * Returns a promise that resolves to `true` if any value of `concurIterable` is
 * equal to `searchElement` using `Object.is`. Otherwise returns a promise that
 * resolves to `false`.
 *
 * Like `Array.prototype.includes`, but for concur iterables.
 *
 * @example
 * ```js playground
 * import { asConcur, flatMapConcur, includesConcur, pipe } from 'lfi'
 *
 * const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`
 * const getPartsOfSpeech = async word => {
 *   const response = await fetch(`${API_URL}/${word}`)
 *   const [{ meanings }] = await response.json()
 *   return meanings.map(meaning => meaning.partOfSpeech)
 * }
 *
 * console.log(
 *   await pipe(
 *     asConcur([`sloth`, `lazy`, `sleep`]),
 *     flatMapConcur(getPartsOfSpeech),
 *     includesConcur(`noun`),
 *   ),
 * )
 * //=> true
 *
 * console.log(
 *   await pipe(
 *     asConcur([`sloth`, `lazy`, `sleep`]),
 *     flatMapConcur(getPartsOfSpeech),
 *     includesConcur(`adverb`),
 *   ),
 * )
 * //=> false
 * ```
 *
 * @category Predicates
 * @since v0.0.2
 */
export const includesConcur: {
  (
    searchElement: unknown,
  ): <Value>(concurIterable: ConcurIterable<Value>) => Promise<boolean>
  <Value>(
    searchElement: unknown,
    concurIterable: ConcurIterable<Value>,
  ): Promise<boolean>
}
