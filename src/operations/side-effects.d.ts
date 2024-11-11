import type { MaybePromiseLike } from '../internal/types.js'
import type { ConcurIterable } from './core.js'

/**
 * Returns an iterable equivalent to `iterable` that applies `fn` to each value
 * of `iterable` as it is iterated.
 *
 * @example
 * ```js
 * const sloths = [`carl`, `frank`, `phil`]
 *
 * console.log([...each(console.log, sloths)])
 * //=> carl
 * //=> frank
 * //=> phil
 * //=> [ 'carl', 'frank', 'phil' ]
 * ```
 *
 * @category Side effects
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
 * ```js
 * const eachedSloths = await pipe(
 *   asAsync([`carl`, `frank`, `phil`]),
 *   eachAsync(console.log),
 *   reduceAsync(toArray()),
 * )
 * //=> carl
 * //=> frank
 * //=> phil
 *
 * console.log(eachedSloths)
 * //=> [ 'carl', 'frank', 'phil' ]
 * ```
 *
 * @category Side effects
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
 * ```js
 * const eachedSloths = await pipe(
 *   asConcur([`carl`, `frank`, `phil`]),
 *   eachConcur(console.log),
 *   reduceConcur(toArray()),
 * )
 * //=> carl
 * //=> frank
 * //=> phil
 *
 * console.log(eachedSloths)
 * //=> [ 'carl', 'frank', 'phil' ]
 * ```
 *
 * @category Side effects
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
 * ```js
 * const sloths = [`carl`, `frank`, `phil`]
 *
 * forEach(console.log, sloths)
 * //=> carl
 * //=> frank
 * //=> phil
 * ```
 *
 * @category Side effects
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
 * ```js
 * const sloths = asAsync([`carl`, `frank`, `phil`])
 *
 * await forEachAsync(console.log, sloths)
 * //=> carl
 * //=> frank
 * //=> phil
 * ```
 *
 * @category Side effects
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
 * Like `Array.prototype.forEach`, but for concur iterables.
 *
 * @example
 * ```js
 * const sloths = asConcur([`carl`, `frank`, `phil`])
 *
 * await forEachConcur(console.log, sloths)
 * //=> carl
 * //=> frank
 * //=> phil
 * //
 * ```
 *
 * @category Side effects
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
 * ```js
 * const iterable = pipe(
 *   [`sloth`, 2, 3],
 *   each(console.log),
 * )
 * // No output
 *
 * consume(iterable)
 * //=> sloth
 * //=> 2
 * //=> 3
 * ```
 *
 * @category Side effects
 */
export const consume: (iterable: Iterable<unknown>) => void

/**
 * Iterates through `asyncIterable` causing lazy operations to run.
 *
 * @example
 * ```js
 * const asyncIterable = pipe(
 *   asAsync([`sloth`, 2, 3]),
 *   eachAsync(console.log),
 * )
 * // No output
 *
 * await consumeAsync(asyncIterable)
 * //=> sloth
 * //=> 2
 * //=> 3
 * ```
 *
 * @category Side effects
 */
export const consumeAsync: (
  asyncIterable: AsyncIterable<unknown>,
) => Promise<void>

/**
 * Iterates through the `concurIterable` causing lazy operations to run.
 *
 * @example
 * ```js
 * const concurIterable = pipe(
 *   asConcur([`sloth`, 2, 3]),
 *   eachConcur(console.log),
 * )
 * // No output
 *
 * await consumeConcur(asyncIterable)
 * //=> sloth
 * //=> 2
 * //=> 3
 * ```
 *
 * @category Side effects
 */
export const consumeConcur: (
  concurIterable: ConcurIterable<unknown>,
) => Promise<void>

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
 *
 * @category Side effects
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
 *
 * @category Side effects
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
 *
 * @category Side effects
 */
export const cacheConcur: <Value>(
  concurIterable: ConcurIterable<Value>,
) => ConcurIterable<Value>
