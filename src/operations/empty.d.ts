import type { ConcurIterable } from './as.js'

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
 */
export const emptyConcur: ConcurIterable<any>
