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

/**
 * Represents a potentially lazy collection of values, each of type `Value`,
 * that can be iterated over concurrently.
 *
 * The collection can be iterated by invoking the concur iterable with an
 * `apply` callback. The callback is applied to each value in the collection,
 * potentially asynchronously, in some order.
 *
 * Invoking the concur iterable returns a promise that resolves when
 * `apply` has been applied to each value in the concur iterable and each
 * result returned by `apply` is awaited.
 *
 * It is kind of like an event emitter that accepts only one event handler and
 * returns a promise that resolves when all events have been emitted and
 * handled.
 *
 * @example
 * ```ts
 * const slothNamesConcurIterable: ConcurIterable<string> = pipe(
 *   asConcur(['sloth-names1.txt', 'sloth-names2.txt']),
 *   mapConcur(filename => fs.promises.readFile(filename, `utf8`)),
 *   flatMapConcur(content => content.split(`\n`))
 * )
 * ```
 */
export type ConcurIterable<Value> = (
  apply: (value: Value) => void | Promise<void>,
) => Promise<void>
