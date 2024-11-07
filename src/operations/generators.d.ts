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
 * ```js
 * console.log(
 *   pipe(
 *     generate(previousValue => previousValue + previousValue, `sloth`),
 *     take(3),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'slothsloth', 'slothslothslothsloth' ]
 * ```
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
 * ```js
 * console.log(
 *   await pipe(
 *     generateAsync(previousValue => previousValue + previousValue, `sloth`),
 *     takeAsync(3),
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'slothsloth', 'slothslothslothsloth' ]
 * ```
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
 * ```js
 * console.log(
 *   pipe(
 *     repeat(`sloth`),
 *     take(3),
 *     join(`, `),
 *   ),
 * )
 * //=> sloth, sloth, sloth
 * ```
 */
export const repeat: <Value>(value: Value) => Iterable<Value>

/**
 * Returns an infinite iterable that repeatedly yields the values of `iterable`
 * in iteration order.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     cycle([`sloth`, `more sloth`]),
 *     take(6),
 *     join(`, `),
 *   ),
 * )
 * //=> sloth, more sloth, sloth, more sloth, sloth, more sloth
 * ```
 */
export const cycle: <Value>(iterable: Iterable<Value>) => Iterable<Value>

/**
 * Returns an infinite async iterable that repeatedly yields the values of
 * `asyncIterable`.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     cycleAsync(asAsync([`sloth`, `more sloth`])),
 *     takeAsync(6),
 *     joinAsync(`, `),
 *   ),
 * )
 * //=> sloth, more sloth, sloth, more sloth, sloth, more sloth
 * ```
 */
export const cycleAsync: <Value>(
  asyncIterable: AsyncIterable<Value>,
) => AsyncIterable<Value>

/**
 * An iterable that yields integers in a range. Has a method for obtaining a new
 * iterable that skips numbers in steps.
 */
export type RangeIterable = Iterable<number> & {
  /**
   * Returns an iterable that yields integers in the same range as the original
   * {@link RangeIterable}, but steps through the range in increments of `step`
   * instead of 1.
   *
   * @throws if `step` is not a positive integer.
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
 * `end` including `start` and `end`.
 *
 * @throws if either `start` or `end` is not an integer.
 *
 * @example
 * ```js
 * console.log([...rangeTo(0, 6)])
 * //=> [ 0, 1, 2, 3, 4, 5, 6 ]
 *
 * console.log([...rangeTo(0, 6).step(2)])
 * //=> [ 0, 2, 4, 6 ]
 * ```
 */
export const rangeTo: Range

/**
 * Returns a {@link RangeIterable} that yields the integers between `start` and
 * `end` including `start`, but excluding `end`.
 *
 * @throws if either `start` or `end` is not an integer.
 *
 * @example
 * ```js
 * console.log([...rangeUntil(0, 6)])
 * //=> [ 0, 1, 2, 3, 4, 5 ]
 *
 * console.log([...rangeUntil(0, 6).step(2)])
 * //=> [ 0, 2, 4 ]
 * ```
 */
export const rangeUntil: Range
