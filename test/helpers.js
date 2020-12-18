import { fc, testProp } from 'ava-fast-check'
import { functionWithLength } from '../src/shared/function-with-length.js'

export const iterableArb = ({
  valueArb = fc.anything(),
  minLength,
  maxLength
} = {}) => {
  const arrayArb = fc.array(valueArb, { minLength, maxLength })

  return fc.oneof(
    arrayArb,
    fc
      .tuple(fc.object(), arrayArb)
      .map(([object, array]) => ({
        ...object,
        [Symbol.iterator]: array[Symbol.iterator]
      }))
  )
}

export const fnArb = ({ valueArb = fc.anything(), length } = {}) => {
  let arb = fc.func(valueArb)

  if (length != null) {
    arb = arb.map(fn => functionWithLength(fn, length))
  }

  return arb
}

export const testReturnsIterable = (fn, inputArbs) =>
  testProp(`${fn.name} returns an iterable`, inputArbs, (t, ...inputs) => {
    const returned = fn(...inputs)

    t.true(returned != null && typeof returned[Symbol.iterator] === `function`)
  })
