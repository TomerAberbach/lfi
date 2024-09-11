import { expectTypeOf, fc, testProp } from 'tomer'
import { entries, keys, values } from '../../src/index.js'

const objectArb = fc.dictionary(fc.string(), fc.anything())
const mapArb = fc
  .array(fc.tuple(fc.anything(), fc.anything()))
  .map(values => new Map(values))
const setArb = fc.array(fc.anything()).map(values => new Set(values))

test.skip(`keys types are correct`, () => {
  const numberKeyObject: Record<number, number> = { 1: 2, 2: 3 }
  expectTypeOf([...keys(numberKeyObject)]).toMatchTypeOf<number[]>()

  const stringKeyObject: Record<string, number> = { a: 2, b: 3 }
  expectTypeOf([...keys(stringKeyObject)]).toMatchTypeOf<string[]>()

  expectTypeOf([
    ...keys(
      new Map([
        [1, 2],
        [3, 4],
      ]),
    ),
  ]).toMatchTypeOf<number[]>()
})

testProp(`keys returns a pure iterable for an object`, [objectArb], object => {
  const iterable = keys(object)

  expect(iterable).toBeIterable()
})

testProp(
  `keys returns an iterable containing the keys of the given object`,
  [objectArb],
  object => {
    const iterable = keys(object)

    expect([...iterable]).toStrictEqual(Object.keys(object))
  },
)

testProp(`keys returns a pure iterable for a map`, [mapArb], map => {
  const iterable = keys(map)

  expect(iterable).toBeIterable()
})

testProp(
  `keys returns an iterable containing the keys of the given map`,
  [mapArb],
  map => {
    const iterable = keys(map)

    expect([...iterable]).toStrictEqual([...map.keys()])
  },
)

test.skip(`values types are correct`, () => {
  const object: Record<string, number> = { a: 2, b: 3 }
  expectTypeOf([...values(object)]).toMatchTypeOf<number[]>()

  expectTypeOf([
    ...values(
      new Map([
        [`a`, 2],
        [`b`, 4],
      ]),
    ),
  ]).toMatchTypeOf<number[]>()
  expectTypeOf([...values(new Set([1, 2]))]).toMatchTypeOf<number[]>()
})

testProp(
  `values returns a pure iterable for an object`,
  [objectArb],
  object => {
    const iterable = values(object)

    expect(iterable).toBeIterable()
  },
)

testProp(
  `values returns an iterable containing the values of the given object`,
  [objectArb],
  object => {
    const iterable = values(object)

    expect([...iterable]).toStrictEqual(Object.values(object))
  },
)

testProp(
  `values returns a pure iterable for a map or set`,
  [fc.oneof(mapArb, setArb)],
  object => {
    const iterable = values(object)

    expect(iterable).toBeIterable()
  },
)

testProp(
  `values returns an iterable containing the values of the given map or set`,
  [fc.oneof(mapArb, setArb)],
  object => {
    const iterable = values(object)

    expect([...iterable]).toStrictEqual([...object.values()])
  },
)

test.skip(`entries types are correct`, () => {
  const numberKeyObject: Record<number, number> = { 1: 2, 2: 3 }
  expectTypeOf([...entries(numberKeyObject)]).toMatchTypeOf<
    [number, number][]
  >()

  const stringKeyObject: Record<string, number> = { a: 2, b: 3 }
  expectTypeOf([...entries(stringKeyObject)]).toMatchTypeOf<
    [string, number][]
  >()

  expectTypeOf([
    ...entries(
      new Map([
        [1, 2],
        [3, 4],
      ]),
    ),
  ]).toMatchTypeOf<[number, number][]>()
})

testProp(
  `entries returns a pure iterable for an object`,
  [objectArb],
  object => {
    const iterable = entries(object)

    expect(iterable).toBeIterable()
  },
)

testProp(
  `entries returns an iterable containing the entries of the given object`,
  [objectArb],
  object => {
    const iterable = entries(object)

    expect([...iterable]).toStrictEqual(Object.entries(object))
  },
)

testProp(`entries returns a pure iterable for a map`, [mapArb], map => {
  const iterable = entries(map)

  expect(iterable).toBeIterable()
})

testProp(
  `entries returns an iterable containing the entries of the given map`,
  [mapArb],
  map => {
    const iterable = entries(map)

    expect([...iterable]).toStrictEqual([...map.entries()])
  },
)
