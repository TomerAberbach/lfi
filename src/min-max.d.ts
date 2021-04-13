/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { MaybePromiseLike } from './internal/types'
import { ConcurIterable } from './types'

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
  right: Value
) => MaybePromiseLike<number>

/** An object containing a minimum and maximum value. */
export type MinMax<Value> = { min: Value; max: Value }

/** @internal */
type MinOrMaxBy = {
  <Value>(
    fn: (left: Value, right: Value) => number,
    iterable: Iterable<Value>
  ): Iterable<Value>
  <Value>(fn: (left: Value, right: Value) => number): (
    iterable: Iterable<Value>
  ) => Iterable<Value>
}

/** @internal */
type MinOrMaxByAsync = {
  <Value>(
    fn: (left: Value, right: Value) => MaybePromiseLike<number>,
    asyncIterable: AsyncIterable<Value>
  ): AsyncIterable<Value>
  <Value>(fn: (left: Value, right: Value) => MaybePromiseLike<number>): (
    asyncIterable: AsyncIterable<Value>
  ) => AsyncIterable<Value>
}

/** @internal */
type MinOrMaxByConcur = {
  <Value>(
    fn: (left: Value, right: Value) => MaybePromiseLike<number>,
    concurIterable: ConcurIterable<Value>
  ): ConcurIterable<Value>
  <Value>(fn: (left: Value, right: Value) => MaybePromiseLike<number>): (
    concurIterable: ConcurIterable<Value>
  ) => ConcurIterable<Value>
}

/**
 * Returns an iterable containing a minimum value of `iterable` based on the
 * `fn` {@link Compare} function if `iterable` contains at least one value.
 * Otherwise, returns an empty iterable.
 *
 * @example
 * ```js
 * const slothActivities = [`eating`, `sleeping`, `yawning`]
 *
 * console.log(get(minBy((a, b) => a.length - b.length, slothActivities)))
 * //=> eating
 * ```
 */
export const minBy: MinOrMaxBy

/**
 * Returns an async iterable containing a minimum value of `asyncIterable` based
 * on the `fn` {@link AsyncCompare} function if `asyncIterable` contains at
 * least one value. Otherwise, returns an empty async iterable.
 *
 * @example
 * ```js
 * const slothActivities = asAsync([`eating`, `sleeping`, `yawning`])
 *
 * console.log(
 *   await getAsync(minByAsync((a, b) => a.length - b.length, slothActivities))
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
 * const slothActivities = asConcur([`eating`, `sleeping`, `yawning`])
 *
 * console.log(
 *   await getConcur(
 *     minByConcur((a, b) => a.length - b.length, slothActivities)
 *   )
 * )
 * //=> eating
 * ```
 */
export const minByConcur: MinOrMaxByConcur

/**
 * Returns an iterable containing a maximum value of `iterable` based on the
 * `fn` {@link Compare} function if `iterable` contains at least one value.
 * Otherwise, returns an empty iterable.
 *
 * @example
 * ```js
 * const slothActivities = [`eating`, `sleeping`, `yawning`]
 *
 * console.log(get(maxBy((a, b) => a.length - b.length, slothActivities)))
 * //=> sleeping
 * ```
 */
export const maxBy: MinOrMaxBy

/**
 * Returns an async iterable containing a maximum value of `asyncIterable` based
 * on the `fn` {@link AsyncCompare} function if `asyncIterable` contains at
 * least one value. Otherwise, returns an empty async iterable.
 *
 * @example
 * ```js
 * const slothActivities = asAsync([`eating`, `sleeping`, `yawning`])
 *
 * console.log(
 *   await getAsync(maxByAsync((a, b) => a.length - b.length, slothActivities))
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
 * const slothActivities = asConcur([`eating`, `sleeping`, `yawning`])
 *
 * console.log(
 *   await getConcur(
 *     maxByConcur((a, b) => a.length - b.length, slothActivities)
 *   )
 * )
 * //=> sleeping
 * ```
 */
export const maxByConcur: MinOrMaxByConcur

/**
 * Returns an iterable containing a {@link MinMax} value of `iterable` based on
 * the `fn` {@link Compare} function if `iterable` contains at least one value.
 * Otherwise, returns an empty iterable.
 *
 * @example
 * ```js
 * const slothActivities = [`eating`, `sleeping`, `yawning`]
 *
 * console.log(get(minMaxBy((a, b) => a.length - b.length, slothActivities)))
 * //=> { min: 'eating', max: 'sleeping' }
 * ```
 */
export const minMaxBy: {
  <Value>(
    fn: (left: Value, right: Value) => number,
    iterable: Iterable<Value>
  ): Iterable<MinMax<Value>>
  <Value>(fn: (left: Value, right: Value) => number): (
    iterable: Iterable<Value>
  ) => Iterable<MinMax<Value>>
}

/**
 * Returns an async iterable containing a {@link MinMax} value of
 * `asyncIterable` based on the `fn` {@link AsyncCompare} function if
 * `asyncIterable` contains at least one value. Otherwise, returns an empty
 * async iterable.
 *
 * @example
 * ```js
 * const slothActivities = asAsync([`eating`, `sleeping`, `yawning`])
 *
 * console.log(
 *   await getAsync(
 *     minMaxByAsync((a, b) => a.length - b.length, slothActivities)
 *   )
 * )
 * //=> { min: 'eating', max: 'sleeping' }
 * ```
 */
export const minMaxByAsync: {
  <Value>(
    fn: (left: Value, right: Value) => MaybePromiseLike<number>,
    asyncIterable: AsyncIterable<Value>
  ): AsyncIterable<MinMax<Value>>
  <Value>(fn: (left: Value, right: Value) => MaybePromiseLike<number>): (
    asyncIterable: AsyncIterable<Value>
  ) => AsyncIterable<MinMax<Value>>
}

/**
 * Returns a concur iterable containing a {@link MinMax} value of
 * `concurIterable` based on the `fn` {@link AsyncCompare} function if
 * `concurIterable` contains at least one value. Otherwise, returns an empty
 * concur iterable.
 *
 * @example
 * ```js
 * const slothActivities = asConcur([`eating`, `sleeping`, `yawning`])
 *
 * console.log(
 *   await getConcur(
 *     minMaxByConcur((a, b) => a.length - b.length, slothActivities)
 *   )
 * )
 * //=> { min: 'eating', max: 'sleeping' }
 * ```
 */
export const minMaxByConcur: {
  <Value>(
    fn: (left: Value, right: Value) => MaybePromiseLike<number>,
    concurIterable: ConcurIterable<Value>
  ): ConcurIterable<MinMax<Value>>
  <Value>(fn: (left: Value, right: Value) => MaybePromiseLike<number>): (
    concurIterable: ConcurIterable<Value>
  ) => ConcurIterable<MinMax<Value>>
}

/** @internal */
type MinOrMaxWith = {
  <Value>(
    fn: (value: Value) => number,
    iterable: Iterable<Value>
  ): Iterable<Value>
  <Value>(fn: (value: Value) => number): (
    iterable: Iterable<Value>
  ) => Iterable<Value>
}

/** @internal */
type MinOrMaxWithAsync = {
  <Value>(
    fn: (value: Value) => MaybePromiseLike<number>,
    asyncIterable: AsyncIterable<Value>
  ): AsyncIterable<Value>
  <Value>(fn: (value: Value) => MaybePromiseLike<number>): (
    asyncIterable: AsyncIterable<Value>
  ) => AsyncIterable<Value>
}

/** @internal */
type MinOrMaxWithConcur = {
  <Value>(
    fn: (value: Value) => MaybePromiseLike<number>,
    concurIterable: ConcurIterable<Value>
  ): ConcurIterable<Value>
  <Value>(fn: (value: Value) => MaybePromiseLike<number>): (
    concurIterable: ConcurIterable<Value>
  ) => ConcurIterable<Value>
}

/**
 * Returns an iterable containing a minimum value of `iterable` by comparing the
 * numerical values of each value, as defined by `fn`, if `iterable` contains at
 * least one value. Otherwise, returns an empty iterable.
 *
 * @example
 * ```js
 * const slothActivities = [`eating`, `sleeping`, `yawning`]
 *
 * console.log(get(minWith(value => value.length, slothActivities)))
 * //=> eating
 * ```
 */
export const minWith: MinOrMaxWith

/**
 * Returns an async iterable containing a minimum value of `asyncIterable` by
 * comparing the numerical values of each value, as defined by `fn`, if
 * `asyncIterable` contains at least one value. Otherwise, returns an empty
 * async iterable.
 *
 * @example
 * ```js
 * const slothActivities = asAsync([`eating`, `sleeping`, `yawning`])
 *
 * console.log(
 *   await getAsync(minWithAsync(value => value.length, slothActivities))
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
 * const slothActivities = asConcur([`eating`, `sleeping`, `yawning`])
 *
 * console.log(
 *   await getConcur(minWithConcur(value => value.length, slothActivities))
 * )
 * //=> eating
 * ```
 */
export const minWithConcur: MinOrMaxWithConcur

/**
 * Returns an iterable containing a maximum value of `iterable` by comparing the
 * numerical values of each value, as defined by `fn`, if `iterable` contains at
 * least one value. Otherwise, returns an empty iterable.
 *
 * @example
 * ```js
 * const slothActivities = [`eating`, `sleeping`, `yawning`]
 *
 * console.log(get(maxWith(value => value.length, slothActivities)))
 * //=> sleeping
 * ```
 */
export const maxWith: MinOrMaxWith

/**
 * Returns an async iterable containing a maximum value of `asyncIterable` by
 * comparing the numerical values of each value, as defined by `fn`, if
 * `asyncIterable` contains at least one value. Otherwise, returns an empty
 * async iterable.
 *
 * @example
 * ```js
 * const slothActivities = asAsync([`eating`, `sleeping`, `yawning`])
 *
 * console.log(
 *   await getAsync(maxWithAsync(value => value.length, slothActivities))
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
 * const slothActivities = asConcur([`eating`, `sleeping`, `yawning`])
 *
 * console.log(
 *   await getConcur(maxWithConcur(value => value.length, slothActivities))
 * )
 * //=> sleeping
 * ```
 */
export const maxWithConcur: MinOrMaxWithConcur

/**
 * Returns an iterable containing a {@link MinMax} value of `iterable` by
 * comparing the numerical values of each value, as defined by `fn`, if
 * `iterable` contains at least one value. Otherwise, returns an empty iterable.
 *
 * @example
 * ```js
 * const slothActivities = [`eating`, `sleeping`, `yawning`]
 *
 * console.log(get(minMaxWith(value => value.length, slothActivities)))
 * //=> { min: 'eating', max: 'sleeping' }
 * ```
 */
export const minMaxWith: {
  <Value>(fn: (value: Value) => number, iterable: Iterable<Value>): Iterable<
    MinMax<Value>
  >
  <Value>(fn: (value: Value) => number): (
    iterable: Iterable<Value>
  ) => Iterable<MinMax<Value>>
}

/**
 * Returns an async iterable containing a {@link MinMax} value of
 * `asyncIterable` by comparing the numerical values of each value, as defined
 * by `fn`, if `asyncIterable` contains at least one value. Otherwise, returns
 * an empty async iterable.
 *
 * @example
 * ```js
 * const slothActivities = asAsync([`eating`, `sleeping`, `yawning`])
 *
 * console.log(
 *   await getAsync(minMaxWithAsync(value => value.length, slothActivities))
 * )
 * //=> { min: 'eating', max: 'sleeping' }
 * ```
 */
export const minMaxWithAsync: {
  <Value>(
    fn: (value: Value) => MaybePromiseLike<number>,
    asyncIterable: AsyncIterable<Value>
  ): AsyncIterable<MinMax<Value>>
  <Value>(fn: (value: Value) => MaybePromiseLike<number>): (
    asyncIterable: AsyncIterable<Value>
  ) => AsyncIterable<MinMax<Value>>
}

/**
 * Returns a concur iterable containing a {@link MinMax} value of
 * `concurIterable` by comparing the numerical values of each value, as defined
 * by `fn`, if `concurIterable` contains at least one value. Otherwise, returns
 * an empty concur iterable.
 *
 * @example
 * ```js
 * const slothActivities = asConcur([`eating`, `sleeping`, `yawning`])
 *
 * console.log(
 *   await getConcur(minMaxWithConcur(value => value.length, slothActivities))
 * )
 * //=> { min: 'eating', max: 'sleeping' }
 * ```
 */
export const minMaxWithConcur: {
  <Value>(
    fn: (value: Value) => MaybePromiseLike<number>,
    concurIterable: ConcurIterable<Value>
  ): ConcurIterable<MinMax<Value>>
  <Value>(fn: (value: Value) => MaybePromiseLike<number>): (
    concurIterable: ConcurIterable<Value>
  ) => ConcurIterable<MinMax<Value>>
}

/**
 * Returns an iterable containing a minimum value of `iterable` if `iterable`
 * contains at least one value. Otherwise, returns an empty iterable.
 *
 * @example
 * ```js
 * const iterable = [4, 1, 5, -3]
 *
 * console.log(get(min(iterable)))
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
 * const asyncIterable = asAsync([4, 1, 5, -3])
 *
 * console.log(await getAsync(minAsync(asyncIterable)))
 * //=> -3
 * ```
 */
export const minAsync: (
  asyncIterable: AsyncIterable<number>
) => AsyncIterable<number>

/**
 * Returns a concur iterable containing a minimum value of `concurIterable` if
 * `concurIterable` contains at least one value. Otherwise, returns an empty
 * concur iterable.
 *
 * @example
 * ```js
 * const concurIterable = asConcur([4, 1, 5, -3])
 *
 * console.log(await getConcur(minConcur(concurIterable)))
 * //=> -3
 * ```
 */
export const minConcur: (
  concurIterable: ConcurIterable<number>
) => ConcurIterable<number>

/**
 * Returns an iterable containing a maximum value of `iterable` if `iterable`
 * contains at least one value. Otherwise, returns an empty iterable.
 *
 * @example
 * ```js
 * const iterable = [4, 1, 5, -3]
 *
 * console.log(get(max(iterable)))
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
 * const asyncIterable = asAsync([4, 1, 5, -3])
 *
 * console.log(await getAsync(maxAsync(asyncIterable)))
 * //=> 5
 * ```
 */
export const maxAsync: (
  asyncIterable: AsyncIterable<number>
) => AsyncIterable<number>

/**
 * Returns a concur iterable containing a maximum value of `concurIterable` if
 * `concurIterable` contains at least one value. Otherwise, returns an empty
 * concur iterable.
 *
 * @example
 * ```js
 * const concurIterable = asConcur([4, 1, 5, -3])
 *
 * console.log(await getConcur(maxConcur(concurIterable)))
 * //=> 5
 * ```
 */
export const maxConcur: (
  concurIterable: ConcurIterable<number>
) => ConcurIterable<number>

/**
 * Returns an iterable containing a {@link MinMax} value of `iterable` if
 * `iterable` contains at least one value. Otherwise, returns an empty iterable.
 *
 * @example
 * ```js
 * const iterable = [4, 1, 5, -3]
 *
 * console.log(get(minMax(iterable)))
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
 * const asyncIterable = asAsync([4, 1, 5, -3])
 *
 * console.log(await getAsync(minMaxAsync(asyncIterable)))
 * //=> { min: -3, max: 5 }
 * ```
 */
export const minMaxAsync: (
  asyncIterable: AsyncIterable<number>
) => AsyncIterable<MinMax<number>>

/**
 * Returns a concur iterable containing a {@link MinMax} value of
 * `concurIterable` if `concurIterable` contains at least one value. Otherwise,
 * returns an empty concur iterable.
 *
 * @example
 * ```js
 * const concurIterable = asConcur([4, 1, 5, -3])
 *
 * console.log(await getConcur(minMaxConcur(concurIterable)))
 * //=> { min: -3, max: 5 }
 * ```
 */
export const minMaxConcur: (
  concurIterable: ConcurIterable<number>
) => ConcurIterable<MinMax<number>>
