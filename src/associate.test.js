import { associateTo } from './associate.js'
import { fc, testProp } from 'ava-fast-check'

testProp(
  `associateTo returns the given map`,
  [fc.array(fc.anything()), fc.func(fc.tuple(fc.string(), fc.anything()))],
  (t, array, fn) => {
    const map = new Map()

    t.is(associateTo(fn, map, array), map)
  }
)
