import { associateTo } from './associate.js'
import { fc, testProp } from 'ava-fast-check'

testProp(
  `associateTo returns the given map`,
  [fc.array(fc.anything()), fc.func(fc.tuple(fc.string(), fc.anything()))],
  (t, array, fn) => {
    const map = new Map()

    t.is(associateTo(fn, { map, put: (m, k, v) => m.set(k, v) }, array), map)
  }
)

testProp(
  `associateTo calls the given put function for every result in the proper order`,
  [fc.array(fc.anything()), fc.func(fc.tuple(fc.string(), fc.anything()))],
  (t, array, fn) => {
    const expected = array.map(value => fn(value))
    const actual = associateTo(
      fn,
      {
        map: [],
        put: (map, k, v) => map.push([k, v])
      },
      array
    )

    t.deepEqual(actual, expected)
  }
)
