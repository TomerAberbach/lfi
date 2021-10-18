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
 * Returns an iterable containing the values of `iterable` transformed by `fn`
 * in iteration order.
 *
 * Like `Array.prototype.map`, but for iterables.
 *
 * @example
 * ```js
 * const iterable = [1, 2, 3, 4]
 *
 * console.log([...map(value => value * 2, iterable)])
 * //=> [ 2, 4, 6, 8 ]
 * ```
 */
export const map: {
  <From, To>(fn: (value: From) => To): (
    iterable: Iterable<From>,
  ) => Iterable<To>
  <From, To>(fn: (value: From) => To, iterable: Iterable<From>): Iterable<To>
}

/**
 * Returns an async iterable containing the values of `asyncIterable`
 * transformed by `fn` in iteration order.
 *
 * Like `Array.prototype.map`, but for async iterables.
 *
 * @example
 * ```js
 * const asyncIterable = asAsync([1, 2, 3, 4])
 *
 * console.log(
 *   await collectAsync(toArray, mapAsync(value => value * 2, asyncIterable))
 * )
 * //=> [ 2, 4, 6, 8 ]
 * ```
 */
export const mapAsync: {
  <From, To>(fn: (value: From) => MaybePromiseLike<To>): (
    asyncIterable: AsyncIterable<From>,
  ) => AsyncIterable<To>
  <From, To>(
    fn: (value: From) => MaybePromiseLike<To>,
    asyncIterable: AsyncIterable<From>,
  ): AsyncIterable<To>
}

/**
 * Returns a concur iterable containing the values of `concurIterable`
 * transformed by `fn` in iteration order.
 *
 * Like `Array.prototype.map`, but for concur iterables.
 *
 * @example
 * ```js
 * const concurIterable = asConcur([1, 2, 3, 4])
 *
 * console.log(
 *   await collectConcur(toArray, mapConcur(value => value * 2, concurIterable))
 * )
 * //=> [ 2, 4, 6, 8 ] (not necessarily in this order)
 * ```
 */
export const mapConcur: {
  <From, To>(fn: (value: From) => MaybePromiseLike<To>): (
    concurIterable: ConcurIterable<From>,
  ) => ConcurIterable<To>
  <From, To>(
    fn: (value: From) => MaybePromiseLike<To>,
    concurIterable: ConcurIterable<From>,
  ): ConcurIterable<To>
}
