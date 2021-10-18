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
 * Returns an iterable that contains the values of `iterable` for which `fn`
 * returns `true`.
 *
 * Like `Array.prototype.filter`, but for iterables.
 *
 * @example
 * ```js
 * const things = [`sloth party`, `building`, `sloths in trees`, `city`]
 *
 * console.log([...filter(string => string.includes(`sloth`), things)])
 * //=> [ 'sloth party', 'sloths in trees' ]
 * ```
 */
export const filter: {
  <Value>(fn: (value: Value) => boolean | unknown): (
    iterable: Iterable<Value>,
  ) => Iterable<Value>
  <Value>(
    fn: (value: Value) => boolean | unknown,
    iterable: Iterable<Value>,
  ): Iterable<Value>
}

/**
 * Returns an async iterable that contains the values of `asyncIterable`
 * for which `fn` returns `true` or a promise that resolves to `true`.
 *
 * Like `Array.prototype.filter`, but for async iterables.
 *
 * @example
 * ```js
 * const things = asAsync(
 *   [`sloth party`, `building`, `sloths in trees`, `city`]
 * )
 *
 * console.log(
 *   await collectAsync(
 *     toArray,
 *     filterAsync(string => string.includes(`sloth`), things)
 *   )
 * )
 * //=> [ 'sloth party', 'sloths in trees' ]
 * ```
 */
export const filterAsync: {
  <Value>(fn: (value: Value) => MaybePromiseLike<boolean | unknown>): (
    asyncIterable: AsyncIterable<Value>,
  ) => AsyncIterable<Value>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<boolean | unknown>,
    asyncIterable: AsyncIterable<Value>,
  ): AsyncIterable<Value>
}

/**
 * Returns a concur iterable that contains the values of `concurIterable` for
 * which `fn` returns `true` or a promise that resolves to `true`.
 *
 * Like `Array.prototype.filter`, but for concur iterables.
 *
 * @example
 * ```js
 * const things = asConcur(
 *   [`sloth party`, `building`, `sloths in trees`, `city`]
 * )
 *
 * console.log(
 *   await collectConcur(
 *     toArray,
 *     filterConcur(string => string.includes(`sloth`), things)
 *   )
 * )
 * //=> [ 'sloth party', 'sloths in trees' ] (not necessarily in this order)
 * ```
 */
export const filterConcur: {
  <Value>(fn: (value: Value) => MaybePromiseLike<boolean | unknown>): (
    concurIterable: ConcurIterable<Value>,
  ) => ConcurIterable<Value>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<boolean | unknown>,
    concurIterable: ConcurIterable<Value>,
  ): ConcurIterable<Value>
}

/**
 * Returns an iterable containing the values of `iterable` excluding the values
 * of `excluded`.
 *
 * @example
 * ```js
 * const numbers = [1, 2, 3, 4, 5, 6]
 *
 * console.log([...without([3, 5], numbers)])
 * //=> [ 1, 2, 4, 6 ]
 * ```
 */
export const without: {
  (excluded: Iterable<unknown>): <Value>(
    iterable: Iterable<Value>,
  ) => Iterable<Value>
  <Value>(
    excluded: Iterable<unknown>,
    iterable: Iterable<Value>,
  ): Iterable<Value>
}

/**
 * Returns an async iterable containing the values of `asyncIterable` excluding
 * the values of `excluded`.
 *
 * @example
 * ```js
 * const numbers = asAsync([1, 2, 3, 4, 5, 6])
 *
 * console.log(await collectAsync(toArray, withoutAsync([3, 5], numbers)))
 * //=> [ 1, 2, 4, 6 ]
 * ```
 */
export const withoutAsync: {
  (excluded: Iterable<unknown>): <Value>(
    asyncIterable: AsyncIterable<Value>,
  ) => AsyncIterable<Value>
  <Value>(
    excluded: Iterable<unknown>,
    asyncIterable: AsyncIterable<Value>,
  ): AsyncIterable<Value>
}

/**
 * Returns a concur iterable containing the values of `concurIterable` excluding
 * the values of `excluded`.
 *
 * @example
 * ```js
 * const numbers = asConcur([1, 2, 3, 4, 5, 6])
 *
 * console.log(await collectConcur(toArray, withoutConcur([3, 5], numbers)))
 * //=> [ 1, 2, 4, 6 ] (not necessarily in this order)
 * ```
 */
export const withoutConcur: {
  (excluded: Iterable<unknown>): <Value>(
    concurIterable: ConcurIterable<Value>,
  ) => ConcurIterable<Value>
  <Value>(
    excluded: Iterable<unknown>,
    concurIterable: ConcurIterable<Value>,
  ): ConcurIterable<Value>
}
