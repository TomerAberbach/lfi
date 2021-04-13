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

import { ConcurIterable } from './types'
import { MaybePromiseLike } from './internal/types'

/** @internal */
type SubWhile = {
  <Value>(fn: (value: Value) => boolean | unknown): (
    iterable: Iterable<Value>
  ) => Iterable<Value>
  <Value>(
    fn: (value: Value) => boolean | unknown,
    iterable: Iterable<Value>
  ): Iterable<Value>
}

/** @internal */
type SubWhileAsync = {
  <Value>(fn: (value: Value) => MaybePromiseLike<boolean | unknown>): (
    asyncIterable: AsyncIterable<Value>
  ) => AsyncIterable<Value>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<boolean | unknown>,
    asyncIterable: AsyncIterable<Value>
  ): AsyncIterable<Value>
}

/** @internal */
type SubWhileConcur = {
  <Value>(fn: (value: Value) => MaybePromiseLike<boolean | unknown>): (
    concurIterable: ConcurIterable<Value>
  ) => ConcurIterable<Value>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<boolean | unknown>,
    concurIterable: ConcurIterable<Value>
  ): ConcurIterable<Value>
}

/**
 * Returns an iterable containing the values of `iterable` in iteration order
 * starting with the first value for which `fn` does not return `true`.
 *
 * @example
 * ```js
 * const iterable = [1, 2, 3, 4, 5, 6, 7, 8, 9]
 *
 * console.log([...dropWhile(value => value < 5, iterable)])
 * //=> [ 5, 6, 7, 8, 9 ]
 * ```
 */
export const dropWhile: SubWhile

/**
 * Returns an async iterable containing the values of `asyncIterable` in
 * iteration order starting with the first value for which `fn` does not return
 * `true` or a promise that resolves to `true`.
 *
 * @example
 * ```js
 * const asyncIterable = asAsync([1, 2, 3, 4, 5, 6, 7, 8, 9])
 *
 * console.log(
 *   await collectAsync(dropWhileAsync(value => value < 5, asyncIterable))
 * )
 * //=> [ 5, 6, 7, 8, 9 ]
 * ```
 */
export const dropWhileAsync: SubWhileAsync

/**
 * Returns a concur iterable containing the values of `concurIterable` in
 * iteration order starting with the first value for which `fn` does not return
 * `true` or a promise that resolves to `true`.
 *
 * @example
 * ```js
 * const concurIterable = asConcur([1, 2, 3, 4, 5, 6, 7, 8, 9])
 *
 * console.log(
 *   await collectConcur(dropWhileConcur(value => value < 5, concurIterable))
 * )
 * //=> [ 5, 6, 7, 8, 9 ]
 * ```
 */
export const dropWhileConcur: SubWhileConcur

/**
 * Returns an iterable containing the values of `iterable` in iteration order
 * up until, but not including, the first value for which `fn` does not return
 * `true`.
 *
 * @example
 * ```js
 * const iterable = [1, 2, 3, 4, 5, 6, 7, 8, 9]
 *
 * console.log([...takeWhile(value => value < 5, iterable)])
 * //=> [ 1, 2, 3, 4 ]
 * ```
 */
export const takeWhile: SubWhile

/**
 * Returns an async iterable containing the values of `asyncIterable` in
 * iteration order up until, but not including, the first value for which `fn`
 * does not return `true` or a promise that resolves to `true`.
 *
 * @example
 * ```js
 * const asyncIterable = asAsync([1, 2, 3, 4, 5, 6, 7, 8, 9])
 *
 * console.log(
 *   await collectAsync(takeWhileAsync(value => value < 5, asyncIterable))
 * )
 * //=> [ 1, 2, 3, 4 ]
 * ```
 */
export const takeWhileAsync: SubWhileAsync

/**
 * Returns a concur iterable containing the values of `concurIterable` in
 * iteration order up until, but not including, the first value for which `fn`
 * does not return `true` or a promise that resolves to `true`.
 *
 * @example
 * ```js
 * const concurIterable = asConcur([1, 2, 3, 4, 5, 6, 7, 8, 9])
 *
 * console.log(
 *   await collectConcur(takeWhileConcur(value => value < 5, concurIterable))
 * )
 * //=> [ 1, 2, 3, 4 ]
 * ```
 */
export const takeWhileConcur: SubWhileConcur

/** @internal */
type Sub = {
  (count: number): <Value>(iterable: Iterable<Value>) => Iterable<Value>
  <Value>(count: number, iterable: Iterable<Value>): Iterable<Value>
}

/** @internal */
type SubAsync = {
  (count: number): <Value>(
    asyncIterable: AsyncIterable<Value>
  ) => AsyncIterable<Value>
  <Value>(
    count: number,
    asyncIterable: AsyncIterable<Value>
  ): AsyncIterable<Value>
}

/** @internal */
type SubConcur = {
  (count: number): <Value>(
    concurIterable: ConcurIterable<Value>
  ) => ConcurIterable<Value>
  <Value>(
    count: number,
    concurIterable: ConcurIterable<Value>
  ): ConcurIterable<Value>
}

/**
 * Returns an iterable containing the values of `iterable` in iteration order
 * except for the first `count` values.
 *
 * If the `count` is greater than the number of values in `iterable`, then an
 * empty iterable is returned.
 *
 * @throws if `count` isn't a non-negative integer.
 *
 * @example
 * ```js
 * const iterable = [1, 2, 3, 4, 5]
 *
 * console.log([...drop(3, iterable)])
 * //=> [ 4, 5 ]
 * ```
 */
export const drop: Sub

/**
 * Returns an async iterable containing the values of `asyncIterable` in
 * iteration order except for the first `count` values.
 *
 * If the `count` is greater than the number of values in `asyncIterable`, then
 * an empty async iterable is returned.
 *
 * @throws if `count` isn't a non-negative integer.
 *
 * @example
 * ```js
 * const asyncIterable = asAsync([1, 2, 3, 4, 5])
 *
 * console.log(await collectAsync(dropAsync(3, asyncIterable)))
 * //=> [ 4, 5 ]
 * ```
 */
export const dropAsync: SubAsync

/**
 * Returns a concur iterable containing the values of `concurIterable` in
 * iteration order except for the first `count` values.
 *
 * If the `count` is greater than the number of values in `concurIterable`, then
 * an empty concur iterable is returned.
 *
 * @throws if `count` isn't a non-negative integer.
 *
 * @example
 * ```js
 * const concurIterable = asConcur([1, 2, 3, 4, 5])
 *
 * console.log(await collectConcur(dropConcur(3, concurIterable)))
 * //=> [ 4, 5 ]
 * ```
 */
export const dropConcur: SubConcur

/**
 * Returns an iterable containing the first `count` values of `iterable` in
 * iteration order.
 *
 * If the `count` is greater than the number of values in `iterable`, then an
 * iterable equivalent `iterable` is returned.
 *
 * @throws if `count` isn't a non-negative integer.
 *
 * @example
 * ```js
 * const iterable = [1, 2, 3, 4, 5]
 *
 * console.log([...take(3, iterable)])
 * //=> [ 1, 2, 3 ]
 * ```
 */
export const take: Sub

/**
 * Returns an async iterable containing the first `count` values of
 * `asyncIterable` in iteration order.
 *
 * If the `count` is greater than the number of values in `asyncIterable`, then
 * an async iterable equivalent `asyncIterable` is returned.
 *
 * @throws if `count` isn't a non-negative integer.
 *
 * @example
 * ```js
 * const asyncIterable = asAsync([1, 2, 3, 4, 5])
 *
 * console.log(await collectAsync(takeAsync(3, asyncIterable)))
 * //=> [ 1, 2, 3 ]
 * ```
 */
export const takeAsync: SubAsync

/**
 * Returns a concur iterable containing the first `count` values of
 * `concurIterable` in iteration order.
 *
 * If the `count` is greater than the number of values in `concurIterable`, then
 * a concur iterable equivalent `concurIterable` is returned.
 *
 * @throws if `count` isn't a non-negative integer.
 *
 * @example
 * ```js
 * const concurIterable = asConcur([1, 2, 3, 4, 5])
 *
 * console.log(await collectConcur(takeConcur(3, concurIterable)))
 * //=> [ 1, 2, 3 ]
 * ```
 */
export const takeConcur: SubConcur

/**
 * Returns an iterable containing the first value of `iterable`, or an empty
 * iterable if `iterable` is empty.
 *
 * @example
 * ```
 * const iterable = [1, 2, 3]
 *
 * console.log([...first(iterable)])
 * //=> [ 1 ]
 * ```
 */
export const first: <Value>(iterable: Iterable<Value>) => Iterable<Value>

/**
 * Returns an async iterable containing the first value of `asyncIterable`, or
 * an empty async iterable if `asyncIterable` is empty.
 *
 * @example
 * ```
 * const asyncIterable = asAsync([1, 2, 3])
 *
 * console.log(await collectAsync(firstAsync(asyncIterable)))
 * //=> [ 1 ]
 * ```
 */
export const firstAsync: <Value>(
  asyncIterable: AsyncIterable<Value>
) => AsyncIterable<Value>

/**
 * Returns a concur iterable containing the first value of `concurIterable`, or
 * an empty concur iterable if `concurIterable` is empty.
 *
 * @example
 * ```
 * const concurIterable = asConcur([1, 2, 3])
 *
 * console.log(await collectConcur(firstConcur(concurIterable)))
 * //=> [ 1 ]
 * ```
 */
export const firstConcur: <Value>(
  concurIterable: ConcurIterable<Value>
) => ConcurIterable<Value>

/**
 * Returns an iterable containing the last value of `iterable`, or an empty
 * iterable if `iterable` is empty.
 *
 * @example
 * ```
 * const iterable = [1, 2, 3]
 *
 * console.log([...last(iterable)])
 * //=> [ 3 ]
 * ```
 */
export const last: <Value>(iterable: Iterable<Value>) => Iterable<Value>

/**
 * Returns an async iterable containing the last value of `asyncIterable`, or
 * an empty async iterable if `asyncIterable` is empty.
 *
 * @example
 * ```
 * const asyncIterable = asAsync([1, 2, 3])
 *
 * console.log(await collectAsync(lastAsync(asyncIterable)))
 * //=> [ 3 ]
 * ```
 */
export const lastAsync: <Value>(
  asyncIterable: AsyncIterable<Value>
) => AsyncIterable<Value>

/**
 * Returns a concur iterable containing the last value of `concurIterable`, or
 * an empty concur iterable if `concurIterable` is empty.
 *
 * @example
 * ```
 * const concurIterable = asConcur([1, 2, 3])
 *
 * console.log(await collectConcur(lastConcur(concurIterable)))
 * //=> [ 3 ]
 * ```
 */
export const lastConcur: <Value>(
  concurIterable: ConcurIterable<Value>
) => ConcurIterable<Value>
