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

/**
 * Returns an iterable equivalent to `iterable`, except values are deduplicated
 * if applying `fn` to them returns the same value.
 *
 * @example
 * ```js
 * const iterable = [1, -3, 4, 3, 1, -5, 5]
 *
 * console.log([...uniqueBy(value => Math.abs(value), iterable)])
 * //=> [ 1, -3, 4, 1, -5 ]
 * ```
 */
export const uniqueBy: {
  <Value>(fn: (value: Value) => unknown): (
    iterable: Iterable<Value>
  ) => Iterable<Value>
  <Value>(
    fn: (value: Value) => unknown,
    iterable: Iterable<Value>
  ): Iterable<Value>
}

/**
 * Returns an async iterable equivalent to `asyncIterable`, except values are
 * deduplicated if applying `fn` to them returns the same value or returns a
 * promise that resolves to the same value.
 *
 * @example
 * ```js
 * const asyncIterable = asAsync([1, -3, 4, 3, 1, -5, 5])
 *
 * console.log(
 *   await collectAsync(
 *     toArray,
 *     uniqueByAsync(value => Math.abs(value), asyncIterable)
 *   )
 * )
 * //=> [ 1, -3, 4, 1, -5 ]
 * ```
 */
export const uniqueByAsync: {
  <Value>(fn: (value: Value) => MaybePromiseLike<unknown>): (
    asyncIterable: AsyncIterable<Value>
  ) => AsyncIterable<Value>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
    asyncIterable: AsyncIterable<Value>
  ): AsyncIterable<Value>
}

/**
 * Returns a concur iterable equivalent to `concurIterable`, except values are
 * deduplicated if applying `fn` to them returns the same value or returns a
 * promise that resolves to the same value.
 *
 * @example
 * ```js
 * const concurIterable = asConcur([1, -3, 4, 3, 1, -5, 5])
 *
 * console.log(
 *   await collectConcur(
 *     toArray,
 *     uniqueByConcur(value => Math.abs(value), concurIterable)
 *   )
 * )
 * //=> [ 1, -3, 4, 1, -5 ]
 * ```
 */
export const uniqueByConcur: {
  <Value>(fn: (value: Value) => MaybePromiseLike<unknown>): (
    concurIterable: ConcurIterable<Value>
  ) => ConcurIterable<Value>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
    concurIterable: ConcurIterable<Value>
  ): ConcurIterable<Value>
}

/**
 * Returns an iterable equivalent to `iterable`, except values are deduplicated
 * if they are equal (using `Object.is`).
 *
 * @example
 * ```js
 * const iterable = [1, -3, 4, 3, 1, -5, 5]
 *
 * console.log([...unique(iterable)])
 * //=> [ 1, -3, 4, 3, -5, 5 ]
 * ```
 */
export const unique: <Value>(iterable: Iterable<Value>) => Iterable<Value>

/**
 * Returns an async iterable equivalent to `asyncIterable`, except values are
 * deduplicated if they are equal (using `Object.is`).
 *
 * @example
 * ```js
 * const asyncIterable = asAsync([1, -3, 4, 3, 1, -5, 5])
 *
 * console.log(await collectAsync(toArray, uniqueAsync(asyncIterable)))
 * //=> [ 1, -3, 4, 3, -5, 5 ]
 * ```
 */
export const uniqueAsync: <Value>(
  asyncIterable: AsyncIterable<Value>
) => AsyncIterable<Value>

/**
 * Returns a concur iterable equivalent to `concurIterable`, except values are
 * deduplicated if they are equal (using `Object.is`).
 *
 * @example
 * ```js
 * const concurIterable = asConcur([1, -3, 4, 3, 1, -5, 5])
 *
 * console.log(await collectConcur(toArray, uniqueConcur(concurIterable)))
 * //=> [ 1, -3, 4, 3, -5, 5 ]
 * ```
 */
export const uniqueConcur: <Value>(
  concurIterable: ConcurIterable<Value>
) => ConcurIterable<Value>
