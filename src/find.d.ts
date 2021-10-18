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

/** @internal */
type Find = {
  <Value>(fn: (value: Value) => boolean | unknown): (
    iterable: Iterable<Value>,
  ) => Iterable<Value>
  <Value>(
    fn: (value: Value) => boolean | unknown,
    iterable: Iterable<Value>,
  ): Iterable<Value>
}

/** @internal */
type FindAsync = {
  <Value>(fn: (value: Value) => MaybePromiseLike<boolean | unknown>): (
    asyncIterable: AsyncIterable<Value>,
  ) => AsyncIterable<Value>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<boolean | unknown>,
    asyncIterable: AsyncIterable<Value>,
  ): AsyncIterable<Value>
}

/** @internal */
type FindConcur = {
  <Value>(fn: (value: Value) => MaybePromiseLike<boolean | unknown>): (
    concurIterable: ConcurIterable<Value>,
  ) => ConcurIterable<Value>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<boolean | unknown>,
    concurIterable: ConcurIterable<Value>,
  ): ConcurIterable<Value>
}

/**
 * Return an iterable containing the first value of `iterable` for which `fn`
 * returns `true`. Otherwise, returns an empty iterable.
 *
 * Like `Array.prototype.find`, but for iterables.
 *
 * @example
 * ```js
 * const iterable = [1, 2, `sloth`, 4, `other string`]
 *
 * console.log(get(find(value => typeof value === `string`, iterable)))
 * //=> sloth
 *
 * console.log(count(find(value => Array.isArray(value), iterable)))
 * //=> 0
 * ```
 */
export const find: Find

/**
 * Return an async iterable containing the first value of `asyncIterable` for
 * which `fn` returns `true` or a promise that resolves to `true`. Otherwise,
 * returns an empty iterable.
 *
 * Like `Array.prototype.find`, but for async iterables.
 *
 * @example
 * ```js
 * const asyncIterable = asAsync([1, 2, `sloth`, 4, `other string`])
 *
 * console.log(
 *   await getAsync(
 *     findAsync(value => typeof value === `string`, asyncIterable)
 *   )
 * )
 * //=> sloth
 *
 * console.log(
 *   await countAsync(findAsync(value => Array.isArray(value), asyncIterable))
 * )
 * //=> 0
 * ```
 */
export const findAsync: FindAsync

/**
 * Returns a concur iterable containing the first value of `concurIterable` for
 * which `fn` returns `true` or a promise that resolves to `true`. Otherwise,
 * returns an empty concur iterable.
 *
 * Like `Array.prototype.find`, but for concur iterables.
 *
 * @example
 * ```js
 * const concurIterable = asConcur([1, 2, `sloth`, 4, `other string`])
 *
 * console.log(
 *   await getConcur(
 *     findConcur(value => typeof value === `string`, concurIterable)
 *   )
 * )
 * //=> sloth (but maybe 'other string' depending on ordering)
 *
 * console.log(
 *   await countConcur(
 *     findConcur(value => Array.isArray(value), concurIterable)
 *   )
 * )
 * //=> 0
 * ```
 */
export const findConcur: FindConcur

/**
 * Returns an iterable containing the last value of `iterable` for which `fn`
 * returns `true`. Otherwise, returns an empty iterable.
 *
 * @example
 * ```js
 * const iterable = [1, 2, `sloth`, 4, `other string`]
 *
 * console.log(get(findLast(value => typeof value === `string`, iterable)))
 * //=> other string
 *
 * console.log(count(findLast(value => Array.isArray(value), iterable)))
 * //=> 0
 * ```
 */
export const findLast: Find

/**
 * Returns an async iterable containing the last value of `asyncIterable` for
 * which `fn` returns `true` or a promise that resolves to `true`. Otherwise,
 * returns an empty async iterable.
 *
 * @example
 * ```js
 * const asyncIterable = asAsync([1, 2, `sloth`, 4, `other string`])
 *
 * console.log(
 *   await getAsync(
 *     findLastAsync(value => typeof value === `string`, asyncIterable)
 *   )
 * )
 * //=> other string
 *
 * console.log(
 *   await countAsync(
 *     findLastAsync(value => Array.isArray(value), asyncIterable)
 *   )
 * )
 * //=> 0
 * ```
 */
export const findLastAsync: FindAsync

/**
 * Returns a concur iterable containing the last value of `concurIterable` for
 * which `fn` returns `true` or a promise that resolves to `true`. Otherwise,
 * returns an empty concur iterable.
 *
 * @example
 * ```js
 * const concurIterable = asConcur([1, 2, `sloth`, 4, `other string`])
 *
 * console.log(
 *   await getConcur(
 *     findLastConcur(value => typeof value === `string`, concurIterable)
 *   )
 * )
 * //=> other string (but maybe 'sloth' depending on ordering)
 *
 * console.log(
 *   await countConcur(
 *     findLastConcur(value => Array.isArray(value), concurIterable)
 *   )
 * )
 * //=> 0
 * ```
 */
export const findLastConcur: FindConcur
