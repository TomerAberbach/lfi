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
 * Returns the result of concatenating the values of `iterable` to a string
 * where values are separated by `separator`.
 *
 * Like `Array.prototype.join`, but for iterables.
 *
 * @example
 * ```js
 * const iterable = [`sloth`, `more sloth`, `even more sloth`]
 *
 * console.log(join(`, `, iterable))
 * //=> sloth, more sloth, even more sloth
 * ```
 */
export const join: {
  (separator: string): (iterable: Iterable<unknown>) => string
  (separator: string, iterable: Iterable<unknown>): string
}

/**
 * Returns a promise that resolves to the result of concatenating the values of
 * `asyncIterable` to a string where values are separated by `separator`.
 *
 * Like `Array.prototype.join`, but for async iterables.
 *
 * @example
 * ```js
 * const asyncIterable = asAsync([`sloth`, `more sloth`, `even more sloth`])
 *
 * console.log(await joinAsync(`, `, asyncIterable))
 * //=> sloth, more sloth, even more sloth
 * ```
 */
export const joinAsync: {
  (separator: string): (
    asyncIterable: AsyncIterable<unknown>
  ) => Promise<string>
  (separator: string, asyncIterable: AsyncIterable<unknown>): Promise<string>
}

/**
 * Returns a promise that resolves to the result of concatenating the values of
 * `concurIterable` to a string where values are separated by `separator`.
 *
 * Like `Array.prototype.join`, but for concur iterables.
 *
 * @example
 * ```js
 * const concurIterable = asConcur([`sloth`, `more sloth`, `even more sloth`])
 *
 * console.log(await joinConcur(`, `, concurIterable))
 * //=> sloth, more sloth, even more sloth
 * // (not necessarily in this order)
 * ```
 */
export const joinConcur: {
  (separator: string): (
    concurIterable: ConcurIterable<unknown>
  ) => Promise<string>
  (separator: string, concurIterable: ConcurIterable<unknown>): Promise<string>
}
