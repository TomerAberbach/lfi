import { associateTo } from '../src/index.js'
import { fc, testProp } from 'ava-fast-check'
import { fnArb, iterableArb } from './helpers.js'

testProp(
  `associateTo returns the given map`,
  [fnArb({ valueArb: fc.tuple(fc.string(), fc.anything()) }), iterableArb()],
  (t, fn, iterable) => {
    const map = new Map()

    const returned = associateTo(fn, map, iterable)

    t.is(returned, map)
  }
)
