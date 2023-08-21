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
import type { AsyncOptional, ConcurOptional, Optional } from './optional.js'

/** @internal */
type Find = {
  <Value>(fn: (value: Value) => boolean | unknown): (
    iterable: Iterable<Value>,
  ) => Optional<Value>
  <Value>(
    fn: (value: Value) => boolean | unknown,
    iterable: Iterable<Value>,
  ): Optional<Value>
}

/** @internal */
type FindAsync = {
  <Value>(fn: (value: Value) => MaybePromiseLike<boolean | unknown>): (
    asyncIterable: AsyncIterable<Value>,
  ) => AsyncOptional<Value>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<boolean | unknown>,
    asyncIterable: AsyncIterable<Value>,
  ): AsyncOptional<Value>
}

/** @internal */
type FindConcur = {
  <Value>(fn: (value: Value) => MaybePromiseLike<boolean | unknown>): (
    concurIterable: ConcurIterable<Value>,
  ) => ConcurOptional<Value>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<boolean | unknown>,
    concurIterable: ConcurIterable<Value>,
  ): ConcurOptional<Value>
}

/**
 * Returns an iterable containing the first value of `iterable` for which `fn`
 * returns a truthy value. Otherwise, returns an empty iterable.
 *
 * Like `Array.prototype.find`, but for iterables.
 *
 * @example
 * ```js
 * const iterable = [1, 2, `sloth`, 4, `other string`]
 *
 * console.log(
 *   pipe(
 *     iterable,
 *     find(value => typeof value === `string`),
 *     or(() => `yawn!`),
 *   )
 * )
 * //=> sloth
 *
 * console.log(
 *   pipe(
 *     iterable,
 *     find(value => Array.isArray(value)),
 *     or(() => `yawn!`),
 *   )
 * )
 * //=> yawn!
 * ```
 */
export const find: Find

/**
 * Returns an async iterable containing the first value of `asyncIterable` for
 * which `fn` returns a value awaitable to a truthy value. Otherwise, returns an
 * empty async iterable.
 *
 * Like `Array.prototype.find`, but for async iterables.
 *
 * @example
 * ```js
 * const asyncIterable = asAsync([1, 2, `sloth`, 4, `other string`])
 *
 * console.log(
 *   await pipe(
 *     asyncIterable,
 *     findAsync(value => typeof value === `string`),
 *     orAsync(() => `yawn!`),
 *   )
 * )
 * //=> sloth
 *
 * console.log(
 *   await pipe(
 *     asyncIterable,
 *     findAsync(value => Array.isArray(value)),
 *     orAsync(() => `yawn!`),
 *   )
 * )
 * //=> yawn!
 * ```
 */
export const findAsync: FindAsync

/**
 * Returns a concur iterable containing the first value of `concurIterable` for
 * which `fn` returns a value awaitable to a truthy value. Otherwise, returns an
 * empty concur iterable.
 *
 * Like `Array.prototype.find`, but for concur iterables.
 *
 * @example
 * ```js
 * const concurIterable = asConcur([1, 2, `sloth`, 4, `other string`])
 *
 * console.log(
 *   await pipe(
 *     concurIterable,
 *     findConcur(value => typeof value === `string`),
 *     orConcur(() => `yawn`),
 *   ),
 * )
 * //=> sloth
 *
 * console.log(
 *   await pipe(
 *     concurIterable,
 *     findConcur(value => Array.isArray(value)),
 *     orConcur(() => `yawn`),
 *   ),
 * )
 * //=> yawn!
 * ```
 */
export const findConcur: FindConcur

/**
 * Returns an iterable containing the last value of `iterable` for which `fn`
 * returns a truthy value. Otherwise, returns an empty iterable.
 *
 * @example
 * ```js
 * const iterable = [1, 2, `sloth`, 4, `other string`]
 *
 * console.log(
 *   pipe(
 *     iterable,
 *     findLast(value => typeof value === `string`),
 *     or(() => `yawn!`),
 *   ),
 * )
 * //=> other string
 *
 * console.log(
 *   pipe(
 *     iterable,
 *     findLast(value => Array.isArray(value)),
 *     or(() => `yawn!`),
 *   ),
 * )
 * //=> yawn!
 * ```
 */
export const findLast: Find

/**
 * Returns an async iterable containing the last value of `asyncIterable` for
 * which `fn` returns a value awaitable to a truthy value. Otherwise, returns an
 * empty async iterable.
 *
 * @example
 * ```js
 * const asyncIterable = asAsync([1, 2, `sloth`, 4, `other string`])
 *
 * console.log(
 *   await pipe(
 *     asyncIterable,
 *     findLastAsync(value => typeof value === `string`),
 *     orAsync(() => `yawn!`),
 *   ),
 * )
 * //=> other string
 *
 * console.log(
 *   await pipe(
 *     asyncIterable,
 *     findLastAsync(value => Array.isArray(value)),
 *     orAsync(() => `yawn!`),
 *   ),
 * )
 * //=> yawn!
 * ```
 */
export const findLastAsync: FindAsync

/**
 * Returns a concur iterable containing the last value of `concurIterable` for
 * which `fn` returns a value awaitable to a truthy value. Otherwise, returns an
 * empty concur iterable.
 *
 * @example
 * ```js
 * const concurIterable = asConcur([1, 2, `sloth`, 4, `other string`])
 *
 * console.log(
 *   await pipe(
 *     concurIterable,
 *     findLastConcur(value => typeof value === `string`),
 *     orConcur(() => `yawn!`),
 *   ),
 * )
 * //=> other string
 *
 * console.log(
 *   await pipe(
 *     concurIterable,
 *     findLastConcur(value => Array.isArray(value)),
 *     orConcur(() => `yawn!`),
 *   ),
 * )
 * //=> yawn!
 * ```
 */
export const findLastConcur: FindConcur
