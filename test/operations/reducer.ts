import { fc } from 'tomer'
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
import { testProp } from '../helpers/fast-check/test-prop.js'

testProp(
  `normalizeReducer normalizes a function reducer`,
  [functionReducerArb, fc.anything(), fc.anything()],
  (reducer, value1, value2) => {
    const { add, finish } = normalizeReducer(reducer)

    expect(add(value1, value2)).toBe(reducer(value1, value2))
    expect(finish(value1)).toBe(value1)
  },
)

testProp(
  `normalizeReducer normalizes a raw optional reducer without finish`,
  [rawOptionalReducerWithoutFinishArb, fc.anything(), fc.anything()],
  (reducer, value1, value2) => {
    const { add, finish } = normalizeReducer(reducer)

    expect(add(value1, value2)).toBe(reducer.add(value1, value2))
    expect(finish(value1)).toBe(value1)
    expect(finish(value2)).toBe(value2)
  },
)

testProp(
  `normalizeReducer normalizes a raw optional reducer with finish`,
  [rawOptionalReducerWithFinishArb, fc.anything(), fc.anything()],
  (reducer, value1, value2) => {
    const { add, finish } = normalizeReducer(reducer)

    expect(add(value1, value2)).toBe(reducer.add(value1, value2))
    expect(finish(value1)).toBe(reducer.finish(value1))
    expect(finish(value2)).toBe(reducer.finish(value2))
  },
)

testProp(
  `normalizeReducer normalizes a raw reducer without finish`,
  [rawReducerWithoutFinishArb, fc.anything(), fc.anything()],
  (reducer, value1, value2) => {
    const { create, add, finish } = normalizeReducer(reducer)

    expect(create()).toBe(reducer.create())
    expect(add(value1, value2)).toBe(reducer.add(value1, value2))
    expect(finish(value1)).toBe(value1)
    expect(finish(value2)).toBe(value2)
  },
)

testProp(
  `normalizeReducer normalizes a raw reducer with finish`,
  [rawReducerWithFinishArb, fc.anything(), fc.anything()],
  (reducer, value1, value2) => {
    const { create, add, finish } = normalizeReducer(reducer)

    expect(create()).toBe(reducer.create())
    expect(add(value1, value2)).toBe(reducer.add(value1, value2))
    expect(finish(value1)).toBe(reducer.finish(value1))
    expect(finish(value2)).toBe(reducer.finish(value2))
  },
)

testProp(
  `mapReducer maps the given function reducer using the finish method`,
  [fnArb, functionReducerArb, fc.anything()],
  (fn, reducer, value) => {
    const { finish } = mapReducer(fn, reducer)

    expect(finish(value)).toBe(fn(value))
  },
)

testProp(
  `mapReducer maps the given reducer with finish using the finish method`,
  [fnArb, rawReducerWithFinishArb, fc.anything()],
  (fn, reducer, value) => {
    const { finish } = mapReducer(fn, reducer)

    expect(finish(value)).toBe(fn(reducer.finish(value)))
  },
)

testProp(
  `mapAsyncReducer maps the given async function reducer using the finish method`,
  [asyncFnArb, asyncFunctionReducerArb, fc.anything()],
  async ({ asyncFn, syncFn }, { asyncFunctionReducer }, value) => {
    const { finish } = mapAsyncReducer(asyncFn, asyncFunctionReducer)

    expect(await finish(value)).toBe(syncFn(value))
  },
)

testProp(
  `mapAsyncReducer maps the given async reducer with finish using the finish method`,
  [asyncFnArb, rawAsyncReducerWithFinishArb, fc.anything()],
  async ({ asyncFn, syncFn }, { asyncReducer, syncReducer }, value) => {
    const mappedReducer = mapAsyncReducer(asyncFn, asyncReducer)

    expect(await mappedReducer.finish(value)).toBe(
      syncFn(syncReducer.finish(value)),
    )
  },
)
