import { fc } from '@fast-check/vitest'
import type {
  AsyncFunctionReducer,
  FunctionReducer,
  RawAsyncOptionalReducerWithFinish,
  RawAsyncOptionalReducerWithoutFinish,
  RawAsyncReducerWithFinish,
  RawAsyncReducerWithoutFinish,
  RawOptionalReducerWithFinish,
  RawOptionalReducerWithoutFinish,
  RawReducerWithFinish,
  RawReducerWithoutFinish,
} from '../../../src/index.js'
import { NO_ENTRY } from '../../../src/index.js'
import type { GeneratedAsyncFn } from './fn.js'
import { asyncFnArb, fnArb } from './fn.js'

export const functionReducerArb = fnArb.map(
  fn =>
    (a: unknown, b: unknown): unknown =>
      fn(a, b),
)
export const rawOptionalReducerWithoutFinishArb = fnArb.map(
  add => new RawOptionalReducerWithoutFinishWithPrivateFields(add),
)
export const rawOptionalReducerWithFinishArb = fc
  .tuple(fnArb, fnArb)
  .map(
    ([add, finish]) =>
      new RawOptionalReducerWithFinishAndPrivateFields(add, finish),
  )
export const rawOptionalReducerArb = fc.oneof(
  rawOptionalReducerWithFinishArb,
  rawOptionalReducerWithoutFinishArb,
)
export const rawReducerWithoutFinishArb = fc
  .tuple(fnArb, fnArb)
  .map(
    ([create, add]) =>
      new RawReducerWithoutFinishWithPrivateFields(create, add),
  )
export const rawReducerWithFinishArb = fc
  .tuple(fnArb, fnArb, fnArb)
  .map(
    ([create, add, finish]) =>
      new RawReducerWithFinishAndPrivateFields(create, add, finish),
  )
export const rawReducerArb = fc.oneof(
  rawReducerWithFinishArb,
  rawReducerWithoutFinishArb,
)
export const rawKeyedReducer = fc
  .tuple(fnArb, fnArb, fc.func(fc.oneof(fc.anything(), fc.constant(NO_ENTRY))))
  .map(
    ([create, add, get]) =>
      new RawKeyedReducerWithPrivateFields(create, add, get),
  )

export const getAsyncFunctionReducerArb = <Value>(
  asyncFnArb: fc.Arbitrary<GeneratedAsyncFn<Value>>,
): fc.Arbitrary<GeneratedAsyncFunctionReducer<Value>> =>
  asyncFnArb.map(({ asyncFn, syncFn }) => ({
    asyncFunctionReducer: (acc: unknown, value: unknown) => asyncFn(acc, value),
    syncFunctionReducer: (acc: unknown, value: unknown) => syncFn(acc, value),
  }))

export type GeneratedAsyncFunctionReducer<Value = unknown> = {
  asyncFunctionReducer: AsyncFunctionReducer<Value>
  syncFunctionReducer: FunctionReducer<Value>
}

export const asyncFunctionReducerArb = getAsyncFunctionReducerArb(asyncFnArb)

export const getRawAsyncOptionalReducerWithoutFinishArb = <Value>(
  asyncFnArb: fc.Arbitrary<GeneratedAsyncFn<Value>>,
): fc.Arbitrary<GeneratedRawAsyncOptionalReducerWithoutFinish<Value>> =>
  asyncFnArb.map(add => ({
    asyncReducer: new RawOptionalReducerWithoutFinishWithPrivateFields(
      add.asyncFn,
    ),
    syncReducer: new RawOptionalReducerWithoutFinishWithPrivateFields(
      add.syncFn,
    ),
  }))

export type GeneratedRawAsyncOptionalReducerWithoutFinish<Value = unknown> = {
  asyncReducer: RawAsyncOptionalReducerWithoutFinish<Value>
  syncReducer: RawOptionalReducerWithoutFinish<Value>
}

export const rawAsyncOptionalReducerWithoutFinishArb =
  getRawAsyncOptionalReducerWithoutFinishArb(asyncFnArb)

// Used to ensure we call methods with the right `this`.
class RawOptionalReducerWithoutFinishWithPrivateFields<Value = unknown> {
  readonly #add: Fn<Value>

  public constructor(add: Fn<Value>) {
    this.#add = add
  }

  public add(a: unknown, b: unknown): Value {
    return this.#add(a, b)
  }
}

export const getRawAsyncOptionalReducerWithFinishArb = <Value>(
  asyncFnArb: fc.Arbitrary<GeneratedAsyncFn<Value>>,
): fc.Arbitrary<GeneratedRawAsyncOptionalReducerWithFinish<Value>> =>
  fc.tuple(asyncFnArb, asyncFnArb).map(([add, finish]) => ({
    asyncReducer: new RawOptionalReducerWithFinishAndPrivateFields(
      add.asyncFn,
      finish.asyncFn,
    ),
    syncReducer: new RawOptionalReducerWithFinishAndPrivateFields(
      add.syncFn,
      finish.syncFn,
    ),
  }))

export type GeneratedRawAsyncOptionalReducerWithFinish<Value = unknown> = {
  asyncReducer: RawAsyncOptionalReducerWithFinish<Value, Value>
  syncReducer: RawOptionalReducerWithFinish<Value, Value>
}

// Used to ensure we call methods with the right `this`.
class RawOptionalReducerWithFinishAndPrivateFields<
  Value = unknown,
> extends RawOptionalReducerWithoutFinishWithPrivateFields<Value> {
  readonly #finish: Fn<Value>

  public constructor(add: Fn<Value>, finish: Fn<Value>) {
    super(add)
    this.#finish = finish
  }

  public finish(acc: unknown): Value {
    return this.#finish(acc)
  }
}

export const rawAsyncOptionalReducerWithFinishArb =
  getRawAsyncOptionalReducerWithFinishArb(asyncFnArb)

export const getRawAsyncReducerWithoutFinishArb = <Value>(
  asyncFnArb: fc.Arbitrary<GeneratedAsyncFn<Value>>,
): fc.Arbitrary<GeneratedRawAsyncReducerWithoutFinish<Value>> =>
  fc.tuple(asyncFnArb, asyncFnArb).map(([create, add]) => ({
    asyncReducer: new RawReducerWithoutFinishWithPrivateFields(
      create.asyncFn,
      add.asyncFn,
    ),
    syncReducer: new RawReducerWithoutFinishWithPrivateFields(
      create.syncFn,
      add.syncFn,
    ),
  }))

export type GeneratedRawAsyncReducerWithoutFinish<Value = unknown> = {
  asyncReducer: RawAsyncReducerWithoutFinish<Value, Value>
  syncReducer: RawReducerWithoutFinish<Value, Value>
}

// Used to ensure we call methods with the right `this`.
class RawReducerWithoutFinishWithPrivateFields<
  Value = unknown,
> extends RawOptionalReducerWithoutFinishWithPrivateFields<Value> {
  readonly #create: Fn<Value>

  public constructor(create: Fn<Value>, add: Fn<Value>) {
    super(add)
    this.#create = create
  }

  public create(): Value {
    return this.#create()
  }
}

export const rawAsyncReducerWithoutFinishArb =
  getRawAsyncReducerWithoutFinishArb(asyncFnArb)

export const getRawAsyncReducerWithFinishArb = <Value>(
  asyncFnArb: fc.Arbitrary<GeneratedAsyncFn<Value>>,
): fc.Arbitrary<GeneratedRawAsyncReducerWithFinish<Value>> =>
  fc.tuple(asyncFnArb, asyncFnArb, asyncFnArb).map(([create, add, finish]) => ({
    asyncReducer: new RawReducerWithFinishAndPrivateFields(
      create.asyncFn,
      add.asyncFn,
      finish.asyncFn,
    ),
    syncReducer: new RawReducerWithFinishAndPrivateFields(
      create.syncFn,
      add.syncFn,
      finish.syncFn,
    ),
  }))

export type GeneratedRawAsyncReducerWithFinish<Value = unknown> = {
  asyncReducer: RawAsyncReducerWithFinish<Value, Value, Value>
  syncReducer: RawReducerWithFinish<Value, Value, Value>
}

// Used to ensure we call methods with the right `this`.
class RawReducerWithFinishAndPrivateFields<
  Value = unknown,
> extends RawOptionalReducerWithFinishAndPrivateFields<Value> {
  readonly #create: Fn<Value>

  public constructor(create: Fn<Value>, add: Fn<Value>, finish: Fn<Value>) {
    super(add, finish)
    this.#create = create
  }

  public create(): Value {
    return this.#create()
  }
}

// Used to ensure we call methods with the right `this`.
class RawKeyedReducerWithPrivateFields extends RawReducerWithoutFinishWithPrivateFields {
  readonly #get: Fn

  public constructor(create: Fn, add: Fn, get: Fn) {
    super(create, add)
    this.#get = get
  }

  public get(acc: unknown, key: unknown): unknown {
    return this.#get(acc, key)
  }
}

type Fn<Value = unknown> = (...args: unknown[]) => Value

export const rawAsyncReducerWithFinishArb =
  getRawAsyncReducerWithFinishArb(asyncFnArb)
