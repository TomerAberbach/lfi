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
 * Returns the only value in `iterable` if it contains exactly one value.
 * Otherwise, returns the result of invoking `fn`.
 *
 * @example
 * ```js
 * console.log(or(() => `Never called!`, [`sloth`]))
 * //=> sloth
 *
 * console.log(or(() => `I get called!`, []))
 * //=> I get called!
 *
 * console.log(or(() => `I also get called!`, [1, `sloth`, 3]))
 * //=> I also get called!
 * ```
 */
export const or: {
  <Value>(fn: () => Value): (iterable: Iterable<Value>) => Value
  <Value>(fn: () => Value, iterable: Iterable<Value>): Value
}

/**
 * Returns a promise that resolves to the only value in `asyncIterable` if it
 * contains exactly one value. Otherwise, returns a promise that resolves to
 * the awaited result of invoking `fn`.
 *
 * @example
 * ```js
 * console.log(await orAsync(() => `Never called!`, asAsync([`sloth`])))
 * //=> sloth
 *
 * console.log(await orAsync(() => `I get called!`, asAsync([])))
 * //=> I get called!
 *
 * console.log(
 *   await orAsync(() => `I also get called!`, asAsync([1, `sloth`, 3]))
 * )
 * //=> I also get called!
 * ```
 */
export const orAsync: {
  <Value>(fn: () => MaybePromiseLike<Value>): (
    asyncIterable: AsyncIterable<Value>,
  ) => Promise<Value>
  <Value>(
    fn: () => MaybePromiseLike<Value>,
    asyncIterable: AsyncIterable<Value>,
  ): Promise<Value>
}

/**
 * Returns a promise that resolves to the only value in `concurIterable` if it
 * contains exactly one value. Otherwise, returns a promise that resolves to
 * the awaited result of invoking `fn`.
 *
 * @example
 * ```js
 * console.log(await orConcur(() => `Never called!`, asConcur([`sloth`])))
 * //=> sloth
 *
 * console.log(await orConcur(() => `I get called!`, asConcur([])))
 * //=> I get called!
 *
 * console.log(
 *   await orConcur(() => `I also get called!`, asConcur([1, `sloth`, 3]))
 * )
 * //=> I also get called!
 * ```
 */
export const orConcur: {
  <Value>(fn: () => MaybePromiseLike<Value>): (
    concurIterable: ConcurIterable<Value>,
  ) => Promise<Value>
  <Value>(
    fn: () => MaybePromiseLike<Value>,
    concurIterable: ConcurIterable<Value>,
  ): Promise<Value>
}

/**
 * Returns the only value in `iterable` if it contains exactly one value.
 * Otherwise, throws an error.
 *
 * @example
 * ```js
 * console.log(get([`sloth`]))
 * //=> sloth
 *
 * try {
 *   console.log(get([]))
 * } catch {
 *   console.log(`Oh no! It was empty...`)
 * }
 * //=> Oh no! It was empty...
 *
 * try {
 *   console.log(get([1, `sloth`, 3]))
 * } catch {
 *   console.log(`Oh no! It had more than one value...`)
 * }
 * //=> Oh no! It had more than one value...
 * ```
 */
export const get: <Value>(iterable: Iterable<Value>) => Value

/**
 * Returns a promise that resolves to the only value in `asyncIterable` if it
 * contains exactly one value. Otherwise, returns a promise that rejects.
 *
 * @example
 * ```js
 * console.log(await getAsync(asAsync([`sloth`])))
 * //=> sloth
 *
 * try {
 *   console.log(await getAsync(asAsync([])))
 * } catch {
 *   console.log(`Oh no! It was empty...`)
 * }
 * //=> Oh no! It was empty...
 *
 * try {
 *   console.log(await getAsync(asAsync([1, `sloth`, 3])))
 * } catch {
 *   console.log(`Oh no! It had more than one value...`)
 * }
 * //=> Oh no! It had more than one value...
 * ```
 */
export const getAsync: <Value>(
  asyncIterable: AsyncIterable<Value>,
) => Promise<Value>

/**
 * Returns a promise that resolves to the only value in `concurIterable` if it
 * contains exactly one value. Otherwise, returns a promise that rejects.
 *
 * @example
 * ```js
 * console.log(await getConcur(asConcur([`sloth`])))
 * //=> sloth
 *
 * try {
 *   console.log(await getConcur(asConcur([])))
 * } catch {
 *   console.log(`Oh no! It was empty...`)
 * }
 * //=> Oh no! It was empty...
 *
 * try {
 *   console.log(await getConcur(asConcur([1, `sloth`, 3])))
 * } catch {
 *   console.log(`Oh no! It had more than one value...`)
 * }
 * //=> Oh no! It had more than one value...
 * ```
 */
export const getConcur: <Value>(
  concurIterable: ConcurIterable<Value>,
) => Promise<Value>

/**
 * Returns a pair of iterables. If `iterable` is empty, then both of the
 * returned iterables are empty. Otherwise, the first iterable contains the
 * first value of `iterable` and the second iterable contains the rest of the
 * values of `iterable`. The second iterable can only be iterated once.
 *
 * @example
 * ```js
 * const slothActivities = [`sleeping`, `yawning`, `eating`]
 * const [first, rest] = next(slothActivities)
 *
 * console.log(get(first))
 * //=> sleeping
 *
 * console.log([...rest])
 * //=> [ 'yawning', 'eating' ]
 *
 * const badThingsAboutSloths = []
 * const [first, rest] = next(badThingsAboutSloths)
 *
 * console.log(count(first))
 * //=> 0
 *
 * console.log(count(rest))
 * //=> 0
 * ```
 */
export const next: <Value>(
  iterable: Iterable<Value>,
) => [Iterable<Value>, Iterable<Value>]

/**
 * Returns a promise that resolves to a pair of async iterables. If
 * `asyncIterable` is empty, then both of the returned async iterables are
 * empty. Otherwise, the first async iterable contains the first value of
 * `asyncIterable` and the second async iterable contains the rest of the values
 * of `asyncIterable`. The second async iterable can only be iterated once.
 *
 * @example
 * ```js
 * const slothActivities = asAsync([`sleeping`, `yawning`, `eating`])
 * const [first, rest] = await nextAsync(slothActivities)
 *
 * console.log(await getAsync(first))
 * //=> sleeping
 *
 * console.log(await collectAsync(toArray, rest))
 * //=> [ 'yawning', 'eating' ]
 *
 * const badThingsAboutSloths = asAsync([])
 * const [first, rest] = await nextAsync(badThingsAboutSloths)
 *
 * console.log(await countAsync(first))
 * //=> 0
 *
 * console.log(await countAsync(rest))
 * //=> 0
 * ```
 */
export const nextAsync: <Value>(
  asyncIterable: AsyncIterable<Value>,
) => Promise<[AsyncIterable<Value>, AsyncIterable<Value>]>
