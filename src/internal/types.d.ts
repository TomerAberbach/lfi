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
