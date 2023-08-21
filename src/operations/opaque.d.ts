/**
 * Copyright 2022 Google LLC
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
 * Returns an iterable equivalent, but not referentially equal, to `iterable`.
 */
export const opaque: <Value>(iterable: Iterable<Value>) => Iterable<Value>

/**
 * Returns an async iterable equivalent, but not referentially equal, to
 * `asyncIterable`.
 */
export const opaqueAsync: <Value>(
  asyncIterable: AsyncIterable<Value>,
) => AsyncIterable<Value>

/**
 * Returns an concur iterable equivalent, but not referentially equal, to
 * `concurIterable`.
 */
export const opaqueConcur: <Value>(
  concurIterable: ConcurIterable<Value>,
) => ConcurIterable<Value>
