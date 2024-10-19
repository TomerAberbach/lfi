import { fc } from '@fast-check/vitest'
import { expect } from 'vitest'
import {
  mapAsyncReducer,
  mapReducer,
  normalizeReducer,
} from '../../src/index.js'
import { asyncFnArb, fnArb } from '../helpers/fast-check/fn.js'
import {
  asyncFunctionReducerArb,
  functionReducerArb,
  rawAsyncReducerWithFinishArb,
  rawOptionalReducerWithFinishArb,
  rawOptionalReducerWithoutFinishArb,
  rawReducerWithFinishArb,
  rawReducerWithoutFinishArb,
} from '../helpers/fast-check/reducer.js'
import { test } from '../helpers/fast-check/test-prop.js'

test.prop([functionReducerArb, fc.anything(), fc.anything()])(
  `normalizeReducer normalizes a function reducer`,
  (reducer, value1, value2) => {
    const { add, finish } = normalizeReducer(reducer)

    expect(add(value1, value2)).toBe(reducer(value1, value2))
    expect(finish(value1)).toBe(value1)
  },
)

test.prop([rawOptionalReducerWithoutFinishArb, fc.anything(), fc.anything()])(
  `normalizeReducer normalizes a raw optional reducer without finish`,
  (reducer, value1, value2) => {
    const { add, finish } = normalizeReducer(reducer)

    expect(add(value1, value2)).toBe(reducer.add(value1, value2))
    expect(finish(value1)).toBe(value1)
    expect(finish(value2)).toBe(value2)
  },
)

test.prop([rawOptionalReducerWithFinishArb, fc.anything(), fc.anything()])(
  `normalizeReducer normalizes a raw optional reducer with finish`,
  (reducer, value1, value2) => {
    const { add, finish } = normalizeReducer(reducer)

    expect(add(value1, value2)).toBe(reducer.add(value1, value2))
    expect(finish(value1)).toBe(reducer.finish(value1))
    expect(finish(value2)).toBe(reducer.finish(value2))
  },
)

test.prop([rawReducerWithoutFinishArb, fc.anything(), fc.anything()])(
  `normalizeReducer normalizes a raw reducer without finish`,
  (reducer, value1, value2) => {
    const { create, add, finish } = normalizeReducer(reducer)

    expect(create()).toBe(reducer.create())
    expect(add(value1, value2)).toBe(reducer.add(value1, value2))
    expect(finish(value1)).toBe(value1)
    expect(finish(value2)).toBe(value2)
  },
)

test.prop([rawReducerWithFinishArb, fc.anything(), fc.anything()])(
  `normalizeReducer normalizes a raw reducer with finish`,
  (reducer, value1, value2) => {
    const { create, add, finish } = normalizeReducer(reducer)

    expect(create()).toBe(reducer.create())
    expect(add(value1, value2)).toBe(reducer.add(value1, value2))
    expect(finish(value1)).toBe(reducer.finish(value1))
    expect(finish(value2)).toBe(reducer.finish(value2))
  },
)

test.prop([fnArb, functionReducerArb, fc.anything()])(
  `mapReducer maps the given function reducer using the finish method`,
  (fn, reducer, value) => {
    const { finish } = mapReducer(fn, reducer)

    expect(finish(value)).toBe(fn(value))
  },
)

test.prop([fnArb, rawReducerWithFinishArb, fc.anything()])(
  `mapReducer maps the given reducer with finish using the finish method`,
  (fn, reducer, value) => {
    const { finish } = mapReducer(fn, reducer)

    expect(finish(value)).toBe(fn(reducer.finish(value)))
  },
)

test.prop([asyncFnArb, asyncFunctionReducerArb, fc.anything()])(
  `mapAsyncReducer maps the given async function reducer using the finish method`,
  async ({ asyncFn, syncFn }, { asyncFunctionReducer }, value) => {
    const { finish } = mapAsyncReducer(asyncFn, asyncFunctionReducer)

    await expect(finish(value)).resolves.toBe(syncFn(value))
  },
)

test.prop([asyncFnArb, rawAsyncReducerWithFinishArb, fc.anything()])(
  `mapAsyncReducer maps the given async reducer with finish using the finish method`,
  async ({ asyncFn, syncFn }, { asyncReducer, syncReducer }, value) => {
    const mappedReducer = mapAsyncReducer(asyncFn, asyncReducer)

    await expect(mappedReducer.finish(value)).resolves.toBe(
      syncFn(syncReducer.finish(value)),
    )
  },
)
