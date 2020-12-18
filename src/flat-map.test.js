import { fc, testProp } from 'ava-fast-check'
import { flatMap } from './flat-map.js'

testProp(
  `flatMap flat maps`,
  [fc.array(fc.anything()), fc.func(fc.array(fc.anything()))],
  (t, array, fn) => {
    t.deepEqual(
      [...flatMap(fn, array)],
      array.flatMap(value => fn(value))
    )
  }
)
