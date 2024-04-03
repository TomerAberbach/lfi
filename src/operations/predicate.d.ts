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

import type { MaybePromiseLike } from '../internal/types.js'
import type { ConcurIterable } from './as.js'

/** @internal */
type Predicate = {
  <Value>(fn: (value: Value) => unknown): (iterable: Iterable<Value>) => boolean
  <Value>(fn: (value: Value) => unknown, iterable: Iterable<Value>): boolean
}

/** @internal */
type PredicateAsync = {
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
  ): (asyncIterable: AsyncIterable<Value>) => Promise<boolean>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
    asyncIterable: AsyncIterable<Value>,
  ): Promise<boolean>
}

/** @internal */
type PredicateConcur = {
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
  ): (concurIterable: ConcurIterable<Value>) => Promise<boolean>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
    concurIterable: ConcurIterable<Value>,
  ): Promise<boolean>
}

/**
 * Returns `true` if `fn` returns a truthy value for all values of `iterable`.
 * Otherwise returns `false`.
 *
 * Like `Array.prototype.every`, but for iterables.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     [`sloth`, `more sloth`, `even more sloth`],
 *     all(string => string.length > 8),
 *   ),
 * )
 * //=> false
 * ```
 */
export const all: Predicate

/**
 * Returns a promise that resolves to `true` if `fn` returns a truthy value or a
 * promise that resolves to a truthy value for all values of `asyncIterable`.
 * Otherwise returns a promise that resolves to `false`.
 *
 * Like `Array.prototype.every`, but for async iterables.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asAsync([`sloth`, `more sloth`, `even more sloth`]),
 *     allAsync(string => string.length > 8),
 *   ),
 * )
 * //=> false
 * ```
 */
export const allAsync: PredicateAsync

/**
 * Returns a promise that resolves to `true` if `fn` returns a truthy value or a
 * promise that resolves to a truthy value for all values of `concurIterable`.
 * Otherwise returns a promise that resolves to `false`.
 *
 * Like `Array.prototype.every`, but for concur iterables.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asConcur([`sloth`, `more sloth`, `even more sloth`]),
 *     allConcur(string => string.length > 8),
 *   ),
 * )
 * //=> false
 * ```
 */
export const allConcur: PredicateConcur

/**
 * Returns `true` if `fn` returns a truthy value for any value of `iterable`.
 * Otherwise returns `false`.
 *
 * Like `Array.prototype.some`, but for iterables.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     [`sloth`, `more sloth`, `even more sloth`],
 *     any(string => string.length > 8),
 *   ),
 * )
 * //=> true
 * ```
 */
export const any: Predicate

/**
 * Returns a promise that resolves to `true` if `fn` returns a truthy value or a
 * promise that resolves to a truthy value for any value of `asyncIterable`.
 * Otherwise returns a promise that resolves to `false`.
 *
 * Like `Array.prototype.some`, but for async iterables.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asAsync([`sloth`, `more sloth`, `even more sloth`]),
 *     anyAsync(string => string.length > 8),
 *   ),
 * )
 * //=> true
 * ```
 */
export const anyAsync: PredicateAsync

/**
 * Returns a promise that resolves to `true` if `fn` returns a truthy value or a
 * promise that resolves to a truthy value for any value of `concurIterable`.
 * Otherwise returns a promise that resolves to `false`.
 *
 * Like `Array.prototype.some`, but for concur iterables.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asConcur([`sloth`, `more sloth`, `even more sloth`]),
 *     anyConcur(string => string.length > 8),
 *   ),
 * )
 * //=> true
 * ```
 */
export const anyConcur: PredicateConcur

/**
 * Returns `true` if `fn` returns a falsy value for all values of `iterable`.
 * Otherwise returns `false`.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     [`sloth`, `more sloth`, `even more sloth`],
 *     none(string => string.length > 8),
 *   ),
 * )
 * //=> false
 * ```
 */
export const none: Predicate

/**
 * Returns a promise that resolves to `true` if `fn` returns a falsy value or a
 * promise that resolves to a falsy value for all values of `asyncIterable`.
 * Otherwise returns a promise that resolves to `false`.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asAsync([`sloth`, `more sloth`, `even more sloth`]),
 *     noneAsync(string => string.length > 8),
 *   ),
 * )
 * //=> false
 * ```
 */
export const noneAsync: PredicateAsync

/**
 * Returns a promise that resolves to `true` if `fn` returns a falsy value or a
 * promise that resolves to a falsy value for all values of `concurIterable`.
 * Otherwise returns a promise that resolves to `false`.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asConcur([`sloth`, `more sloth`, `even more sloth`]),
 *     noneConcur(string => string.length > 8),
 *   ),
 * )
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
 * console.log(
 *   pipe(
 *     [`sloth`, `more sloth`, `even more sloth`],
 *     includes(3),
 *   ),
 * )
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
 * console.log(
 *   await pipe(
 *     asAsync([`sloth`, `more sloth`, `even more sloth`]),
 *     includesAsync(3),
 *   ),
 * )
 * //=> true
 * ```
 */
export const includesAsync: {
  (
    searchElement: unknown,
  ): <Value>(asyncIterable: AsyncIterable<Value>) => Promise<boolean>
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
 * console.log(
 *   await pipe(
 *     asConcur([`sloth`, `more sloth`, `even more sloth`]),
 *     includesConcur(3),
 *   ),
 * )
 * //=> true
 * ```
 */
export const includesConcur: {
  (
    searchElement: unknown,
  ): <Value>(concurIterable: ConcurIterable<Value>) => Promise<boolean>
  <Value>(
    searchElement: unknown,
    concurIterable: ConcurIterable<Value>,
  ): Promise<boolean>
}
