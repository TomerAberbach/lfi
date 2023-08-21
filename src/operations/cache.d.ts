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
import type { ConcurIterable } from './as.js'

/**
 * Returns an iterable equivalent to `iterable` that iterates over `iterable` at
 * most once.
 *
 * @example
 * ```js
 * const iterable = [`sloth`, `more sloth`, `even more sloth`]
 * const iterableWithEffects = each(console.log, iterable)
 *
 * const cachedIterable = cache(iterableWithEffects)
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
export const cache: <Value>(iterable: Iterable<Value>) => Iterable<Value>

/**
 * Returns an async iterable equivalent to `asyncIterable` that iterates over
 * `asyncIterable` at most once.
 *
 * @example
 * ```js
 * const asyncIterable = asAsync([`sloth`, `more sloth`, `even more sloth`])
 * const asyncIterableWithEffects = eachAsync(console.log, asyncIterable)
 *
 * const cachedAsyncIterable = cacheAsync(asyncIterableWithEffects)
 *
 * console.log(await pipe(cachedAsyncIterable, reduceAsync(toArray())))
 * //=> sloth
 * //=> more sloth
 * //=> even more sloth
 * //=> [ 'sloth', 'more sloth', 'even more sloth' ]
 *
 * console.log(await pipe(cachedAsyncIterable, reduceAsync(toArray())))
 * //=> [ 'sloth', 'more sloth', 'even more sloth' ]
 * ```
 */
export const cacheAsync: <Value>(
  asyncIterable: AsyncIterable<Value>,
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
 * const cachedConcurIterable = cacheConcur(concurIterableWithEffects)
 *
 * console.log(await pipe(cachedConcurIterable, reduceConcur(toArray())))
 * //=> sloth
 * //=> more sloth
 * //=> even more sloth
 * //=> [ 'sloth', 'more sloth', 'even more sloth' ]
 *
 * console.log(await pipe(cachedConcurIterable, reduceConcur(toArray())))
 * //=> [ 'sloth', 'more sloth', 'even more sloth' ]
 * ```
 */
export const cacheConcur: <Value>(
  concurIterable: ConcurIterable<Value>,
) => ConcurIterable<Value>
