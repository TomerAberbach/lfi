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
 * Returns the number of values in `iterable`.
 *
 * Like `Array.prototype.length`, but for iterables.
 *
 * @example
 * ```js
 * const iterable = [`sloth`, `more sloth`, `even more sloth`]
 *
 * console.log(count(iterable))
 * //=> 3
 * ```
 */
export const count: <Value>(iterable: Iterable<Value>) => number

/**
 * Returns a promise that resolves to the number of values in `asyncIterable`.
 *
 * Like `Array.prototype.length`, but for async iterables.
 *
 * @example
 * ```js
 * const asyncIterable = asAsync([`sloth`, `more sloth`, `even more sloth`])
 *
 * console.log(await countAsync(asyncIterable))
 * //=> 3
 * ```
 */
export const countAsync: <Value>(
  asyncIterable: AsyncIterable<Value>
) => Promise<number>

/**
 * Returns a promise that resolves to the number of values in `concurIterable`.
 *
 * Like `Array.prototype.length`, but for concur iterables.
 *
 * @example
 * ```js
 * const concurIterable = asConcur([`sloth`, `more sloth`, `even more sloth`])
 *
 * console.log(await countConcur(concurIterable))
 * //=> 3
 * ```
 */
export const countConcur: <Value>(
  concurIterable: ConcurIterable<Value>
) => Promise<number>
