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

/* eslint-disable typescript/no-explicit-any */

import type { ConcurIterable } from './as.js'

/**
 * An iterable that contains zero values.
 *
 * Can be used as an iterable of any type.
 *
 * Like `[]`, but opaque.
 *
 * @example
 * ```js
 * console.log([...empty])
 * //=> []
 * ```
 */
export const empty: Iterable<any>

/**
 * An async iterable that contains zero values.
 *
 * Can be used as an async iterable of any type.
 *
 * Like `[]`, but for async iterables.
 *
 * @example
 * ```js
 * console.log(await pipe(emptyAsync, reduceAsync(toArray())))
 * //=> []
 * ```
 */
export const emptyAsync: AsyncIterable<any>

/**
 * A concur iterable that contains zero values.
 *
 * Can be used as a concur iterable of any type.
 *
 * Like `[]`, but for concur iterables.
 *
 * @example
 * ```js
 * console.log(await pipe(emptyConcur, reduceConcur(toArray())))
 * //=> []
 * ```
 */
export const emptyConcur: ConcurIterable<any>
