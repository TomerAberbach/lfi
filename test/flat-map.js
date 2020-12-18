import { flatMap } from '../src/index.js'
import { fnArb, iterableArb, testReturnsIterable } from './helpers.js'
import { testProp } from 'ava-fast-check'

testReturnsIterable(flatMap, [
  fnArb({ valueArb: iterableArb() }),
  iterableArb()
])

testProp(
  `flatMap flat maps`,
  [fnArb({ valueArb: iterableArb() }), iterableArb()],
  (t, fn, iterable) => {
    t.deepEqual(
      [...flatMap(fn, iterable)],
      [...iterable].flatMap(value => [...fn(value)])
    )
  }
)
