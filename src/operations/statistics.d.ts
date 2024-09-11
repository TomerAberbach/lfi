import type { MaybePromiseLike } from '../internal/types.js'
import type { ConcurIterable } from './as.js'
import type {
  AsyncOptionalReducer,
  OptionalReducer,
  Reducer,
} from './reducer.js'

/**
 * Returns a {@link Reducer} that counts the number of values it receives.
 *
 * Use when composing reducers. Prefer {@link count}, {@link countAsync}, and
 * {@link countConcur} for direct use on iterables.
 *
 * @example
 * ```
 * console.log(
 *   pipe(
 *     [`sloth`, `more sloth`, `sleep`, `some sloth`],
 *     map(string => [string.length, string]),
 *     reduce(toGrouped(toCount(), toMap())),
 *   ),
 * )
 * //=> Map(2) { 5 => 2, 10 => 2 }
 * ```
 */
export const toCount: () => Reducer<unknown, number>

/**
 * Returns the number of values in `iterable`.
 *
 * Like `Array.prototype.length`, but for iterables.
 *
 * @example
 * ```js
 * console.log(count([`sloth`, `more sloth`, `even more sloth`]))
 * //=> 3
 * ```
 */
export const count: <Value>(iterable: Iterable<Value>) => number

/**
 * Returns a promise that resolves to the number of values in `asyncIterable`.
 *
 * Like `Array.prototype.length`, but for async iterables.
 *
 * @example
 * ```js
 * console.log(
 *   await countAsync(asAsync([`sloth`, `more sloth`, `even more sloth`])),
 * )
 * //=> 3
 * ```
 */
export const countAsync: <Value>(
  asyncIterable: AsyncIterable<Value>,
) => Promise<number>

/**
 * Returns a promise that resolves to the number of values in `concurIterable`.
 *
 * Like `Array.prototype.length`, but for concur iterables.
 *
 * @example
 * ```js
 * console.log(
 *   await countConcur(asConcur([`sloth`, `more sloth`, `even more sloth`])),
 * )
 * //=> 3
 * ```
 */
export const countConcur: <Value>(
  concurIterable: ConcurIterable<Value>,
) => Promise<number>

/**
 * Returns a {@link Reducer} that sums the numbers it receives.
 *
 * Use when composing reducers. Prefer {@link sum}, {@link sumAsync}, and
 * {@link sumConcur} for direct use on iterables.
 *
 * @example
 * ```
 * console.log(
 *   pipe(
 *     [`sloth`, `more sloth`, `sleep`, `some sloth`],
 *     map(string => [string.length, string.length]),
 *     reduce(toGrouped(toSum(), toMap())),
 *   ),
 * )
 * //=> Map(2) { 5 => 10, 10 => 20 }
 * ```
 */
export const toSum: () => Reducer<number, number>

/**
 * Returns the sum of the numbers of `iterable`.
 *
 * @example
 * ```js
 * console.log(sum([1, 4, 6, 2]))
 * //=> 13
 * ```
 */
export const sum: (iterable: Iterable<number>) => number

/**
 * Returns a promise that resolves to the sum of the numbers of `asyncIterable`.
 *
 * @example
 * ```js
 * console.log(await sumAsync(asAsync([1, 4, 6, 2])))
 * //=> 3
 * ```
 */
export const sumAsync: (asyncIterable: AsyncIterable<number>) => Promise<number>

/**
 * Returns a promise that resolves to the sum of the numbers of
 * `concurIterable`.
 *
 * @example
 * ```js
 * console.log(await sumConcur(asConcur([1, 4, 6, 2])))
 * //=> 3
 * ```
 */
export const sumConcur: (
  concurIterable: ConcurIterable<number>,
) => Promise<number>

/**
 * A function that compares two values of type `Value`.
 *
 * A return value:
 * - Less than zero implies `left < right`
 * - Equal to zero implies `left === right`
 * - Greater than zero implies `left > right`
 */
export type Compare<Value> = (left: Value, right: Value) => number

/**
 * A function that compares two values of type `Value` possibly asynchronously.
 *
 * A return value that awaits to:
 * - Less than zero implies `left < right`
 * - Equal to zero implies `left === right`
 * - Greater than zero implies `left > right`
 */
export type AsyncCompare<Value> = (
  left: Value,
  right: Value,
) => MaybePromiseLike<number>

/** An object containing a minimum and maximum value. */
export type MinMax<Value> = { min: Value; max: Value }

/** @internal */
type ToMinOrMaxBy = <Value>(fn: Compare<Value>) => OptionalReducer<Value>

/** @internal */
type MinOrMaxBy = {
  <Value>(fn: Compare<Value>, iterable: Iterable<Value>): Iterable<Value>
  <Value>(fn: Compare<Value>): (iterable: Iterable<Value>) => Iterable<Value>
}

/** @internal */
type ToMinOrMaxByAsync = <Value>(
  fn: AsyncCompare<Value>,
) => AsyncOptionalReducer<Value>

/** @internal */
type MinOrMaxByAsync = {
  <Value>(
    fn: AsyncCompare<Value>,
    asyncIterable: AsyncIterable<Value>,
  ): AsyncIterable<Value>
  <Value>(
    fn: AsyncCompare<Value>,
  ): (asyncIterable: AsyncIterable<Value>) => AsyncIterable<Value>
}

/** @internal */
type MinOrMaxByConcur = {
  <Value>(
    fn: AsyncCompare<Value>,
    concurIterable: ConcurIterable<Value>,
  ): ConcurIterable<Value>
  <Value>(
    fn: AsyncCompare<Value>,
  ): (concurIterable: ConcurIterable<Value>) => ConcurIterable<Value>
}

/**
 * Returns an optional reducer that finds the minimum value of the values it
 * receives based on the `fn` {@link Compare} function.
 *
 * Use when composing reducers. Prefer {@link minBy} for direct use on
 * iterables.
 *
 * @example
 * ```
 * console.log(
 *   pipe(
 *     [`sloth`, `more sloth`, `sleep`, `some sloth`],
 *     map(string => [string.length, string]),
 *     reduce(toGrouped(toMinBy((s1, s2) => s1.localeCompare(s2)), toMap())),
 *   ),
 * )
 * //=> Map(2) { 5 => 'sleep', 10 => 'more sloth' }
 * ```
 */
export const toMinBy: ToMinOrMaxBy

/**
 * Returns an iterable containing a minimum value of `iterable` based on the
 * `fn` {@link Compare} function if `iterable` contains at least one value.
 * Otherwise, returns an empty iterable.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     [`eating`, `sleeping`, `yawning`],
 *     minBy((a, b) => a.length - b.length),
 *     get,
 *   ),
 * )
 * //=> eating
 * ```
 */
export const minBy: MinOrMaxBy

/**
 * Returns an async optional reducer that finds the minimum value of the values
 * it receives based on the `fn` {@link AsyncCompare} function.
 *
 * Use when composing reducers. Prefer {@link minByAsync} and
 * {@link minByConcur} for direct use on iterables.
 */
export const toMinByAsync: ToMinOrMaxByAsync

/**
 * Returns an async iterable containing a minimum value of `asyncIterable` based
 * on the `fn` {@link AsyncCompare} function if `asyncIterable` contains at
 * least one value. Otherwise, returns an empty async iterable.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asAsync([`eating`, `sleeping`, `yawning`]),
 *     minByAsync((a, b) => a.length - b.length),
 *     getAsync,
 *   ),
 * )
 * //=> eating
 * ```
 */
export const minByAsync: MinOrMaxByAsync

/**
 * Returns a concur iterable containing a minimum value of `concurIterable`
 * based on the `fn` {@link AsyncCompare} function if `concurIterable` contains
 * at least one value. Otherwise, returns an empty concur iterable.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asConcur([`eating`, `sleeping`, `yawning`]),
 *     minByConcur((a, b) => a.length - b.length),
 *     getConcur,
 *   ),
 * )
 * //=> eating
 * ```
 */
export const minByConcur: MinOrMaxByConcur

/**
 * Returns an optional reducer that finds the maximum value of the values it
 * receives based on the `fn` {@link Compare} function.
 *
 * Use when composing reducers. Prefer {@link maxBy} for direct use on
 * iterables.
 *
 * @example
 * ```
 * console.log(
 *   pipe(
 *     [`sloth`, `more sloth`, `sleep`, `some sloth`],
 *     map(string => [string.length, string]),
 *     reduce(toGrouped(toMaxBy((s1, s2) => s1.localeCompare(s2)), toMap())),
 *   ),
 * )
 * //=> Map(2) { 5 => 'sloth', 10 => 'some sloth' }
 * ```
 */
export const toMaxBy: ToMinOrMaxBy

/**
 * Returns an iterable containing a maximum value of `iterable` based on the
 * `fn` {@link Compare} function if `iterable` contains at least one value.
 * Otherwise, returns an empty iterable.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     [`eating`, `sleeping`, `yawning`],
 *     maxBy((a, b) => a.length - b.length),
 *     get,
 *   ),
 * )
 * //=> sleeping
 * ```
 */
export const maxBy: MinOrMaxBy

/**
 * Returns an async optional reducer that finds the maximum value of the values
 * it receives based on the `fn` {@link AsyncCompare} function.
 *
 * Use when composing reducers. Prefer {@link maxByAsync} and
 * {@link maxByConcur} for direct use on iterables.
 */
export const toMaxByAsync: ToMinOrMaxByAsync

/**
 * Returns an async iterable containing a maximum value of `asyncIterable` based
 * on the `fn` {@link AsyncCompare} function if `asyncIterable` contains at
 * least one value. Otherwise, returns an empty async iterable.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asAsync([`eating`, `sleeping`, `yawning`]),
 *     maxByAsync((a, b) => a.length - b.length),
 *     getAsync,
 *   ),
 * )
 * //=> sleeping
 * ```
 */
export const maxByAsync: MinOrMaxByAsync

/**
 * Returns a concur iterable containing a maximum value of `concurIterable`
 * based on the `fn` {@link AsyncCompare} function if `concurIterable` contains
 * at least one value. Otherwise, returns an empty concur iterable.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asConcur([`eating`, `sleeping`, `yawning`]),
 *     maxByConcur((a, b) => a.length - b.length),
 *     getConcur,
 *   ),
 * )
 * //=> sleeping
 * ```
 */
export const maxByConcur: MinOrMaxByConcur

/**
 * Returns an optional reducer that finds the {@link MinMax} value of the values
 * it receives based on the `fn` {@link Compare} function.
 *
 * Use when composing reducers. Prefer {@link minMaxBy} for direct use on
 * iterables.
 *
 * @example
 * ```
 * console.log(
 *   pipe(
 *     [`sloth`, `more sloth`, `sleep`, `some sloth`],
 *     map(string => [string.length, string]),
 *     reduce(toGrouped(toMinMaxBy((s1, s2) => s1.localeCompare(s2)), toMap())),
 *   ),
 * )
 * //=> Map(2) {
 * //=>   5 => { min: 'sleep', max: 'sloth' },
 * //=>   10 => { min: 'more sloth', max: 'some sloth' }
 * //=> }
 * ```
 */
export const toMinMaxBy: <Value>(
  fn: Compare<Value>,
) => OptionalReducer<MinMax<Value>>

/**
 * Returns an iterable containing a {@link MinMax} value of `iterable` based on
 * the `fn` {@link Compare} function if `iterable` contains at least one value.
 * Otherwise, returns an empty iterable.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     [`eating`, `sleeping`, `yawning`],
 *     minMaxBy((a, b) => a.length - b.length),
 *     get,
 *   ),
 * )
 * //=> { min: 'eating', max: 'sleeping' }
 * ```
 */
export const minMaxBy: {
  <Value>(
    fn: Compare<Value>,
    iterable: Iterable<Value>,
  ): Iterable<MinMax<Value>>
  <Value>(
    fn: Compare<Value>,
  ): (iterable: Iterable<Value>) => Iterable<MinMax<Value>>
}

/**
 * Returns an async optional reducer that finds the {@link MinMax} value of the
 * values it receives based on the `fn` {@link AsyncCompare} function.
 *
 * Use when composing reducers. Prefer {@link minMaxByAsync} and
 * {@link minMaxByConcur} for direct use on iterables.
 */
export const toMinMaxByAsync: <Value>(
  fn: AsyncCompare<Value>,
) => AsyncOptionalReducer<MinMax<Value>>

/**
 * Returns an async iterable containing a {@link MinMax} value of
 * `asyncIterable` based on the `fn` {@link AsyncCompare} function if
 * `asyncIterable` contains at least one value. Otherwise, returns an empty
 * async iterable.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asAsync([`eating`, `sleeping`, `yawning`]),
 *     minMaxByAsync((a, b) => a.length - b.length),
 *     getAsync,
 *   ),
 * )
 * //=> { min: 'eating', max: 'sleeping' }
 * ```
 */
export const minMaxByAsync: {
  <Value>(
    fn: AsyncCompare<Value>,
    asyncIterable: AsyncIterable<Value>,
  ): AsyncIterable<MinMax<Value>>
  <Value>(
    fn: AsyncCompare<Value>,
  ): (asyncIterable: AsyncIterable<Value>) => AsyncIterable<MinMax<Value>>
}

/**
 * Returns a concur iterable containing a {@link MinMax} value of
 * `concurIterable` based on the `fn` {@link AsyncCompare} function if
 * `concurIterable` contains at least one value. Otherwise, returns an empty
 * concur iterable.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asConcur([`eating`, `sleeping`, `yawning`]),
 *     minMaxByConcur((a, b) => a.length - b.length),
 *     getConcur,
 *   ),
 * )
 * //=> { min: 'eating', max: 'sleeping' }
 * ```
 */
export const minMaxByConcur: {
  <Value>(
    fn: (left: Value, right: Value) => MaybePromiseLike<number>,
    concurIterable: ConcurIterable<Value>,
  ): ConcurIterable<MinMax<Value>>
  <Value>(
    fn: (left: Value, right: Value) => MaybePromiseLike<number>,
  ): (concurIterable: ConcurIterable<Value>) => ConcurIterable<MinMax<Value>>
}

/** @internal */
type ToMinOrMaxWith = <Value>(
  fn: (value: Value) => number,
) => OptionalReducer<Value>

/** @internal */
type MinOrMaxWith = {
  <Value>(
    fn: (value: Value) => number,
    iterable: Iterable<Value>,
  ): Iterable<Value>
  <Value>(
    fn: (value: Value) => number,
  ): (iterable: Iterable<Value>) => Iterable<Value>
}

/** @internal */
type ToMinOrMaxWithAsync = <Value>(
  fn: (value: Value) => MaybePromiseLike<number>,
) => AsyncOptionalReducer<Value>

/** @internal */
type MinOrMaxWithAsync = {
  <Value>(
    fn: (value: Value) => MaybePromiseLike<number>,
    asyncIterable: AsyncIterable<Value>,
  ): AsyncIterable<Value>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<number>,
  ): (asyncIterable: AsyncIterable<Value>) => AsyncIterable<Value>
}

/** @internal */
type MinOrMaxWithConcur = {
  <Value>(
    fn: (value: Value) => MaybePromiseLike<number>,
    concurIterable: ConcurIterable<Value>,
  ): ConcurIterable<Value>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<number>,
  ): (concurIterable: ConcurIterable<Value>) => ConcurIterable<Value>
}

/**
 * Returns an optional reducer that finds the minimum value of the values it
 * receives by comparing the numerical values of each value, as defined by `fn`.
 *
 * Use when composing reducers. Prefer {@link minWith} for direct use on
 * iterables.
 *
 * @example
 * ```
 * console.log(
 *   pipe(
 *     [`sloth`, `more sloth`, `sleep`, `some sloth`],
 *     map(string => [string.length, string]),
 *     reduce(toGrouped(toMinWith(string => string.codePointAt(0)), toMap())),
 *   ),
 * )
 * //=> Map(2) { 5 => 'sloth', 10 => 'more sloth' }
 * ```
 */
export const toMinWith: ToMinOrMaxWith

/**
 * Returns an iterable containing a minimum value of `iterable` by comparing the
 * numerical values of each value, as defined by `fn`, if `iterable` contains at
 * least one value. Otherwise, returns an empty iterable.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     [`eating`, `sleeping`, `yawning`],
 *     minWith(value => value.length),
 *     get,
 *   ),
 * )
 * //=> eating
 * ```
 */
export const minWith: MinOrMaxWith

/**
 * Returns an async optional reducer that finds the minimum value of the values
 * it receives by comparing the numerical values of each value, as defined by
 * `fn`.
 *
 * Use when composing reducers. Prefer {@link minWithAsync} and
 * {@link minWithConcur} for direct use on iterables.
 */
export const toMinWithAsync: ToMinOrMaxWithAsync

/**
 * Returns an async iterable containing a minimum value of `asyncIterable` by
 * comparing the numerical values of each value, as defined by `fn`, if
 * `asyncIterable` contains at least one value. Otherwise, returns an empty
 * async iterable.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asAsync([`eating`, `sleeping`, `yawning`]),
 *     minWithAsync(value => value.length),
 *     getAsync,
 *   ),
 * )
 * //=> eating
 * ```
 */
export const minWithAsync: MinOrMaxWithAsync

/**
 * Returns a concur iterable containing a minimum value of `concurIterable` by
 * comparing the numerical values of each value, as defined by `fn`, if
 * `concurIterable` contains at least one value. Otherwise, returns an empty
 * concur iterable.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asConcur([`eating`, `sleeping`, `yawning`]),
 *     minWithConcur(value => value.length),
 *     getConcur,
 *   ),
 * )
 * //=> eating
 * ```
 */
export const minWithConcur: MinOrMaxWithConcur

/**
 * Returns an optional reducer that finds the maximum value of the values it
 * receives by comparing the numerical values of each value, as defined by `fn`.
 *
 * Use when composing reducers. Prefer {@link maxWith} for direct use on
 * iterables.
 *
 * @example
 * ```
 * console.log(
 *   pipe(
 *     [`sloth`, `more sloth`, `sleep`, `some sloth`],
 *     map(string => [string.length, string]),
 *     reduce(toGrouped(toMaxWith(string => string.codePointAt(0)), toMap())),
 *   ),
 * )
 * //=> Map(2) { 5 => 'sloth', 10 => 'some sloth' }
 * ```
 */
export const toMaxWith: ToMinOrMaxWith

/**
 * Returns an iterable containing a maximum value of `iterable` by comparing the
 * numerical values of each value, as defined by `fn`, if `iterable` contains at
 * least one value. Otherwise, returns an empty iterable.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     [`eating`, `sleeping`, `yawning`],
 *     maxWith(value => value.length),
 *     get,
 *   ),
 * )
 * //=> sleeping
 * ```
 */
export const maxWith: MinOrMaxWith

/**
 * Returns an async optional reducer that finds the maximum value of the values
 * it receives by comparing the numerical values of each value, as defined by
 * `fn`.
 *
 * Use when composing reducers. Prefer {@link maxWithAsync} and
 * {@link maxWithConcur} for direct use on iterables.
 */
export const toMaxWithAsync: ToMinOrMaxWithAsync

/**
 * Returns an async iterable containing a maximum value of `asyncIterable` by
 * comparing the numerical values of each value, as defined by `fn`, if
 * `asyncIterable` contains at least one value. Otherwise, returns an empty
 * async iterable.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asAsync([`eating`, `sleeping`, `yawning`]),
 *     maxWithAsync(value => value.length),
 *     getAsync,
 *   ),
 * )
 * //=> sleeping
 * ```
 */
export const maxWithAsync: MinOrMaxWithAsync

/**
 * Returns a concur iterable containing a maximum value of `concurIterable` by
 * comparing the numerical values of each value, as defined by `fn`, if
 * `concurIterable` contains at least one value. Otherwise, returns an empty
 * concur iterable.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asConcur([`eating`, `sleeping`, `yawning`]),
 *     maxWithConcur(value => value.length),
 *     getConcur,
 *   ),
 * )
 * //=> sleeping
 * ```
 */
export const maxWithConcur: MinOrMaxWithConcur

/**
 * Returns an optional reducer that finds the {@link MinMax} value of the values
 * it receives by comparing the numerical values of each value, as defined by
 * `fn`.
 *
 * Use when composing reducers. Prefer {@link minMaxWith} for direct use on
 * iterables.
 *
 * @example
 * ```
 * console.log(
 *   pipe(
 *     [`sloth`, `more sloth`, `sleep`, `some sloth`],
 *     map(string => [string.length, string]),
 *     reduce(toGrouped(toMinMaxWith(string => string.codePointAt(0)), toMap())),
 *   ),
 * )
 * //=> Map(2) {
 * //=>   5 => { min: 'sloth', max: 'sloth' },
 * //=>   10 => { min: 'more sloth', max: 'some sloth' }
 * //=> }
 * ```
 */
export const toMinMaxWith: <Value>(
  fn: (value: Value) => number,
) => OptionalReducer<MinMax<Value>>

/**
 * Returns an iterable containing a {@link MinMax} value of `iterable` by
 * comparing the numerical values of each value, as defined by `fn`, if
 * `iterable` contains at least one value. Otherwise, returns an empty iterable.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     [`eating`, `sleeping`, `yawning`],
 *     minMaxWith(value => value.length),
 *     get,
 *   ),
 * )
 * //=> { min: 'eating', max: 'sleeping' }
 * ```
 */
export const minMaxWith: {
  <Value>(
    fn: (value: Value) => number,
    iterable: Iterable<Value>,
  ): Iterable<MinMax<Value>>
  <Value>(
    fn: (value: Value) => number,
  ): (iterable: Iterable<Value>) => Iterable<MinMax<Value>>
}

/**
 * Returns an async optional reducer that finds the {@link MinMax} value of the
 * values it receives by comparing the numerical values of each value, as
 * defined by `fn`.
 *
 * Use when composing reducers. Prefer {@link minMaxWithAsync} and
 * {@link minMaxWithConcur} for direct use on iterables.
 */
export const toMinMaxWithAsync: <Value>(
  fn: (value: Value) => MaybePromiseLike<number>,
) => AsyncOptionalReducer<MinMax<Value>>

/**
 * Returns an async iterable containing a {@link MinMax} value of
 * `asyncIterable` by comparing the numerical values of each value, as defined
 * by `fn`, if `asyncIterable` contains at least one value. Otherwise, returns
 * an empty async iterable.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asAsync([`eating`, `sleeping`, `yawning`]),
 *     minMaxWithAsync(value => value.length),
 *     getAsync,
 *   ),
 * )
 * //=> { min: 'eating', max: 'sleeping' }
 * ```
 */
export const minMaxWithAsync: {
  <Value>(
    fn: (value: Value) => MaybePromiseLike<number>,
    asyncIterable: AsyncIterable<Value>,
  ): AsyncIterable<MinMax<Value>>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<number>,
  ): (asyncIterable: AsyncIterable<Value>) => AsyncIterable<MinMax<Value>>
}

/**
 * Returns a concur iterable containing a {@link MinMax} value of
 * `concurIterable` by comparing the numerical values of each value, as defined
 * by `fn`, if `concurIterable` contains at least one value. Otherwise, returns
 * an empty concur iterable.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asConcur([`eating`, `sleeping`, `yawning`]),
 *     minMaxWithConcur(value => value.length),
 *     getConcur,
 *   ),
 * )
 * //=> { min: 'eating', max: 'sleeping' }
 * ```
 */
export const minMaxWithConcur: {
  <Value>(
    fn: (value: Value) => MaybePromiseLike<number>,
    concurIterable: ConcurIterable<Value>,
  ): ConcurIterable<MinMax<Value>>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<number>,
  ): (concurIterable: ConcurIterable<Value>) => ConcurIterable<MinMax<Value>>
}

/**
 * Returns an optional reducer that finds the minimum value of the values it
 * receives.
 *
 * Use when composing reducers. Prefer {@link min} for direct use on iterables.
 *
 * @example
 * ```
 * console.log(
 *   pipe(
 *     [`sloth`, `more sloth`, `sleep`, `some sloth`],
 *     map(string => [string.length, string.codePointAt(0)]),
 *     reduce(toGrouped(toMin(), toMap())),
 *   ),
 * )
 * //=> Map(2) { 5 => 115, 10 => 109 }
 * ```
 */
export const toMin: () => OptionalReducer<number>

/**
 * Returns an iterable containing a minimum value of `iterable` if `iterable`
 * contains at least one value. Otherwise, returns an empty iterable.
 *
 * @example
 * ```js
 * console.log(pipe([4, 1, 5, -3], min, get))
 * //=> -3
 * ```
 */
export const min: (iterable: Iterable<number>) => Iterable<number>

/**
 * Returns an async iterable containing a minimum value of `asyncIterable` if
 * `asyncIterable` contains at least one value. Otherwise, returns an empty
 * async iterable.
 *
 * @example
 * ```js
 * console.log(await pipe(asAsync([4, 1, 5, -3]), minAsync, getAsync))
 * //=> -3
 * ```
 */
export const minAsync: (
  asyncIterable: AsyncIterable<number>,
) => AsyncIterable<number>

/**
 * Returns a concur iterable containing a minimum value of `concurIterable` if
 * `concurIterable` contains at least one value. Otherwise, returns an empty
 * concur iterable.
 *
 * @example
 * ```js
 * console.log(await pipe(asConcur([4, 1, 5, -3]), minConcur, getConcur))
 * //=> -3
 * ```
 */
export const minConcur: (
  concurIterable: ConcurIterable<number>,
) => ConcurIterable<number>

/**
 * Returns an optional reducer that finds the maximum value of the values it
 * receives.
 *
 * Use when composing reducers. Prefer {@link max} for direct use on iterables.
 *
 * @example
 * ```
 * console.log(
 *   pipe(
 *     [`sloth`, `more sloth`, `sleep`, `some sloth`],
 *     map(string => [string.length, string.codePointAt(0)]),
 *     reduce(toGrouped(toMax(), toMap())),
 *   ),
 * )
 * //=> Map(2) { 5 => 115, 10 => 115 }
 * ```
 */
export const toMax: () => OptionalReducer<number>

/**
 * Returns an iterable containing a maximum value of `iterable` if `iterable`
 * contains at least one value. Otherwise, returns an empty iterable.
 *
 * @example
 * ```js
 * console.log(pipe([4, 1, 5, -3], max, get))
 * //=> 5
 * ```
 */
export const max: (iterable: Iterable<number>) => Iterable<number>

/**
 * Returns an async iterable containing a maximum value of `asyncIterable` if
 * `asyncIterable` contains at least one value. Otherwise, returns an empty
 * async iterable.
 *
 * @example
 * ```js
 * console.log(await pipe(asAsync([4, 1, 5, -3]), maxAsync, getAsync))
 * //=> 5
 * ```
 */
export const maxAsync: (
  asyncIterable: AsyncIterable<number>,
) => AsyncIterable<number>

/**
 * Returns a concur iterable containing a maximum value of `concurIterable` if
 * `concurIterable` contains at least one value. Otherwise, returns an empty
 * concur iterable.
 *
 * @example
 * ```js
 * console.log(await pipe(asConcur([4, 1, 5, -3]), maxConcur, getConcur))
 * //=> 5
 * ```
 */
export const maxConcur: (
  concurIterable: ConcurIterable<number>,
) => ConcurIterable<number>

/**
 * Returns an optional reducer that finds the {@link MinMax} value of the values
 * it receives.
 *
 * Use when composing reducers. Prefer {@link minMax} for direct use on
 * iterables.
 *
 * @example
 * ```
 * console.log(
 *   pipe(
 *     [`sloth`, `more sloth`, `sleep`, `some sloth`],
 *     map(string => [string.length, string.codePointAt(0)]),
 *     reduce(toGrouped(toMinMax(), toMap())),
 *   ),
 * )
 * //=> Map(2) { 5 => { min: 115, max: 115 }, 10 => { min: 109, max: 115 } }
 * ```
 */
export const toMinMax: () => OptionalReducer<MinMax<number>>

/**
 * Returns an iterable containing a {@link MinMax} value of `iterable` if
 * `iterable` contains at least one value. Otherwise, returns an empty iterable.
 *
 * @example
 * ```js
 * console.log(pipe([4, 1, 5, -3], minMax, get))
 * //=> { min: -3, max: 5 }
 * ```
 */
export const minMax: (iterable: Iterable<number>) => Iterable<MinMax<number>>

/**
 * Returns an async iterable containing a {@link MinMax} value of
 * `asyncIterable` if `asyncIterable` contains at least one value. Otherwise,
 * returns an empty async iterable.
 *
 * @example
 * ```js
 * console.log(await pipe(asAsync([4, 1, 5, -3]), minMaxAsync, getAsync))
 * //=> { min: -3, max: 5 }
 * ```
 */
export const minMaxAsync: (
  asyncIterable: AsyncIterable<number>,
) => AsyncIterable<MinMax<number>>

/**
 * Returns a concur iterable containing a {@link MinMax} value of
 * `concurIterable` if `concurIterable` contains at least one value. Otherwise,
 * returns an empty concur iterable.
 *
 * @example
 * ```js
 * console.log(await pipe(asConcur([4, 1, 5, -3]), minMaxConcur, getConcur))
 * //=> { min: -3, max: 5 }
 * ```
 */
export const minMaxConcur: (
  concurIterable: ConcurIterable<number>,
) => ConcurIterable<MinMax<number>>
