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
 * Returns the result of piping `value` through the given functions.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     `sloth`,
 *     name => `${name.toUpperCase()}!`,
 *     text => [text, text, text],
 *     array => array.join(` `)
 *   )
 * )
 * // => SLOTH! SLOTH! SLOTH!
 * ```
 */
export const pipe: {
  <Value>(value: Value): Value
  <A, B>(value: A, fn: (a: A) => B): B
  <A, B, C>(value: A, fn1: (a: A) => B, fn2: (b: B) => C): C
  <A, B, C, D>(
    value: A,
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D
  ): D
  <A, B, C, D, E>(
    value: A,
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E
  ): E
  <A, B, C, D, E, F>(
    value: A,
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E,
    fn5: (e: E) => F
  ): F
  <A, B, C, D, E, F, G>(
    value: A,
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E,
    fn5: (e: E) => F,
    fn6: (f: F) => G
  ): G
  <A, B, C, D, E, F, G, H>(
    value: A,
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E,
    fn5: (e: E) => F,
    fn6: (f: F) => G,
    fn7: (g: G) => H
  ): H
  <A, B, C, D, E, F, G, H, I>(
    value: A,
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E,
    fn5: (e: E) => F,
    fn6: (f: F) => G,
    fn7: (g: G) => H,
    fn8: (h: H) => I
  ): I
  <A, B, C, D, E, F, G, H, I, J>(
    value: A,
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E,
    fn5: (e: E) => F,
    fn6: (f: F) => G,
    fn7: (g: G) => H,
    fn8: (h: H) => I,
    fn9: (i: I) => J
  ): J
}

/**
 * Returns a function that takes a single parameter and pipes it through the
 * given functions.
 *
 * @example
 * ```js
 * const screamify = compose(
 *   name => `${name.toUpperCase()}!`,
 *   text => [text, text, text],
 *   array => array.join(` `)
 * )
 *
 * console.log(screamify(`sloth`))
 * // => SLOTH! SLOTH! SLOTH!
 * ```
 */
export const compose: {
  (): <Value>(value: Value) => Value
  <A, B>(fn: (a: A) => B): (value: A) => B
  <A, B, C>(fn1: (a: A) => B, fn2: (b: B) => C): (value: A) => C
  <A, B, C, D>(fn1: (a: A) => B, fn2: (b: B) => C, fn3: (c: C) => D): (
    value: A
  ) => D
  <A, B, C, D, E>(
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E
  ): (value: A) => E
  <A, B, C, D, E, F>(
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E,
    fn5: (e: E) => F
  ): (value: A) => F
  <A, B, C, D, E, F, G>(
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E,
    fn5: (e: E) => F,
    fn6: (f: F) => G
  ): (value: A) => G
  <A, B, C, D, E, F, G, H>(
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E,
    fn5: (e: E) => F,
    fn6: (f: F) => G,
    fn7: (g: G) => H
  ): (value: A) => H
  <A, B, C, D, E, F, G, H, I>(
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E,
    fn5: (e: E) => F,
    fn6: (f: F) => G,
    fn7: (g: G) => H,
    fn8: (h: H) => I
  ): (value: A) => I
  <A, B, C, D, E, F, G, H, I, J>(
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E,
    fn5: (e: E) => F,
    fn6: (f: F) => G,
    fn7: (g: G) => H,
    fn8: (h: H) => I,
    fn9: (i: I) => J
  ): (value: A) => J
}
