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
 * Returns an iterable containing the values of the iterables returned from
 * applying `fn` to each value of `iterable` in iteration order.
 *
 * Like `Array.prototype.flatMap`, but for iterables.
 *
 * @example
 * ```js
 * const iterable = flatMap(
 *   value => [value, `sloth`],
 *   [`a`, `the`, `some`]
 * )
 *
 * console.log([...iterable])
 * //=> [ 'a', 'sloth', 'the', 'sloth', 'some', 'sloth' ]
 * ```
 */
export const flatMap: {
  <From, To>(fn: (value: From) => Iterable<To>): (
    iterable: Iterable<From>,
  ) => Iterable<To>
  <From, To>(
    fn: (value: From) => Iterable<To>,
    iterable: Iterable<From>,
  ): Iterable<To>
}

/**
 * Returns an async iterable containing the values of the async iterables
 * returned, or resolving from promises returned, from applying `fn` to each
 * value of `asyncIterable` in iteration order.
 *
 * Like `Array.prototype.flatMap`, but for async iterables.
 *
 * @example
 * ```js
 * const asyncIterable = flatMapAsync(
 *   value => {
 *     await new Promise(resolve => setTimeout(resolve, 1000))
 *     return value > 1
 *       ? asAsync([value, value * 2])
 *       : [value, value * 3]
 *   },
 *   [1, 2, 3]
 * )
 *
 * console.log(await collectAsync(toArray, asyncIterable))
 * //=> [1, 3, 2, 4, 3, 6]
 * ```
 */
export const flatMapAsync: {
  <From, To>(
    fn: (value: From) => MaybePromiseLike<Iterable<To> | AsyncIterable<To>>,
  ): (asyncIterable: AsyncIterable<From>) => AsyncIterable<To>
  <From, To>(
    fn: (value: From) => MaybePromiseLike<Iterable<To> | AsyncIterable<To>>,
    asyncIterable: AsyncIterable<From>,
  ): AsyncIterable<To>
}

/**
 * Returns an concur iterable containing the values of the concur iterables
 * returned, or resolving from promises returned, from applying `fn` to each
 * value of `concurIterable`.
 *
 * Like `Array.prototype.flatMap`, but for concur iterables.
 *
 * @example
 * ```js
 * const concurIterable = flatMapConcur(
 *   value => {
 *     await new Promise(resolve => setTimeout(resolve, 1000))
 *     return value > 3
 *       ? asConcur([value, value * 2])
 *       : value > 1
 *       ? asAsync([value, value * 3])
 *       : [value, value * 4]
 *   },
 *   [1, 2, 3, 4]
 * )
 *
 * console.log(await collectConcur(toArray, concurIterable))
 * //=> [1, 4, 2, 6, 3, 9, 4, 8] (not necessarily in this order)
 * ```
 */
export const flatMapConcur: {
  <From, To>(
    fn: (
      value: From,
    ) => MaybePromiseLike<
      Iterable<To> | AsyncIterable<To> | ConcurIterable<To>
    >,
  ): (concurIterable: ConcurIterable<From>) => ConcurIterable<To>
  <From, To>(
    fn: (
      value: From,
    ) => MaybePromiseLike<
      Iterable<To> | AsyncIterable<To> | ConcurIterable<To>
    >,
    concurIterable: ConcurIterable<From>,
  ): ConcurIterable<To>
}

/**
 * Returns an iterable that contains the values of each iterable in `iterable`
 * in iteration order.
 *
 * Like `Array.prototype.flat`, but for iterables.
 *
 * @example
 * ```js
 * const iterable = flatten([[1, 2], [3, `sloth`, 5], [6, 7]])
 *
 * console.log([...iterable])
 * //=> [ 1, 2, 3, 'sloth', 5, 6, 7 ]
 * ```
 */
export const flatten: <Value>(
  iterable: Iterable<Iterable<Value>>,
) => Iterable<Value>

/**
 * Returns an async iterable that contains the values of each iterable in
 * `asyncIterable` in iteration order.
 *
 * Like `Array.prototype.flat`, but for async iterables.
 *
 * @example
 * ```js
 * const asyncIterable = flattenAsync([
 *   asAsync([1, 2]),
 *   [3, `sloth`, 5],
 *   asAsync([6, 7])
 * ])
 *
 * console.log(await collectAsync(toArray, asyncIterable))
 * //=> [ 1, 2, 3, 'sloth', 5, 6, 7 ]
 * ```
 */
export const flattenAsync: <Value>(
  asyncIterable: AsyncIterable<Iterable<Value> | AsyncIterable<Value>>,
) => AsyncIterable<Value>

/**
 * Returns a concur iterable that contains the values of each iterable in
 * `concurIterable`.
 *
 * Like `Array.prototype.flat`, but for concur iterables.
 *
 * Unlike {@link concat} and {@link concatAsync}, this function does not
 * necessarily iterate over each iterable in sequence.
 *
 * @example
 * ```js
 * const concurIterable = flattenConcur([
 *   asConcur([1, 2, 3]),
 *   asAsync([`sloth`, 5, 6]),
 *   [7, 8, 9]
 * ])
 *
 * console.log(await collectConcur(toArray, concurIterable))
 * //=> [ 1, 2, 3, 'sloth', 5, 6, 7, 8, 9 ] (not necessarily in this order)
 * ```
 */
export const flattenConcur: <Value>(
  concurIterable: ConcurIterable<
    Iterable<Value> | AsyncIterable<Value> | ConcurIterable<Value>
  >,
) => ConcurIterable<Value>
