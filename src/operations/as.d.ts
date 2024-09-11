import type { MaybePromiseLike } from '../internal/types.js'

/**
 * Returns an async iterable wrapper around `iterable`.
 *
 * Note that when passing a concur iterable the returned async iterable may have
 * to buffer the values produced by the concur iterable because values may not
 * be read from the async iterable as quickly as they are produced by the concur
 * iterable. This is a fundamental problem because concur iterables are "push"
 * based while async iterables are "pull" based, which creates backpressure.
 *
 * @example
 * ```js
 * const asyncIterable = asAsync([`sloth`, `more sloth`, `even more sloth`])
 *
 * console.log(typeof asyncIterable[Symbol.asyncIterator])
 * //=> function
 *
 * for await (const value of asyncIterable) {
 *   console.log(value)
 * }
 * //=> sloth
 * //=> more sloth
 * //=> even more sloth
 * ```
 */
export const asAsync: <Value>(
  iterable: Iterable<Value> | AsyncIterable<Value> | ConcurIterable<Value>,
) => AsyncIterable<Value>

/**
 * Represents a potentially lazy collection of values, each of type `Value`,
 * that can be iterated over concurrently.
 *
 * The collection can be iterated by invoking the concur iterable with an
 * `apply` callback. The callback is applied to each value in the collection,
 * potentially asynchronously, in some order.
 *
 * Invoking the concur iterable returns a promise that resolves when `apply`
 * has been applied to each value in the concur iterable and each result
 * returned by `apply` is awaited.
 *
 * It is like an event emitter that accepts only one event handler and returns a
 * promise that resolves when all events have been emitted and handled.
 *
 * @example
 * ```js
 * const slothNamesConcurIterable = pipe(
 *   asConcur(['sloth-names1.txt', 'sloth-names2.txt']),
 *   mapConcur(filename => fs.promises.readFile(filename, `utf8`)),
 *   flatMapConcur(content => content.split(`\n`)),
 * )
 * ```
 */
export type ConcurIterable<Value> = (
  apply: ConcurIterableApply<Value>,
) => Promise<void>

/** The callback invoked for each value of a {@link ConcurIterable}. */
export type ConcurIterableApply<Value> = (
  value: Value,
) => MaybePromiseLike<void>

/**
 * Returns a concur iterable wrapper around `iterable`.
 *
 * @example
 * ```js
 * const concurIterable = asConcur([`sloth`, `more sloth`, `even more sloth`])
 *
 * await forEachConcur(console.log, concurIterable)
 * //=> sloth
 * //=> more sloth
 * //=> even more sloth
 * ```
 */
export const asConcur: <Value>(
  iterable: Iterable<Value> | AsyncIterable<Value> | ConcurIterable<Value>,
) => ConcurIterable<Value>
