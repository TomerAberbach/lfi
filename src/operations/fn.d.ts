/** @internal */
type Curried<Parameters extends readonly any[], Return> = <
  PartialParameters extends Partial<Parameters>,
>(
  ...args: PartialParameters
) => PartialParameters extends Parameters
  ? Return
  : Parameters extends readonly [
        ...TupleOfSameLength<PartialParameters>,
        ...infer RemainingParameters,
      ]
    ? RemainingParameters extends any[]
      ? Curried<RemainingParameters, Return>
      : never
    : never

/** @internal */
type TupleOfSameLength<Tuple extends readonly any[]> = Extract<
  { [Key in keyof Tuple]: any },
  readonly any[]
>

/**
 * Returns a curried version of `fn`.
 *
 * @example
 * ```js
 * function slothLog(a, b, c) {
 *   console.log(`${a} Sloth ${b} Sloth ${c}`)
 * }
 *
 * const curriedSlothLog = curry(slothLog)
 *
 * console.log(curriedSlothLog.name)
 * //=> slothLog
 *
 * console.log(curriedSlothLog.length)
 * //=> 3
 *
 * curriedSlothLog(`Hello`, `World`, `!`)
 * curriedSlothLog(`Hello`)(`World`, `!`)
 * curriedSlothLog(`Hello`, `World`)(`!`)
 * curriedSlothLog(`Hello`)(`World`)(`!`)
 * //=> Hello Sloth World Sloth !
 * //=> Hello Sloth World Sloth !
 * //=> Hello Sloth World Sloth !
 * //=> Hello Sloth World Sloth !
 * ```
 */
export const curry: <Parameters extends readonly any[], Return>(
  fn: (...args: Parameters) => Return,
) => Curried<Parameters, Return>

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
 *     array => array.join(` `),
 *   ),
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
    fn3: (c: C) => D,
  ): D
  <A, B, C, D, E>(
    value: A,
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E,
  ): E
  <A, B, C, D, E, F>(
    value: A,
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E,
    fn5: (e: E) => F,
  ): F
  <A, B, C, D, E, F, G>(
    value: A,
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E,
    fn5: (e: E) => F,
    fn6: (f: F) => G,
  ): G
  <A, B, C, D, E, F, G, H>(
    value: A,
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E,
    fn5: (e: E) => F,
    fn6: (f: F) => G,
    fn7: (g: G) => H,
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
    fn8: (h: H) => I,
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
    fn9: (i: I) => J,
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
 *   array => array.join(` `),
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
  <A, B, C, D>(
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
  ): (value: A) => D
  <A, B, C, D, E>(
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E,
  ): (value: A) => E
  <A, B, C, D, E, F>(
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E,
    fn5: (e: E) => F,
  ): (value: A) => F
  <A, B, C, D, E, F, G>(
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E,
    fn5: (e: E) => F,
    fn6: (f: F) => G,
  ): (value: A) => G
  <A, B, C, D, E, F, G, H>(
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E,
    fn5: (e: E) => F,
    fn6: (f: F) => G,
    fn7: (g: G) => H,
  ): (value: A) => H
  <A, B, C, D, E, F, G, H, I>(
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E,
    fn5: (e: E) => F,
    fn6: (f: F) => G,
    fn7: (g: G) => H,
    fn8: (h: H) => I,
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
    fn9: (i: I) => J,
  ): (value: A) => J
}
