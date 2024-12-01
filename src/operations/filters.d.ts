import type { MaybePromiseLike } from '../internal/types.js'
import type { ConcurIterable } from './core.js'
import type { AsyncOptional, ConcurOptional, Optional } from './optionals.js'

/**
 * Returns an iterable that contains the values of `iterable` in iteration order
 * excluding the values for which `fn` returns a falsy value.
 *
 * Like `Array.prototype.filter`, but for iterables.
 *
 * @example
 * ```js playground
 * import { filter, pipe, reduce, toArray } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     [`sloth`, `lazy`, `sleep`],
 *     filter(word => word.startsWith(`s`)),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'sleep' ]
 * ```
 *
 * @category Filters
 * @since v0.0.1
 */
export const filter: {
  <From, To extends From>(
    fn: (value: From) => value is To,
  ): (iterable: Iterable<From>) => Iterable<To>
  <From, To extends From>(
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
 * ```js playground
 * import { asAsync, filterAsync, pipe, reduceAsync, toArray } from 'lfi'
 *
 * const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`
 *
 * console.log(
 *   await pipe(
 *     asAsync([`sloth`, `lazy`, `sleep`]),
 *     filterAsync(async word => {
 *       const response = await fetch(`${API_URL}/${word}`)
 *       const [{ meanings }] = await response.json()
 *       return meanings.some(meaning => meaning.partOfSpeech === `adjective`)
 *     }),
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ 'lazy' ]
 * ```
 *
 * @category Filters
 * @since v0.0.1
 */
export const filterAsync: {
  <From, To extends From>(
    fn: (value: From) => value is To,
  ): (asyncIterable: AsyncIterable<From>) => AsyncIterable<To>
  <From, To extends From>(
    fn: (value: From) => value is To,
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
 * ```js playground
 * import { asConcur, filterConcur, pipe, reduceConcur, toArray } from 'lfi'
 *
 * const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`
 *
 * console.log(
 *   await pipe(
 *     asConcur([`sloth`, `lazy`, `sleep`]),
 *     filterConcur(async word => {
 *       const response = await fetch(`${API_URL}/${word}`)
 *       const [{ meanings }] = await response.json()
 *       return meanings.some(meaning => meaning.partOfSpeech === `adjective`)
 *     }),
 *     reduceConcur(toArray()),
 *   ),
 * )
 * //=> [ 'lazy' ]
 * ```
 *
 * @category Filters
 * @since v0.0.1
 */
export const filterConcur: {
  <From, To extends From>(
    fn: (value: From) => value is To,
  ): (concurIterable: ConcurIterable<From>) => ConcurIterable<To>
  <From, To extends From>(
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
 * ```js playground
 * import { filterMap, pipe, reduce, toArray } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     [
 *       { sloth: `sloth` },
 *       { sloth: `lazy` },
 *       { notSloth: `active` },
 *       { sloth: `sleep` },
 *       { notSloth: `awake` },
 *     ],
 *     filterMap(object => object.sloth),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'lazy', 'sleep' ]
 * ```
 *
 * @category Filters
 * @since v0.0.1
 */
export const filterMap: {
  // These overloads help with inferring tuple types returned from the callback.
  <From, To extends unknown[] | []>(
    fn: (value: From) => To | null | undefined,
  ): (iterable: Iterable<From>) => Iterable<NonNullable<To>>
  <From, To extends unknown[] | []>(
    fn: (value: From) => To | null | undefined,
    iterable: Iterable<From>,
  ): Iterable<NonNullable<To>>

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
 * ```js playground
 * import { asAsync, filterMapAsync, pipe, reduceAsync, toArray } from 'lfi'
 *
 * const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`
 *
 * console.log(
 *   await pipe(
 *     asAsync([
 *       { sloth: `sloth` },
 *       { sloth: `lazy` },
 *       { notSloth: `active` },
 *       { sloth: `sleep` },
 *       { notSloth: `awake` },
 *     ]),
 *     filterMapAsync(async object => {
 *       if (!object.sloth) {
 *         return null
 *       }
 *
 *       const response = await fetch(`${API_URL}/${object.sloth}`)
 *       return (await response.json())[0].phonetic
 *     }),
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ '/slɑθ/', '/ˈleɪzi/', '/sliːp/' ]
 * ```
 *
 * @category Filters
 * @since v0.0.1
 */
export const filterMapAsync: {
  // These overloads help with inferring tuple types returned from the callback.
  <From, To extends unknown[] | []>(
    fn: (value: From) => MaybePromiseLike<To | null | undefined>,
  ): (asyncIterable: AsyncIterable<From>) => AsyncIterable<NonNullable<To>>
  <From, To extends unknown[] | []>(
    fn: (value: From) => MaybePromiseLike<To | null | undefined>,
    asyncIterable: AsyncIterable<From>,
  ): AsyncIterable<NonNullable<To>>

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
 * ```js playground
 * import { asConcur, filterMapConcur, pipe, reduceConcur, toArray } from 'lfi'
 *
 * const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`
 *
 * console.log(
 *   await pipe(
 *     asConcur([
 *       { sloth: `sloth` },
 *       { sloth: `lazy` },
 *       { notSloth: `active` },
 *       { sloth: `sleep` },
 *       { notSloth: `awake` },
 *     ]),
 *     filterMapConcur(async object => {
 *       if (!object.sloth) {
 *         return null
 *       }
 *
 *       const response = await fetch(`${API_URL}/${object.sloth}`)
 *       return (await response.json())[0].phonetic
 *     }),
 *     reduceConcur(toArray()),
 *   ),
 * )
 * // NOTE: This order may change between runs
 * //=> [ '/slɑθ/', '/ˈleɪzi/', '/sliːp/' ]
 * ```
 *
 * @category Filters
 * @since v0.0.1
 */
export const filterMapConcur: {
  // These overloads help with inferring tuple types returned from the callback.
  <From, To extends unknown[] | []>(
    fn: (value: From) => MaybePromiseLike<To | null | undefined>,
  ): (concurIterable: ConcurIterable<From>) => ConcurIterable<NonNullable<To>>
  <From, To extends unknown[] | []>(
    fn: (value: From) => MaybePromiseLike<To | null | undefined>,
    concurIterable: ConcurIterable<From>,
  ): ConcurIterable<NonNullable<To>>

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
 * ```js playground
 * import { exclude, pipe, reduce, toArray } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     [`sloth`, `lazy`, `active`, `sleep`, `awake`],
 *     exclude([`awake`, `active`]),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'lazy', 'sleep' ]
 * ```
 *
 * @category Filters
 * @since v2.0.0
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
 * ```js playground
 * import { asAsync, excludeAsync, flatMapAsync, map, pipe, reduceAsync, toArray } from 'lfi'
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
 *     excludeAsync([`adjective`, `verb`]),
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ 'noun', 'noun' ]
 * ```
 *
 * @category Filters
 * @since v2.0.0
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
 *
 * @example
 * ```js playground
 * import { asConcur, excludeConcur, flatMapConcur, map, pipe, reduceConcur, toArray } from 'lfi'
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
 *     excludeConcur([`adjective`, `verb`]),
 *     reduceConcur(toArray()),
 *   ),
 * )
 * //=> [ 'noun', 'noun' ]
 * ```
 *
 * @category Filters
 * @since v2.0.0
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
 * ```js playground
 * import { pipe, reduce, toArray, uniqueBy } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     [`sloth`, `lazy`, `sleep`],
 *     uniqueBy(word => word.length),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'lazy' ]
 * ```
 *
 * @category Filters
 * @since v0.0.1
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
 * ```js playground
 * import { asAsync, pipe, reduceAsync, toArray, uniqueByAsync } from 'lfi'
 *
 * const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`
 *
 * console.log(
 *   await pipe(
 *     asAsync([`sloth`, `lazy`, `sleep`]),
 *     uniqueByAsync(async word => {
 *       const response = await fetch(`${API_URL}/${word}`)
 *       const [{ meanings }] = await response.json()
 *       return meanings[0].partOfSpeech
 *     }),
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'sleep' ]
 * ```
 *
 * @category Filters
 * @since v0.0.2
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
 * ```js playground
 * import { asConcur, pipe, reduceConcur, toArray, uniqueByConcur } from 'lfi'
 *
 * const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`
 *
 * console.log(
 *   await pipe(
 *     asConcur([`sloth`, `lazy`, `sleep`]),
 *     uniqueByConcur(async word => {
 *       const response = await fetch(`${API_URL}/${word}`)
 *       const [{ meanings }] = await response.json()
 *       return meanings[0].partOfSpeech
 *     }),
 *     reduceConcur(toArray()),
 *   ),
 * )
 * // NOTE: These words may change between runs
 * //=> [ 'sloth', 'sleep' ]
 * ```
 *
 * @category Filters
 * @since v0.0.2
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
 * ```js playground
 * import { pipe, reduce, toArray, unique } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     [`sloth`, `lazy`, `lazy`, `sleep`, `sloth`],
 *     unique,
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'lazy', 'sleep' ]
 * ```
 *
 * @category Filters
 * @since v0.0.1
 */
export const unique: <Value>(iterable: Iterable<Value>) => Iterable<Value>

/**
 * Returns an async iterable containing the values of `asyncIterable` in
 * iteration order, except values are deduplicated if they are equal using
 * `Object.is`.
 *
 * @example
 * ```js playground
 * import { asAsync, flatMapAsync, map, pipe, reduceAsync, toArray, uniqueAsync } from 'lfi'
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
 *     uniqueAsync,
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ 'noun', 'verb', 'adjective' ]
 * ```
 *
 * @category Filters
 * @since v0.0.2
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
 * ```js playground
 * import { asConcur, flatMapConcur, map, pipe, reduceConcur, toArray, uniqueConcur } from 'lfi'
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
 *     uniqueConcur,
 *     reduceConcur(toArray()),
 *   ),
 * )
 * // NOTE: This order may change between runs
 * //=> [ 'noun', 'verb', 'adjective' ]
 * ```
 *
 * @category Filters
 * @since v0.0.2
 */
export const uniqueConcur: <Value>(
  concurIterable: ConcurIterable<Value>,
) => ConcurIterable<Value>

/** @internal */
type Find = {
  <Value>(
    fn: (value: Value) => unknown,
  ): (iterable: Iterable<Value>) => Optional<Value>
  <Value>(
    fn: (value: Value) => unknown,
    iterable: Iterable<Value>,
  ): Optional<Value>
}

/** @internal */
type FindAsync = {
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
  ): (asyncIterable: AsyncIterable<Value>) => AsyncOptional<Value>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
    asyncIterable: AsyncIterable<Value>,
  ): AsyncOptional<Value>
}

/** @internal */
type FindConcur = {
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
  ): (concurIterable: ConcurIterable<Value>) => ConcurOptional<Value>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
    concurIterable: ConcurIterable<Value>,
  ): ConcurOptional<Value>
}

/**
 * Returns an iterable containing the first value of `iterable` for which `fn`
 * returns a truthy value. Otherwise, returns an empty iterable.
 *
 * Like `Array.prototype.find`, but for iterables.
 *
 * @example
 * ```js playground
 * import { find, or, pipe } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     [`sloth`, `lazy`, `sleep`],
 *     find(word => word.includes(`s`)),
 *     or(() => `not found!`),
 *   ),
 * )
 * //=> sloth
 *
 * console.log(
 *   pipe(
 *     [`sloth`, `lazy`, `sleep`],
 *     find(word => word.includes(`x`)),
 *     or(() => `not found!`),
 *   ),
 * )
 * //=> not found!
 * ```
 *
 * @category Filters
 * @since v0.0.1
 */
export const find: Find

/**
 * Returns an async iterable containing the first value of `asyncIterable` for
 * which `fn` returns a value awaitable to a truthy value. Otherwise, returns an
 * empty async iterable.
 *
 * Like `Array.prototype.find`, but for async iterables.
 *
 * @example
 * ```js playground
 * import { asAsync, findAsync, orAsync, pipe } from 'lfi'
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
 *     findAsync(async word => (await getPartsOfSpeech(word)).includes(`verb`)),
 *     orAsync(() => `not found!`),
 *   ),
 * )
 * //=> sloth
 *
 * console.log(
 *   await pipe(
 *     asAsync([`sloth`, `lazy`, `sleep`]),
 *     findAsync(async word => (await getPartsOfSpeech(word)).includes(`adverb`)),
 *     orAsync(() => `not found!`),
 *   ),
 * )
 * //=> not found!
 * ```
 *
 * @category Filters
 * @since v0.0.1
 */
export const findAsync: FindAsync

/**
 * Returns a concur iterable containing the first value of `concurIterable` for
 * which `fn` returns a value awaitable to a truthy value. Otherwise, returns an
 * empty concur iterable.
 *
 * Like `Array.prototype.find`, but for concur iterables.
 *
 * @example
 * ```js playground
 * import { asConcur, findConcur, orConcur, pipe } from 'lfi'
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
 *     findConcur(async word => (await getPartsOfSpeech(word)).includes(`verb`)),
 *     orConcur(() => `not found!`),
 *   ),
 * )
 * // NOTE: This word may change between runs
 * //=> sloth
 *
 * console.log(
 *   await pipe(
 *     asConcur([`sloth`, `lazy`, `sleep`]),
 *     findConcur(async word => (await getPartsOfSpeech(word)).includes(`adverb`)),
 *     orConcur(() => `not found!`),
 *   ),
 * )
 * //=> not found!
 * ```
 *
 * @category Filters
 * @since v0.0.1
 */
export const findConcur: FindConcur

/**
 * Returns an iterable containing the last value of `iterable` for which `fn`
 * returns a truthy value. Otherwise, returns an empty iterable.
 *
 * @example
 * ```js playground
 * import { findLast, or, pipe } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     [`sloth`, `lazy`, `sleep`],
 *     findLast(word => word.includes(`s`)),
 *     or(() => `not found!`),
 *   ),
 * )
 * //=> sleep
 *
 * console.log(
 *   pipe(
 *     [`sloth`, `lazy`, `sleep`],
 *     findLast(word => word.includes(`x`)),
 *     or(() => `not found!`),
 *   ),
 * )
 * //=> not found!
 * ```
 *
 * @category Filters
 * @since v0.0.1
 */
export const findLast: Find

/**
 * Returns an async iterable containing the last value of `asyncIterable` for
 * which `fn` returns a value awaitable to a truthy value. Otherwise, returns an
 * empty async iterable.
 *
 * @example
 * ```js playground
 * import { asAsync, findLastAsync, orAsync, pipe } from 'lfi'
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
 *     findLastAsync(async word => (await getPartsOfSpeech(word)).includes(`verb`)),
 *     orAsync(() => `not found!`),
 *   ),
 * )
 * //=> sleep
 *
 * console.log(
 *   await pipe(
 *     asAsync([`sloth`, `lazy`, `sleep`]),
 *     findLastAsync(async word => (await getPartsOfSpeech(word)).includes(`adverb`)),
 *     orAsync(() => `not found!`),
 *   ),
 * )
 * //=> not found!
 * ```
 *
 * @category Filters
 * @since v0.0.1
 */
export const findLastAsync: FindAsync

/**
 * Returns a concur iterable containing the last value of `concurIterable` for
 * which `fn` returns a value awaitable to a truthy value. Otherwise, returns an
 * empty concur iterable.
 *
 * @example
 * ```js playground
 * import { asConcur, findLastConcur, orConcur, pipe } from 'lfi'
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
 *     findLastConcur(async word => (await getPartsOfSpeech(word)).includes(`verb`)),
 *     orConcur(() => `not found!`),
 *   ),
 * )
 * // NOTE: This word may change between runs
 * //=> sleep
 *
 * console.log(
 *   await pipe(
 *     asConcur([`sloth`, `lazy`, `sleep`]),
 *     findLastConcur(async word => (await getPartsOfSpeech(word)).includes(`adverb`)),
 *     orConcur(() => `not found!`),
 *   ),
 * )
 * //=> not found!
 * ```
 *
 * @category Filters
 * @since v0.0.2
 */
export const findLastConcur: FindConcur
