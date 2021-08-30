/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { fc } from 'ava-fast-check'
import { AsyncBetterator, Betterator } from 'betterator'
import {
  flatMap,
  flatMapAsync,
  flatMapConcur,
  flatten,
  flattenAsync,
  flattenConcur
} from '../src/flat-map.js'
import { map, mapAsync } from '../src/map.js'
import { collectAsync, collectConcur, toArray } from '../src/collect.js'
import { asAsync, asConcur } from '../src/as.js'
import {
  asyncIterableArb,
  concurIterableArb,
  getAsyncIterableArb,
  getConcurIterableArb,
  getFnArb,
  getIterableArb,
  getMaybeAsyncFnArb,
  iterableArb,
  nonEmptyConcurIterableArb
} from './helpers/arbs.js'
import { test, testProp } from './helpers/macros.js'

testProp(
  `flatMap returns an iterable`,
  [getFnArb(iterableArb), iterableArb],
  (t, fn, iterable) => {
    const flatMappedIterable = flatMap(fn, iterable)

    t.iterable(flatMappedIterable)
  }
)

testProp(
  `flatMap flat maps`,
  [getFnArb(iterableArb), iterableArb],
  (t, fn, iterable) => {
    const flatMappedIterable = flatMap(fn, iterable)

    t.deepEqual(
      [...flatMappedIterable],
      iterable.values.flatMap(value => [...fn(value)])
    )
  }
)

testProp(
  `flatMap is lazy`,
  [getFnArb(iterableArb), iterableArb],
  (t, fn, iterable) => {
    let count = 0

    const iterator = Betterator.fromIterable(
      flatMap(
        value =>
          map(innerValue => {
            count++
            return innerValue
          }, fn(value)),
        iterable
      )
    )

    t.is(count, 0)

    let i = 0
    while (iterator.hasNext()) {
      iterator.getNext()

      t.is(count, i + 1)

      i++
    }
  }
)

test(`flatMap concrete example`, t => {
  const iterable = [1, 2, 3, 4, 5]

  const flatMappedIterable = flatMap(
    value => [value / 2, value, value * 2],
    iterable
  )

  t.deepEqual(
    [...flatMappedIterable],
    [0.5, 1, 2, 1, 2, 4, 1.5, 3, 6, 2, 4, 8, 2.5, 5, 10]
  )
})

testProp(
  `flatMapAsync returns an async iterable`,
  [
    getMaybeAsyncFnArb(fc.oneof(iterableArb, asyncIterableArb)),
    asyncIterableArb
  ],
  async (t, fn, asyncIterable) => {
    const flatMappedAsyncIterable = flatMapAsync(fn, asyncIterable)

    await t.asyncIterable(flatMappedAsyncIterable)
  }
)

testProp(
  `flatMapAsync flat maps asynchronously`,
  [
    getMaybeAsyncFnArb(fc.oneof(iterableArb, asyncIterableArb)),
    asyncIterableArb
  ],
  async (t, fn, asyncIterable) => {
    const flatMappedAsyncIterable = flatMapAsync(fn, asyncIterable)

    t.deepEqual(
      await collectAsync(toArray, flatMappedAsyncIterable),
      asyncIterable.values.flatMap(value => fn.sync(value).values)
    )
  }
)

testProp(
  `flatMapAsync is lazy`,
  [
    getMaybeAsyncFnArb(fc.oneof(iterableArb, asyncIterableArb)),
    asyncIterableArb
  ],
  async (t, fn, asyncIterable) => {
    let count = 0

    const asyncIterator = AsyncBetterator.fromAsyncIterable(
      flatMapAsync(
        async value =>
          mapAsync(innerValue => {
            count++
            return innerValue
          }, asAsync(await fn(value))),
        asyncIterable
      )
    )

    t.is(count, 0)

    let i = 0
    while (await asyncIterator.hasNext()) {
      await asyncIterator.getNext()

      t.is(count, i + 1)

      i++
    }
  }
)

test(`flatMapAsync concrete example`, async t => {
  const asyncIterable = asAsync([1, 2, 3, 4, 5])

  const flatMappedAsyncIterable = flatMapAsync(
    value => [value / 2, value, value * 2],
    asyncIterable
  )

  t.deepEqual(
    await collectAsync(toArray, flatMappedAsyncIterable),
    [0.5, 1, 2, 1, 2, 4, 1.5, 3, 6, 2, 4, 8, 2.5, 5, 10]
  )
})

testProp(
  `flatMapConcur returns a concur iterable`,
  [
    getMaybeAsyncFnArb(
      fc.oneof(iterableArb, asyncIterableArb, concurIterableArb)
    ),
    concurIterableArb
  ],
  async (t, fn, concurIterable) => {
    const flatMappedConcurIterable = flatMapConcur(fn, concurIterable)

    await t.concurIterable(flatMappedConcurIterable)
  }
)

testProp(
  `flatMapConcur flat maps concurrently`,
  [
    getMaybeAsyncFnArb(
      fc.oneof(iterableArb, asyncIterableArb, concurIterableArb)
    ),
    concurIterableArb
  ],
  async (t, fn, concurIterable) => {
    const flatMappedConcurIterable = flatMapConcur(fn, concurIterable)

    t.unorderedDeepEqual(
      await collectConcur(toArray, flatMappedConcurIterable),
      concurIterable.iterationOrder.flatMap(
        value => fn.sync(value).iterationOrder
      )
    )
  }
)

testProp(
  `flatMapConcur is concurrent`,
  [
    getMaybeAsyncFnArb(fc.oneof(iterableArb, concurIterableArb)),
    nonEmptyConcurIterableArb
  ],
  async (t, fn, concurIterable) => {
    const flatMappedConcurIterable = flatMapConcur(fn, concurIterable)

    // eslint-disable-next-line no-empty-function
    const promise = flatMappedConcurIterable(() => {})

    t.pending(promise)

    await t.tick(
      fn.timeout +
        Math.max(
          ...concurIterable.timeouts.map(
            (timeout, index) =>
              timeout + (fn.sync(concurIterable.values[index]).maxTimeout || 0)
          )
        )
    )

    t.fulfilled(promise)
  }
)

test(`flatMapConcur concrete example`, async t => {
  const concurIterable = asConcur([1, 2, 3, 4, 5])

  const flatMappedConcurIterable = flatMapConcur(
    value => [value / 2, value, value * 2],
    concurIterable
  )

  t.unorderedDeepEqual(
    await collectConcur(toArray, flatMappedConcurIterable),
    [0.5, 1, 2, 1, 2, 4, 1.5, 3, 6, 2, 4, 8, 2.5, 5, 10]
  )
})

testProp(
  `flatten returns an iterable`,
  [getIterableArb(iterableArb)],
  (t, iterable) => {
    const flattenedIterable = flatten(iterable)

    t.iterable(flattenedIterable)
  }
)

testProp(`flatten flattens`, [getIterableArb(iterableArb)], (t, iterable) => {
  const flattenedIterable = flatten(iterable)

  t.deepEqual(
    [...flattenedIterable],
    iterable.values.flatMap(({ values }) => values)
  )
})

test(`flatten concrete example`, t => {
  const iterable = [[1, 2], [3, 4, 5], [], [6, 7, 8]]

  const flattenedIterable = flatten(iterable)

  t.deepEqual([...flattenedIterable], [1, 2, 3, 4, 5, 6, 7, 8])
})

testProp(
  `flattenAsync returns an async iterable`,
  [getAsyncIterableArb(fc.oneof(iterableArb, asyncIterableArb))],
  async (t, asyncIterable) => {
    const flattenedAsyncIterable = flattenAsync(asyncIterable)

    await t.asyncIterable(flattenedAsyncIterable)
  }
)

testProp(
  `flattenAsync flattens asynchronously`,
  [getAsyncIterableArb(fc.oneof(iterableArb, asyncIterableArb))],
  async (t, asyncIterable) => {
    const flattenedAsyncIterable = flattenAsync(asyncIterable)

    t.deepEqual(
      await collectAsync(toArray, flattenedAsyncIterable),
      asyncIterable.values.flatMap(({ values }) => values)
    )
  }
)

test(`flattenAsync concrete example`, async t => {
  const asyncIterable = asAsync([[1, 2], [3, 4, 5], [], [6, 7, 8]])

  const flattenedAsyncIterable = flattenAsync(asyncIterable)

  t.deepEqual(
    await collectAsync(toArray, flattenedAsyncIterable),
    [1, 2, 3, 4, 5, 6, 7, 8]
  )
})

testProp(
  `flattenConcur returns a concur iterable`,
  [
    getConcurIterableArb(
      fc.oneof(iterableArb, asyncIterableArb, concurIterableArb)
    )
  ],
  async (t, concurIterable) => {
    const flattenedConcurIterable = flattenConcur(concurIterable)

    await t.concurIterable(flattenedConcurIterable)
  }
)

testProp(
  `flattenConcur flattens concurrently`,
  [
    getConcurIterableArb(
      fc.oneof(iterableArb, asyncIterableArb, concurIterableArb)
    )
  ],
  async (t, concurIterable) => {
    const flattenedConcurIterable = flattenConcur(concurIterable)

    t.unorderedDeepEqual(
      await collectConcur(toArray, flattenedConcurIterable),
      concurIterable.iterationOrder.flatMap(
        ({ iterationOrder }) => iterationOrder
      )
    )
  }
)

testProp(
  `flattenConcur is concurrent`,
  [
    getConcurIterableArb(
      fc.oneof(iterableArb, asyncIterableArb, concurIterableArb),
      { minLength: 1 }
    )
  ],
  async (t, concurIterable) => {
    const flattenedConcurIterable = flattenConcur(concurIterable)

    // eslint-disable-next-line no-empty-function
    const promise = flattenedConcurIterable(() => {})

    t.pending(promise)

    await t.tick(
      Math.max(
        ...concurIterable.timeouts.map(
          (timeout, index) =>
            timeout +
            (typeof concurIterable.values[index][Symbol.asyncIterator] ===
            `function`
              ? concurIterable.values[index].timeouts.reduce((a, b) => a + b, 0)
              : concurIterable.values[index].maxTimeout || 0)
        )
      )
    )

    t.fulfilled(promise)
  },
  { seed: 1403933028 }
)

test(`flattenConcur concrete example`, async t => {
  const concurIterable = asConcur([[1, 2], [3, 4, 5], [], [6, 7, 8]])

  const flattenedConcurIterable = flattenConcur(concurIterable)

  t.deepEqual(
    await collectConcur(toArray, flattenedConcurIterable),
    [1, 2, 3, 4, 5, 6, 7, 8]
  )
})
