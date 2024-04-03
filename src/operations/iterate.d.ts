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

/**
 * Returns an iterable equivalent to `iterable` that applies `fn` to each value
 * of `iterable` as it is iterated.
 *
 * @example
 * ```js
 * const sloths = [`carl`, `frank`, `phil`]
 *
 * console.log([...each(console.log, sloths)])
 * //=> carl
 * //=> frank
 * //=> phil
 * //=> [ 'carl', 'frank', 'phil' ]
 * ```
 */
export const each: {
  <From, To extends From>(
    fn: (value: From) => asserts value is To,
  ): (iterable: Iterable<From>) => Iterable<To>
  <From, To extends From>(
    fn: (value: From) => asserts value is To,
    iterable: Iterable<From>,
  ): Iterable<To>

  <Value>(
    fn: (value: Value) => unknown,
  ): (iterable: Iterable<Value>) => Iterable<Value>
  <Value>(
    fn: (value: Value) => unknown,
    iterable: Iterable<Value>,
  ): Iterable<Value>
}

/**
 * Returns an async iterable equivalent to `asyncIterable` that applies `fn` to
 * each value of `asyncIterable` as it is iterated.
 *
 * The result of applying `fn` to a value is awaited before yielding and then
 * moving on to the next value.
 *
 * @example
 * ```js
 * const eachedSloths = await pipe(
 *   asAsync([`carl`, `frank`, `phil`]),
 *   eachAsync(console.log),
 *   reduceAsync(toArray()),
 * )
 * //=> carl
 * //=> frank
 * //=> phil
 *
 * console.log(eachedSloths)
 * //=> [ 'carl', 'frank', 'phil' ]
 * ```
 */
export const eachAsync: {
  <Value>(
    fn: (value: Value) => PromiseLike<unknown>,
  ): (asyncIterable: AsyncIterable<Value>) => AsyncIterable<Value>
  <Value>(
    fn: (value: Value) => PromiseLike<unknown>,
    asyncIterable: AsyncIterable<Value>,
  ): AsyncIterable<Value>

  <From, To extends From>(
    fn: (value: From) => asserts value is To,
  ): (asyncIterable: AsyncIterable<From>) => AsyncIterable<To>
  <From, To extends From>(
    fn: (value: From) => asserts value is To,
    asyncIterable: AsyncIterable<From>,
  ): AsyncIterable<To>
}

/**
 * Returns an concur iterable equivalent to `concurIterable` that applies `fn`
 * to each value of `concurIterable` as it is iterated.
 *
 * The result of applying `fn` to a value is awaited before yielding.
 *
 * @example
 * ```js
 * const eachedSloths = await pipe(
 *   asConcur([`carl`, `frank`, `phil`]),
 *   eachConcur(console.log),
 *   reduceConcur(toArray()),
 * )
 * //=> carl
 * //=> frank
 * //=> phil
 *
 * console.log(eachedSloths)
 * //=> [ 'carl', 'frank', 'phil' ]
 * ```
 */
export const eachConcur: {
  <Value>(
    fn: (value: Value) => PromiseLike<unknown>,
  ): (concurIterable: ConcurIterable<Value>) => ConcurIterable<Value>
  <Value>(
    fn: (value: Value) => PromiseLike<unknown>,
    concurIterable: ConcurIterable<Value>,
  ): ConcurIterable<Value>

  <From, To extends From>(
    fn: (value: From) => asserts value is To,
  ): (concurIterable: ConcurIterable<From>) => ConcurIterable<To>
  <From, To extends From>(
    fn: (value: From) => asserts value is To,
    concurIterable: ConcurIterable<From>,
  ): ConcurIterable<To>
}

/**
 * Applies `fn` to each value of `iterable`.
 *
 * Like `Array.prototype.forEach`, but for iterables.
 *
 * @example
 * ```js
 * const sloths = [`carl`, `frank`, `phil`]
 *
 * forEach(console.log, sloths)
 * //=> carl
 * //=> frank
 * //=> phil
 * ```
 */
export const forEach: {
  <Value>(fn: (value: Value) => unknown): (iterable: Iterable<Value>) => void
  <Value>(fn: (value: Value) => unknown, iterable: Iterable<Value>): void
}

/**
 * Returns a promise that resolves when `fn` has been applied to each value of
 * `asyncIterable` and the result of each application has been awaited.
 *
 * The result of applying `fn` to a value is awaited before moving on to the
 * next value.
 *
 * Like `Array.prototype.forEach`, but for async iterables.
 *
 * @example
 * ```js
 * const sloths = asAsync([`carl`, `frank`, `phil`])
 *
 * await forEachAsync(console.log, sloths)
 * //=> carl
 * //=> frank
 * //=> phil
 * ```
 */
export const forEachAsync: {
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
  ): (asyncIterable: AsyncIterable<Value>) => Promise<void>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
    asyncIterable: AsyncIterable<Value>,
  ): Promise<void>
}

/**
 * Returns a promise that resolves when `fn` has been applied to each value of
 * `concurIterable` and the result of each application has been awaited.
 *
 * Like `Array.prototype.forEach`, but for concur iterables.
 *
 * @example
 * ```js
 * const sloths = asConcur([`carl`, `frank`, `phil`])
 *
 * await forEachConcur(console.log, sloths)
 * //=> carl
 * //=> frank
 * //=> phil
 * //
 * ```
 */
export const forEachConcur: {
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
  ): (concurIterable: ConcurIterable<Value>) => Promise<void>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
    concurIterable: ConcurIterable<Value>,
  ): Promise<void>
}

/**
 * Iterates through `iterable` causing lazy operations to run.
 *
 * @example
 * ```js
 * const iterable = pipe(
 *   [`sloth`, 2, 3],
 *   each(console.log),
 * )
 * // No output
 *
 * consume(iterable)
 * //=> sloth
 * //=> 2
 * //=> 3
 * ```
 */
export const consume: (iterable: Iterable<unknown>) => void

/**
 * Iterates through `asyncIterable` causing lazy operations to run.
 *
 * @example
 * ```js
 * const asyncIterable = pipe(
 *   asAsync([`sloth`, 2, 3]),
 *   eachAsync(console.log),
 * )
 * // No output
 *
 * await consumeAsync(asyncIterable)
 * //=> sloth
 * //=> 2
 * //=> 3
 * ```
 */
export const consumeAsync: (
  asyncIterable: AsyncIterable<unknown>,
) => Promise<void>

/**
 * Iterates through the `concurIterable` causing lazy operations to run.
 *
 * @example
 * ```js
 * const concurIterable = pipe(
 *   asConcur([`sloth`, 2, 3]),
 *   eachConcur(console.log),
 * )
 * // No output
 *
 * await consumeConcur(asyncIterable)
 * //=> sloth
 * //=> 2
 * //=> 3
 * ```
 */
export const consumeConcur: (
  concurIterable: ConcurIterable<unknown>,
) => Promise<void>
