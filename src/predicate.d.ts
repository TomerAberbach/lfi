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
type Predicate = {
  <Value>(fn: (value: Value) => boolean | unknown): (
    iterable: Iterable<Value>,
  ) => boolean
  <Value>(
    fn: (value: Value) => boolean | unknown,
    iterable: Iterable<Value>,
  ): boolean
}

/** @internal */
type PredicateAsync = {
  <Value>(fn: (value: Value) => MaybePromiseLike<boolean | unknown>): (
    asyncIterable: AsyncIterable<Value>,
  ) => Promise<boolean>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<boolean | unknown>,
    asyncIterable: AsyncIterable<Value>,
  ): Promise<boolean>
}

/** @internal */
type PredicateConcur = {
  <Value>(fn: (value: Value) => MaybePromiseLike<boolean | unknown>): (
    concurIterable: ConcurIterable<Value>,
  ) => Promise<boolean>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<boolean | unknown>,
    concurIterable: ConcurIterable<Value>,
  ): Promise<boolean>
}

/**
 * Returns `true` if `fn` returns `true` for all values of `iterable`. Otherwise
 * returns `false`.
 *
 * Like `Array.prototype.every`, but for iterables.
 *
 * @example
 * ```js
 * const numbers = [1, 2, 3, 4, 5]
 *
 * console.log(all(number => number > 1, numbers))
 * //=> false
 * ```
 */
export const all: Predicate

/**
 * Returns a promise that resolves to `true` if `fn` returns `true` or a promise
 * that resolves to `true` for all values of `asyncIterable`. Otherwise returns
 * a promise that resolves to `false`.
 *
 * Like `Array.prototype.every`, but for async iterables.
 *
 * @example
 * ```js
 * const numbers = asAsync([1, 2, 3, 4, 5])
 *
 * console.log(await allAsync(number => number > 1, numbers))
 * //=> false
 * ```
 */
export const allAsync: PredicateAsync

/**
 * Returns a promise that resolves to `true` if `fn` returns `true` or a promise
 * that resolves to `true` for all values of `concurIterable`. Otherwise returns
 * a promise that resolves to `false`.
 *
 * Like `Array.prototype.every`, but for concur iterables.
 *
 * @example
 * ```js
 * const numbers = asConcur([1, 2, 3, 4, 5])
 *
 * console.log(await allConcur(number => number > 1, numbers))
 * //=> false
 * ```
 */
export const allConcur: PredicateConcur

/**
 * Returns `true` if `fn` returns `true` for any value of `iterable`. Otherwise
 * returns `false`.
 *
 * Like `Array.prototype.some`, but for iterables.
 *
 * @example
 * ```js
 * const numbers = [1, 2, 3, 4, 5]
 *
 * console.log(any(number => number > 1, numbers))
 * //=> true
 * ```
 */
export const any: Predicate

/**
 * Returns a promise that resolves to `true` if `fn` returns `true` or a promise
 * that resolves to `true` for any value of `asyncIterable`. Otherwise returns
 * a promise that resolves to `false`.
 *
 * Like `Array.prototype.some`, but for async iterables.
 *
 * @example
 * ```js
 * const numbers = asAsync([1, 2, 3, 4, 5])
 *
 * console.log(await anyAsync(number => number > 1, numbers))
 * //=> true
 * ```
 */
export const anyAsync: PredicateAsync

/**
 * Returns a promise that resolves to `true` if `fn` returns `true` or a promise
 * that resolves to `true` for any value of `concurIterable`. Otherwise returns
 * a promise that resolves to `false`.
 *
 * Like `Array.prototype.some`, but for concur iterables.
 *
 * @example
 * ```js
 * const numbers = asConcur([1, 2, 3, 4, 5])
 *
 * console.log(await anyConcur(number => number > 1, numbers))
 * //=> true
 * ```
 */
export const anyConcur: PredicateConcur

/**
 * Returns `true` if `fn` does not return `true` for all values of `iterable`.
 * Otherwise returns `false`.
 *
 * @example
 * ```js
 * const numbers = [1, 2, 3, 4, 5]
 *
 * console.log(none(number => number > 1, numbers))
 * //=> false
 * ```
 */
export const none: Predicate

/**
 * Returns a promise that resolves to `true` if `fn` does not return `true` and
 * does not return a promise that resolves to `true` for all values of
 * `asyncIterable`. Otherwise returns a promise that resolves to `false`.
 *
 * @example
 * ```js
 * const numbers = asAsync([1, 2, 3, 4, 5])
 *
 * console.log(await noneAsync(number => number > 1, numbers))
 * //=> false
 * ```
 */
export const noneAsync: PredicateAsync

/**
 * Returns a promise that resolves to `true` if `fn` does not return `true` and
 * does not return a promise that resolves to `true` for all values of
 * `concurIterable`. Otherwise returns a promise that resolves to `false`.
 *
 * @example
 * ```js
 * const numbers = asConcur([1, 2, 3, 4, 5])
 *
 * console.log(await noneConcur(number => number > 1, numbers))
 * //=> false
 * ```
 */
export const noneConcur: PredicateConcur

/**
 * Returns `true` if any value of `iterable` is equal to `searchElement` using
 * `Object.is`. Otherwise returns `false`.
 *
 * Like `Array.prototype.includes`, but for iterables.
 *
 * @example
 * ```js
 * const numbers = [1, 2, 3, 4, 5]
 *
 * console.log(includes(3, numbers))
 * //=> true
 * ```
 */
export const includes: {
  (searchElement: unknown): <Value>(iterable: Iterable<Value>) => boolean
  <Value>(searchElement: unknown, iterable: Iterable<Value>): boolean
}

/**
 * Returns a promise that resolves to `true` if any value of `asyncIterable` is
 * equal to `searchElement` using `Object.is`. Otherwise returns a promise that
 * resolves to `false`.
 *
 * Like `Array.prototype.includes`, but for async iterables.
 *
 * @example
 * ```js
 * const numbers = asAsync([1, 2, 3, 4, 5])
 *
 * console.log(await includesAsync(3, numbers))
 * //=> true
 * ```
 */
export const includesAsync: {
  (searchElement: unknown): <Value>(
    asyncIterable: AsyncIterable<Value>,
  ) => Promise<boolean>
  <Value>(
    searchElement: unknown,
    asyncIterable: AsyncIterable<Value>,
  ): Promise<boolean>
}

/**
 * Returns a promise that resolves to `true` if any value of `concurIterable` is
 * equal to `searchElement` using `Object.is`. Otherwise returns a promise that
 * resolves to `false`.
 *
 * Like `Array.prototype.includes`, but for concur iterables.
 *
 * @example
 * ```js
 * const numbers = asConcur([1, 2, 3, 4, 5])
 *
 * console.log(await includesConcur(3, numbers))
 * //=> true
 * ```
 */
export const includesConcur: {
  (searchElement: unknown): <Value>(
    concurIterable: ConcurIterable<Value>,
  ) => Promise<boolean>
  <Value>(
    searchElement: unknown,
    concurIterable: ConcurIterable<Value>,
  ): Promise<boolean>
}
