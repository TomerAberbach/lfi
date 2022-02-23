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

/** @internal */
type Curried<Parameters extends ReadonlyArray<any>, Return> = <
  PartialParameters extends Partial<Parameters>,
>(
  ...args: PartialParameters
) => PartialParameters extends Parameters
  ? Return
  : Parameters extends readonly [
      ...TupleOfSameLength<PartialParameters>,
      ...infer RemainingParameters
    ]
  ? RemainingParameters extends Array<any>
    ? Curried<RemainingParameters, Return>
    : never
  : never

/** @internal */
type TupleOfSameLength<Tuple extends ReadonlyArray<any>> = Extract<
  { [Key in keyof Tuple]: any },
  ReadonlyArray<any>
>

/**
 * Returns a curried version of `fn`.
 *
 * @example
 * ```
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
 * ```
 */
export const curry: <Parameters extends ReadonlyArray<any>, Return>(
  fn: (...args: Parameters) => Return,
) => Curried<Parameters, Return>
