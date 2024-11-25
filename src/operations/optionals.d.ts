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
 * ```js
 * console.log(pipe([`sloth`], or(() => `Never called`)))
 * //=> sloth
 *
 * console.log(pipe([], or(() => `I get called!`)))
 * //=> I get called!
 *
 * console.log(pipe([1, `sloth`, 3], or(() => `I also get called!`)))
 * //=> I also get called!
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
 * ```js
 * console.log(await pipe(asAsync([`sloth`]), orAsync(() => `Never called`)))
 * //=> sloth
 *
 * console.log(await pipe(emptyAsync, orAsync(() => `I get called!`)))
 * //=> I get called!
 *
 * console.log(
 *   await pipe(
 *     asAsync([1, `sloth`, 3]),
 *     orAsync(() => `I also get called!`),
 *   ),
 * )
 * //=> I also get called!
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
 * ```js
 * console.log(await pipe(asConcur([`sloth`]), orConcur(() => `Never called`)))
 * //=> sloth
 *
 * console.log(await pipe(emptyConcur, orConcur(() => `I get called!`)))
 * //=> I get called!
 *
 * console.log(
 *   await pipe(
 *     asConcur([1, `sloth`, 3]),
 *     orConcur(() => `I also get called!`),
 *   ),
 * )
 * //=> I also get called!
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
 * ```js
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
 *   console.log(get([1, `sloth`, 3]))
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
 * ```js
 * console.log(await getAsync(asAsync([`sloth`])))
 * //=> sloth
 *
 * try {
 *   console.log(await getAsync(emptyAsync))
 * } catch {
 *   console.log(`Oh no! It was empty...`)
 * }
 * //=> Oh no! It was empty...
 *
 * try {
 *   console.log(await getAsync(asAsync([1, `sloth`, 3])))
 * } catch {
 *   console.log(`Oh no! It had more than one value...`)
 * }
 * //=> Oh no! It had more than one value...
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
 * ```js
 * console.log(await getConcur(asConcur([`sloth`])))
 * //=> sloth
 *
 * try {
 *   console.log(await getConcur(emptyConcur))
 * } catch {
 *   console.log(`Oh no! It was empty...`)
 * }
 * //=> Oh no! It was empty...
 *
 * try {
 *   console.log(await getConcur(asConcur([1, `sloth`, 3])))
 * } catch {
 *   console.log(`Oh no! It had more than one value...`)
 * }
 * //=> Oh no! It had more than one value...
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
 * ```js
 * const slothActivities = [`sleeping`, `yawning`, `eating`]
 * const [first, rest] = next(slothActivities)
 *
 * console.log(get(first))
 * //=> sleeping
 *
 * console.log([...rest])
 * //=> [ 'yawning', 'eating' ]
 *
 * const badThingsAboutSloths = []
 * const [first2, rest2] = next(badThingsAboutSloths)
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
 * ```js
 * const slothActivities = asAsync([`sleeping`, `yawning`, `eating`])
 * const [first, rest] = await nextAsync(slothActivities)
 *
 * console.log(await getAsync(first))
 * //=> sleeping
 *
 * console.log(await reduceAsync(toArray(), rest))
 * //=> [ 'yawning', 'eating' ]
 *
 * const badThingsAboutSloths = emptyAsync
 * const [first2, rest2] = await nextAsync(badThingsAboutSloths)
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
