import type { MaybePromiseLike } from '../internal/types.js'
import type { ConcurIterable } from './core.js'

/**
 * An iterable containing exactly zero or one values.
 *
 * @category Optionals
 * @since v2.0.0
 */
export type Optional<Value> = Iterable<Value>

/**
 * An async iterable containing exactly zero or one values.
 *
 * @category Optionals
 * @since v2.0.0
 */
export type AsyncOptional<Value> = AsyncIterable<Value>

/**
 * A concur iterable containing exactly zero or one values.
 *
 * @category Optionals
 * @since v2.0.0
 */
export type ConcurOptional<Value> = ConcurIterable<Value>

/**
 * Returns the only value in `iterable` if it contains exactly one value.
 * Otherwise, returns the result of invoking `fn`.
 *
 * @example
 * ```js playground
 * import { or, pipe } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     [`sloth`],
 *     or(() => `never called`),
 *   ),
 * )
 * //=> sloth
 *
 * console.log(
 *   pipe(
 *     [],
 *     or(() => `called!`),
 *   ),
 * )
 * //=> called!
 *
 * console.log(
 *   pipe(
 *     [`sloth`, `lazy`, `sleep`],
 *     or(() => `called!`),
 *   ),
 * )
 * //=> called!
 * ```
 *
 * @category Optionals
 * @since v0.0.1
 */
export const or: {
  <Value>(fn: () => Value): (iterable: Iterable<Value>) => Value
  <Value>(fn: () => Value, iterable: Iterable<Value>): Value
}

/**
 * Returns a promise that resolves to the only value in `asyncIterable` if it
 * contains exactly one value. Otherwise, returns a promise that resolves to
 * the awaited result of invoking `fn`.
 *
 * @example
 * ```js playground
 * import { asAsync, findAsync, orAsync, pipe } from 'lfi'
 *
 * const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`
 *
 * const findWordWithPartOfSpeech = partOfSpeech =>
 *   pipe(
 *     asAsync([`sloth`, `lazy`, `sleep`]),
 *     findAsync(async word => {
 *       const response = await fetch(`${API_URL}/${word}`)
 *       const [{ meanings }] = await response.json()
 *       return meanings.some(meaning => meaning.partOfSpeech === partOfSpeech)
 *     }),
 *     orAsync(() => `no ${partOfSpeech}???`),
 *   )
 *
 * console.log(await findWordWithPartOfSpeech(`noun`))
 * //=> sloth
 * console.log(await findWordWithPartOfSpeech(`verb`))
 * //=> sloth
 * console.log(await findWordWithPartOfSpeech(`adjective`))
 * //=> lazy
 * console.log(await findWordWithPartOfSpeech(`adverb`))
 * //=> no adverb???
 * ```
 *
 * @category Optionals
 * @since v0.0.1
 */
export const orAsync: {
  <Value>(
    fn: () => MaybePromiseLike<Value>,
  ): (asyncIterable: AsyncIterable<Value>) => Promise<Value>
  <Value>(
    fn: () => MaybePromiseLike<Value>,
    asyncIterable: AsyncIterable<Value>,
  ): Promise<Value>
}

/**
 * Returns a promise that resolves to the only value in `concurIterable` if it
 * contains exactly one value. Otherwise, returns a promise that resolves to
 * the awaited result of invoking `fn`.
 *
 * @example
 * ```js playground
 * import { asConcur, findConcur, orConcur, pipe } from 'lfi'
 *
 * const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`
 *
 * const findWordWithPartOfSpeech = partOfSpeech =>
 *   pipe(
 *     asConcur([`sloth`, `lazy`, `sleep`]),
 *     findConcur(async word => {
 *       const response = await fetch(`${API_URL}/${word}`)
 *       const [{ meanings }] = await response.json()
 *       return meanings.some(meaning => meaning.partOfSpeech === partOfSpeech)
 *     }),
 *     orConcur(() => `no ${partOfSpeech}???`),
 *   )
 *
 * console.log(await findWordWithPartOfSpeech(`noun`))
 * // NOTE: This word may change between runs
 * //=> sloth
 * console.log(await findWordWithPartOfSpeech(`verb`))
 * // NOTE: This word may change between runs
 * //=> sloth
 * console.log(await findWordWithPartOfSpeech(`adjective`))
 * //=> lazy
 * console.log(await findWordWithPartOfSpeech(`adverb`))
 * //=> no adverb???
 * ```
 *
 * @category Optionals
 * @since v0.0.2
 */
export const orConcur: {
  <Value>(
    fn: () => MaybePromiseLike<Value>,
  ): (concurIterable: ConcurIterable<Value>) => Promise<Value>
  <Value>(
    fn: () => MaybePromiseLike<Value>,
    concurIterable: ConcurIterable<Value>,
  ): Promise<Value>
}

/**
 * Returns the only value in `iterable` if it contains exactly one value.
 * Otherwise, throws an error.
 *
 * @example
 * ```js playground
 * import { get } from 'lfi'
 *
 * console.log(get([`sloth`]))
 * //=> sloth
 *
 * try {
 *   console.log(get([]))
 * } catch {
 *   console.log(`Oh no! It was empty...`)
 * }
 * //=> Oh no! It was empty...
 *
 * try {
 *   console.log(get([`sloth`, `lazy`, `sleep`]))
 * } catch {
 *   console.log(`Oh no! It had more than one value...`)
 * }
 * //=> Oh no! It had more than one value...
 * ```
 *
 * @category Optionals
 * @since v0.0.1
 */
export const get: <Value>(iterable: Iterable<Value>) => Value

/**
 * Returns a promise that resolves to the only value in `asyncIterable` if it
 * contains exactly one value. Otherwise, returns a promise that rejects.
 *
 * @example
 * ```js playground
 * import { asAsync, findAsync, getAsync, pipe } from 'lfi'
 *
 * const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`
 *
 * const findWordWithPartOfSpeech = partOfSpeech =>
 *   pipe(
 *     asAsync([`sloth`, `lazy`, `sleep`]),
 *     findAsync(async word => {
 *       const response = await fetch(`${API_URL}/${word}`)
 *       const [{ meanings }] = await response.json()
 *       return meanings.some(meaning => meaning.partOfSpeech === partOfSpeech)
 *     }),
 *     getAsync,
 *   )
 *
 * console.log(await findWordWithPartOfSpeech(`noun`))
 * //=> sloth
 * console.log(await findWordWithPartOfSpeech(`verb`))
 * //=> sloth
 * console.log(await findWordWithPartOfSpeech(`adjective`))
 * //=> lazy
 * try {
 *   console.log(await findWordWithPartOfSpeech(`adverb`))
 * } catch {
 *   console.log(`Oh no! It was empty...`)
 * }
 * //=> Oh no! It was empty...
 * ```
 *
 * @category Optionals
 * @since v0.0.1
 */
export const getAsync: <Value>(
  asyncIterable: AsyncIterable<Value>,
) => Promise<Value>

/**
 * Returns a promise that resolves to the only value in `concurIterable` if it
 * contains exactly one value. Otherwise, returns a promise that rejects.
 *
 * @example
 * ```js playground
 * import { asConcur, findConcur, getConcur, pipe } from 'lfi'
 *
 * const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`
 *
 * const findWordWithPartOfSpeech = partOfSpeech =>
 *   pipe(
 *     asConcur([`sloth`, `lazy`, `sleep`]),
 *     findConcur(async word => {
 *       const response = await fetch(`${API_URL}/${word}`)
 *       const [{ meanings }] = await response.json()
 *       return meanings.some(meaning => meaning.partOfSpeech === partOfSpeech)
 *     }),
 *     getConcur,
 *   )
 *
 * console.log(await findWordWithPartOfSpeech(`noun`))
 * // NOTE: This word may change between runs
 * //=> sloth
 * console.log(await findWordWithPartOfSpeech(`verb`))
 * // NOTE: This word may change between runs
 * //=> sloth
 * console.log(await findWordWithPartOfSpeech(`adjective`))
 * //=> lazy
 * try {
 *   console.log(await findWordWithPartOfSpeech(`adverb`))
 * } catch {
 *   console.log(`Oh no! It was empty...`)
 * }
 * //=> Oh no! It was empty...
 * ```
 *
 * @category Optionals
 * @since v0.0.2
 */
export const getConcur: <Value>(
  concurIterable: ConcurIterable<Value>,
) => Promise<Value>

/**
 * Returns a pair of iterables. If `iterable` is empty, then both of the
 * returned iterables are empty. Otherwise, the first iterable contains the
 * first value of `iterable` and the second iterable contains the rest of the
 * values of `iterable`. The second iterable can only be iterated once.
 *
 * @example
 * ```js playground
 * import { count, get, next } from 'lfi'
 *
 * const [first, rest] = next([`sloth`, `lazy`, `sleep`])
 *
 * console.log(get(first))
 * //=> sloth
 *
 * console.log([...rest])
 * //=> [ 'lazy', 'sleep' ]
 *
 * const [first2, rest2] = next([])
 *
 * console.log(count(first2))
 * //=> 0
 *
 * console.log(count(rest2))
 * //=> 0
 * ```
 *
 * @category Optionals
 * @since v0.0.1
 */
export const next: <Value>(
  iterable: Iterable<Value>,
) => [Optional<Value>, Iterable<Value>]

/**
 * Returns a promise that resolves to a pair of async iterables. If
 * `asyncIterable` is empty, then both of the returned async iterables are
 * empty. Otherwise, the first async iterable contains the first value of
 * `asyncIterable` and the second async iterable contains the rest of the values
 * of `asyncIterable`. The second async iterable can only be iterated once.
 *
 * @example
 * ```js playground
 * import { asAsync, countAsync, emptyAsync, getAsync, mapAsync, nextAsync, pipe, reduceAsync, toArray } from 'lfi'
 *
 * const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`
 *
 * const [first, rest] = await pipe(
 *   asAsync([`sloth`, `lazy`, `sleep`]),
 *   mapAsync(async word => {
 *     const response = await fetch(`${API_URL}/${word}`)
 *     return (await response.json())[0].phonetic
 *   }),
 *   nextAsync,
 * )
 *
 * console.log(await getAsync(first))
 * //=> /slɑθ/
 *
 * console.log(
 *   await pipe(
 *     rest,
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ '/ˈleɪzi/', '/sliːp/' ]
 *
 * const [first2, rest2] = await nextAsync(emptyAsync)
 *
 * console.log(await countAsync(first2))
 * //=> 0
 *
 * console.log(await countAsync(rest2))
 * //=> 0
 * ```
 *
 * @category Optionals
 * @since v0.0.1
 */
export const nextAsync: <Value>(
  asyncIterable: AsyncIterable<Value>,
) => Promise<[AsyncOptional<Value>, AsyncIterable<Value>]>
