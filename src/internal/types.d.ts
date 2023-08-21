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
export type MaybePromiseLike<Value> = Value | PromiseLike<Value>

/** @internal */
type StrictNegative<Numeric extends number> = Numeric extends 0
  ? never
  : `${Numeric}` extends `-${string}`
  ? Numeric
  : never

/** @internal */
type StrictPositive<Numeric extends number> = Numeric extends 0
  ? never
  : StrictNegative<Numeric> extends never
  ? Numeric
  : never

/** @internal */
type NonNegative<Numeric extends number> = Numeric extends 0
  ? Numeric
  : StrictNegative<Numeric> extends never
  ? Numeric
  : never

/** @internal */
type StrictInteger<Numeric extends number> = `${Numeric}` extends `${bigint}`
  ? Numeric
  : never

/** @internal */
type CheckNumericLiteral<
  Numeric extends number,
  LiteralNumber extends number,
> = number extends Numeric ? Numeric : LiteralNumber

/** @internal */
export type Integer<Numeric extends number> = CheckNumericLiteral<
  Numeric,
  StrictInteger<Numeric>
>

/** @internal */
export type NonNegativeInteger<Numeric extends number> = CheckNumericLiteral<
  Numeric,
  NonNegative<StrictInteger<Numeric>>
>

/** @internal */
export type PositiveInteger<Numeric extends number> = CheckNumericLiteral<
  Numeric,
  NonNegative<StrictInteger<Numeric>>
>
