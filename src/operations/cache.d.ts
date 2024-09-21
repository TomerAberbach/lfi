import type { ConcurIterable } from './as.js'

/**
 * Returns an iterable equivalent to `iterable` that iterates over `iterable` at
 * most once.
 *
 * @example
 * ```js
 * const iterable = [`sloth`, `more sloth`, `even more sloth`]
 * const iterableWithEffects = each(console.log, iterable)
 *
 * const cachedIterable = cache(iterableWithEffects)
 *
 * console.log([...cachedIterable])
 * //=> sloth
 * //=> more sloth
 * //=> even more sloth
 * //=> [ 'sloth', 'more sloth', 'even more sloth' ]
 *
 * console.log([...cachedIterable])
 * //=> [ 'sloth', 'more sloth', 'even more sloth' ]
 * ```
 */
export const cache: <Value>(iterable: Iterable<Value>) => Iterable<Value>

/**
 * Returns an async iterable equivalent to `asyncIterable` that iterates over
 * `asyncIterable` at most once.
 *
 * @example
 * ```js
 * const asyncIterable = asAsync([`sloth`, `more sloth`, `even more sloth`])
 * const asyncIterableWithEffects = eachAsync(console.log, asyncIterable)
 *
 * const cachedAsyncIterable = cacheAsync(asyncIterableWithEffects)
 *
 * console.log(await pipe(cachedAsyncIterable, reduceAsync(toArray())))
 * //=> sloth
 * //=> more sloth
 * //=> even more sloth
 * //=> [ 'sloth', 'more sloth', 'even more sloth' ]
 *
 * console.log(await pipe(cachedAsyncIterable, reduceAsync(toArray())))
 * //=> [ 'sloth', 'more sloth', 'even more sloth' ]
 * ```
 */
export const cacheAsync: <Value>(
  asyncIterable: AsyncIterable<Value>,
) => AsyncIterable<Value>

/**
 * Returns a concur iterable equivalent to `concurIterable` that iterates over
 * `concurIterable` at most once.
 *
 * @example
 * ```js
 * const concurIterable = asConcur([`sloth`, `more sloth`, `even more sloth`])
 * const concurIterableWithEffects = eachConcur(console.log, concurIterable)
 *
 * const cachedConcurIterable = cacheConcur(concurIterableWithEffects)
 *
 * console.log(await pipe(cachedConcurIterable, reduceConcur(toArray())))
 * //=> sloth
 * //=> more sloth
 * //=> even more sloth
 * //=> [ 'sloth', 'more sloth', 'even more sloth' ]
 *
 * console.log(await pipe(cachedConcurIterable, reduceConcur(toArray())))
 * //=> [ 'sloth', 'more sloth', 'even more sloth' ]
 * ```
 */
export const cacheConcur: <Value>(
  concurIterable: ConcurIterable<Value>,
) => ConcurIterable<Value>
