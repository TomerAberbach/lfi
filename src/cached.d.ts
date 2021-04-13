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

/**
 * Returns an iterable equivalent to `iterable` that iterates over `iterable` at
 * most once.
 *
 * @example
 * ```js
 * const iterable = [`sloth`, `more sloth`, `even more sloth`]
 * const iterableWithEffects = each(console.log, iterable)
 *
 * const cachedIterable = cached(iterableWithEffects)
 *
 * console.log([...cachedIterable])
 * //=> sloth
 * //=> more sloth
 * //=> even more sloth
 * //=> [ 'sloth', 'more sloth', 'even more sloth' ]
 *
 * console.log([...cachedIterable])
 * //=> [ 'sloth', 'more sloth', 'even more sloth' ]
 * ```
 */
export const cached: <Value>(iterable: Iterable<Value>) => Iterable<Value>

/**
 * Returns an async iterable equivalent to `asyncIterable` that iterates over
 * `asyncIterable` at most once.
 *
 * @example
 * ```js
 * const asyncIterable = asAsync([`sloth`, `more sloth`, `even more sloth`])
 * const asyncIterableWithEffects = eachAsync(console.log, asyncIterable)
 *
 * const cachedAsyncIterable = cachedAsync(asyncIterableWithEffects)
 *
 * console.log(await collectAsync(toArray, cachedAsyncIterable))
 * //=> sloth
 * //=> more sloth
 * //=> even more sloth
 * //=> [ 'sloth', 'more sloth', 'even more sloth' ]
 *
 * console.log(await collectAsync(toArray, cachedAsyncIterable))
 * //=> [ 'sloth', 'more sloth', 'even more sloth' ]
 * ```
 */
export const cachedAsync: <Value>(
  asyncIterable: AsyncIterable<Value>
) => AsyncIterable<Value>

/**
 * Returns a concur iterable equivalent to `concurIterable` that iterates over
 * `concurIterable` at most once.
 *
 * @example
 * ```js
 * const concurIterable = asConcur([`sloth`, `more sloth`, `even more sloth`])
 * const concurIterableWithEffects = eachConcur(console.log, concurIterable)
 *
 * const cachedConcurIterable = cachedConcur(concurIterableWithEffects)
 *
 * console.log(await collectConcur(toArray, cachedConcurIterable))
 * //=> sloth
 * //=> more sloth
 * //=> even more sloth
 * //=> [ 'sloth', 'more sloth', 'even more sloth' ] (not necessarily in this order)
 *
 * console.log(await collectConcur(toArray, cachedConcurIterable))
 * //=> [ 'sloth', 'more sloth', 'even more sloth' ] (not necessarily in this order)
 * ```
 */
export const cachedConcur: <Value>(
  concurIterable: ConcurIterable<Value>
) => ConcurIterable<Value>
