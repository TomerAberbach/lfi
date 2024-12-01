import type {
  Integer,
  MaybePromiseLike,
  PositiveInteger,
} from '../internal/types.js'

/**
 * Returns an iterable containing the keys of `object`.
 *
 * This differs from `Map.prototype.keys` in that the returned iterable can be
 * iterated multiple times and differs from `Object.keys` in that the returned
 * iterable is opaque.
 *
 * @example
 * ```js playground
 * import { keys, pipe, reduce, toArray } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     keys([`sloth`, `lazy`, `sleep`]),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 0, 1, 2 ]
 *
 * console.log(
 *   pipe(
 *     keys({
 *       sloth: 1,
 *       lazy: 2,
 *       sleep: 3,
 *     }),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'lazy', 'sleep' ]
 *
 * console.log(
 *   pipe(
 *     keys(
 *       new Map([
 *         [`sloth`, 1],
 *         [`lazy`, 2],
 *         [`sleep`, 3],
 *       ]),
 *     ),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'lazy', 'sleep' ]
 * ```
 *
 * @category Generators
 * @since v0.1.0
 */
export const keys: {
  <Key>(object: ReadonlyMap<Key, unknown>): Iterable<Key>
  <Key extends keyof never>(
    object: Readonly<Record<Key, unknown>>,
  ): Iterable<Key>
}

/**
 * Returns an iterable containing the values of `object`.
 *
 * This differs from `Map.prototype.values` and `Set.prototype.values` in that
 * the returned iterable can be iterated multiple times and differs from
 * `Object.values` in that the returned iterable is opaque.
 *
 * @example
 * ```js playground
 * import { pipe, reduce, toArray, values } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     values([`sloth`, `lazy`, `sleep`]),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'lazy, 'sleep' ]
 *
 * console.log(
 *   pipe(
 *     values({
 *       sloth: 1,
 *       lazy: 2,
 *       sleep: 3,
 *     }),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 1, 2, 3 ]
 *
 * console.log(
 *   pipe(
 *     values(new Set([`sloth`, `lazy`, `sleep`])),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'lazy, 'sleep' ]
 *
 * console.log(
 *   pipe(
 *     values(
 *       new Map([
 *         [`sloth`, 1],
 *         [`lazy`, 2],
 *         [`sleep`, 3],
 *       ]),
 *     ),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 1, 2, 3 ]
 * ```
 *
 * @category Generators
 * @since v0.1.0
 */
export const values: <Value>(
  object:
    | ReadonlyMap<unknown, Value>
    | ReadonlySet<Value>
    | Readonly<Record<keyof never, Value>>,
) => Iterable<Value>

/**
 * Returns an iterable containing the entries of `object`.
 *
 * This differs from `Map.prototype.entries` in that the returned iterable can
 * be iterated multiple times and differs from `Object.entries` in that the
 * returned iterable is opaque.
 *
 * @example
 * ```js playground
 * import { entries, pipe, reduce, toArray } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     entries([`sloth`, `lazy`, `sleep`]),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [
 * //=>   [ 0, 'sloth' ],
 * //=>   [ 1, 'lazy' ],
 * //=>   [ 2, 'sleep' ]
 * //=> ]
 *
 * console.log(
 *   pipe(
 *     entries({
 *       sloth: 1,
 *       lazy: 2,
 *       sleep: 3,
 *     }),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [
 * //=>   [ 'sloth', 1 ],
 * //=>   [ 'lazy', 2 ],
 * //=>   [ 'sleep', 3 ]
 * //=> ]
 *
 * console.log(
 *   pipe(
 *     entries(
 *       new Map([
 *         [`sloth`, 1],
 *         [`lazy`, 2],
 *         [`sleep`, 3],
 *       ]),
 *     ),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [
 * //=>   [ 'sloth', 1 ],
 * //=>   [ 'lazy', 2 ],
 * //=>   [ 'sleep', 3 ]
 * //=> ]
 * ```
 *
 * @category Generators
 * @since v0.1.0
 */
export const entries: {
  <Key, Value>(object: {
    entries: () => Iterable<[Key, Value]>
  }): Iterable<[Key, Value]>
  <Key extends keyof never, Value>(
    object: Readonly<Record<Key, Value>>,
  ): Iterable<[Key, Value]>
}

/**
 * Returns an infinite iterable that yields `seed` for its first value and then
 * yields the result of applying `fn` to its previously yielded value for every
 * subsequent value.
 *
 * @example
 * ```js playground
 * import { generate, pipe, reduce, take, toArray } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     `sloth`,
 *     generate(previousValue => `${previousValue} ${previousValue}`),
 *     take(4),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [
 * //=>   'sloth',
 * //=>   'sloth sloth',
 * //=>   'sloth sloth sloth sloth',
 * //=>   'sloth sloth sloth sloth sloth sloth sloth sloth'
 * //=> ]
 * ```
 *
 * @category Generators
 * @since v0.0.1
 */
export const generate: {
  <Value>(fn: (previousValue: Value) => Value): (seed: Value) => Iterable<Value>
  <Value>(fn: (previousValue: Value) => Value, seed: Value): Iterable<Value>
}

/**
 * Returns an infinite async iterable that yields `seed` for its first value and
 * then yields the awaited result of applying `fn` to its previously yielded
 * value for every subsequent value.
 *
 * @example
 * ```js playground
 * import { generateAsync, pipe, reduceAsync, takeAsync, toArray } from 'lfi'
 *
 * const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`
 *
 * console.log(
 *   await pipe(
 *     `sleep`,
 *     generateAsync(async previousWord => {
 *       const response = await fetch(`${API_URL}/${previousWord}`)
 *       const [{ meanings }] = await response.json()
 *       return meanings[0].partOfSpeech
 *     }),
 *     takeAsync(4),
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ 'sleep', 'verb', 'noun', 'noun' ]
 * ```
 *
 * @category Generators
 * @since v0.0.1
 */
export const generateAsync: {
  <Value>(
    fn: (previousValue: Value) => MaybePromiseLike<Value>,
  ): (seed: Value) => AsyncIterable<Value>
  <Value>(
    fn: (previousValue: Value) => MaybePromiseLike<Value>,
    seed: Value,
  ): AsyncIterable<Value>
}

/**
 * Returns an infinite iterable that repeatedly yields `value`.
 *
 * @example
 * ```js playground
 * import { join, pipe, repeat, take } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     repeat(`sloth`),
 *     take(4),
 *     join(`, `),
 *   ),
 * )
 * //=> sloth, sloth, sloth, sloth
 * ```
 *
 * @category Generators
 * @since v0.0.1
 */
export const repeat: <Value>(value: Value) => Iterable<Value>

/**
 * Returns an infinite iterable that repeatedly yields the values of `iterable`
 * in iteration order.
 *
 * WARNING: This function does not buffer the values of `iterable` for future
 * cycles. It reiterates `iterable` each cycle.
 *
 * @example
 * ```js playground
 * import { cycle, join, pipe, take } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     cycle([`sloth`, `lazy`]),
 *     take(6),
 *     join(`, `),
 *   ),
 * )
 * //=> sloth, lazy, sloth, lazy, sloth, lazy
 * ```
 *
 * @category Generators
 * @since v0.0.1
 */
export const cycle: <Value>(iterable: Iterable<Value>) => Iterable<Value>

/**
 * Returns an infinite async iterable that repeatedly yields the values of
 * `asyncIterable`.
 *
 * WARNING: This function does not buffer the values of `asyncIterable` for
 * future cycles. It reiterates `asyncIterable` each cycle.
 *
 * @example
 * ```js playground
 * import { asAsync, cycleAsync, joinAsync, mapAsync, pipe, takeAsync } from 'lfi'
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
 *     cycleAsync,
 *     takeAsync(6),
 *     joinAsync(`, `),
 *   ),
 * )
 * //=> /slɑθ/, /ˈleɪzi/, /sliːp/, /slɑθ/, /ˈleɪzi/, /sliːp/
 * ```
 *
 * @category Generators
 * @since v0.0.1
 */
export const cycleAsync: <Value>(
  asyncIterable: AsyncIterable<Value>,
) => AsyncIterable<Value>

/**
 * An iterable that yields integers in a range.
 *
 * See {@link RangeIterable.step} for obtaining a new iterable that skips
 * integers in steps.
 *
 * @category Generators
 * @since v2.0.0
 */
export type RangeIterable = Iterable<number> & {
  /**
   * Returns an iterable that yields integers in the same range as the original
   * {@link RangeIterable}, but steps through the range in increments of `step`
   * instead of 1.
   *
   * @throws if `step` is not a positive integer.
   *
   * @example
   * ```js playground
   * import { join, pipe, rangeTo } from 'lfi'
   *
   * console.log(
   *   pipe(
   *     rangeTo(0, 6).step(2),
   *     join(`, `),
   *   ),
   * )
   * //=> 0, 2, 4, 6
   * ```
   */
  step: <Step extends number>(step: PositiveInteger<Step>) => Iterable<number>
}

/** @internal */
type Range = {
  <Start extends number>(
    start: Integer<Start>,
  ): <End extends number>(end: Integer<End>) => RangeIterable
  <Start extends number, End extends number>(
    start: Integer<Start>,
    end: Integer<End>,
  ): RangeIterable
}

/**
 * Returns a {@link RangeIterable} that yields the integers between `start` and
 * `end`, including `start` and `end`.
 *
 * @throws if either `start` or `end` is not an integer.
 *
 * @example
 * ```js playground
 * import { join, pipe, rangeTo } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     rangeTo(0, 6),
 *     join(`, `),
 *   ),
 * )
 * //=> 0, 1, 2, 3, 4, 5, 6
 *
 * console.log(
 *   pipe(
 *     rangeTo(0, 6).step(2),
 *     join(`, `),
 *   ),
 * )
 * //=> 0, 2, 4, 6
 * ```
 *
 * @category Generators
 * @since v0.0.1
 */
export const rangeTo: Range

/**
 * Returns a {@link RangeIterable} that yields the integers between `start` and
 * `end` including `start`, but excluding `end`.
 *
 * @throws if either `start` or `end` is not an integer.
 *
 * @example
 * ```js playground
 * import { join, pipe, rangeUntil } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     rangeUntil(0, 6),
 *     join(`, `),
 *   ),
 * )
 * //=> 0, 1, 2, 3, 4, 5
 *
 * console.log(
 *   pipe(
 *     rangeUntil(0, 6).step(2),
 *     join(`, `),
 *   ),
 * )
 * //=> 0, 2, 4
 * ```
 *
 * @category Generators
 * @since v0.0.1
 */
export const rangeUntil: Range
